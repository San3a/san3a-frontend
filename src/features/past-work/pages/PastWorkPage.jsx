import React from "react";
import { useParams } from "react-router-dom";

const PastWorkPage = () => {
  const { id } = useParams();

  return (
    <>
      <h1> this is my PastWorkPage</h1>
      <p>{id}</p>
    </>
  );
};

export default PastWorkPage;
