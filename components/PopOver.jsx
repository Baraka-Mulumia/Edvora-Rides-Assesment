import * as PopoverPrimitive from "@radix-ui/react-popover";
import { BsFilterLeft } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";

const PopOver = ({}) => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger>
        <span className="flex justify-around gap-4 items-center font-medium custom-text-light text-lg">
          <BsFilterLeft className="block text-2xl" />
          <span className="block">Filter</span>
        </span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content className="custom-bg-dark-900 rounded-md pb-4">
        <div role="search" className="flex w-48 justify-start px-4 ">
          <p className="py-2 custom-text-accent m-1 font-light border-b border-solid border-gray-300 grow w-max">
            Filters
          </p>
        </div>
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger className="custom-bg-dark-800 p-2 flex mx-auto rounded-md mt-2 w-40 h-10">
            <span className="flex justify-between gap-4 items-center font-medium custom-text-light text-md w-full">
              <span className="block">State</span>
              <MdOutlineArrowDropDown className="block text-2xl" />
            </span>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content>
            <p className="py-2">Chicago</p>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>

        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger className="custom-bg-dark-800 p-2 flex justify-center mx-auto rounded-md mt-2 w-40 h-10">
            <span className="flex justify-between gap-4 items-center font-medium custom-text-light text-md w-full">
              <span className="block">City</span>
              <MdOutlineArrowDropDown className="block text-2xl" />
            </span>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content>
            <p className="py-2">Chicago</p>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};

PopOver.propTypes = {};

export default PopOver;
