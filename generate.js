#!/usr/bin/env node

const fs = require('fs');
const jsonminify = require("jsonminify");

fs.readFile('append.txt', 'utf8', function(err, data) {
    if (data.slice(data.length - 1) === ',') {
        data = data.slice(0, -1);
    }
    data = JSON.parse(`[${data}]`);

    const bigList = [];

    data.forEach((item) => {
        item.violations.forEach((violation) => {
            bigList.push({
                url: item.url,
                summary: violation.failureSummary,
                html: violation.html.replace(/\t/g, "").replace(/\n/g, ""),
                impact: violation.impact
            });
        });
    });

    const messages = {};

    bigList.forEach((item) => {
        const prop = item.summary.replace(/ /g, "").slice(-25);
        if (messages.hasOwnProperty(prop)) {
            messages[prop].instances.push({
                url: item.url,
                location: item.html
            });
        } else {
            messages[prop] = {
                impact: item.impact,
                summary: item.summary.replace("Fix all of the following:\n ", "[Fix all]").replace("Fix any of the following:\n ", "[Fix any]"),
                instances: [{
                    url: item.url,
                    location: item.html
                }]
            };
        }
    });

    fs.writeFileSync('report.json', JSON.stringify(bigList));
    
    const csvArr = [["summary", "impact", "url", "tag"]];
	Object.values(messages).forEach(msg => {
	  msg.instances.forEach((instance, index) => {
	    if (index === 0) {
	      const msgArr = [];
	      msgArr.push(msg.summary);
	      msgArr.push(msg.impact);
	      msgArr.push(instance.url);
	      msgArr.push(instance.location);
	      csvArr.push(msgArr);
	    } else {
	      const msgArr = [];
	      msgArr.push("");
	      msgArr.push("");
	      msgArr.push(instance.url);
	      msgArr.push(instance.location);
	      csvArr.push(msgArr);
	    }   
	  });
	});
    
    fs.writeFile('report.csv', csvArr.join("\n"), function (err) {if (err) throw err;});
});