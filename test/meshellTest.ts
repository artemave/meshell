import {Writable} from 'stream'
import {it, beforeEach} from 'donc'
import Shell from '..'
import assert from 'assert'
import fs from 'fs'

it('runs a shell command in a current directory', async function() {
  const sh = new Shell()
  await sh('touch test/hello.txt')
  assert.ok(fs.existsSync('test/hello.txt'))
})

it('runs a shell command in a given directory', async function() {
  const sh = new Shell({cwd: `${process.cwd()}/test`})
  await sh('touch hello.txt')
  assert.ok(fs.existsSync('test/hello.txt'))
})

it('returns stdout and stderr', async function() {
  const sh = new Shell()
  const output = await sh('test/echo_stdout_stderr.sh')
  assert.equal(output, 'hello\nworld')
})

it('fails when exit code != 0', async function() {
  const sh = new Shell()
  try {
    await sh('test/fail.sh')
  } catch (e) {
    assert.equal(e.code, 2)
    assert.equal(e.message, "ls: cannot access 'asdf': No such file or directory")
    assert.equal(e.output, "hello\nls: cannot access 'asdf': No such file or directory")
  }
})

it('can run in background', async function() {
  const sh = new Shell()
  const pid = await sh('sleep 1', {bg: true})
  assert.match(pid.toString(), /\d+/)
  assert.match((await sh('ps')), new RegExp(pid.toString()))
})

it('can change current directory', async function() {
  const sh = new Shell()
  sh.cd('test')
  await sh('touch hello.txt')
  assert.ok(fs.existsSync('test/hello.txt'))
})

it('can stream output to a reader', async function() {
  let actualOutput = ''
  const writer = new Writable({
    write(chunk, _encoding, cb) {
      actualOutput += chunk
      cb()
    },
  })
  const sh = new Shell()
  const res = await sh('ls test', {outputStream: writer})

  assert.ok(res === undefined)
  assert.match(actualOutput, new RegExp(__filename.split('/').pop() as string))
})

beforeEach(cleanup => {
  cleanup(() => {
    if (fs.existsSync('test/hello.txt')) {
      fs.unlinkSync('test/hello.txt')
    }
  })
})
