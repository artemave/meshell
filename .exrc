let g:vigun_commands = [
      \ {
      \   'pattern': 'test/.*Test.js$',
      \   'normal': './node_modules/.bin/donc',
      \   'currentTestStrategy': 'line_number',
      \   'debug': './node_modules/.bin/donc --inspect-brk',
      \ }
      \]
