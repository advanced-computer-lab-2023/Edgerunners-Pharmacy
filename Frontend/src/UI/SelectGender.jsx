import React, { useState } from 'react';
import RadioButton from './RadioButton';

const SelectGender = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (id) => {
    setSelectedOption(id);
  };

  const radioOptions = [
    { id: 1, label: 'female' }, { id: 2, label: 'Male' },
  ];

  return (
    <div className="container mx-auto  mt-4 flex  mr-5">

      {radioOptions.map((option) => (
        <RadioButton
          key={option.id}
          id={option.id}
          label={option.label}
          selected={selectedOption === option.id}
          onChange={handleOptionChange}
        />
      ))}
    </div>
  );
};

export default SelectGender;


// import React from 'react';
// const SelectGender = (props) =>
//   <select {...props} class="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
//     <option>Select gender</option>
//     <option value="Male">Male</option>
//     <option value="Female">Female</option>
//   </select>
// export default SelectGender;