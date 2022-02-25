import React, { useState } from "react";
import PopOver from "./PopOver";
import UseCategory from "../lib/UseCategory";
import RideCategory from "./RideCategory";
import RideCard from "./RideCard";
import shortid from "shortid";

const TitleBar = ({ allRides }) => {
  const [categories, setActiveCategory] = UseCategory();

  const [filteredRides, setRides] = useState(allRides);
  const pastRides = allRides.filter((ride) => ride.category === "Past Rides");

  const upcomingRides = allRides.filter(
    (ride) => ride.category === "Upcoming Rides"
  );

  const nearestRides = () => {
    const rides = [...allRides];
    return rides.sort((a, b) => {
      return a.distance > b.distance ? 1 : a.distance > b.distance ? -1 : 0;
    });
  };

  const rideCount = (categoryName) => {
    let count =
      categoryName === "Past Rides"
        ? pastRides.length
        : categoryName === "Upcoming Rides"
        ? upcomingRides.length
        : 0;
    return count;
  };

  const handleActiveCategoryChange = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName === "Past Rides") {
      setRides(pastRides);
    } else if (categoryName === "Upcoming Rides") {
      setRides(upcomingRides);
    } else {
      setRides(nearestRides());
    }
  };

  return (
    <section
      className="custom-bg-dark-800 min-h-screen w-full px-12"
      id="title_bar"
    >
      <header className="flex justify-between px-4 py-4 w-full font-normal  text-lg">
        <div className="flex justify-between items-center gap-4">
          {categories.map((category) => (
            <RideCategory
              key={category.name}
              rideCount={rideCount(category.name)}
              category={category}
              makeActive={handleActiveCategoryChange}
            />
          ))}
        </div>
        <PopOver rides={filteredRides} />
      </header>
      <main className="flex flex-col gap-4">
        {filteredRides.map((ride) => (
          <RideCard key={shortid.generate()} ride={ride} />
        ))}
      </main>
    </section>
  );
};

export default TitleBar;
