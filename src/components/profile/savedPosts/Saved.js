import React from "react";
import { useSelector } from "react-redux";

const Saved = () => {
  const saved = useSelector((state) => state.savedPost);

  return (
    <div>
      {saved && saved.length > 0
        ? saved.map((post) => <p>{post._id}</p>)
        : null}
    </div>
  );
};

export default Saved;
