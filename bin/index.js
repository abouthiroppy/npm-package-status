#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const Table = require('cli-table');
const fetchDownload = require('../lib/fetch-download');

const table = new Table({
  head: ['downloads', 'start', 'end']
});

const commands = process.argv.slice(2);

if (commands[0] === '-v' || commands[0] === '--version') {
  console.log(`Version: ${require('../package.json').version}`);
  process.exit(0);
}

if (commands[0] !== undefined) {
  const packageName = commands[0];

  fetchDownload(packageName)
    .then((res) => {
      const arr = res.map((e) =>
        Object.keys(e.data).map((item) => e.data[item])
      );

      arr.forEach((e) => table.push(e));

      console.log(table.toString());
      console.log(chalk.cyan(`https://www.npmjs.com/package/${packageName}`));
    })
    .catch(() => {
      console.error('error...');
    });
}
