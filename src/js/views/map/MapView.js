(function() {

  define(['jquery', 'underscore', 'backbone', 'helpers/popuphelper', 'helpers/extentfactory', 'esri/layers/osm'], function($, _, Backbone, popup, extents) {
    var MapView;
    return MapView = Backbone.View.extend({
      tagName: 'div',
      id: 'map',
      className: 'claro',
      initialize: function() {},
      render: function() {
        console.log('render the map');
        return this;
      },

      ready: function() {
        var map, osm, refUrl, refLayer,
          _this = this;
        map = new esri.Map(this.id, {
          infoWindow: popup.create(),
          extent: extents.cnv()
        });

        $(window).resize(function() {
          map.resize();
          return map.reposition();
        });

		/** to raise mapLoaded event */
        dojo.connect(map, "onLayersAddResult", function(results) {
			/* backbone event */
          return _this.trigger("mapLoaded", map);
        });

		/** to know when map updating, or more specifically finished updating */
        dojo.connect(map, "onUpdateStart", function() {
          var lyr;
          lyr = map.getLayer(map.layerIds[0]);
          return dojo.connect(lyr, "onUpdateEnd", function() {
			  /* backbone event listened for in ViewManager */
            return _this.trigger("mapExtentChanged");
          });
        });

		ref_url = "http://gisapp.cnv.org/ArcGIS/rest/services/BaseMapServices/property/MapServer";
		refLayer = new esri.layers.ArcGISTiledMapServiceLayer(ref_url);
        osm = new esri.layers.OpenStreetMapLayer();
        //return map.addLayers([osm]);
		return map.addLayers([refLayer]);
      }
    });
  });

}).call(this);
