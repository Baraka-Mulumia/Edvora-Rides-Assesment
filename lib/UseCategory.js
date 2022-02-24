import { useState } from "react";
const RIDE_CATEGORIES = [
  {
    name: "Nearest Rides",
    active: true,
    hasCount: false,
  },
  {
    name: "Upcoming Rides",
    active: false,
    hasCount: true,
  },
  {
    name: "Past Rides",
    active: false,
    hasCount: true,
  },
];

const UseCategory = () => {
  const [categories, setCategories] = useState(RIDE_CATEGORIES);

  const setActiveCategory = (name) => {
    setCategories((previous) => {
      let categories = previous.map((category) => {
        if (category.name === name) {
          return {
            ...category,
            active: true,
          };
        } else {
          return {
            ...category,
            active: false,
          };
        }
      });
      return categories;
    });
  };

  return [categories, setActiveCategory];
};

export default UseCategory;
