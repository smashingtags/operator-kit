# TOOLS.md - Available Tools & Services

## Environment

- **Workspace:** {{workspace}}
- **Timezone:** {{timezone}}
- **Operator:** {{operatorName}}
- **Owner:** {{ownerName}}

## Configured Tools

_Add your MCP servers, SSH hosts, APIs, and service URLs here._

### Example entries:
```
| Service | URL | Notes |
|---------|-----|-------|
| n8n | http://localhost:5678 | Automation workflows |
| Mission Control | http://localhost:3000 | Task board API |
```

## Skills

_Document any custom skills available to the operator._

## Models

_List preferred models for different task types._

| Task | Model | Notes |
|------|-------|-------|
| General | claude-sonnet-4-6 | Default |
| Complex reasoning | claude-opus-4-6 | When depth matters |
| Quick tasks | claude-haiku-4-5 | Speed over depth |
