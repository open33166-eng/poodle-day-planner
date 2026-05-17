import assert from 'node:assert/strict';
import { once } from 'node:events';

import { createDevServer } from './dev-server.mjs';

const server = createDevServer();
server.listen(0, '127.0.0.1');
await once(server, 'listening');

const { port } = server.address();

try {
  const home = await fetch(`http://127.0.0.1:${port}/`);
  const html = await home.text();
  assert.equal(home.status, 200);
  assert.ok(html.includes('Poodle Day Planner'));

  const app = await fetch(`http://127.0.0.1:${port}/src/game/app.mjs`);
  assert.equal(app.status, 200);

  const styles = await fetch(`http://127.0.0.1:${port}/styles.css`);
  assert.equal(styles.status, 200);
} finally {
  server.close();
}
