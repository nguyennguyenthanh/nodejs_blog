const express = require('express');
const router = express.Router();

const posterController = require('../app/controllers/PostController');
//slug là sockpass
router.get('/create', posterController.create);
router.post('/store', posterController.store);
router.get('/:id/edit', posterController.edit);
//để đây vì sợ nó hiểu nhầm handle-form-actions là /:id
router.post('/handle-form-actions', posterController.handleFormActions);
router.put('/:id', posterController.update);
router.patch('/:id/restore', posterController.restore);
router.delete('/:id', posterController.destroy);
router.delete('/:id/force', posterController.forceDestroy);
router.get('/:slug', posterController.show);

module.exports = router;