import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Set this to true if you want to do local development.
// Setting this to true will cause this proxy service to forward requests to localhost:1234
// instead of a hosted feed service.
const useDevServer = false;

const app = express();
const port = 3000;

app.use(
  '/gw/feed',
  createProxyMiddleware({
    target: 'YOUR_FEED_URL_HERE',
    changeOrigin: true,
    pathRewrite: {
      '^/gw/feed': '',
    },
    logLevel: 'debug',
  }),
);

app.use(
  '/gw/pokeapi',
  createProxyMiddleware({
    target: 'https://pokeapi.co',
    changeOrigin: true,
    pathRewrite: {
      '^/gw/pokeapi': '',
    },
    logLevel: 'debug',
  }),
);

app.use(
  '/gw/portal',
  createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: {
      '^/gw/portal': '',
    },
    logLevel: 'debug',
  }),
);

app.use(
  '/gw/assets',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    pathRewrite: {
      '^/gw/assets': '',
    },
    logLevel: 'debug',
  }),
);

app.use(
  '/',
  createProxyMiddleware({
    target: useDevServer ? 'http://localhost:1234' : 'YOUR_FEED_URL_HERE/_/pimon-portal',
    pathRewrite: {
      '^/_/pimon-portal': '',
    },
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
  }),
);

app.listen(port, () => {
  console.log(`Proxy Service listening on port ${port}.`);
});
