import Header from "@/components/header/header";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Header />
      <p className="text-xl">Page does not exist</p>
    </div>
  );
};

export default NotFound;
