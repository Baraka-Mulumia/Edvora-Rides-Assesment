import React, { useState, useEffect } from "react";
import shortid from "shortid";
import UseRide from "../lib/UseRide";
import UseCategory from "../lib/UseCategory";
import RideNav from "./RideNav";
import RideCategory from "./RideCategory";
import RideCard from "./RideCard";
import NoRides from "./NoRides";

const Rides = ({ allRides }) => {
  const [categories, setActiveCategory] = UseCategory();
  const { filter, states, cities, events, selected } = UseRide(allRides);
  const isUpcomingRide = (ride) => ride.category === "Upcoming Rides";
  const isPastRide = (ride) => ride.category === "Past Rides";

  const nearestRides = () => {
    const rides = [...allRides];
    return rides
      .sort((a, b) => {
        return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
      })
      .filter(isUpcomingRide);
  };

  const [filteredRides, setRides] = useState(
    filter.status ? filter.data : nearestRides()
  );

  const pastRides = filter.status
    ? filter.data.filter(isPastRide)
    : allRides.filter(isPastRide);

  const upcomingRides = filter.status
    ? filter.data.filter(isUpcomingRide)
    : allRides.filter(isUpcomingRide);

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
    categoryName === "Past Rides"
      ? setRides(pastRides)
      : categoryName === "Upcoming Rides"
      ? setRides(upcomingRides)
      : categoryName === "Nearest Rides"
      ? setRides(nearestRides())
      : setRides([]);
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
        <RideNav
          ridesInfo={{
            states,
            cities,
            events,
            selected,
          }}
        />
      </header>
      <main className="flex flex-col gap-4">
        {filteredRides.length ? (
          filteredRides.map((ride) => (
            <RideCard key={shortid.generate()} ride={ride} />
          ))
        ) : (
          <NoRides />
        )}
      </main>
    </section>
  );
};

export default Rides;
