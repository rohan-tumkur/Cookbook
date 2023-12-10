import React from 'react';
import { useLocation } from 'react-router-dom';

// styles
import './Search.css';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';

export default function Search() {
  const queryParams = new URLSearchParams(useLocation().search);
  const query = queryParams.get('q');

  const { data: recipes, isPending, error } = useFetch(`http://localhost:3000/recipes?q=${query}`);

  return (
    <div>
      <h3 className='page-title'>Recipes including "{query}"</h3>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipes && <RecipeList recipes = {recipes} />}
    </div>
  )
}
