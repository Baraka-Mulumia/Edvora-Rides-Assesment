import React from "react";
import Image from "next/image";

const NavBar = ({ user }) => {
  return (
    <nav className="flex items-center justify-between px-5 h-20 bg-dark-900">
      <p className="text-white font-bold text-4xl">Edvora</p>
      <div className="flex justify-evenly items-center w-64">
        <p className="text-white font-bold text-xl whitespace-nowrap">
          {user.name}
        </p>
        <figure className="relative w-12 h-12">
          <Image
            className="b rounded-full"
            src={user.url}
            alt={`A Profile picture of ${user.name}`}
            layout="fill"
          />
        </figure>
      </div>
    </nav>
  );
};

export default NavBar;
