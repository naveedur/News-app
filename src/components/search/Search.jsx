import React from 'react'
import { FaSearch } from "react-icons/fa";
import './search.css'

const Search = ({handleSearch}) => {
  return (
    <div className="col-6 searchField">
    <input type="text"
    
    onChange={(e)=>handleSearch(e.target.value)} />
    <span className="px-4"><FaSearch size={'20'}/></span>
  </div>
  )
}

export default Search