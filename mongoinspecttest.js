Enemies = new Meteor.Collection("enemies");
Friends = new Meteor.Collection("friends");

/**
 * ---------------------------------------
 * General client side functions
 * --------------------------------------- 
 **/

if (Meteor.isClient) {
  Template.lists_container.friends = function () {
    return Friends.find();
  };  

  Template.lists_container.enemies = function () {
    return Enemies.find();
  };    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Friends.find().count() === 0) {
		Friends.insert({
			"category": "Close", 
			"people": [{'name': 'Andrew'}, {'name': 'Barbara'}]}
		);

		Friends.insert({
			"category": "Distant", 
			"people": [{'name': 'Carl'}, {'name': 'Debra'}]}
		);

		Friends.insert({
			"category": "Unwanted", 
			"people": [{'name': 'Emmet'}, {'name': 'Fionnula'}]}
		);

		Friends.insert({
			"category": "Weird", 
			"people": [{'name': 'Gordon'}, {'name': 'Harriet'}]}
		);	
    }
    if (Enemies.find().count() === 0) {
		Enemies.insert({
			"category": "Outright", 
			"people": [{'name': 'Ivan'}, {'name': 'Jackie'}]}
		);

		Enemies.insert({
			"category": "Sneaky", 
			"people": [{'name': 'Keith'}, {'name': 'Laura'}]}
		);

		Enemies.insert({
			"category": "Idiot", 
			"people": [{'name': 'Matt'}, {'name': 'Niamh'}]}
		);
  	}
  });
}