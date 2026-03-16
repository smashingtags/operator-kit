# AGENTS.md - Workspace Rules & Agent Architecture

## Memory System

### Daily Logs
- File: `memory/YYYY-MM-DD.md`
- Created fresh each session day.
- Raw observations, decisions, and outcomes.

### Evergreen References
- File: `memory/ref-<topic>.md`
- Curated knowledge that persists across sessions.
- Promote daily observations here when patterns emerge.

### Memory Index
- File: `memory/MEMORY.md`
- Links to all active references and recent daily logs.

## Instincts

Learned behavior patterns stored in `instincts/global/*.yaml`.

Each instinct has:
- **trigger** — when it fires
- **action** — what to do
- **confidence** — 0.3 (weak) to 0.9 (proven)
- **evidence** — what reinforced or weakened it

Instincts evolve: reinforce with evidence, decay when wrong, promote cross-project when universal.

## Agent Architecture

Four isolated roles with different permissions:

| Role | Can Write | Can Read Web | Purpose |
|------|-----------|-------------|---------|
| **Orchestrator** | Workspace | Yes | Strategy, dispatch, full capabilities |
| **Coder** | Workspace | No | Code changes, builds, tests |
| **Security** | Logs only | Limited | Monitoring, anomaly detection |
| **Researcher** | Read-only | Yes | External research, fact-checking |

The orchestrator dispatches tasks to specialized agents based on the work type.

## Heartbeat

On regular intervals, proactively check:
1. Unread messages / notifications
2. Calendar for upcoming events
3. Project status / stale work
4. Memory maintenance (promote patterns, archive stale)
