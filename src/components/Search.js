import React from 'react'

const Search = ({handleSearch}) => {
  return (
    
        <div className="input-group input-group-lg w-60%" style={{ width: '60%' }}>
        
        <input type="text"  onChange={(e)=>handleSearch(e.target.value)} className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
      </div>
  )
}

export default Search