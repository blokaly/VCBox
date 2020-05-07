// Publications send to the client

import { Meteor } from 'meteor/meteor';
import Offer from './offer.js';
import CredRequest from './credreq.js';

if (Meteor.isServer) {
  console.log("publishing offer")
  Meteor.publish('offer', function() {
    return Offer.find();
  });

  console.log("publishing cred requests")
  Meteor.publish('cred.request', function() {
    return CredRequest.find();
  });
}
