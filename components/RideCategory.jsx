const RideCategory = ({ category, makeActive, rideCount }) => (
  <p
    onClick={() => makeActive(category.name)}
    className={`cursor-pointer hover:text-white focus:text-white whitespace-nowrap ${
      category.active
        ? "border-b-2  border-solid border-white text-white font-medium"
        : "custom-text-accent"
    }`}
  >
    {category.name}
    {category.hasCount && <span>({rideCount})</span>}
  </p>
);

export default RideCategory;
