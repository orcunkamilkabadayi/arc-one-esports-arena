import handler from '../dist/server/index.js';

export default async function vercelHandler(request, response) {
  // Do not build an application URL from arbitrary Host or forwarded headers.
  // The page does not need a user-controlled origin, so use the canonical site
  // origin and keep localhost available for local development only.
  const host = request.headers.host || '';
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const origin = isLocal ? 'http://' + host : 'https://esporakademisi.com';
  const rawPath = request.url || '/';
  const parsedPath = rawPath.startsWith('/') ? null : new URL(rawPath);
  const path = parsedPath ? parsedPath.pathname + parsedPath.search : rawPath;
  const url = new URL(path, origin);
  const method = request.method || 'GET';
  const headers = new Headers();

  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      headers.set(key, value.join(', '));
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const body = method === 'GET' || method === 'HEAD' ? undefined : request;
  const webRequest = new Request(url, { method, headers, body, duplex: body ? 'half' : undefined });
  const webResponse = await handler.fetch(webRequest, {}, {});

  response.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => response.setHeader(key, value));
  response.end(Buffer.from(await webResponse.arrayBuffer()));
}
