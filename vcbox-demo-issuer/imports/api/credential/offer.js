// Collection definition

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// define collection
const Offer = new Mongo.Collection('offers');

// define schema
const Schema = new SimpleSchema({
  _id: {
    type: String,
  },
  url: {
    type: String,
  },
  offer: {
    type: String,
  }
});

// attach schema
Offer.attachSchema(Schema);

export default Offer;
