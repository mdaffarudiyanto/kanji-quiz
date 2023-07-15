import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
  const { id } = useParams();

  //Right now, showing ID as placeholder
  return (
    <div>
      <h2>Item Details</h2>
      <p>Item ID: {id}</p>
    </div>
  );
};

export default ItemDetails;
