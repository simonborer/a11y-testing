#!/usr/bin/env node

const fs = require('fs');
const AxeBuilder = require('@axe-core/webdriverjs');
const WebDriver = require('selenium-webdriver');
const pageList = require('./page-list.js');
const stream = fs.createWriteStream("append.txt", {flags:'a'});
const args = process.argv.slice(2);

const testList = {pages:["http://humber.ca/makingaccessiblemedia/index.php",
"http://humber.ca/makingaccessiblemedia/modules/01/01.php",
"http://humber.ca/makingaccessiblemedia/modules/01/02.php"]};

const drive = (page, listLength, i) => {
	const driver = new WebDriver.Builder().forBrowser('firefox').build();
	driver.get(page)
	    .then(() => {
	        const rslt = new AxeBuilder(driver).analyze((err, results) => { if (err) { console.error(err); }
	        });
	        return rslt;
	    }).then((results) => {
			const logging = {};
			logging.url = results.url;
			logging.violations = [];
			results.violations.forEach(violation => {
			  violation.nodes.forEach(node => {
			    logging.violations.push(node);
			  });
			});
			stream.write(JSON.stringify(logging) + ",");
			driver.quit();
			if ((listLength - i) <= 3) {
				console.log('Only a few tests remaining')
			} else {
				console.log(`~${(listLength - (i + 1)) * 8}s remain`);
			}
	    });
};

if (args[0] !== 'test') {
	pageList.pages.forEach((page, i) => {
		const time = parseInt(i * 8000);
		setTimeout(drive, time, page, pageList.pages.length, i);
	});
} else {
	testList.pages.forEach((page, i) => {
		const time = parseInt(i * 8000);
		setTimeout(drive, time, page, testList.pages.length, i);
	});
}