const express = require('express');

const postsRouter = require('../routes/posts-routes');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Blog Posts<h2>`);
});

server.use('/api/posts', postsRouter);

module.exports = server;
