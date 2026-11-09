# turn-counter

A Claude Code mod that counts the turns of a session and pins the count in the status line as `turno N`.

It counts every prompt the person submits (meta prompts, which they never typed, are skipped), keeps the number in the session's plugin state, and re-pins the line when a turn completes and when the session starts, so the count survives the surface clearing it and a hot reload of the mod.

## Install

At the prompt of a terminal session:

```
/plugin install turn-counter --marketplace kosi023-lgtm/turn-counter
```

Answer `y` to add the marketplace, then pick a scope (user scope is the first one, Enter takes it).

From a shell:

```
claude plugin install turn-counter --marketplace kosi023-lgtm/turn-counter
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `kosi023-lgtm/turn-counter`, then Add plugin.

## How it works

`hooks/register.ts` is the whole mod:

- `prompt.submit` — adds 1 to the count unless the prompt is a meta one, then pins the line.
- `turn.complete` — pins the line again, since the surface drops it when a turn ends.
- `session.start` — pins the count a previous run left, so a restart or reload keeps it.

The count lives in `$.state` under `turn-counter.turns`, declared in `types/index.d.ts`.
