// PostToolUse hook: formats the file Claude just edited with Prettier, using the project's config.
// It never fails the edit: problems are reported on stderr and the hook exits 0.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd, env, stdin } from 'node:process';
import * as prettier from 'prettier';

const projectDir = env.CLAUDE_PROJECT_DIR ?? cwd();

async function readInput() {
  let raw = '';
  for await (const chunk of stdin) raw += String(chunk);
  return /** @type {{ tool_input?: { file_path?: unknown } }} */ (JSON.parse(raw));
}

try {
  const filePath = (await readInput()).tool_input?.file_path;
  if (typeof filePath === 'string') {
    const info = await prettier.getFileInfo(filePath, { ignorePath: join(projectDir, '.prettierignore') });
    if (!info.ignored && info.inferredParser !== null) {
      const options = (await prettier.resolveConfig(filePath)) ?? {};
      const source = await readFile(filePath, 'utf8');
      const formatted = await prettier.format(source, { ...options, filepath: filePath });
      if (formatted !== source) await writeFile(filePath, formatted, 'utf8');
    }
  }
} catch (error) {
  process.stderr.write(`format-on-edit: ${error instanceof Error ? error.message : String(error)}\n`);
}
