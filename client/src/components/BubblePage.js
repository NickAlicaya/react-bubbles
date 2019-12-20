import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const logout = e => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  useEffect(() => {
    axiosWithAuth().get("http://localhost:5000/api/colors")
    .then((res) => {
      console.log("BUBBLEPAGE .GET",res);
      setColorList(res.data);
    })
    .catch(err => console.log("SORRY NO COLORS",err))
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default BubblePage;
