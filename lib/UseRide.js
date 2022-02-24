import React, { useState } from "react";
import { extract, groupByState } from "./fns";

const UseRide = (rides) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState(extract(rides, "city"));
  const states = extract(rides, "state");

  const grouped_states = groupByState(rides);

  const selectCity = (v) => setSelectedCity(v);
  const selectState = (v) => {
    setSelectedState(v);
    const cities = grouped_states.find((state) => state.name === v).cities;
    setCities(cities);
    setSelectedCity(cities[0]);
  };

  return {
    states,
    cities,
    events: {
      selectCity,
      selectState,
    },
    selected: {
      city: selectedCity,
      state: selectedState,
    },
  };
};

export default UseRide;
