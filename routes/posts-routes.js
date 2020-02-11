const express = require('express');

const posts = require('../data/db.js');

const router = express.Router();

//POST
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide title and contents for the post' });
  } else {
    posts
      .insert(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(() => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

//POST with /:id/comments
router.post('/:id/cpmments', (req, res) => {
  const { id } = req.params;
  const commentData = req.body;

  if (!id) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist' });
  } else if (!commentData) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide text for the comment' });
  } else {
    posts
      .insertComment(commentData)
      .then(comment => {
        res.status(200).json(comment);
      })
      .catch(() => {
        res
          .status(500)
          .json({
            error: 'There was an error while saving the comment to the database'
          });
      });
  }
});

module.exports = router;
