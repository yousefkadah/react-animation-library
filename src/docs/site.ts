export const site = {
  name: 'React Magic UI',
  framework: 'React',
  npmPackage: '@yousefkadah/react-magic-ui',
  repository: 'https://github.com/yousefkadah/react-animation-library',
  registryUrl: 'https://yousefkadah.github.io/react-animation-library/r',
  cli: 'shadcn@latest',
  sibling: { name: 'Vue Magic UI', url: 'https://yousefkadah.github.io/vue-animation-libarary/' },
}

export const packageManagers = ['pnpm', 'npm', 'yarn', 'bun'] as const
export type PackageManager = (typeof packageManagers)[number]

export function runCommand(manager: PackageManager, command: string): string {
  const runner = { pnpm: 'pnpm dlx', npm: 'npx', yarn: 'npx', bun: 'bunx --bun' }[manager]
  return `${runner} ${command}`
}

export function installCommand(manager: PackageManager, packages: string[]): string {
  const verb = { pnpm: 'pnpm add', npm: 'npm install', yarn: 'yarn add', bun: 'bun add' }[manager]
  return `${verb} ${packages.join(' ')}`
}
