import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const port = Number(process.env.PORT ?? 4173);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

export function createDevServer({ rootDirectory = root } = {}) {
  return createServer((request, response) => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
    const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
    const filePath = normalize(join(rootDirectory, requestedPath));

    if (!filePath.startsWith(rootDirectory) || !existsSync(filePath)) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'content-type': types[extname(filePath)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    });
    createReadStream(filePath).pipe(response);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createDevServer().listen(port, () => {
    console.log(`Poodle Day Planner prototype: http://localhost:${port}`);
  });
}
