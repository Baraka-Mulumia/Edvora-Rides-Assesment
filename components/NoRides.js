import { MdInfo } from "react-icons/md";

const NoRides = () => (
  <div className="flex justify-center flex-col gap-5 items-center w-full h-96 custom-text-light text-3xl uppercase text-center">
    <MdInfo className="block" />
    <p> {"No Rides Available"}</p>
  </div>
);

export default NoRides;
