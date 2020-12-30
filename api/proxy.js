const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url = 'default' } = req.query;
  const request = await fetch(url);
  const data = await request.text();
  const json = JSON.parse(data);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(JSON.stringify(json));
};
