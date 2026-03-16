# @imogenlabs/operator-kit

AI operator scaffold for OpenClaw. One install gives you a complete AI operator setup — identity, memory system, instincts engine, cron jobs, and multi-agent architecture.

## Install

```bash
openclaw plugins install @imogenlabs/operator-kit
```

## What You Get

| Component | Files | Description |
|-----------|-------|-------------|
| **Identity** | SOUL.md, IDENTITY.md, USER.md | Core values, personality, owner profile |
| **Workspace** | AGENTS.md, TOOLS.md, HEARTBEAT.md | Rules, tools config, proactive checks |
| **Memory** | memory/MEMORY.md, memory/YYYY-MM-DD.md | Daily logs + evergreen references |
| **Instincts** | instincts/global/*.yaml | Confidence-weighted learned behaviors |
| **Agent Roles** | agents/{orchestrator,coder,security,researcher}/ | Multi-agent dispatch architecture |
| **Cron Jobs** | cron/jobs.json | Morning briefing + nightly rundown |

## Configuration

```json
{
  "operator-kit": {
    "enabled": true,
    "config": {
      "operatorName": "Friday",
      "ownerName": "Tony",
      "timezone": "America/New_York",
      "enableMemorySystem": true,
      "enableInstincts": true,
      "enableCronJobs": false,
      "enableAgentRoles": false
    }
  }
}
```

## Tools

The plugin registers three tools:

- **operator_scaffold_status** — Check which operator files exist
- **operator_create_instinct** — Create a new learned behavior pattern
- **operator_memory_ref** — Create/update an evergreen reference memory

## How It Works

On first load, operator-kit checks your workspace for missing files and creates them from templates. Existing files are never overwritten — you own your operator's identity once it's scaffolded.

The memory system creates daily log files and an index. The instincts engine seeds one starter instinct (ask before external actions) and provides a tool to create more as your operator learns.

## Companion: Lossless Context Management

For cross-session memory that survives context window limits, install [lossless-claw](https://github.com/Martian-Engineering/lossless-claw):

```bash
openclaw plugins install @martian-engineering/lossless-claw
```

Operator-kit handles the *identity and workspace structure*. Lossless-claw handles the *conversation memory* — DAG-based summarization with incremental compaction so your operator remembers what happened across sessions.

## Inspired By

Built from the patterns behind Imogen, the AI operator at ImogenLabs.

## License

MIT
