import {Writable} from 'stream'

interface MeshellFn extends Function {
  (command: string): Promise<string>
  (command: string, { outputStream }: { outputStream: Writable }): Promise<void>
  (command: string, { bg, outputStream }: { bg: boolean, outputStream?: Writable }): Promise<number>
  cd(path: string): void
  cwd: string
}

interface MeshellConstructor {
  new({ cwd }?: { cwd?: string | undefined }): MeshellFn
}

declare var Meshell: MeshellConstructor
export = Meshell
