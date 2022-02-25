import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import shortid from "shortid";
import RideNav from "./RideNav";
import RideCategory from "./RideCategory";
import RideCard from "./RideCard";
import NoRides from "./NoRides";

import {
  selectPastRides,
  selectRides,
  selectTimeFilter,
  selectUpcomingRides,
  showNearestRides,
  showPastRides,
  showUpcomingRides,
} from "../features/ride/rideSlice";

const Rides = () => {
  const rides = useSelector(selectRides);
  const pastRides = useSelector(selectPastRides);
  const upcomingRides = useSelector(selectUpcomingRides);
  const timeFilter = useSelector(selectTimeFilter);

  const dispatch = useDispatch();

  const displayPastRides = () => dispatch(showPastRides());
  const displayUpcomingRides = () => dispatch(showUpcomingRides());
  const displayNearestRides = () => dispatch(showNearestRides());

  return (
    <section
      className="custom-bg-dark-800 min-h-screen w-full px-12"
      id="title_bar"
    >
      <header className="flex justify-between px-4 py-4 w-full font-normal  text-lg">
        <div className="flex justify-between items-center gap-4">
          <RideCategory
            name="Nearest Rides"
            isActive={!timeFilter}
            handleClick={() => displayNearestRides()}
          />
          <RideCategory
            name="Upcoming Rides"
            count={upcomingRides.length}
            isActive={timeFilter === "Upcoming Rides"}
            handleClick={() => displayUpcomingRides()}
          />
          <RideCategory
            name="Past Rides"
            count={pastRides.length}
            isActive={timeFilter === "Past Rides"}
            handleClick={() => displayPastRides()}
          />
        </div>

        <RideNav />
      </header>
      <main className="flex flex-col gap-4">
        {rides && rides.length ? (
          rides.map((ride) => <RideCard key={shortid.generate()} ride={ride} />)
        ) : (
          <NoRides />
        )}
      </main>
    </section>
  );
};

export default Rides;
