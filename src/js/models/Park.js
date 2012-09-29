/** cnv

*/
(function() {

	define(['backbone'], function(Backbone) {
	  var Park;
	  return Park = Backbone.Model.extend({
		initialize: function(park) {
		  this.park = park;
		  return {
			defaults: {
			  name: "",
			  graphic: null,
			  map: null
			}
		  };
		},
		zoom: function() {
		  var extent;
		  this.park.map.graphics.clear();
		  this.park.map.graphics.add(this.park.graphic);
		  extent = this.park.graphic.geometry.getExtent();
		  return this.park.map.setExtent(extent, true);
		}
	  });
	});

}).call(this);