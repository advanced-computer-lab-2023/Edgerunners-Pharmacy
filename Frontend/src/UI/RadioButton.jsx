import React, { useState } from 'react';

const RadioButton = ({ id, label, selected, onChange }) => {
  return (
    <div className="flex items-center  text-gray-500 text-lg mr-3">
      <input
        type="radio"
        id={id}
        className="form-radio text-green-500 h-5 w-5"
        checked={selected}
        onChange={() => onChange(id)}
      />
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;