import React, { useState } from "react";
const RIDE_CATEGORIES = [
  {
    name: "Nearest Rides",
    active: true,
    items: null,
  },
  {
    name: "Upcoming Rides",
    active: false,
    items: 4,
  },
  {
    name: "Past Rides",
    active: false,
    items: 0,
  },
];

const UseCategory = () => {
  const [categories, setCategories] = useState(RIDE_CATEGORIES);

  const setActiveCategory = (name) => {
    let _categories = categories.map((category) => {
      return {
        ...category,
        active: false,
      };
    });

    for (let i = 0; i < _categories.length; i++) {
      if (_categories[i].name === name) {
        _categories[i].active = true;
      }
    }
    setCategories(_categories);
  };

  return [categories, setActiveCategory];
};

export default UseCategory;
