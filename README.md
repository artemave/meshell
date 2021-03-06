# Meshell [![Codeship Status for artemave/meshell](https://app.codeship.com/projects/f1418e50-8730-4d39-ab61-ae5244c15eb6/status?branch=master)](https://app.codeship.com/projects/415871) [![npm version](https://badge.fury.io/js/meshell.svg)](https://badge.fury.io/js/meshell)

Sacré bleu! Running shell commands from Node just can't get any simpler.

## Why?

I _always_ have to look up `child_process` whenever I need to run some shell command in Node. While this may be a good thing - I will learn something eventually - sometimes I just want to run the damn thing.

This library offers a really really straitforward way to run shell commands. I dare you to not get it.

## Usage

    npm install meshell


```javascript
const Shell = require('meshell')

const sh = new Shell()

// output is both stdout and stderr
const output = await sh('ls -la')

// background process; returns pid instead of output; does not wait for the process to complete
const pid = await sh('sleep 10', {bg: true})

// collect output as it comes
await sh('git push heroku master', {outputStream: process.stdout})

// throws on exit code > 0
await sh('cat /does/not/exist')

// start in a particular directory (defaults to process.cwd())
const sh = new Shell({cwd: '/some/dir'})

// change it later
sh.cd('../test')

// where are we?
sh.cwd // => /some/test
```

Print all commands and their output to console:

    DEBUG=meshell node myScript.js
