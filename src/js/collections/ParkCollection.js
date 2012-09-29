/** cnv

*/
(function() {

	define(['backbone', 'models/Park'], function(Backbone, Park) {
	  var ParkCollection;
	  ParkCollection = Backbone.Collection.extend({
		model: Park,
		zoomByCid: function(cid) {
		  var park;
		  park = this.getByCid(cid);
		  return park.zoom();
		}
	  });
	  return new ParkCollection;
	});

}).call(this);