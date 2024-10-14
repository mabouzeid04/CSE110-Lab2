import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constant";
import { useParams } from "react-router-dom";

export function ToDoList() {
 const [numRemainingItems, setNumRemainingItems] = useState(0);
 const { name } = useParams();

 let [items, setItems] = useState(dummyGroceryList);

 function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
   const checkbox: HTMLInputElement = e.target as HTMLInputElement;

   const item_name = checkbox.name;

   const itemIdx = items.findIndex((item) => item.name === item_name);
   items[itemIdx] = { name: item_name, isPurchased: checkbox.checked };

   //finish
   const uncheckedItems = items.filter((item) => !item.isPurchased);
   const checkedItems = items.filter((item) => item.isPurchased);

   const new_items = uncheckedItems.concat(checkedItems);

   setItems(new_items);

   // check
   const diff = checkbox.checked ? 1 : -1;
   if(checkbox.checked) {
    setNumRemainingItems(numRemainingItems + 1);
   }
   else{
    setNumRemainingItems(Math.max(0, numRemainingItems - 1));
   }

   
 }

 return (
    
   <div className="App">
    <h1>{name}'s To Do List</h1>
     <div className="App-body">
       Items bought: {numRemainingItems}
       <form action=".">
        {items.map((item) => (
            <ListItem key={item.name} item={item} changeHandler={handleCheckboxClick} />
        ))}
       </form>
     </div>
   </div>
 );
}

function ListItem({item, changeHandler}: {item: GroceryItem, changeHandler: ChangeEventHandler}) {
 return (
   <div>
    <label>
        <input
        type="checkbox"
        onChange={changeHandler}
        checked={item.isPurchased}
        name={item.name}
        />
        {item.name}
    </label>
   </div>
 );
}