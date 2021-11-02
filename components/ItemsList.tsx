import React from 'react';
import { items } from '../data/items';

export const ItemsList = () => {
  return (
    <div className="container mx-auto">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.id} className="shadow rounded">
          <img className="shadow-sm" src={item.imageUrl} />
          <div>
            <p className="text-sm text-blue-400">{item.category}</p>
            <p className="text-lg">{item.title}</p>
            <p className="text-gray-500">{item.description}</p>
            <a href={item.url} className="flex hover:text-blue-600">
              {item.url.replace(/(^\w+:|^)\/\//, '')}
              Link
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};