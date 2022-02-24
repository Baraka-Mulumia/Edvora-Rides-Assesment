import React from "react";
import shortid from "shortid";
import PopOver from "./PopOver";
import UseCategory from "../lib/UseCategory";
import RideCategory from "./RideCategory";

const TitleBar = () => {
  const [categories, setActiveCategory] = UseCategory();

  return (
    <section
      className="custom-bg-dark-800 min-h-screen w-full px-12"
      id="title_bar"
    >
      <header className="flex justify-between px-4 py-4 w-full font-normal  text-lg">
        <div className="flex justify-between items-center gap-4">
          {categories.map((category) => (
            <RideCategory
              key={shortid.generate()}
              category={category}
              makeActive={(name) => setActiveCategory(name)}
            />
          ))}
        </div>
        <PopOver />
      </header>
    </section>
  );
};

export default TitleBar;
