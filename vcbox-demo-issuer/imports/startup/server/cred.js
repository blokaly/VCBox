import {createCredDef, issueCred} from '../../api/credential/methods';
import Offer from '../../api/credential/offer';
import CredRequest from '../../api/credential/credreq';
import {poolHandle, wallet, did} from './indy'
import { Random } from 'meteor/random';

const indy = require('indy-sdk')
const util = require('./util')
const log = console.log
const http = require('http')

createCredDef.run = async ({ schemaId }) => {
    // secure code - not available on the client
    log("running createCredDef on server side")
  let ph = poolHandle.get();
  log("pool handle", ph)
  let wal = wallet.get();
  log("wallet", wal)
  let myDid = did.get();
  log("did", myDid)

  let schema = await getSchemaFromLedger(ph, myDid[0], schemaId)
  log("Issuer creates credential definition for schema")
  let [credDefId, credDef] = await indy.issuerCreateAndStoreCredentialDef(wal, myDid[0],
    schema, "COVID19_TEST", "CL", {"support_revocation": false})

  log("Issuer posts credential definition")
  await postCredDefToLedger(ph, wal, myDid[0], credDef)

  log("Issuer creates credential offer")
  let credOffer = await indy.issuerCreateCredentialOffer(wal, credDefId)

  let offerJson = JSON.stringify(credOffer);
  let offer64 = Buffer.from(offerJson).toString("base64");

  let data = JSON.stringify({
    offer: offer64, vkey:myDid[1]
  })

  let options = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/v1/indy/cred/template',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  let request = new Promise((resolve, reject) => {
    let req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let ret = '';
      res.on('data', (d) => {
        if (res.statusCode===200) {
          ret += d.toString();
        }
      })
      res.on('end', ()=>{
        let rtn = JSON.parse(ret)
        console.log('url:', rtn.data.url)
        return resolve(rtn.data.url);
      })
    })
    req.on('error', (error) => {
      console.error(error)
      reject(error)
    })

    req.write(data)
    req.end()
  })

  let url = await request
  let _id = Random.id();
  Offer.insert({_id, url:url, offer:offerJson})

}

issueCred.run = async ({ reqId }) => {
  log("running issueCred on server side")
  let offer = Offer.findOne();
  let credReq = CredRequest.findOne({_id:reqId}).request
  let secondsSinceEpoch = Math.round(Date.now() / 1000)

  console.log("offer", offer.offer)
  console.log("request", credReq)

  let data = JSON.stringify({ reqId:reqId })

  let options = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/v1/indy/cred/credential',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  let request = new Promise((resolve, reject) => {
    let req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let ret = '';
      res.on('data', (d) => {
        if (res.statusCode===200) {
          ret += d.toString();
        }
      })
      res.on('end', ()=>{
        return resolve(true);
      })
    })
    req.on('error', (error) => {
      console.error(error)
      reject(error)
    })

    req.write(data)
    req.end()
  })

  await request


}

async function getSchemaFromLedger(poolHandle, did, schemaId) {
  const getSchemaRequest = await indy.buildGetSchemaRequest(did, schemaId)
  const getSchemaResponse = await ensureSubmitRequest(poolHandle, getSchemaRequest)
  const [, schema] = await indy.parseGetSchemaResponse(getSchemaResponse)
  return schema
}

async function postCredDefToLedger(poolHandle, wallet, did, credDef) {
  const credDefRequest = await indy.buildCredDefRequest(did, credDef)
  await ensureSignAndSubmitRequest(poolHandle, wallet, did, credDefRequest)
}

async function issueCredential(wallet, offer, request, values) {
  const [cred, credRevId, revRegDelta] = await indy.issuerCreateCredential(wallet, offer,
    request, values, null, -1)
  return cred
}

async function ensureSubmitRequest(poolHandle, request) {
  const response = await indy.submitRequest(poolHandle, request)
  checkResponse(response)
  return response
}

async function ensureSignAndSubmitRequest(poolHandle, wallet, did, request) {
  const response = await indy.signAndSubmitRequest(poolHandle, wallet, did, request)
  checkResponse(response)
  return response
}

function checkResponse(response) {
  if (!response) {
    throw new Error("ERROR in 'ensurePreviousRequestApplied' : response is undefined !")
  }
  if (response.op === "REJECT") {
    throw new Error("ERROR in 'ensurePreviousRequestApplied' : response.op is "+response.op+" and must be REPLY. Reason : "+response.reason)
  }
  if (response.op !== "REPLY") {
    throw new Error("ERROR in 'ensurePreviousRequestApplied' : response.op is "+response.op+" and must be REPLY")
  }
  if (!response.result) {
    throw new Error("ERROR in 'ensurePreviousRequestApplied' : response.result is undefined ! response=" + JSON.stringify(response))
  }
}
