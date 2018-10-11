import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Messages } from '../collections.js';

Meteor.methods({
	
	'sendMessage'(data) {

		check(data, {
			message: String, //the message to send
      name: Match.Optional(String) //if the user already has a name
		});
    
    if (data.message=="") {
      throw new Meteor.Error("message-empty", "Your message is empty");
    }

    if (!Meteor.userId()) {
      throw new Meteor.Error('error-invalid-user', 'Invalid user', {method: 'sendMessage'});
    }
    
    const user = Meteor.user();
    let userName = user.name || user.username || (user.emails[0] && user.emails[0].address);
    
    const matchName = data.message.match(/^My name is (.*)/i);
    
    if (matchName && matchName[1]!="") {
      userName = matchName[1];
      Messages.insert({
        name: "Chat Bot",
        uid: Meteor.userId(),
        message: "Hey everyone, " + userName + " is here!",
        createdAt: new Date(),
        announcement: true
      });
    } else {
      Messages.insert({
        name: userName,
        uid: Meteor.userId(),
        message: data.message,
        createdAt: new Date()
      });
    }
    
    return {
      name: userName
    };
		
	}
  
});