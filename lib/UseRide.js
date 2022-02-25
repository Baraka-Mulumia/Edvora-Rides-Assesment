import { useState } from "react";
import { extract, groupBy } from "./fns";

const UseRide = (rides) => {
  const [filteredRides, setFilteredRides] = useState([]);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [cities, setCities] = useState(extract(rides, "city"));
  const [filter, setFilter] = useState(null);

  const states = extract(rides, "state");

  const grouped_states = groupBy(rides, "state");

  const selectCity = (v) => {
    setFilter(1);
    setCity(v);
    let ridesByCity = [];
    if (state) {
      ridesByCity = rides.filter((ride) => {
        return ride.city === v && ride.state === state;
      });
    } else {
      ridesByCity = rides.filter((ride) => {
        return ride.city === v;
      });
    }
    setFilteredRides(ridesByCity);
  };
  const selectState = (v) => {
    setState(v);
    setFilter(2);
    const cities = grouped_states.find((state) => state.name === v).cities;
    setCities(cities);
    setCity(cities[0]);
    const ridesByState = rides.filter((ride) => {
      return ride.state === v;
    });
    setFilteredRides(ridesByState);
  };

  return {
    states,
    cities,
    events: {
      selectCity,
      selectState,
    },
    selected: {
      city,
      state,
    },
    filter: {
      status: filter,
      data: filteredRides,
    },
  };
};

export default UseRide;
