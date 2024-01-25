const {spawn} = require('child_process')
const path = require('path')
let debug = () => {}
try {
  debug = require('debug')('meshell')
} catch {}

module.exports = class Shell extends Function {
  constructor ({cwd = process.cwd()} = {}) {
    super()

    function shell (cmd, {bg = false, outputStream} = {}) {
      debug('Running `%s`', cmd)

      return new Promise((resolve, reject) => {
        let output = ''
        let stderr = ''

        const sp = spawn(cmd, [], {cwd: shell.cwd, shell: true})

        if (outputStream) {
          sp.stdout.pipe(outputStream)
          sp.stderr.pipe(outputStream)
        }

        sp.stdout.on('data', data => {
          debug('output', data.toString())

          if (!outputStream) {
            output += data
          }
        })
        sp.stderr.on('data', data => {
          debug('stderr', data.toString())

          if (!outputStream) {
            output += data
          }
          stderr += data
        })
        sp.on('error', err => {
          reject(err)
        })

        if (bg) {
          return resolve(sp.pid)
        } else {
          sp.on('close', code => {
            if (code === 0) {
              resolve(outputStream ? undefined : output.trim())
            } else {
              const error = new Error(output.trim())
              error.code = code
              reject(error)
            }
          })
        }
      })
    }

    shell.cwd = cwd

    Object.setPrototypeOf(shell, Shell.prototype)

    return shell
  }

  cd (p) {
    this.cwd = path.isAbsolute(p) ? p : path.resolve(this.cwd, p)
  }
}
