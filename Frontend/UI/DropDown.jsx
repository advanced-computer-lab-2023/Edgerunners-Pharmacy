import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('option1'); // Default selected option

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="mt-4">
      <label className="text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2 block" htmlFor="dropdown">
        Select an option:
      </label>
      <select
        id="dropdown"
        className="appearance-none border rounded w-64 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="Wife/Husband">Wife/Husband</option>
        <option value="Child">Child</option>
      
      </select>
    
    </div>
  );
}
export default Dropdown;

