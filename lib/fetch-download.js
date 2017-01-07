'use strict';

const axios = require('axios');

const http = axios.create({
  baseURL: 'https://api.npmjs.org/downloads/point/'
});

const main = (packageName) => {
  return Promise
    .all([
      fetch('last-day', packageName),
      fetch('last-week', packageName),
      fetch('last-month', packageName)
    ]);
};

const fetch = (point, packageName) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/${point}/${packageName}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

module.exports = main;
