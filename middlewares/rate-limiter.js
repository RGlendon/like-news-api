const rateLimit = require('express-rate-limit');

const CustomError = require('../helpers/custom-error');

// по идее можно добавлять их в MongoDb
const bannedIPsCreateAcc = {};
const bannedIPs = {};

const banner = (req, res, next) => {
  if (bannedIPs[req.ip] >= Date.now()) {
    throw CustomError(429, `повторите попытку ${new Date(bannedIPs[req.ip])}`);
  }
  return next();
};
const bannerCreateAcc = (req, res, next) => {
  if (bannedIPsCreateAcc[req.ip] >= Date.now()) {
    throw CustomError(429, `повторите попытку ${new Date(bannedIPsCreateAcc[req.ip])}`);
  }
  return next();
};


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  onLimitReached(req) {
    bannedIPs[req.ip] = Date.now() + 60 * 60 * 1000;
    throw CustomError(429, `Слишком много запросов, повторите попытку ${new Date(bannedIPs[req.ip])}`);
  },
});
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  skipFailedRequests: true,
  onLimitReached(req) {
    bannedIPsCreateAcc[req.ip] = Date.now() + 60 * 60 * 1000;
    throw CustomError(429, `Слишком много аккаунтов создано с этого IP, повторите попытку ${new Date(bannedIPsCreateAcc[req.ip])}`);
  },
});

module.exports = {
  banner,
  bannerCreateAcc,
  apiLimiter,
  createAccountLimiter,
};
