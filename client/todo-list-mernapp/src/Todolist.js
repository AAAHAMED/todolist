import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');
  

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5500/api/item', { item: itemText });
      setListItems(prev => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/item');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newListItem = listItems.filter(item => item._id !== id);
      setListItems(newListItem);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, { item: updateItemText });
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex];
      updatedItem.item = updateItemText;
      setListItems([...listItems.slice(0, updatedItemIndex), updatedItem, ...listItems.slice(updatedItemIndex + 1)]);
      setUpdateItemText('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  };

  const renderUpdateForm = () => (
    <form className='update-form' onSubmit={(e) => updateItem(e)}>
      <input className='update-new-input' type='text' placeholder='New Item' onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
      <button className="update-new-btn" type='submit'>Update</button>
    </form>
  );



  return (
    <>
      <h1>TodoList</h1>
      <form className='form' onSubmit={(e) => addItem(e)}>
        <input type="text" placeholder='Add' onChange={(e) => setItemText(e.target.value)} value={itemText} />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item, index) => (
          <div key={index} className="todo-item">
            {
              isUpdating === item._id
                ? renderUpdateForm()
                : <>
                <form className='item'>
                  <p className="item-content">{item.item}</p></form>
                  <button className="update-item" onClick={() => { setIsUpdating(item._id) }}>Update</button>
                  <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                 
                  
                </>
            }
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoList;
