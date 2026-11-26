// PreToolUse hook: blocks Claude from reading or editing environment files and private keys.
// Claude Code sends the tool call as JSON on stdin. Exit code 2 blocks the call and shows stderr to Claude.
import { basename } from 'node:path';
import { stdin } from 'node:process';

const ALLOWED_ENV_FILES = new Set(['.env.example']);
const KEY_FILE = /\.(pem|key|p12|pfx)$|^id_(rsa|ecdsa|ed25519)/i;

/** @param {string} filePath */
function isSecretPath(filePath) {
  const name = basename(filePath.replaceAll('\\', '/'));
  if (ALLOWED_ENV_FILES.has(name)) return false;
  return name === '.env' || name.startsWith('.env.') || KEY_FILE.test(name);
}

/**
 * Finds secret file names inside a shell command. `.env` must start a path segment, so code such as
 * `process.env.PORT` is not matched.
 * @param {string} command
 */
function secretFilesInCommand(command) {
  const candidates =
    command.match(
      /(?<=^|[\s'"=/\\])[\w.-]*\.(?:env(?:\.[\w.-]+)?|pem|key|p12|pfx)(?=$|[\s'";|&)<>])|id_(?:rsa|ecdsa|ed25519)\S*/g,
    ) ?? [];
  return candidates.filter((candidate) => isSecretPath(candidate));
}

async function readInput() {
  let raw = '';
  for await (const chunk of stdin) raw += String(chunk);
  return /** @type {{ tool_name?: string, tool_input?: Record<string, unknown> }} */ (JSON.parse(raw));
}

const { tool_name: toolName = '', tool_input: toolInput = {} } = await readInput();

/** @type {string[]} */
const blocked = [];

if (toolName === 'Bash' && typeof toolInput.command === 'string') {
  blocked.push(...secretFilesInCommand(toolInput.command));
} else {
  for (const key of ['file_path', 'path', 'notebook_path']) {
    const value = toolInput[key];
    if (typeof value === 'string' && isSecretPath(value)) blocked.push(value);
  }
}

if (blocked.length > 0) {
  process.stderr.write(
    `Blocked by .claude/hooks/protect-secrets.mjs: ${blocked.join(', ')} may contain secrets. ` +
      'Do not read or edit environment files or keys. Use .env.example for variable names, ' +
      'and ask the user to set real values themselves.\n',
  );
  process.exit(2);
}
