import React from "react";

function Item({ item, onUpdateItem, onDelete }) {
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
    .then(res => res.json())
    .then(data => onUpdateItem(data))
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => onDelete(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">Delete</button>
    </li>
  );
}

export default Item;
