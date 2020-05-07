// Collection definition

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// define collection
const CredRequest = new Mongo.Collection('credreqs');

// define schema
const Schema = new SimpleSchema({
  _id: {
    type: String,
  },
  request: {
    type: String,
  },
});

// attach schema
CredRequest.attachSchema(Schema);

export default CredRequest;
