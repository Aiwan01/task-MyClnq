const ItemModel = require('../models/items.model');

class ItemController {
  
  async createItem(req, res) {
    try {
      const newItem = await ItemModel.create(req.body);
      return res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Error creating item' });
    }
  }

  async getItemsById (req, res) {
    try {
      const id = req.params.id;
      if(!id){
        return res.status(404).json({ message: 'Please provide valid id' });
      }
      const itemList = await ItemModel.findById(id);
      
      if(itemList == 404) {
        return res.status(404).json({ data : itemList, message: 'No record found.' });
      }
       return res.status(201).json({data : itemList, message: 'Here`s your data'});
    } catch (error) {
       res.status(500).json({data : {}, error: 'Error reading item' });
    }
  }

  async getAllItems(req, res) {
    try {
      const items = await ItemModel.findAll();
      if(!items.length) {
        return res.status(404).json({ data :res.json(items), message: 'No data found' });
      }
      return res.status(200).json({ data :items, message: 'All items list' });
    } catch (error) {
      return res.status(500).json({ data : {}, message: 'Error reading items' });
    }
  }

  async updateItem(req, res) {
    try {
      const id = req.params.id;
      if(!id){
        return res.status(404).json({ message: 'Please provide valid id' });
      }
      let body = req.body
      body.id = id
      const newItem = await ItemModel.updateById(id, body);
      return res.status(200).json({ message: 'Data updated successfully' });

    } catch (error) {
      res.status(500).json({ message: 'Error updating item' });
    }
  }


  async deleteItemById(req, res) {
    try {
      const id = req.params.id;
      if(!id){
        return res.status(404).json({ message: 'Please provide valid id' });
      }
      const itemStatus = await ItemModel.deleteById(id);
       if(itemStatus == 404){
        return res.status(404).json({message : 'Id not found for delete'});
      }
      return res.status(201).json({message : 'Data deleted successfully'});
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item' });
    }
  }

}

module.exports = new ItemController();