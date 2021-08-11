import React, {useState, useEffect} from 'react';
import './App.css';

const API_BASE = "http://localhost:8080"

function App() {

  const [foodName, setfoodName] = useState("");
  const [daysFasting, setdaysFasting] = useState(0);
  const [updatedName, setupdatedName] = useState("");

  const [allFood, setallFood] = useState([]);

  useEffect(() => {
    getFood();
  }, [])

  const getFood = () => {
    const foods = fetch(API_BASE + "/food")
                    .then(res => res.json())
                    .then(data => setallFood(data))

    console.log(foods)
  }

  const makeFood = async () => {
    const newFood = await fetch(API_BASE + "/makeFood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        foodName: foodName,
        daysFasting: daysFasting,
      })
    })
      .then(res => res.json())
    
    setallFood([...allFood, newFood])
    console.log(newFood);
  }

  const updateFood = async (id) => {
    const updateFood = await fetch(API_BASE + "/updateFood/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        foodName: updatedName,
      })
    })
      .then(res => res.json())

    console.log(updateFood);
    setallFood(prev => prev.map(item => {
      if (item._id === updateFood._id) {
        item.foodName = updateFood.foodName;
      }

      return item;
    }))
    setupdatedName("");
  }

  const deleteFood = async (id) => {
    const food = await fetch(API_BASE + '/deleteFood/' + id, {
      method: "DELETE"
    })
      .then(res => res.json())

    setallFood(prev => prev.filter(item => item._id !== food._id))

    console.log(food);
  }


  return (
    <div className="App">

      <h1>
        CRUD App with MERNstack
      </h1>

      <label>Food Name:</label>
      <input type="text" onChange={(e) => setfoodName(e.target.value)}/>

      <label>Days Fasting:</label>
      <input type="number" onChange={(e) => setdaysFasting(e.target.value)}/>

      <button onClick={() => {makeFood()
                              getFood()}}>Add to List</button>

      <h1>
        List of Foods
      </h1>

      {allFood.map((food, key) => {

        return (
        
        <div className="items" key={key}>
          <p></p>
          {`${food.foodName} was eaten ${food.daysFasting} days ago!`}

          <p></p>
          <input type="text" placeholder="Change food Name..." onChange={(e) => setupdatedName(e.target.value)}/>
          
          <button onClick={() => {updateFood(food._id); getFood();}}>Submit Update</button>
          <p></p>
          <button onClick={() => {deleteFood(food._id); getFood();}}>Delete Item</button>

        </div>
        

        )

      })}

    </div>
  );
}

export default App;
