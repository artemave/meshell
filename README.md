# Meshell [![Codeship Status for artemave/meshell](https://app.codeship.com/projects/67c432b0-c170-0138-b9e8-32d294ba6a0d/status?branch=master)](https://app.codeship.com/projects/406031)

Sacré bleu! Running shell commands from Node just can't get any simpler.

## Why?

I _always_ have to look up `child_process` whenever I need to run some shell command in Node. While this may be a good thing - I will learn something eventually - sometimes I just want to run the freaking thing.

This library offers a really really straitforward way to run shell commands. I dare you to not understand it.

## Usage

    npm install meshell


```javascript
const Shell = require('meshell')

const sh = new Shell()
const output = await sh('ls -la')

// start in a particular directory (defaults to process.cwd())
const sh = new Shell({cwd: '/some/dir'})

// change it later
sh.cd('../test')

// background process; returns instead of output; does not wait for the process to complete
const pid = await sh('sleep 10', {bg: true})

// collect output as it comes
await sh('git push heroku master', {outputStream: process.stdout})
```
