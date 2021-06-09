const utility = require('./utility');
const security = require('./security');
const http = require('http'); // For internal request (to localhost(self))
const https = require('https'); // For external request (to server)
const url = require('url');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const sendRequest = async (req, requestOptions, requestType) => {
  try {
    const referrer = req.headers.referer ? req.headers.referer : '';
    const isLocalhost = referrer === undefined || referrer.indexOf('localhost') > -1;

    let result;

    if (isLocalhost) {
      let endpoint;

      switch (requestType) {
        case 'internal':
          endpoint = 'https://server.com/node/api/externalRequestApi/runInternalRequestOnServer';
          break;
        case 'external':
          endpoint = 'https://server.com/node/api/externalRequestApi/runExternalRequestOnServer';
          break;
        case 'curl':
          endpoint = 'https://server.com/node/api/externalRequestApi/runCurlCommandOnServer';
          break;
        default:
          throw new Error(`did not pass a correct requestType`);
      }

      const options = {
        endpoint: endpoint,
        headers: {
          'Content-Type': 'application/json',
        },
        payload: requestOptions
      };
      result = await externalRequest(options);
    } else {
      switch (requestType) {
        case 'internal':
          result = await internalRequest(requestOptions);
          break;
        case 'external':
          result = await externalRequest(requestOptions);
          break;
        case 'curl':
          result = await runCurlCommand(requestOptions);
          break;
        default:
          throw new Error(`did not pass a correct requestType`);
      }
    }

    return result;
  } catch (err) {
    utility.errorHandler(err, 'sendRequest');
  }
};

const externalRequest = async (requestOptions) => {
  try {
    return await request(requestOptions, https);
  } catch (err) {
    utility.errorHandler(err, 'externalRequest');
  }
};

const internalRequest = async (requestOptions) => {
  try {
    return await request(requestOptions, http);
  } catch (err) {
    utility.errorHandler(err, 'internalRequest');
  }
};

const request = (requestOptions, protocol) => {
  return new Promise((resolve, reject) => {
    const send = (options, payload, callback) => {
      try {
        console.log('*send* SENDING REQUEST. OPTIONS:');
        console.log(options);
        let response = '';
        const request = protocol.request(options, (res) => {
          res.setEncoding('utf8');
          res.on('data', function(chunk) {
            response += chunk.toString();
          });
          res.on('end', function() {
            // response is sent back with "s on each end, so this removes those.
            if (/^"/.test(response) && /"$/.test(response)) {
              response = response.substring(1, response.length - 1);
            }
            callback(response);
          });
        });
        request.on('error', (err) => {
          console.error('*protocol.request* ERROR:' + err );
        });

        let finalPayload;

        if (payload) {
          if (typeof payload === 'string') {
            finalPayload = payload;
          } else {
            finalPayload = JSON.stringify(payload);
          }
        } else {
          finalPayload = '{}';
        }

        console.log('payload');
        console.log(finalPayload);

        request.write(finalPayload);
        request.end();
      } catch (err) {
        utility.errorHandler(err, 'send');
      }
    };

    try {
      const endpoint = requestOptions.endpoint;
      const hostname = requestOptions.hostname;
      const path = requestOptions.path;
      const port = requestOptions.port;
      const secure = requestOptions.secure;
      const headers = requestOptions.headers;
      const payload = requestOptions.payload;
      const noDecrypt = requestOptions.noDecrypt;

      let parsedUrl = {};
      if (endpoint) {
        parsedUrl = url.parse(endpoint);
      } else if (hostname && path && port !== undefined) {
        parsedUrl = {
          hostname: hostname,
          path: path,
          port: port
        };
      } else {
        throw new Error(`No endpoint or (hostname, path, port) passed`);
      }

      const options = {
        hostname: parsedUrl.hostname,
        method: 'POST',
        path: parsedUrl.path,
        port: parsedUrl.port,
        headers: headers
      };

      if (secure) {
        options.secure = secure;
      }

      console.log('OPTIONS');
      console.log(options);

      send(options, payload, (response) => {
        try {
          if (typeof response !== 'string') throw response;
          console.log('non-decrypted response');
          console.log(response);

          if (!noDecrypt) {
            if (response === '' || /\<title\>Error\<\/title\>/.test(response)) {
              throw new Error(`${response}\nResponse is not able to be decrypted, something went wrong`);
            }

            response = security.decrypt(response);
          }

          console.log('decrypted(or not) response');
          console.log(response);

          return resolve(response);
        } catch (err) {
          return reject(utility.errorHandler(err, 'sendCallback', false, true));
        }
      });
    } catch (err) {
      return reject(utility.errorHandler(err, 'request', false, true));
    }
  });
};

const runCurlCommand = async (options) => {
  try {
    console.log('*runCurlCommand* options');
    console.log(options);

    let command = ``;
    command += `curl -v -X POST `;
    command += `-d '${JSON.stringify(options.data)}' `;

    for (const [key, value] of Object.entries(options.headers)) {
      command += `-H '${key}: ${value}' `;
    }

    command += options.endpoint;

    console.log('command');
    console.log(command);

    const {stdout, stderr} = await exec(command);
    console.log(`stdout:`);
    console.log(stdout);
    console.log(`stderr:`);
    console.log(stderr);

    if (!noDecrypt) {
      if (response === '') {
        throw new Error(`${response}\nResponse is not able to be decrypted, something went wrong`);
      }

      stdout = security.decrypt(stdout);
    }

    return stdout;
  } catch (err) {
    return utility.errorHandler(err, 'runCurlCommand');
  }
};

module.exports = {
  sendRequest: sendRequest,
  externalRequest: externalRequest,
  internalRequest: internalRequest,
  runCurlCommand: runCurlCommand
};