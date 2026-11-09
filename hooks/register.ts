import type { Register, EngineInterface } from 'claude-code'

const turns = { plugin: 'turn-counter', key: 'turns' } as const

// The surface drops a pinned status line as a turn ends, so re-pin it there too.
const pin = async ($: EngineInterface) => {
  const { value = 0 } = await $.state.get(turns)
  $.ui.status(value > 0 ? `turno ${value}` : undefined)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => (await pin($), next(e)))

  on('turn.complete', async ($, e, next) => {
    const done = await next(e)
    await pin($)
    return done
  })

  on('prompt.submit', async ($, e, next) => {
    // Meta prompts are not the person's own turns.
    if (e.isMeta) return next(e)

    const held = await $.state.get(turns)

    await $.state.set(turns, (held.value ?? 0) + 1, { ifVersion: held.version })
    await pin($)

    return next(e)
  })
}
