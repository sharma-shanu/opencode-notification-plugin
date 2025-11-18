/// <reference types="bun" />
import type { Plugin } from "@opencode-ai/plugin"

export const SoundNotificationPlugin: Plugin = async ({ app, client, $ }) => {
  return {
    event: async ({ event }) => {
      if (event.type !== "session.idle") return
      
      await $`afplay -v 0.2 ./assets/done1.mp3`
    }
  }
}

export default SoundNotificationPlugin

