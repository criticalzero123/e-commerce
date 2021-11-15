import React from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
  return (
    <div>
      <Loader type="Oval" color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default Loading;
