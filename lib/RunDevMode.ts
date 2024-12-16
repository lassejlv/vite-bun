import { $ } from "bun"


export const RunDevMode = async () => {
  console.log('Frontend running on http://localhost:3001 (Dev mode)')
  await $`cd frontend && bun run dev`.quiet()
}
