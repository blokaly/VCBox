import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'
import { getJson } from './parser'
import CredRequest from '../../api/credential/credreq';

WebApp.connectHandlers.use('/credrequest', async (req, res, next) => {
  const { headers } = req

  // console.info('/hello route - headers\n', headers)

  const json = await getJson(req).catch(e => {
    console.error('/credrequest - err catch parsing JSON:\n', e)
  })

  console.info('\n\n** getJson parse result:\n', json)

  if (CredRequest.findOne({_id:json.requester})==null) {
    let buf = Buffer.from(json.request, 'base64')
    CredRequest.insert({_id:json.reqId, requester:json.requester, request:buf.toString('ascii')})
  }
  res.writeHead(200)
  res.end()
})
