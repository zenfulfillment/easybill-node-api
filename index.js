const Promise = require('bluebird');
const request = require('request-promise');
const _ = require('lodash');

const rejectMissingUrl = () => Promise.reject(new Error('Missing url'));
const rejectMissingBody = () => Promise.reject(new Error('Missing body'));

module.exports = (apiKey) => {
  if (!apiKey) {
    throw new Error('Missing apiKey');
  }

  function _request(args) {
    return request.defaults({
      baseUrl: 'https://api.easybill.de/rest/v1',
      json: true,
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8'
        'Authorization': `Bearer ${apiKey}`
      }
    })(args).promise();
  }

  return {
    get(url, qs = {}) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      return _request({url, method: 'GET', qs});
    },

    post(url, body) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      if (_.isEmpty(body)) {
        return rejectMissingBody();
      }

      return _request({url, method: 'POST', body});
    },

    put(url, body) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      if (_.isEmpty(body)) {
        return rejectMissingBody();
      }

      return _request({url, method: 'PUT', body});
    },

    del(url) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      return _request({url, method: 'DELETE'});
    }
  };
};