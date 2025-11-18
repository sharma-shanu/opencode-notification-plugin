# OpenCode Notification Sound Plugin

A plugin for [OpenCode](https://opencode.ai) that plays sound notifications for various events during your coding session.

## Overview

This plugin enhances your OpenCode experience by providing audio feedback for different actions and events. It includes a comprehensive set of sound effects for everything from task completion to errors, file operations, and more.

## Installation

1. Navigate to your OpenCode project directory
2. Create the plugin directory if it doesn't exist:
   ```bash
   mkdir -p .opencode/plugin
   ```
3. Copy this plugin to your plugin directory:
   ```bash
   cp -r /path/to/opencode-notificaiton-plugin .opencode/plugin/notification-sound
   ```

Or install it globally:

```bash
mkdir -p ~/.config/opencode/plugin
cp -r /path/to/opencode-notificaiton-plugin ~/.config/opencode/plugin/notification-sound
```

## Usage

Once installed, the plugin will automatically play sounds for the following events:

- **Session Completion**: Plays `done1.mp3` when OpenCode enters idle state
- More events can be easily added by extending the plugin

## Available Sounds

The plugin includes 24 different sound effects:

| Sound File                  | Description                  |
| --------------------------- | ---------------------------- |
| `break.mp3`                 | Break notification           |
| `chatEditModifiedFile.mp3`  | Chat edit modification       |
| `clear.mp3`                 | Clear action                 |
| `diffLineDeleted.mp3`       | Line deletion in diff        |
| `diffLineInserted.mp3`      | Line insertion in diff       |
| `diffLineModified.mp3`      | Line modification in diff    |
| `done1.mp3`                 | Task completion              |
| `editsKept.mp3`             | Edits retained               |
| `editsUndone.mp3`           | Edits undone                 |
| `error.mp3`                 | Error notification           |
| `foldedAreas.mp3`           | Code folding                 |
| `format.mp3`                | Code formatting              |
| `progress.mp3`              | Progress indication          |
| `quickFixes.mp3`            | Quick fixes applied          |
| `requestSent.mp3`           | Request sent                 |
| `responseReceived1-4.mp3`   | Response received variations |
| `save.mp3`                  | File saved                   |
| `success.mp3`               | Success notification         |
| `taskCompleted.mp3`         | Task completed               |
| `taskFailed.mp3`            | Task failed                  |
| `terminalBell.mp3`          | Terminal bell                |
| `voiceRecordingStarted.mp3` | Voice recording start        |
| `voiceRecordingStopped.mp3` | Voice recording stop         |
| `warning.mp3`               | Warning notification         |

## Configuration

### Volume Control

The plugin uses `afplay` (macOS) with volume set to 0.2. You can modify the volume in `notificaiton-sound.ts`:

```typescript
await $`afplay -v 0.5 ./assets/done1.mp3`; // Change 0.2 to desired volume (0.0-1.0)
```

### Adding New Events

To add sound notifications for other events, extend the `event` hook in `notificaiton-sound.ts`:

```typescript
export const SoundNotificationPlugin: Plugin = async ({ app, client, $ }) => {
  return {
    event: async ({ event }) => {
      switch (event.type) {
        case "session.idle":
          await $`afplay -v 0.2 ./assets/done1.mp3`;
          break;
        case "tool.execute.after":
          if (event.tool === "write") {
            await $`afplay -v 0.2 ./assets/save.mp3`;
          }
          break;
        // Add more events as needed
      }
    },
  };
};
```

## Platform Support

- **macOS**: Uses `afplay` (built-in)
- **Linux**: Can be modified to use `aplay` or `paplay`
- **Windows**: Can be modified to use PowerShell audio commands

### Linux Support

To use on Linux, modify the playback command:

```typescript
// For systems with alsa
await $`aplay ./assets/done1.mp3`;

// For systems with PulseAudio
await $`paplay ./assets/done1.mp3`;
```

### Windows Support

For Windows, you can use PowerShell:

```typescript
await $`powershell -c "(New-Object Media.SoundPlayer './assets/done1.mp3').PlaySync();"`;
```

## Development

### Prerequisites

- [Bun](https://bun.sh) runtime
- [OpenCode](https://opencode.ai) installed

### Project Structure

```
opencode-notificaiton-plugin/
├── assets/                    # Sound files
│   ├── done1.mp3
│   ├── error.mp3
│   └── ... (22 more sounds)
├── notificaiton-sound.ts      # Main plugin file
└── README.md                  # This file
```

### Plugin API

This plugin uses the OpenCode Plugin API with the following hooks:

- `event`: Listens for OpenCode events and triggers sounds

For more information about plugin development, see the [OpenCode Plugins Documentation](https://opencode.ai/docs/plugins).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your sound files to the `assets/` directory
4. Update the plugin logic as needed
5. Test with your OpenCode installation
6. Submit a pull request

## License

MIT Licence

## Support

For issues related to:

- **Plugin functionality**: Create an issue in this repository
- **OpenCode core**: Visit [OpenCode Discord](https://opencode.ai/discord) or [GitHub Issues](https://github.com/sst/opencode/issues)

## Related

- [OpenCode](https://opencode.ai) - AI coding agent for the terminal
- [OpenCode Plugins Documentation](https://opencode.ai/docs/plugins)
- [OpenCode Discord](https://opencode.ai/discord)
