import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
// import { json } from "msw/lib/types/context";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(res => res.json())
    .then(data => setItems(data))
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleNewItem(newItem) {
    setItems([...items, newItem])
  }

  function handleUpdatedItem(updatedItem) {
    const itemsArray = items.map(item => item.id === updatedItem.id ? updatedItem : item)
    setItems(itemsArray)
  }

  function handleDeletedItem(deletedItem) {
    const itemsArray = items.filter(item => item.id !== deletedItem.id)
    setItems(itemsArray)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleNewItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdatedItem} onDelete={handleDeletedItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
