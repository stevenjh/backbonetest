(function() {

  define(['jquery', 'underscore', 'backbone', 'views/map/MapView', 'helpers/parklistHelper', 'jqueryui'], function($, _, Backbone, MapView, parkList) {
    var ViewManager;
    return ViewManager = Backbone.View.extend({
      el: $('#map-container'),
      render: function() {
        var mv, styleView, _this = this;

        mv = new MapView();
        this.$el.prepend(mv.render().el);

		/** waits for mapLoaded from MapView */
        mv.on("mapLoaded", function(map) {

			/* set the ViewManager map reference to the MapView map */
          _this.map = map;
          _this.map.resize();
          
		  // Remove basemap galary
		  /*return require(['views/tools/basemapgalleryview'], function(BaseMapGalleryView) {
            var bmgv;
            bmgv = new BaseMapGalleryView();
            $('#basemap-container').append(bmgv.render(_this.map).el);
            return bmgv.show();
          });*/

		  // call helper to load in park data
		  
		  return parkList.initialize(map);

        });

        styleView = null;
        
		/** 'require' is part of the dojo AMD loading */
		require(['views/tools/styletoolview'], function(StyleView) {
          styleView = new StyleView();
          $('#sidebar').append(styleView.render().el);
          return styleView.ready();
        });

		/* Event raised in MapView from map onUpdateEnd */
        mv.on("mapExtentChanged", function() {
          return styleView.refilter();
        });


		/** should this be part done using 
			// Dojo 1.7 (AMD)
			function setAfrobeat(){
			   document.musicPrefs.other.value="Afrobeat";
			}
			require("dojo/ready", function(ready){
				 ready(function(){
					 setAfrobeat();
				 });
			}); 
		**/
        dojo.addOnLoad(function() {
          return mv.ready();
        });


        return this;
      }
    });
  });

}).call(this);
