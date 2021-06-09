const express = require('express');
const compression = require('compression');

const app = module.exports = express.Router();

const endpointPrefix = '/api/externalRequestApi';

// app.use(compression());

const model = require('../models/external-request-api');

app.post(endpointPrefix + '/runSqlOnServer', model.runSqlOnServer);
app.post(endpointPrefix + '/runInternalRequestOnServer', model.runInternalRequestOnServer);
app.post(endpointPrefix + '/runExternalRequestOnServer', model.runExternalRequestOnServer);
app.post(endpointPrefix + '/runCurlCommandOnServer', model.runCurlCommandOnServer);