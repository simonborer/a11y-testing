#!/usr/bin/env node
import { execSync } from "child_process";

const clixec = function(command) {
    execSync(command, (error, stdout, stderr) => { if (error) { console.log(`error: ${error.message}`); return; } if (stderr) { console.log(`stderr: ${stderr}`); return; } });
};

export const cliExec = clixec;