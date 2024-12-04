const express = require('express');
const apiRouter = express.Router();

const  itemController  = require('../controllers/taskController.js');
const   validateInput   = require('../middleware/validators.js');

 
apiRouter.post('/tasks', validateInput, itemController.createItem);
apiRouter.get('/tasks', itemController.getAllItems);
apiRouter.get('/tasks/:id', itemController.getItemsById);
apiRouter.put('/tasks/:id', validateInput, itemController.updateItem);
apiRouter.delete('/tasks/:id', itemController.deleteItemById);

module.exports = apiRouter;
