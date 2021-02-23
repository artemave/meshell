import {Writable} from 'stream'

interface MeshellFn extends Function {
  (command: string, { outputStream }?: { outputStream: Writable }): Promise<string>
  (command: string, { bg, outputStream }: { bg: boolean, outputStream?: Writable }): Promise<number>
  cd(path: string): void
  cwd: string
}

interface MeshellConstructor {
  new({ cwd }?: { cwd?: string | undefined }): MeshellFn
}

declare var Meshell: MeshellConstructor
export = Meshell
