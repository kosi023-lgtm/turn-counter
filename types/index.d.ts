declare module 'claude-code' {
  interface PluginState {
    'turn-counter': {
      /** Turns the person has submitted in this session. */
      turns: number
    }
  }
}
