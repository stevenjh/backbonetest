(function() {

  define(function() {
    return {
      losAngeles: function() {
        return new esri.geometry.Extent({
          xmin: -13286420.39,
          ymin: 3993285.76,
          xmax: -13025954.7,
          ymax: 4136625.11,
          spatialReference: {
            wkid: 102113
          }
        });
      },
      demo: function() {
        return new esri.geometry.Extent({
          xmin: -15167476.28,
          ymin: 1106502.26,
          xmax: -6361930.62,
          ymax: 6976866.03,
          spatialReference: {
            wkid: 102113
          }
        });
      },
      cnv: function() {
        return new esri.geometry.Extent({
          xmin: 490004,
          ymin: 5458793,
          xmax: 499783,
          ymax: 5467175,
          spatialReference: {
            wkid: 26910
          }
        });
      }
    };
  });

}).call(this);
