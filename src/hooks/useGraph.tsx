import { useEffect, useState } from "react";
import { EXCEL_ROWS, EXCEL_COLUMNS } from "../utils/Constant";
import { constructGraph, getSelectedIndex } from "../utils/ExcelUtils";

const useGraph = () => {
  const [graph, setGraph] = useState(constructGraph(EXCEL_ROWS, EXCEL_COLUMNS));
  const [visited, setVisited] = useState([]);
  const [dfsArray, setDfsArray] = useState([]);

  useEffect(() => {
    const visitedMatrix = [];
    const dfsMatrix = [];
    for (let i = 0; i < EXCEL_ROWS; i++) {
      const vis = [];
      const dfs = [];
      for (let j = 0; j < EXCEL_COLUMNS; j++) {
        vis.push(false);
        dfs.push(false);
      }
      visitedMatrix.push(vis);
      dfsMatrix.push(dfs);
    }
    setVisited(visitedMatrix);
    setDfsArray(dfsMatrix);
  }, []);

  const addChild = (formula: string, address: string) => {
    const [childRow, childColumn] = getSelectedIndex(address);
    const formulaArray = formula.split(" ");
    for (let i = 0; i < formulaArray.length; i++) {
      const ch = formulaArray[i].charCodeAt(0);
      if (ch >= 65 && ch <= 90) {
        const [parentRow, parentColumn] = getSelectedIndex(formulaArray[i]);
        setGraph((prev) => {
          const data = JSON.parse(JSON.stringify(prev));
          data[parentRow][parentColumn].push([childRow, childColumn]);
          return data;
        });
      }
    }
  };

  const checkCycle = () => {
    let ans = null;
    for (let i = 0; i < EXCEL_ROWS; i++) {
      for (let j = 0; j < EXCEL_COLUMNS; j++) {
        if (!visited[i][j]) ans = checkDfs(i, j);
        if (ans) return true;
      }
    }
    return false;
  };

  const checkDfs = (i, j) => {
    console.log(i);
    if (visited[i][j]) return true;

    setVisited((prev) => {
      const data = JSON.parse(JSON.stringify(prev));
      data[i][j] = true;
      return data;
    });

    // setDfsArray((prev) => {
    //   const data = JSON.parse(JSON.stringify(prev));
    //   data[i][j] = true;
    //   return data;
    // });

    const arr = graph[i][j];

    for (let k = 0; k < arr.length; k++) {
      const [start, end] = arr[k];
      var flag = checkDfs(start, end);

      if (flag) {
        // setVisited((prev) => {
        //   const data = [...prev];
        //   data[i][j] = false;
        //   return data;
        // });
        return true;
      }
    }

    // setVisited((prev) => {
    //   const data = [...prev];
    //   data[i][j] = false;
    //   return data;
    // });

    return false;
  };

  return {
    graph,
    addChild,
    checkCycle,
  };
};

export default useGraph;
