const CustomError = require('../helpers/custom-error');

const allowedCors = [
  'http://localhost:8080',
  'https://rglendon.github.io',
];

const allowCors = (req, res, next) => {
  const { origin } = req.headers;
  const method = req.method && req.method.toUpperCase && req.method.toUpperCase();
  // console.log(origin)
  if (!allowedCors.includes(origin)) {
    throw CustomError(400, 'cors error');
  }
  if (method === 'OPTIONS') {
    // console.log('preflight request')

    // Safari (and potentially other browsers) need content-length 0,
    //   for 204 or they just hang waiting for a body
    res.statusCode = 204;
    res.header('Content-Length', '0');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.end();
  } else {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  }
};

module.exports = allowCors;
