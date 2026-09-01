import express from 'express';
import { config } from 'dotenv';
import { resolve } from 'node:path';
import { createProxyMiddleware } from 'http-proxy-middleware';

config({ path: resolve(__dirname, '../../../../.env') });

const feedServiceUrl = process.env.FEED_SERVICE_URL;

const app = express();
const port = 3000;

app.use(
  '/gw/feed',
  createProxyMiddleware({
    target: feedServiceUrl,
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
    target: `${feedServiceUrl}/_/pimon-portal`,
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
