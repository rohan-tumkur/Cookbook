import React from 'react'
import {Link} from 'react-router-dom'
import Searchbar from './Searchbar';

// styles
import './Navbar.css';

export default function Navbar() {
  return (
    <div className = 'navbar'>
        <nav>
            <Link exact to = '/' className = 'brand'>
                <h1>Cookbook</h1>
            </Link>
            <Searchbar/>
            <Link to = '/create' >
                Create Recipe
            </Link>
        </nav>
    </div>
  )
}
