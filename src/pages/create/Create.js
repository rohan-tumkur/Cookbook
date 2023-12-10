import React, { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { useHistory } from 'react-router-dom';

//styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const {data, error, postData} = useFetch('http://localhost:3000/recipes', 'POST')
 
  const handleSubmit = (e) => {
    e.preventDefault();
    postData({title: title, method: method, ingredients: ingredients, cookingTime: cookingTime + 'minutes'});
  }

  useEffect(() => {
    if (data) {
      history.push('/');
    }
  }, [data]);

  const handleClick = (e) => {
    e.preventDefault()
    let ing = newIngredient.trim().toLowerCase();
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing]);
    }
    setNewIngredient('');
  }
  
  return (
    <div className = 'create'>
      <h2 className = 'page-title'>Add a New Recipe</h2>
      <form onSubmit = {handleSubmit} method = 'post'>
        <label htmlFor = 'recipe-title'>Recipe Title</label>
        <input 
          type = 'text' 
          onChange = {(e) => setTitle(e.target.value)}
          value = {title}
          required
        />
        
        <label htmlFor = 'recipe-ingredients'>Ingredients:</label>
        <div className = 'ingredients'>
          <input 
            type = 'text'
            onChange = {(e) => {setNewIngredient(e.target.value)}}
            value = {newIngredient}
            ref = {ingredientInput}
          />
          
          <button  id = 'btn' className = 'button' onClick = {handleClick}>Add</button>
        </div>
        <p>Current Ingredients:{' '}
        {ingredients.map((ingredient, index) => {
          if (index === ingredients.length - 1){
            return (<span key = {ingredient}>{ingredient}</span>)
          }
          return (<span key = {ingredient}>{ingredient}, </span>)
        })}
        </p>
        <label htmlFor = 'recipe-method'>Recipe Method</label>
        <textarea
          onChange = {(e) => setMethod(e.target.value)}
          value = {method}
          required
        />
        <label htmlFor = 'cooking-time'>Cooking Time</label>
        <input 
          type = 'number'
          onChange = {(e) => setCookingTime(e.target.value)}
          value = {cookingTime}
          required
        />
        <button className = 'button'>Submit</button>
      </form>
    </div>
  )
}
