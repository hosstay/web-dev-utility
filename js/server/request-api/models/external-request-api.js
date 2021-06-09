const security = require('../utility/security');
const utility = require('../utility/utility');
const Database = require('../database/database');
const requestApi = require('../utility/request-api');

function allowed(req) {
  return true;
}

async function runSqlOnServer(req, res) {
  try {
    console.log('*RUN SQL ON SERVER*');

    if (!allowed(req)) {
      return res.status(403).send('Access is forbidden');
    }

    console.log('body');
    console.log(req.body);
    console.log('user');
    console.log(req.user);

    // add client's timezone offset to user for server
    // if (req.user) {
    //   req.user.timezoneOffset = req.body.timezoneOffset;
    // } else {
    //   req.user = {};
    //   req.user.timezoneOffset = req.body.timezoneOffset;
    // }

    req.body = req.body.body;
    const db = new Database(req);

    const response = await db.query(req.body.sql);

    console.log('*RUN SQL ON SERVER* RETURN SUCCESS');
    return res.status(200).json(security.encrypt(response));
  } catch (error) {
    console.log('*RUN SQL ON SERVER* RETURN ERROR');
    console.log(error);
    return res.status(200).json(security.encrypt(error));
  }
}

async function runInternalRequestOnServer(req, res) {
  try {
    console.log('*runInternalRequestOnServer* req');
    console.log(req);

    if (!allowed(req)) {
      return res.status(403).send('Access is forbidden');
    }

    const result = await requestApi.internalRequest(req.body);
    console.log('*runInternalRequestOnServer* RESULT');
    console.log(result);

    return res.status(200).json(security.encrypt(result));
  } catch (err) {
    console.log(err);
    console.log(utility.errorHandler(err, 'runInternalRequestOnServer', true));
    return res.status(200).json(security.encrypt('Something went wrong.'));
  }
}

async function runExternalRequestOnServer(req, res) {
  try {
    console.log('*runExternalRequestOnServer* req');
    console.log(req);

    if (!allowed(req)) {
      return res.status(403).send('Access is forbidden');
    }

    const result = await requestApi.externalRequest(req.body);
    console.log('*runExternalRequestOnServer* RESULT');
    console.log(result);

    return res.status(200).json(security.encrypt(result));
  } catch (err) {
    console.log(err);
    console.log(utility.errorHandler(err, 'runExternalRequestOnServer', true));
    return res.status(200).json(security.encrypt('Something went wrong.'));
  }
}

async function runCurlCommandOnServer(req, res) {
  try {
    console.log('*runCurlCommandOnServer* req');
    console.log(req);

    if (!allowed(req)) {
      return res.status(403).send('Access is forbidden');
    }

    const result = await requestApi.runCurlCommand(req.body);

    return res.status(200).json(security.encrypt(result));
  } catch (err) {
    utility.errorHandler(err, 'runCurlCommandOnServer', true);
    return res.status(200).json(security.encrypt('Something went wrong.'));
  }
}

module.exports = {
  runSqlOnServer: runSqlOnServer,
  runInternalRequestOnServer: runInternalRequestOnServer,
  runExternalRequestOnServer: runExternalRequestOnServer,
  runCurlCommandOnServer: runCurlCommandOnServer
};