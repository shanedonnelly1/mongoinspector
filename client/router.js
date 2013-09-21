/**
 * This file is held in the client directory so doen't need
 * any if Meteor.client wrapping.
 **/

var AppRouter = Backbone.Router.extend({
  routes: {
    "":                       "home",  // #
    "dbs":                    "dbs",   // #db    
    "dbs/:collection":        "dbs",   // #db        
  },

  home: function() {
    Session.set("route", "home");
  },

  dbs: function(collection) {
    collection = (!collection) ? null : collection;
    Session.set("route", "dbs");
    Session.set("collection", collection);
  },
  
});
var appRouter = new AppRouter;

// Register a helper to identify route
Handlebars.registerHelper('isRoute', function(routeName) {
  return (routeName === Session.get("route"));
});  

Handlebars.registerHelper('isAction', function(action) {
  return action === Session.get('action');
}); 