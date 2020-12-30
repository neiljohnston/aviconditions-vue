/* eslint-disable no-param-reassign */

const fetch = require('node-fetch');

let features = null;

async function getForecastDescription(forecastUrl) {
  const request = await fetch(forecastUrl);
  const data = await request.text();
  let json = {};
  if (data) {
    try {
      json = JSON.parse(data);
    } catch (e) {
      json = null;
    }
  }
  return json;
}

module.exports = async (req, res) => {
  const { url = 'https://www.avalanche.ca/api/forecasts' } = req.query;
  const request = await fetch(url);
  const data = await request.text();
  const json = JSON.parse(data);

  // eslint-disable-next-line prefer-destructuring
  features = json.features;

  await Promise.all(features.map(async (feature) => {
    if (feature.properties.forecastUrl) {
      const forecastUrl = `https://www.avalanche.ca${feature.properties.forecastUrl}`;
      const forecastDescription = await getForecastDescription(forecastUrl);

      // Process Forecast
      if (forecastDescription) {
        Object.keys(forecastDescription).forEach((key) => {
          feature.properties[key] = forecastDescription[key];
        });

        feature.properties.start_date = forecastDescription.dangerRatings[0].date;
        const currentDangerRatings = forecastDescription.dangerRatings[0].dangerRating;

        Object.keys(currentDangerRatings).forEach((key) => {
          feature.properties[key] = currentDangerRatings[key];
        });
      }
    }
  }));

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // // res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(JSON.stringify(json));
};
