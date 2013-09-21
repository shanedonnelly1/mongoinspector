if (Meteor.isClient) {
  Meteor.startup(function (){
      // code to run on client at startup
      Backbone.history.start({pushState: true});    
  });
}

/**
 * ---------------------------------------
 * General client side functions
 * --------------------------------------- 
 **/

if (Meteor.isClient) {
  Template.db.db = function () {
    return {
      "collections": getApplicationCollections()
    };
  };

  function getApplicationCollections() {
    var collections = [];

    // Go through all global objects to find the collections.
    for (var globalObject in window) { 
      // This was giving a deprecated error message, so just checking for it explicitly
      if (globalObject === "webkitStorageInfo") {
        continue;
      }
      if (window[globalObject] instanceof Meteor.Collection) {
        collections.push({
          "name": globalObject,
          "collection": window[globalObject]
        });        
      }
    }
    return collections;
  }; 

  Template.singleCollection.collection = function () {
    var collectionName = Session.get("collection"),
      collection;
    if (window[collectionName] instanceof Meteor.Collection) {
      collection = window[collectionName];
      return collection;
    } else {
      return;
    }
  };

  Template.singleCollection.events({
    'blur li.objectRaw input': function (ev) {
      var collection = window[Session.get('collection')],
        originalDocument;
      //console.log('Changed?');
      input = $(ev.target);
      if (input.attr('data-original') === input.val()) {
        console.log('No change.');
      } else {
        //console.log('Yes');
        // Probably validate first
        originalDocument = JSON.parse(input.val());
        delete originalDocument._id;
        //collection.update({_id: input.data('original')._id}, originalDocument);
        collection.update({_id: input.data('original')._id}, {$set: originalDocument});
      }
    },
    'click li.objectRaw button': function (ev) {
      var collection = window[Session.get('collection')],
        input = $($(ev.target).parent('li').find('input')[0]);
      console.log('Delete ' + input.data('original')._id);
      console.log(input);
      collection.remove({_id: input.data('original')._id});
    },    
    'blur li.newObjectRaw input': function (ev) {
      input = $(ev.target);
      console.log('New object?');
      if (input.val() !== "") {
        console.log('Yes.');
        var collection = window[Session.get('collection')];
        // Probably validate first
        collection.insert(JSON.parse(input.val()));
        // The new 
        //Deps.flush();
      }
    }    
  });

  Handlebars.registerHelper('collectionName', function() {
    return Session.get('collection');
  });  

  Handlebars.registerHelper('isCollectionSet', function() {
    return (Session.get('collection')) ? true : false;
  });  

  Handlebars.registerHelper('getCollectionCount', function(collection) {
    return collection.find().count();
  });

  Handlebars.registerHelper('renderCollection', function(collection) {
    var renderedDocs = "<ol>";
    // console.log(collection);
    if (collection) {
      collection.find().forEach(function (doc) {
        renderedDocs += "<li class='objectRaw'><input type='text' value='" + JSON.stringify(doc) + "' data-original='" + JSON.stringify(doc) + "' /> <button>Remove</button></li>";
      });
      renderedDocs += "<li class='newObjectRaw'><input type='text' value='' data-original='' /></li>";      
      renderedDocs += "</ol>";
      // console.log(renderedDocs);
      return renderedDocs;
    } else {
      return "Nothing.";
    }
  });  
}