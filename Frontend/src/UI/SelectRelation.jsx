import React from 'react';
const SelectRelation = (props) =>
    <select {...props} class="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option>Select Relation</option>
        <option value="Spouse">Spouse</option>
        <option value="Sibling">Sibling</option>
        <option value="Child">Child</option>
        <option value="Friend">Friend</option>
        <option value="Other">Other</option>
    </select>
export default SelectRelation;