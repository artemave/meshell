let g:vigun_commands = [
      \ {
      \   'pattern': 'test/.*Test.ts$',
      \   'normal': 'yarn test',
      \   'currentTestStrategy': 'line_number',
      \   'debug': 'yarn test --inspect-brk',
      \ }
      \]
