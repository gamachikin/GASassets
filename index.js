import express from 'express';
import http from 'node:http';
import { createBareServer } from "@tomphttp/bare-server-node";
import path from 'node:path';
import cors from 'cors';

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer('/bare/');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/apps', file: 'apps.html' },
  { path: '/games', file: 'games.html' },
  { path: '/chat', file: 'chat.html' },
  { path: '/settings', file: 'settings.html' },
  { path: '/canvas', file: 'canvas.html' },
];

app.get('/edu/*', cors({ origin: false }), async (req, res, next) => {
  try {
    const reqTarget = `https://raw.githubusercontent.com/ypxa/y/main/${req.params[0]}`;
    const asset = await fetch(reqTarget);
    
    if (asset.ok) {
      const data = await asset.arrayBuffer();
      res.end(Buffer.from(data));
    } else {
      next();
    }
  } catch (error) {
    console.error('Error fetching:', error);
    next(error);
  }
});

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', route.file));
  });
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'static', '404.html'));
});

server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on('listening', () => {
  console.log(`Running at http://localhost:${PORT}`);
});

server.listen({
  port: PORT,
});
