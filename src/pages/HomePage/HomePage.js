import React, { useState, useReducer } from "react";
import classes from "./HomePage.module.css";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import CompareForm from "../../components/CompareForm/CompareForm";
import { compareCounterFun, findTwoDiffItems } from "../../helperFunctions";

const initialItems = [
  { name: "item1", score: 0 },
  { name: "item2", score: 0 },
  { name: "item3", score: 0 },
  { name: "item4", score: 0 },
  { name: "item5", score: 0 },
  { name: "item6", score: 0 },
];

const appReducer = (state, action) => {
  if (action.type === "INIT_COMPARISON") {
    const [first, second] = findTwoDiffItems({ ...state });

    if (state.compareCounter < 1) {
      return {
        ...state,
        showEndScreen: true,
      };
    }

    return {
      ...state,
      comparedItems: [first, second],
    };
  }
  if (action.type === "SUBMIT_COMPARISON") {
    let copyItems = [...state.items];
    const newPair =
      state.comparedItems[0].name + "-" + state.comparedItems[1].name;

    const increaseScore = (items, comparedItem) => {
      const itemIndex = items.findIndex(
        (item) => item.name === comparedItem.name
      );

      copyItems[itemIndex] = {
        ...comparedItem,
        score: comparedItem.score + 1,
      };
    };
    if (action.firstInput > action.secondInput) {
      increaseScore(state.items, state.comparedItems[0]);
    } else {
      increaseScore(state.items, state.comparedItems[1]);
    }
    return {
      ...state,
      items: copyItems.sort((a, b) => (a.score > b.score ? -1 : 1)),
      comparedPairs: [...state.comparedPairs, newPair],
      compareCounter: state.compareCounter - 1,
    };
  }
  if (action.type === "START_AGAIN") {
    return {
      items: initialItems,
      comparedItems: [],
      comparedPairs: [],
      showEndScreen: false,
      compareCounter: compareCounterFun(initialItems.length),
    };
  }
  return state;
};

const HomePage = () => {
  const [openCompareForm, setOpenCompareForm] = useState(false);
  const [appState, dispatch] = useReducer(appReducer, {
    items: initialItems,
    comparedItems: [],
    comparedPairs: [],
    showEndScreen: false,
    compareCounter: compareCounterFun(initialItems.length),
  });

  const openCompareFormHandler = () => {
    setOpenCompareForm(true);
    dispatch({ type: "INIT_COMPARISON" });
  };

  const closeCompareFormHandler = () => {
    setOpenCompareForm(false);
  };

  const submitFormHandler = (firstInput, secondInput) => {
    dispatch({
      type: "SUBMIT_COMPARISON",
      firstInput,
      secondInput,
    });
    setOpenCompareForm(false);
  };

  const startAgainHandler = () => {
    dispatch({ type: "START_AGAIN" });
  };
  return (
    <div className={classes.container}>
      <ItemsTable items={appState.items} />
      <button
        className={classes.btnCompare}
        disabled={appState.compareCounter === 0}
        onClick={openCompareFormHandler}
      >
        Compare Two Items
      </button>
      {openCompareForm && appState.compareCounter >= 1 && (
        <CompareForm
          compareCounter={appState.compareCounter}
          onClose={closeCompareFormHandler}
          comparedItems={appState.comparedItems}
          onSubmit={submitFormHandler}
        />
      )}
      {!appState.compareCounter && (
        <div className={classes.endScreen}>
          <h2>All items compared</h2>
          <button onClick={startAgainHandler}>Start again</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
