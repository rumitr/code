import React, { useState } from "react";

const Counter = ({ onChange, skip = 1, initial = 12 }) => {
  const [counter, setCounter] = useState(initial);

  const handleChange = (type = "add") => {
    if (type === "add") {
      setCounter((prev) => prev + skip);
    } else if (type === "subtract") setCounter((prev) => prev - skip);
    onChange(counter);
  };

  return (
    <>
      <button disabled={counter <= 0} onClick={() => handleChange("subtract")}>
        -
      </button>
      <span> {counter} px </span>
      <button onClick={() => handleChange("add")}>+</button>
    </>
  );
};

export default Counter;
