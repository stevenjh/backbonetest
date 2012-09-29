(function() {

	define(['jquery', 'underscore', 'backbone', 'collections/ParkCollection', 'text!templates/forms/ParkListView.html'], function($, _, Backbone, parkCollection, viewTemplate) {
	  /*
				# This list view will
				# handle rendering and events
				# of the sidebar list
	  */
	  var ListView;
	  ListView = Backbone.View.extend({
		//el: $("#sidebar>ul"),
		el: $("#nameTags"),
		//tagName: "ul",
		tagName: "div",
		initialize: function() {
		  return this.collection = parkCollection;
		},
		events: {
		  "click a": "clicked"
		},
		clicked: function(evt) {
		  var cid;
		  evt.preventDefault();
		  cid = $(evt.currentTarget).data("id");
		  return this.collection.zoomByCid(cid);
		},
		render: function() {
		  var data, template;
		  data = {
			parks: this.collection.models,
			_: _
		  };
		  template = _.template(viewTemplate, data);
		  $(this.el).html("");
		  return $(this.el).append(template);
		}
	  });
	  return new ListView;
	});
}).call(this);