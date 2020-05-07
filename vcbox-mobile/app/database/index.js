import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
PouchDB.plugin(require('pouchdb-upsert'));

const dbOptions = {
  revs_limit: 1,
  adapter: 'asyncstorage'
}

const UserDB = new PouchDB('User', dbOptions)
const SecuritySettingsDB = new PouchDB('SecuritySettings', dbOptions)

export default class Database {
  static loadUser() {
    return new Promise((resolve, reject) => {
      UserDB.get('user')
        .then((user) => {
          resolve({
            ok: true,
            user: user
          });
        })
        .catch((err) => {
          reject({
            ok: false,
            error: err
          });
        });
    })
  }

  static createUpdateUser(user) {
    return new Promise((resolve, reject) => {
      UserDB.upsert('user', (doc) => {
        return {
          ...doc,
          ...user
        }
      })
        .then((rsp) => {
          resolve({
            ok: true,
            user: rsp
          });
        })
        .catch((err) => {
          reject({
            ok: false,
            error: err
          });
        });
    })
  }


  static loadSecuritySettings() {
    return new Promise((resolve, reject) => {
      SecuritySettingsDB.allDocs({
        include_docs: true,
        attachments: false
      })
        .then((settings) => {
          resolve({
            ok: true,
            settings: settings.rows
          });
        })
        .catch((err) => {
          reject({
            ok: false,
            error: err
          });
        });
    })
  }

  static createUpdateSecuritySetting(id, setting) {
    return new Promise((resolve, reject) => {
      SecuritySettingsDB.upsert(id, (doc) => {
        return {
          ...doc,
          value: setting
        }
      })
        .then((rsp) => {
          console.log(rsp)
          resolve({
            ok: true
          });
        })
        .catch((err) => {
          console.log(1234)
          console.log(err)
        });
    })
  }
}
