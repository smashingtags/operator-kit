# @imogenlabs/operator-kit

[![npm version](https://img.shields.io/npm/v/@imogenlabs/operator-kit.svg)](https://www.npmjs.com/package/@imogenlabs/operator-kit)
[![license](https://img.shields.io/npm/l/@imogenlabs/operator-kit.svg)](https://github.com/smashingtags/operator-kit/blob/main/LICENSE)
[![OpenClaw plugin](https://img.shields.io/badge/OpenClaw-plugin-blue)](https://openclaw.ai)

AI operator scaffold for OpenClaw. One install gives you a complete AI operator setup — identity, memory system, instincts engine, cron jobs, and multi-agent architecture.

> *"Your AI assistant, ready to go."*

## Install

```bash
openclaw plugins install @imogenlabs/operator-kit
```

## What Gets Scaffolded

```
~/.openclaw/workspace/
├── SOUL.md                    # Core values, boundaries, working style
├── IDENTITY.md                # Name, role, personality
├── USER.md                    # Owner profile and preferences
├── AGENTS.md                  # Memory system, instincts, agent architecture
├── TOOLS.md                   # Services, APIs, MCP servers, models
├── HEARTBEAT.md               # Proactive check schedule
│
├── memory/
│   ├── MEMORY.md              # Index of references and daily logs
│   ├── 2026-03-16.md          # Daily session log (auto-created)
│   └── ref-<topic>.md         # Evergreen references (created as needed)
│
├── instincts/
│   └── global/
│       └── ask-before-external.yaml   # Seed instinct (confidence: 0.9)
│
├── agents/                    # (optional) Multi-agent roles
│   ├── orchestrator/SOUL.md   # Strategy, dispatch, full capabilities
│   ├── coder/SOUL.md          # Code changes, builds, tests
│   ├── security/SOUL.md       # Monitoring, anomaly detection
│   └── researcher/SOUL.md     # External research, fact-checking
│
└── cron/                      # (optional) Starter automation
    └── jobs.json              # Morning briefing + nightly rundown
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

| Option | Default | Description |
|--------|---------|-------------|
| `operatorName` | `"Assistant"` | Your operator's name |
| `ownerName` | `"User"` | Your name |
| `timezone` | `"America/New_York"` | IANA timezone for cron scheduling |
| `enableMemorySystem` | `true` | Daily logs + evergreen references |
| `enableInstincts` | `true` | Confidence-weighted learned behaviors |
| `enableCronJobs` | `false` | Morning briefing + nightly rundown |
| `enableAgentRoles` | `false` | Multi-agent architecture |

## Tools

The plugin registers three tools your operator can use:

| Tool | Description |
|------|-------------|
| `operator_scaffold_status` | Check which operator files exist and which are missing |
| `operator_create_instinct` | Create a new learned behavior pattern (yaml in instincts/global/) |
| `operator_memory_ref` | Create or update an evergreen reference memory file |

## How It Works

On first load, operator-kit checks your workspace for missing files and creates them from templates. **Existing files are never overwritten** — you own your operator's identity once it's scaffolded.

The memory system creates daily log files and an index. The instincts engine seeds one starter instinct (ask before external actions) and provides a tool to create more as your operator learns.

### Instincts Format

```yaml
id: prefer-simple-solutions
created: 2026-03-16
confidence: 0.7          # 0.3 weak → 0.9 proven
domain: coding
trigger: "choosing between approaches"
action: |
  Pick the simplest solution that works.
  Three lines of code beats a premature abstraction.
rationale: |
  Over-engineering wastes time and creates maintenance burden.
evidence:
  - date: 2026-03-16
    what: Rewrote 200-line helper as 15-line inline function
```

## Companion: Lossless Context Management

For cross-session memory that survives context window limits, install [lossless-claw](https://github.com/Martian-Engineering/lossless-claw):

```bash
openclaw plugins install @martian-engineering/lossless-claw
```

Operator-kit handles the *identity and workspace structure*. Lossless-claw handles the *conversation memory* — DAG-based summarization with incremental compaction so your operator remembers what happened across sessions.

## Inspired By

Built from the patterns behind [Imogen](https://imogenlabs.ai), the AI operator at ImogenLabs.

## Links

- [Product page](https://imogenlabs.ai/operator-kit) — features and documentation
- [npm](https://www.npmjs.com/package/@imogenlabs/operator-kit) — package registry
- [OpenClaw](https://openclaw.ai) — the platform this plugin runs on
- [ImogenLabs](https://imogenlabs.ai) — who built this

## License

MIT
