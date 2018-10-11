import { Meteor } from 'meteor/meteor';
import { Messages } from '../collections.js';

Meteor.publish("messages", function() {
  return Messages.find({}, { fields: { name: 1, message: 1, createdAt: 1, announcement: 1 }, limit: 100, sort: { createdAt: -1 } }); //we want the 100 most recent messages
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    });
  } else {
    this.ready();
  }
});