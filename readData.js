#!/usr/bin/env node
const args = process.argv.slice(2);
const fs = require('fs');
const groupBy = require('./utils/node/groupBy.js');
const data = require('./report.json');
const dom = () => !args[0] || args[0] === 'undefined' ? 'impact' : args[0];

const result = Object.entries(groupBy.groupBy(dom())(data))
  .map(([key, value]) => ({ name: key, children: value }));

const replacer = (key, value) => value === null ? '' : value;
const header = Object.keys(result[0])
const csv = [
  header.join(','), // header row first
  ...result.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n');
console.log(csv);
// fs.writeFile(dom() + '.csv', csv, function (err) {if (err) throw err;});