import { useState } from 'react';
import SearchIcon from '../assets/Search.png';

function SearchBar() {
  const [searchValue, setSearchValue] = useState(''); 

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
  }

  return (
    <form className="flex justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1" onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Search" 
        className="flex-1 bg-transparent outline-none " 
        value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)} 
      />
      <button className="cursor-pointer">
        <img src={SearchIcon} alt='' width={16} height={16} />
      </button>
    </form>
  )
}

export default SearchBar;
