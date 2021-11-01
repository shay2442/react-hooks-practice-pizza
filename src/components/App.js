import React from "react";
import { useEffect, useState } from 'react'
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] =  useState({})
 
useEffect(() => {
  fetch('http://localhost:3001/pizzas')
  .then(r => r.json())
  .then(data => setPizzas(data))
},[])

const selectPizza = (pizzaObj) => {
  setSelectedPizza(pizzaObj)
}

const handlePizzaChange = (pizzaObj) => {
  fetch(`http://localhost:3001/pizzas/${pizzaObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pizzaObj)
  }).then(r => r.json())
  .then(_ => {const updatedPizzaList = [...pizzas].map(pizza => {
    if(pizza.id === pizzaObj.id) {
      return pizzaObj
    }else {
      return pizza
    }
  })

  setPizzas(updatedPizzaList)


  })

}



  return (
    <>
      <Header />
      <PizzaForm selectedPizza={selectedPizza} handlePizzaChange={handlePizzaChange}/>
      <PizzaList pizzas={pizzas} selectPizza={selectPizza}/>
    </>
  );
}

export default App;
