/* eslint-disable no-unused-vars */
export default {
  RED: '#EF1C29',
  ORANGE: '#FFA927',
  YELLOW: '#f5e600',
  GREEN: '#1cba3d',
  GREY: '#888888',
  BLACK: '#000000',

  uniqueValueInfosArray: [{
    value: '1',
    symbol: {
      type: 'simple-fill',
      color: [28, 186, 61, 0.3], // green
    },
  }, {
    value: '2',
    symbol: {
      type: 'simple-fill',
      color: [245, 230, 0, 0.3], // yellow
    },
  }, {
    value: '3',
    symbol: {
      type: 'simple-fill',
      color: [255, 169, 39, 0.3], // orange
    },
  }, {
    value: '4',
    symbol: {
      type: 'simple-fill',
      color: [239, 28, 41, 0.3], // red
    },
  }, {
    value: '5',
    symbol: {
      type: 'simple-fill',
      color: [0, 0, 0, 0.5], // black
    },
  }, {
    value: '6',
    symbol: {
      type: 'simple-fill',
      color: [136, 136, 136, 0.3], // grey
    },
  }],

  bcExtent: {
    // autocasts as new Extent()
    xmax: -12177718.03530625,
    xmin: -15988562.517490985,
    ymax: 8894547.02325949,
    ymin: 6096340.291796502,
    spatialReference: {
      // autocasts as new SpatialReference()
      wkid: 102100,
    },
  },

  initialCamera: {
    position: {
      x: -117.63062,
      y: 47.69173,
      z: 90000,
    },
    tilt: 75,
  },

  template: {
    title: 'Avalanche Region Info',
    content: `
        Name {name}<br/>
        Date Issued: {dateIssued}<br/>
        Valid Until: {validUntil}<br>
        bulletinTitle: {bulletinTitle}<br/>
        highlights: {highlights}<br/>
        confidence: {confidence}<br/>`,
  },
};
