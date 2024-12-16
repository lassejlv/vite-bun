import { $ } from 'bun'

export const RunBuildMode = async () => {
  console.log('Building frontend...')
  await $`cd frontend && bun run build`.quiet()
  console.log('Frontend built successfully: ./frontend/dist', '\n', 'Building backend...')

  await $`bun build --compile --minify --sourcemap index.ts --outfile program`.quiet()
  console.log('Backend built successfully: ./program')
}
