const fs = require('fs').promises;
const path = require('path');

const dataFile = path.join(__dirname, '../../data/items.json');

class ItemModel {
  async initializeDataFile() {
    try {
      await fs.access(dataFile);
    } catch {
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(dataFile, JSON.stringify([]));
    }
  }

  async findAll() {
    const data = await fs.readFile(dataFile, 'utf8');
    const result = JSON.parse(data);
    return result
  }

  async create(itemData) {
    const items = await this.findAll();
    const newItem = {
      id: Date.now().toString(),
      ...itemData
    };
    items.push(newItem);
    await fs.writeFile(dataFile, JSON.stringify(items, null, 2));
    return newItem;
  }

  async findById(id) {

    const data = await fs.readFile(dataFile, 'utf8');
    const taskData = JSON.parse(data)
    if(!taskData.length){
      return 404
    }
    const filteredRecord = taskData.find(item => item.id === id);
    
    return filteredRecord ? filteredRecord : 404;
  }

  async updateById(id, newData) {
    let result = []
    const datas = await fs.readFile(dataFile, 'utf8');
    const taskData = JSON.parse(datas)
    if(!taskData.length){
      return result
    }
    
    taskData.forEach(data => {
       if(data.id == id){
        result.push(newData)
      }else{
        result.push(data)
      }
    });
    const modifiedData = JSON.stringify(result);
    await fs.writeFile(dataFile, modifiedData, 'utf8');
    return result;
  }

  async deleteById(id) {
    let updateData = []
    const data = await fs.readFile(dataFile, 'utf8');
    const taskData = JSON.parse(data)
    if(!taskData.length){
      return 404
    }
    const checkItem = taskData.find(item => item.id === id);
    if(!checkItem){
      return 404
    }

    taskData.forEach(data => {
      if(data.id != id){
        updateData.push(data)
      }
    });
    const modifiedData = JSON.stringify(updateData);

    // Write the modified data back to the file
    await fs.writeFile(dataFile, modifiedData, 'utf8');

    
    return 200;
  }


}

module.exports = new ItemModel();