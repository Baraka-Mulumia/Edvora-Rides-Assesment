const RideCategory = ({ name, isActive, count, handleClick }) => (
  <p
    onClick={() => handleClick()}
    className={`cursor-pointer hover:text-white focus:text-white whitespace-nowrap ${
      isActive
        ? "border-b-2  border-solid border-white text-white font-medium"
        : "custom-text-accent"
    }`}
  >
    {name}
    {count != null && count != undefined && `(${count})`}
  </p>
);

export default RideCategory;
