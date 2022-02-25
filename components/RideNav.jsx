import { useSelector, useDispatch } from "react-redux";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { BsFilterLeft } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { extract, groupBy } from "../lib/fns";

import {
  filterByCity,
  filterByState,
  filterByStateAndCity,
  selectAllRides,
  selectCityFilter,
  selectStateFilter,
} from "../features/ride/rideSlice";

const RideNav = () => {
  const dispatch = useDispatch();

  const rides = useSelector(selectAllRides);
  const state = useSelector(selectStateFilter);
  const city = useSelector(selectCityFilter);
  const ridesGroupedByState = groupBy(rides, "state");

  const cities = state
    ? ridesGroupedByState.find((s) => s.name === state).cities
    : extract(rides, "city");

  const states = extract(rides, "state");

  const filterRidesByState = (selectedState) =>
    dispatch(filterByState(selectedState));
  const filterRidesByCity = (selectedState) =>
    dispatch(filterByCity(selectedState));
  const filterRidesByStateAndCity = (selectedState, selectedCity) =>
    dispatch(filterByStateAndCity({ selectedState, selectedCity }));

  const Filter = ({ content }) => (
    <span className="flex justify-center text text-xs bg-white font-bold rounded-full text-gray-900 p-1 m-1">
      #{content}
    </span>
  );
  return (
    <div className="flex gap-3">
      {city || state ? (
        <>
          {state && <Filter content={state} />}
          {city && <Filter content={city} />}
        </>
      ) : null}
      <PopoverPrimitive.Root className="relative">
        <PopoverPrimitive.Trigger>
          <span className="flex justify-around gap-4 items-center font-medium custom-text-light text-lg">
            <BsFilterLeft className="block text-2xl" />
            Filters
          </span>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content className="custom-bg-dark-900 rounded-md pb-4 absolute -left-full">
          <div role="search" className="flex w-48 justify-start px-4 ">
            <p className="py-2 custom-text-accent m-1 font-light border-b border-solid border-gray-300 grow">
              Filters
            </p>
          </div>
          <PopoverPrimitive.Root>
            <PopoverPrimitive.Trigger className="custom-bg-dark-800 p-2 flex mx-auto rounded-md mt-2 w-40 h-10">
              <span className="flex justify-between gap-4 items-center font-medium custom-text-light text-md w-full">
                <span className="block">{state ? state : "State"}</span>
                <MdOutlineArrowDropDown className="block text-2xl" />
              </span>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content>
              <div className="max-h-96 overflow-y-scroll overflow-x-clip custom-bg-dark-900 px-2">
                {states.map((state) => (
                  <Option
                    value={state}
                    key={state}
                    handleClick={() => filterRidesByState(state)}
                  />
                ))}
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Root>

          <PopoverPrimitive.Root>
            <PopoverPrimitive.Trigger className="custom-bg-dark-800 p-2 flex justify-center mx-auto rounded-md mt-2 w-40 h-10">
              <span className="flex justify-between gap-4 items-center font-medium custom-text-light text-md w-full">
                <span className="block">{city ? city : "City"}</span>
                <MdOutlineArrowDropDown className="block text-2xl" />
              </span>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content className="rounded-md">
              <div className="max-h-96 overflow-y-scroll overflow-x-clip custom-bg-dark-900 px-2">
                {cities.map((city) => (
                  <Option
                    value={city}
                    key={city}
                    handleClick={
                      state
                        ? () => filterRidesByStateAndCity(state, city)
                        : () => filterRidesByCity(city)
                    }
                  />
                ))}
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Root>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  );
};

const Option = ({ value, handleClick }) => (
  <p
    className="bg-white my-2 flex justify-between gap-4 items-center font-medium text-black text-md w-40 h-10 text-xs px-4 border-gray-700 border border-solid cursor-pointer rounded-md overflow-clip hover:text-white hover:bg-slate-900 hover:border-white"
    onClick={() => handleClick()}
  >
    {value}
  </p>
);

export default RideNav;
