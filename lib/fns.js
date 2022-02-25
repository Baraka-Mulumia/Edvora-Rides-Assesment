/**
 * Returns string representation of  path array
 * @param {[]} path
 * station path array
 * @returns {String}
 * string representation of  path array
 */

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

/**
 *
 * @param {String} date_to_format
 * date string
 * @returns {Date}
 * Formatted Date String e.g 25th Dec 2021 17:53
 *
 */

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

/**
 * checks if a date is in the past
 * @param {String} date
 * date string
 * @returns {Boolean}
 */

export const isPast = (date) => {
  return Number(new Date(date)) < Date.now();
};

/**
 * checks if a date is in the future
 * @param {String} date
 * date string
 * @returns {Boolean}
 */

export const isFuture = (date) => {
  return Number(new Date(date)) > Date.now();
};

/**
 * Extracts a property from an array of objects
 * @param {[]} collection
 * An array of objects
 * @param {String} property
 * The property to get values
 * @returns {Array}
 * An array of unique values picked from the property
 */

export const extract = (collection, property) => {
  const extracted = [];

  for (let i = 0; i < collection.length; i++) {
    if (!extracted.includes(collection[i][property])) {
      extracted.push(collection[i][property]);
    }
  }

  return extracted;
};

/**
 * Groups an array of objects based on the given property
 * @param {[]} collection
 * An array of objects
 * @param {String} property
 * The property to get values
 * @returns {Array}
 * An array subset of the collection with its items grouped by the property
 */

export const groupBy = (collection, property) => {
  const states = extract(collection, property);

  const citiesByState = states.map((state) => {
    let citiesInState = [];

    for (let i = 0; i < collection.length; i++) {
      if (
        collection[i].state === state &&
        !citiesInState.includes(collection[i].city)
      ) {
        citiesInState.push(collection[i].city);
      }
    }

    return {
      name: state,
      cities: citiesInState,
    };
  });
  return citiesByState;
};

/**
 * Gets the distance from the station path based on the station code
 * @param {Number} station_code
 * @param {[]} station_path
 * @returns {Number} --absolute distance
 */

export const calcDistance = (station_code, station_path) => {
  const path = station_path.sort();
  let nearest_stop = station_code;

  for (let i = 0; i < path.length; i++) {
    if (path[i] >= nearest_stop) {
      nearest_stop = path[i];
      break;
    } else {
      nearest_stop = path[path.length - 1];
    }
  }
  return Math.abs(nearest_stop - station_code);
};

/**
 * Takes the Rides array and Returns a new array with each item from the previous array having  the distance property set
 * Distance is This is calculated based on the userStationCode
 * @param {[]} collection
 * Rides Array
 * @param {Number} userStationCode
 * station code for the current user
 * @returns {Array}
 * Returns a new array with each item having  the distance property set
 */

export const ridesWithDistance = (collection, userStationCode) => {
  return collection
    .map((ride) => {
      const distance = calcDistance(userStationCode, ride.station_path);
      return {
        ...ride,
        distance,
      };
    })
    .sort((a, b) =>
      a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0
    );
};
