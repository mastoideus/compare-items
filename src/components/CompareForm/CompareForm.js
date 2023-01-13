import React, { useState, useEffect } from "react";
import classes from "./CompareForm.module.css";

const CompareForm = ({ onClose, comparedItems, onSubmit }) => {
  const [firstItemInput, setFirstItemInput] = useState("");
  const [secondItemInput, setSecondItemInput] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  useEffect(() => {
    let invalidTimeout;

    if (invalidInput) {
      invalidTimeout = setTimeout(() => {
        setInvalidInput(false);
      }, 2000);
    }
    return () => {
      clearTimeout(invalidTimeout);
    };
  }, [invalidInput]);

  const firstInputHandler = (e) => {
    setFirstItemInput(e.target.value);
  };
  const secondInputHandler = (e) => {
    setSecondItemInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !firstItemInput ||
      !secondItemInput ||
      firstItemInput === secondItemInput
    ) {
      setInvalidInput(true);
      return;
    }
    onSubmit(+firstItemInput, +secondItemInput);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.inputContainer}>
        <div className={classes.input}>
          <label htmlFor="first">{comparedItems[0].name}</label>
          <input
            id="first"
            type="number"
            value={firstItemInput}
            onChange={firstInputHandler}
          />
        </div>
        <small
          style={{ backgroundColor: "gray", padding: "0 2em" }}
          className={classes.vs}
        >
          VS.
        </small>
        <div className={classes.input}>
          <input
            id="second"
            type="number"
            value={secondItemInput}
            onChange={secondInputHandler}
          />
          <label htmlFor="second">{comparedItems[1].name}</label>
        </div>
      </div>
      {invalidInput && <small>Invalid inputs</small>}
      <div className={classes.actions}>
        <button>Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  );
};

export default CompareForm;
