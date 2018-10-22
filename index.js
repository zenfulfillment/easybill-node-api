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
    get(url, qs = {}, {isFile = false} = {}) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      const encoding = isFile ? {encoding: null} : {};

      const args = Object.assign({}, {url, method: 'GET', qs}, encoding);

      return _request(args);
    },

    post(url, body, {isFile = false} = {}) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      if (_.isEmpty(body)) {
        return rejectMissingBody();
      }

      if (isFile) {
        return _request({url, method: 'POST', formData: body});
      }
      return _request({url, method: 'POST', body});
    },

    put(url, body = {}) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
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
