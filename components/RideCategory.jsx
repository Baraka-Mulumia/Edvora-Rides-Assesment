const RideCategory = ({ category, makeActive }) => (
  <p
    onClick={() => makeActive(category.name)}
    className={`cursor-pointer hover:text-white focus:text-white whitespace-nowrap ${
      category.active
        ? "border-b-2  border-solid border-white text-white"
        : "custom-text-accent"
    }`}
  >
    {category.name}
    {category.items !== null && <span>({category.items})</span>}
  </p>
);

export default RideCategory;
