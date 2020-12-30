/* eslint-disable prefer-destructuring */
const fetch = require('node-fetch');

function bcCameraJsontoGeoJson(json) {
  const geoJson = {
    type: 'FeatureCollection',
    features: [],
  };
  for (let i = 0; i < json.length; i++) {
    const item = json[i];
    const feature = {
      type: 'Feature',
    };
    feature.geometry = {
      type: 'Point',
      coordinates: [item[6], item[5]],
    };
    feature.properties = {};
    feature.properties.id = item[0];
    feature.properties.name = item[1];
    feature.properties.description = item[2];
    feature.properties.source = item[3];
    feature.properties.direction = item[4];
    feature.properties.image = `http://images.drivebc.ca/bchighwaycam/pub/cameras/${item[0]}.jpg`;
    feature.properties.link = `http://images.drivebc.ca/bchighwaycam/pub/html/dbc/${item[0]}.html`;
    geoJson.features.push(feature);
  }
  return geoJson;
}

module.exports = async (req, res) => {
  const { url = 'http://www.drivebc.ca/data/webcams.json' } = req.query;
  const request = await fetch(url);
  const data = await request.text();

  let json = JSON.parse(data);
  json = bcCameraJsontoGeoJson(json);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(json));
};
