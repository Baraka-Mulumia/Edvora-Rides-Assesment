export const formatPath = (path) => {
  let pathAsString = "";
  for (let i = 0; i < path.length; i++) {
    if (i === path.length - 1) {
      pathAsString += `${path[i]}`;
    } else {
      pathAsString += `${path[i]}, `;
    }
  }
  return `[${pathAsString}]`;
};

export const formatDate = (date_to_format) => {
  let DATE = new Date(date_to_format);
  let date = DATE.getDate(),
    year = DATE.getFullYear(),
    month = DATE.getMonth(),
    hours = DATE.getHours(),
    mins = DATE.getMinutes();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const toOrdinalSuffix = (num) => {
    const int = parseInt(num),
      digits = [int % 10, int % 100],
      ordinals = ["st", "nd", "rd", "th"],
      oPattern = [1, 2, 3, 4],
      tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
      ? int + ordinals[digits[0] - 1]
      : int + ordinals[3];
  };
  let sfx = toOrdinalSuffix(date).slice(-2);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${date}${sfx} ${months[month]} ${year} ${hours}:${mins}`;
};

export const isPreviousDate = (date) => {
  return Number(new Date(date)) < Date.now();
};
export const isFutureDate = (date) => {
  return Number(new Date(date)) > Date.now();
};

export const extract = (rides, property) => {
  const extracted = [];

  for (let i = 0; i < rides.length; i++) {
    if (!extracted.includes(rides[i][property])) {
      extracted.push(rides[i][property]);
    }
  }

  return extracted;
};

export const groupByState = (rides) => {
  const states = extract(rides, "state");

  const citiesByState = states.map((state) => {
    let citiesInState = [];

    for (let i = 0; i < rides.length; i++) {
      if (rides[i].state === state && !citiesInState.includes(rides[i].city)) {
        citiesInState.push(rides[i].city);
      }
    }

    return {
      name: state,
      cities: citiesInState,
    };
  });
  return citiesByState;
};

export const categorizeRides = (rides) => {
  return rides.map((ride) => {
    let category;

    if (isPreviousDate(ride.date)) {
      category = "Past Rides";
    }

    if (isFutureDate(ride.date)) {
      category = "Upcoming Rides";
    }
    return {
      ...ride,
      category,
    };
  });
};

export const calcDistance = (station_code, station_path) => {
  const path = station_path.sort();
  let nearest_stop = station_code;

  for (let i = 0; i < path.length; i++) {
    if (path[i] >= nearest_stop) {
      nearest_stop = path[i];
      break;
    }
  }
  return nearest_stop - station_code;
};

export const cleanRidesData = (rides, userStationCode) => {
  return categorizeRides(rides).map((ride) => {
    const distance = calcDistance(userStationCode, ride.station_path);
    return {
      ...ride,
      distance,
    };
  });
};
