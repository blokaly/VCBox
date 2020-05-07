const indy = require('indy-sdk')
const util = require('./util')
const log = console.log
import { ReactiveVar } from 'meteor/reactive-var'

export const poolHandle = new ReactiveVar()
export const wallet = new ReactiveVar()
export const did = new ReactiveVar([])

init()

async function init() {

  log("Set protocol version 2 to work with Indy Node 1.4")
  await indy.setProtocolVersion(2)

  let ph = await createAndOpenPoolHandle("issuer")
  poolHandle.set(ph)
  let wal = await createAndOpenWallet("issuer")
  wallet.set(wal)

  let d = await createAndStoreMyDid(wal, "000000000000000000000000Steward2")
  did.set(d)
}

async function createAndOpenPoolHandle(actor) {
  const poolName = actor + "-pool-sandbox"
  const poolGenesisTxnPath = await util.getPoolGenesisTxnPath(poolName)
  const poolConfig = {"genesis_txn": poolGenesisTxnPath}
  if (!util.poolConfigExists(poolName)) {
    await indy.createPoolLedgerConfig(poolName, poolConfig)
      .catch(e => {
        console.log("ERROR : ", e)
        process.exit()
      })
  }

  return await indy.openPoolLedger(poolName, poolConfig)
}

async function createAndOpenWallet(actor) {
  let walletName = actor + ".wallet";
  const walletConfig = {"id": walletName}
  const walletCredentials = {"key": actor + ".wallet_key"}
  if (!util.walletExists(walletName)) {
    await indy.createWallet(walletConfig, walletCredentials)
  }
  return await indy.openWallet(walletConfig, walletCredentials)
}

async function createAndStoreMyDid(wallet, seed) {
  const [did, verkey] = await indy.createAndStoreMyDid(wallet, {'seed': seed})
  return [did,verkey]
}

