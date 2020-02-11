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

//POST  /:id/comments
router.post('/:id/comments', (req, res) => {
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
        res.status(500).json({
          error: 'There was an error while saving the comment to the database'
        });
      });
  }
});

//GET
router.get('/', (req, res) => {
  posts
    .find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved' });
    });
});

//GET  /api/posts/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  posts
    .findById(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

//GET /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;

  posts
    .findPostComments(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The comments information could not be retrieved.' });
    });
});

//DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  posts
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

//PUT
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    posts
      .update(req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(() => {
        res.status(500).json({
          error: 'The post information could not be modified'
        });
      });
  }
});

module.exports = router;
