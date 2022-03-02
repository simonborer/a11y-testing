#!/usr/bin/env node

const fs = require('fs');
// const cliExec = require('./utils/node/cliExec.js');
const pageList = require('./page-list.js');

// const testList = {pages:["http://humber.ca/makingaccessiblemedia/index.php",
// "http://humber.ca/makingaccessiblemedia/modules/01/01.php",
// "http://humber.ca/makingaccessiblemedia/modules/01/02.php"]};

var child_process = require('child_process');

// var child = child_process.spawnSync("~/Volumes/apps/Applications/vnu-runtime-image/bin/vnu", ["--format json  http://humber.ca/makingaccessiblemedia/modules/02/field-notes.php"], { encoding : 'utf8' });
var child = child_process.spawnSync("/Volumes/apps/Applications/vnu-runtime-image/bin/vnu", [`--errors-only --format json ${pageList.pages.join(' ')}`], { encoding : 'utf8' });

fs.writeFileSync('report-checker.json', child.stderr);