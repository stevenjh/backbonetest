/** cnv

*/
(function() {

	define(['underscore', 'collections/ParkCollection', 'views/forms/list', 'text!templates/infowindows/park.html'], function(_, parkCollection, list, parkTemplate) {
	  return {
		initialize: function(map) {
		  var fillSymbol, lineSymbol, qTask, query, slsFillColor, slsLineColor;
		  dojo.require("esri.tasks.query");
		  /*
			#Symbology stuff
		  */
		  slsLineColor = new dojo.Color([255, 0, 0]);
		  slsFillColor = new dojo.Color([200, 200, 0, 0.25]);
		  lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, slsLineColor, 2);
		  fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, lineSymbol, slsFillColor);
		  qTask = new esri.tasks.QueryTask("http://gisapp.cnv.org/ArcGIS/rest/services/BaseMapServices/query_layers/MapServer/4");
		  query = new esri.tasks.Query();
		  query.returnGeometry = true;
		  query.outFields = ["PARK_NAME"];
		  query.where = "PARK_NAME <> ''";
		  query.outSpatialReference = map.spatialReference;
		  return qTask.execute(query, function(results) {
			var compiledTemplate, data, item, name, template, _i, _len, _ref;
			_ref = results.features;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			  item = _ref[_i];
			  name = item.attributes["PARK_NAME"];
			  data = {
				name: name,
				url: "http://en.wikipedia.org/wiki/" + name
			  };
			  compiledTemplate = _.template(parkTemplate, data);
			  template = new esri.InfoTemplate(name, compiledTemplate);
			  item.setInfoTemplate(template);
			  item.setSymbol(fillSymbol);
			  parkCollection.add({
				name: name,
				graphic: item,
				map: map
			  });
			}
			parkCollection.comparator = function(park) {
			  return park.get("name");
			};
			parkCollection.sort();
			return list.render();
		  });
		}
	  };
	});
}).call(this);