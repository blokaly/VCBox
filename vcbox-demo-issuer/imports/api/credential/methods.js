/**
 * Meteor methods
 */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { MethodHooks } from 'meteor/lacosta:method-hooks';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';


/** **************** Helpers **************** */

const mixins = [MethodHooks, CallPromiseMixin];

// not logged in error message
const checkLoggedInError = {
  error: 'notLogged',
  message: 'You need to be logged in to call this method',
  reason: 'You need to login',
};

/** **************** Methods **************** */

/**
 * countersIncrease
 */

// eslint-disable-next-line no-unused-vars, arrow-body-style
const beforeHookExample = (methodArgs, methodOptions) => {
  // console.log('countersIncrease before hook');
  // perform tasks
  return methodArgs;
};
// eslint-disable-next-line no-unused-vars, arrow-body-style
const afterHookExample = (methodArgs, returnValue, methodOptions) => {
  // console.log('countersIncrease: after hook:');
  // perform tasks
  return returnValue;
};

export const createCredDef = new ValidatedMethod({
  name: 'creddef.create',
  mixins,
  beforeHooks: [beforeHookExample],
  afterHooks: [afterHookExample],
  validate: new SimpleSchema({
    schemaId: {
      type: String,
      optional: false,
    },
  }).validator(),
  run({ schemaId }) {

    console.log("schema id is", schemaId)
    // console.log('counters.increase', _id);
    if (Meteor.isServer) {
      // secure code - not available on the client
      console.log("running on server side")
    }
    // call code on client and server (optimistic UI)
    return true;
  },
});

export const issueCred = new ValidatedMethod({
  name: 'cred.issue',
  mixins,
  beforeHooks: [beforeHookExample],
  afterHooks: [afterHookExample],
  validate: new SimpleSchema({
    reqId: {
      type: String,
      optional: false,
    },
  }).validator(),
  run({ reqId }) {

    console.log("cred request id", reqId)
    // console.log('counters.increase', _id);
    if (Meteor.isServer) {
      // secure code - not available on the client
      console.log("running on server side")
    }
    // call code on client and server (optimistic UI)
    return true;
  },
});
