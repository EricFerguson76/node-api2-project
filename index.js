const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Blog Posts<h2>`);
});

server.listen(5000, () => {
  console.log('/n*** Server Running on port 5000 ***\n');
});
