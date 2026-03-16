/**
 * @imogenlabs/operator-kit — AI Operator Scaffold for OpenClaw
 *
 * Scaffolds a complete AI operator setup: identity, memory system,
 * instincts engine, cron jobs, and multi-agent architecture.
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { homedir } from "node:os";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

interface OperatorKitConfig {
  enabled?: boolean;
  operatorName?: string;
  ownerName?: string;
  workspacePath?: string;
  enableMemorySystem?: boolean;
  enableInstincts?: boolean;
  enableCronJobs?: boolean;
  enableAgentRoles?: boolean;
  timezone?: string;
}

const DEFAULT_CONFIG: Required<OperatorKitConfig> = {
  enabled: true,
  operatorName: "Assistant",
  ownerName: "User",
  workspacePath: join(homedir(), ".openclaw", "workspace"),
  enableMemorySystem: true,
  enableInstincts: true,
  enableCronJobs: false,
  enableAgentRoles: false,
  timezone: "America/New_York",
};

function loadTemplate(name: string): string {
  const templateDir = join(import.meta.dirname ?? __dirname, "templates");
  return readFileSync(join(templateDir, name), "utf-8");
}

function renderTemplate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

function ensureDir(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function writeIfMissing(path: string, content: string): boolean {
  if (existsSync(path)) {
    return false;
  }
  writeFileSync(path, content, "utf-8");
  return true;
}

function scaffoldIdentity(ws: string, vars: Record<string, string>): string[] {
  const created: string[] = [];

  const files = [
    { name: "SOUL.md", template: "SOUL.md" },
    { name: "IDENTITY.md", template: "IDENTITY.md" },
    { name: "AGENTS.md", template: "AGENTS.md" },
    { name: "TOOLS.md", template: "TOOLS.md" },
    { name: "USER.md", template: "USER.md" },
    { name: "HEARTBEAT.md", template: "HEARTBEAT.md" },
  ];

  for (const file of files) {
    const content = renderTemplate(loadTemplate(file.template), vars);
    if (writeIfMissing(join(ws, file.name), content)) {
      created.push(file.name);
    }
  }

  return created;
}

function scaffoldMemory(ws: string): string[] {
  const created: string[] = [];
  const memDir = join(ws, "memory");
  ensureDir(memDir);

  const today = new Date().toISOString().split("T")[0];
  if (writeIfMissing(join(memDir, `${today}.md`), `# ${today}\n\nSession started.\n`)) {
    created.push(`memory/${today}.md`);
  }

  const memoryIndex = `# Memory Index\n\nEvergreen references and daily logs live here.\n\n## Daily Logs\n- [${today}](./${today}.md)\n\n## References\n_None yet — create ref-<topic>.md files as patterns emerge._\n`;
  if (writeIfMissing(join(memDir, "MEMORY.md"), memoryIndex)) {
    created.push("memory/MEMORY.md");
  }

  return created;
}

function scaffoldInstincts(ws: string): string[] {
  const created: string[] = [];
  ensureDir(join(ws, "instincts", "global"));
  ensureDir(join(ws, "instincts", "projects"));

  const seedInstinct = `id: ask-before-external
created: ${new Date().toISOString().split("T")[0]}
updated: ${new Date().toISOString().split("T")[0]}
confidence: 0.9
domain: communication
trigger: "about to send a message, email, or post on behalf of the user"
evidence_count: 0
action: |
  Always ask for explicit approval before sending any external communication.
  Show the draft first. Never send half-baked outbound messages.
rationale: |
  External actions are irreversible and represent the user publicly.
  Getting this wrong destroys trust faster than anything else.
evidence: []
`;

  if (writeIfMissing(join(ws, "instincts", "global", "ask-before-external.yaml"), seedInstinct)) {
    created.push("instincts/global/ask-before-external.yaml");
  }

  return created;
}

function scaffoldAgentRoles(ws: string, vars: Record<string, string>): string[] {
  const created: string[] = [];
  const roles = ["orchestrator", "coder", "security", "researcher"];

  for (const role of roles) {
    const roleDir = join(ws, "agents", role);
    ensureDir(roleDir);

    const content = renderTemplate(loadTemplate(`agent-${role}.md`), vars);
    if (writeIfMissing(join(roleDir, "SOUL.md"), content)) {
      created.push(`agents/${role}/SOUL.md`);
    }
  }

  return created;
}

function scaffoldCronJobs(config: Required<OperatorKitConfig>): string[] {
  const cronPath = join(homedir(), ".openclaw", "cron", "jobs.json");
  if (existsSync(cronPath)) {
    return []; // don't overwrite existing cron config
  }

  ensureDir(join(homedir(), ".openclaw", "cron"));

  const jobs = {
    version: 1,
    jobs: [
      {
        id: crypto.randomUUID(),
        agentId: "main",
        sessionKey: "agent:main:main",
        name: "Morning Briefing",
        enabled: true,
        createdAtMs: Date.now(),
        updatedAtMs: Date.now(),
        schedule: {
          kind: "cron",
          expr: "0 7 * * *",
          tz: config.timezone,
        },
        sessionTarget: "isolated",
        wakeMode: "now",
        payload: {
          kind: "agentTurn",
          message: "Good morning. Check calendar, email, and project status. Summarize what needs attention today.",
          thinking: "low",
          timeoutSeconds: 90,
        },
        delivery: {
          mode: "announce",
          bestEffort: true,
        },
        state: {
          nextRunAtMs: 0,
          lastRunAtMs: 0,
          lastRunStatus: null,
          consecutiveErrors: 0,
        },
        deleteAfterRun: false,
      },
      {
        id: crypto.randomUUID(),
        agentId: "main",
        sessionKey: "agent:main:main",
        name: "Nightly Rundown",
        enabled: true,
        createdAtMs: Date.now(),
        updatedAtMs: Date.now(),
        schedule: {
          kind: "cron",
          expr: "0 23 * * *",
          tz: config.timezone,
        },
        sessionTarget: "isolated",
        wakeMode: "now",
        payload: {
          kind: "agentTurn",
          message: "End of day. Summarize what was accomplished, flag anything dropped, and preview tomorrow.",
          thinking: "low",
          timeoutSeconds: 90,
        },
        delivery: {
          mode: "announce",
          bestEffort: true,
        },
        state: {
          nextRunAtMs: 0,
          lastRunAtMs: 0,
          lastRunStatus: null,
          consecutiveErrors: 0,
        },
        deleteAfterRun: false,
      },
    ],
  };

  writeFileSync(cronPath, JSON.stringify(jobs, null, 2), "utf-8");
  return ["cron/jobs.json"];
}

export default function operatorKit(api: OpenClawPluginApi) {
  const rawConfig = api.getConfig() as OperatorKitConfig;
  const config: Required<OperatorKitConfig> = { ...DEFAULT_CONFIG, ...rawConfig };

  if (!config.enabled) return;

  const ws = resolve(config.workspacePath);
  ensureDir(ws);

  const vars: Record<string, string> = {
    operatorName: config.operatorName,
    ownerName: config.ownerName,
    workspace: ws,
    timezone: config.timezone,
    date: new Date().toISOString().split("T")[0],
  };

  // Scaffold on first run
  const allCreated: string[] = [];

  // Always scaffold identity
  allCreated.push(...scaffoldIdentity(ws, vars));

  // Memory system
  if (config.enableMemorySystem) {
    allCreated.push(...scaffoldMemory(ws));
  }

  // Instincts
  if (config.enableInstincts) {
    allCreated.push(...scaffoldInstincts(ws));
  }

  // Agent roles
  if (config.enableAgentRoles) {
    allCreated.push(...scaffoldAgentRoles(ws, vars));
  }

  // Cron jobs
  if (config.enableCronJobs) {
    allCreated.push(...scaffoldCronJobs(config));
  }

  if (allCreated.length > 0) {
    api.log?.(`[operator-kit] Scaffolded ${allCreated.length} files for ${config.operatorName}`);
  }

  // Register tools
  api.registerTool({
    name: "operator_scaffold_status",
    description: "Check which operator-kit files exist and which are missing",
    parameters: { type: "object", properties: {}, additionalProperties: false },
    handler: async () => {
      const checks = [
        "SOUL.md", "IDENTITY.md", "AGENTS.md", "TOOLS.md", "USER.md", "HEARTBEAT.md",
        "memory/MEMORY.md",
        "instincts/global",
        "agents/orchestrator/SOUL.md", "agents/coder/SOUL.md",
        "agents/security/SOUL.md", "agents/researcher/SOUL.md",
      ];

      const status = checks.map((f) => ({
        file: f,
        exists: existsSync(join(ws, f)),
      }));

      return JSON.stringify({ workspace: ws, operator: config.operatorName, files: status }, null, 2);
    },
  });

  api.registerTool({
    name: "operator_create_instinct",
    description: "Create a new instinct (learned behavior pattern) for the operator",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "kebab-case identifier" },
        domain: { type: "string", enum: ["config", "coding", "security", "orchestration", "communication", "infra"] },
        trigger: { type: "string", description: "When this instinct applies" },
        action: { type: "string", description: "What to do" },
        rationale: { type: "string", description: "Why this matters" },
        confidence: { type: "number", minimum: 0.3, maximum: 0.9, description: "Confidence level (0.3 weak → 0.9 proven)" },
      },
      required: ["id", "domain", "trigger", "action", "rationale"],
      additionalProperties: false,
    },
    handler: async (params: Record<string, unknown>) => {
      const today = new Date().toISOString().split("T")[0];
      const instinct = `id: ${params.id}
created: ${today}
updated: ${today}
confidence: ${params.confidence ?? 0.5}
domain: ${params.domain}
trigger: "${params.trigger}"
evidence_count: 0
action: |
  ${(params.action as string).split("\n").join("\n  ")}
rationale: |
  ${(params.rationale as string).split("\n").join("\n  ")}
evidence: []
`;
      const path = join(ws, "instincts", "global", `${params.id}.yaml`);
      ensureDir(join(ws, "instincts", "global"));
      writeFileSync(path, instinct, "utf-8");
      return JSON.stringify({ created: path });
    },
  });

  api.registerTool({
    name: "operator_memory_ref",
    description: "Create or update an evergreen reference memory file",
    parameters: {
      type: "object",
      properties: {
        topic: { type: "string", description: "Topic slug (becomes ref-<topic>.md)" },
        content: { type: "string", description: "Memory content (markdown)" },
      },
      required: ["topic", "content"],
      additionalProperties: false,
    },
    handler: async (params: Record<string, unknown>) => {
      const memDir = join(ws, "memory");
      ensureDir(memDir);
      const path = join(memDir, `ref-${params.topic}.md`);
      writeFileSync(path, params.content as string, "utf-8");
      return JSON.stringify({ written: path });
    },
  });
}
