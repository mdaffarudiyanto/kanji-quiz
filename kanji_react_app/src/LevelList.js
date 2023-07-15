import React from 'react';
import { Link } from 'react-router-dom';
import './LevelList.css';

const LevelListItem = ({ text, id }) => {
  return (
    <li>
      <Link to={`/item/${id}`}>{text}</Link>
    </li>
  );
};

const LevelList = () => {
  const items = [
    { id: 1, text: 'N5' },
    { id: 2, text: 'N4' },
    { id: 3, text: 'N3' },
    { id: 4, text: 'N2' },
    { id: 5, text: 'N1' },
  ];

  return (
    <div>
      <h1>Level List</h1>
      <ul className="level-list">
        {items.map((item) => (
          <LevelListItem key={item.id} id={item.id} text={item.text} />
        ))}
      </ul>
    </div>
  );
};

export default LevelList;
