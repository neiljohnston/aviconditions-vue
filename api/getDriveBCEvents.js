const fetch = require('node-fetch');

// map severity levels of events to a color
const severityColors = {
  MINOR: '#ffff00',
  MODERATE: '#f5a623',
  MAJOR: '#ff0000',
};

function driveBCtoGeoJson(json) {
  const geoJson = {
    type: 'FeatureCollection',
    features: [],
  };
  // restructure DriveBC 511 API JSON to become geoJSON compliant
  for (let i = 0; i < json.length; i += 1) {
    const event = json[i];

    const feature = {
      type: 'Feature',
    };
    feature.properties = event;
    feature.geometry = event.geography;
    delete event.geography;

    // add color properties to the feature JSON
    // Note that tokml's handling of styles is a bit busted, but this will generate the needed ids
    feature.properties['marker-color'] = severityColors[event.severity];
    feature.properties.stroke = severityColors[event.severity];
    feature.properties.title = `${event.severity} ${event.headline}: ${event.roads[0].name}`;

    geoJson.features.push(feature);
  }
  return geoJson;
}

module.exports = async (req, res) => {
  const { url = 'http://api.open511.gov.bc.ca/events?format=json&status=ACTIVE&event_type=INCIDENT' } = req.query;
  const request = await fetch(url);
  const data = await request.text();
  let json = JSON.parse(data);
  json = json.events;
  // // restructure DriveBC 511 API JSON to become geoJSON compliant
  json = driveBCtoGeoJson(json);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(json));
};
