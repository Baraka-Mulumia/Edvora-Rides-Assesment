import Image from "next/image";
import { formatPath, formatDate } from "../lib/fns";

const RideCard = ({ ride }) => {
  return (
    <div className="w-full  h-56 custom-bg-dark-700 rounded-lg font-medium text-white flex flex-col justify-center px-4">
      <div className="flex gap-4">
        <div className="relative w-72 h-40 rounded-md overflow-clip">
          <Image src={ride.map_url} layout="fill" alt="ride map photo" />
        </div>

        <div className="flex grow flex-col text-xl gap-1">
          <DetailItem item="Ride Id" detail={ride.id} />
          <DetailItem item="Origin Station" detail={ride.origin_station_code} />
          <DetailItem
            item="station_path"
            detail={formatPath(ride.station_path)}
          />

          <DetailItem item="Date" detail={formatDate(ride.date)} />
          <DetailItem item="Distance" detail={ride.distance} />
        </div>

        <div className="flex relative  custom-text-light gap-4">
          <span className="custom-bg-dark-900 min-w-max flex justify-center items-center h-8 px-4 rounded-full text-center">
            {ride.city}
          </span>
          <span className="custom-bg-dark-900 min-w-max flex justify-center items-center h-8 px-4 rounded-full text-center">
            {ride.state}
          </span>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ item, detail }) => (
  <p>
    <span className="custom-text-accent">{item}</span>:&nbsp;
    <span className="custom-test-light"></span>
    {detail}
  </p>
);

export default RideCard;
