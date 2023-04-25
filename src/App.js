import { useState, useEffect } from 'react';
import './App.css';

const newFoodStartValue = {
  name: '',
  description: '',
  price: '',
  imgSrc: '',
}

function App() {
  const [newFoodValue, setNewFoodValue] = useState(newFoodStartValue)
  const [Foods, setFoods] = useState([])

  const getAllFoods = () => {

    fetch('http://localhost:3004/foods')
    .then((response) => response.json())
    .then((allFoods) => {
      setFoods(allFoods)
    })
  }

  useEffect(() => {
    getAllFoods()
  }, [])

  return (
    <div className='menu'>
      <form 
        className="menu__form" 
        onSubmit={(eventObject) => {
          
          eventObject.preventDefault()

          fetch('http://localhost:3004/foods', { 
            
            method: 'POST',
             
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(newFoodValue)
          })
          .then((response) => response.json())
          .then((addedFood) => {
           
            setFoods([
              ...Foods,
              addedFood
            ])
          })

          setNewFoodValue(newFoodStartValue)
        }}
      >
        <h1>AUSINQUE le TER <br/> Menu</h1>

        <label className='menu__label'>
          Food name <br />
          <input 
            type="text" 
            placeholder='Your mom...' 
            className='menu__input'
            value={newFoodValue.name}
            
            onChange={(eventObject) => {
             
              
              const updatedNewFoodValue = {
                ...newFoodValue,
                name: eventObject.target.value
              }

              setNewFoodValue(updatedNewFoodValue)
            }}
            required="required"
          />
        </label>

        <label className='menu__label'>
          Description <br />
          <input 
            type="text" 
            placeholder='...' 
            className='menu__input'
            value={newFoodValue.description}
            onChange={(eventObject) => {
              const updatedNewFoodValue = {
                ...newFoodValue,
                description: eventObject.target.value
              }

              setNewFoodValue(updatedNewFoodValue)
            }}
            required="required"
          />
        </label>

        <label className='menu__label'>
          Price € <br />
          <input 
            type="number" 
            placeholder='...' 
            className='menu__input'
            value={newFoodValue.price}
            onChange={(eventObject) => {
              const updatedNewFoodValue = {
                ...newFoodValue,
                price: eventObject.target.value
              }

              setNewFoodValue(updatedNewFoodValue)
            }}
            required="required"
          />
        </label>

        <label className='menu__label'>
          Food Image <br />
          <input 
            type="text" 
            placeholder='https://linktofood..' 
            className='menu__input'
            value={newFoodValue.imgSrc}
            onChange={(eventObject) => {
              const updatedNewFoodValue = {
                ...newFoodValue,
                imgSrc: eventObject.target.value
              }
        

              setNewFoodValue(updatedNewFoodValue)
            }}
            required="required"
          />
        </label>

        <button className='menu__button' type='submit'>
            Add Food
        </button>
      </form>

      <div className="menu__foods">
        {Foods.map((food, index) => {

          return (
            <div key={Math.random()} className="menu__food">
              <img 
                src="https://img.icons8.com/ios/512/x.png" 
                alt="delete"
                className='menu__food-delete'
                onClick={() => {
                  
                  fetch(`http://localhost:3004/foods/${food.id}`, {method: "DELETE"})
                  .then((response) => response.json())
                  .then((deletedFood) => {
                    
                    const updatedFood = Foods.filter((currentFood) => {
                        return currentFood.id !== food.id
                    })

                    console.log('updatedFood', updatedFood);
                    
                    setFoods(updatedFood)
                  })
                }}
              />
                <img 
                src={food.imgSrc}
                alt=""
                className='menu__food-image'
                />
                <div className='menu__food-content'>
                  <span className='menu__food-name'>
                    {food.name}
                  </span>
                  <span className='menu__food-description'>
                    {food.description}
                  </span>
                  <span className='menu__food-price'>
                    {food.price}€
                  </span>
                </div>
            </div>
          )
        })}
        
        {}
        {Foods.length === 0 && <h1>The menu is waiting for your input :)</h1>}
      </div>
    </div>
  );
}

export default App;