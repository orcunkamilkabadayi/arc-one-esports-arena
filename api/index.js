import handler from '../dist/server/index.js';

export default async function vercelHandler(request, response) {
  const protocol = request.headers['x-forwarded-proto'] || 'https';
  const host = request.headers.host || 'localhost';
  const url = new URL(request.url || '/', `${protocol}://${host}`);
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
