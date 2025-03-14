import React, { useEffect, useState } from "react";
import { EXCEL_ROWS, EXCEL_COLUMNS } from "../utils/Constant";

import "../styles.css";
import { getSelectedIndex } from "../utils/ExcelUtils";

const Excel = () => {
  interface cellType {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    alignment: string;
    fontFamily: string;
    fontSize: string;
    fontColor: string;
    bgColor: string;
    value: string;
    formula: string;
  }
  const [selectedCell, setSelectedCell] = useState("");
  const [cellData, setCellData] = useState<cellType[][]>([]);

  useEffect(() => {
    // constructGrid();
    const data = [];
    for (let i = 0; i < EXCEL_ROWS; i++) {
      const rowData = [];
      for (let j = 0; j < EXCEL_COLUMNS; j++) {
        const obj = {
          bold: false,
          italic: false,
          underline: false,
          alignment: "left",
          fontFamily: "monospace",
          fontSize: "14",
          fontColor: "#000000",
          bgColor: "#000000",
          value: "",
          formula: "",
        };
        rowData.push(obj);
      }
      data.push(rowData);
    }
    console.log(data);
    setCellData(data);
  }, []);

  const boldHandler = () => {
    const [row, column] = getSelectedIndex(selectedCell);
    const cell = document.querySelector(
      `[data-row="${row}"][data-column="${column}"]`
    ) as HTMLElement;
    cell.style.fontWeight = cellData[row][column].bold ? "normal" : "bold";
    setCellData((prev) => {
      const data = JSON.parse(JSON.stringify(prev));
      data[row][column].bold = !data[row][column].bold;
      return data;
    });
  };

  const italicHandler = () => {
    const [row, column] = getSelectedIndex(selectedCell);
    const cell = document.querySelector(
      `[data-row="${row}"][data-column="${column}"]`
    ) as HTMLInputElement;
    const obj = cellData[row][column];
    cell.style.fontStyle = obj.italic ? "normal" : "italic";
    setCellData((prev) => {
      const data = JSON.parse(JSON.stringify(prev));
      data[row][column].italic = !data[row][column].italic;
      return data;
    });
  };

  const underlineHandler = () => {
    const [row, column] = getSelectedIndex(selectedCell);
    const cell = document.querySelector(
      `[data-row="${row}"][data-column="${column}"]`
    ) as HTMLElement;
    cell.style.textDecoration = cellData[row][column].underline
      ? "none"
      : "underline";
    setCellData((prev) => {
      const data = JSON.parse(JSON.stringify(prev));
      data[row][column].underline = !data[row][column].underline;
      return data;
    });
  };

  const getBoldStyle = () => {
    if (!selectedCell) return {};
    const [row, column] = getSelectedIndex(selectedCell);
    const obj = cellData?.[row]?.[column];
    if (obj?.bold)
      return {
        backgroundColor: "green",
      };
  };

  const getItalicStyle = () => {
    if (!selectedCell) return {};
    const [row, column] = getSelectedIndex(selectedCell);
    const obj = cellData?.[row]?.[column];
    if (obj?.italic)
      return {
        backgroundColor: "green",
      };
  };

  const getUnderlineStyle = () => {
    if (!selectedCell) return {};
    const [row, column] = getSelectedIndex(selectedCell);
    const obj = cellData?.[row]?.[column];
    if (obj?.underline)
      return {
        backgroundColor: "green",
      };
  };

  const blurHandler = () => {
    const formulaBar = document.getElementById(
      "formula-bar"
    ) as HTMLInputElement;
    const formula = formulaBar.value;
    const [row, column] = getSelectedIndex(selectedCell);
    const cell = document.querySelector(
      `[data-row="${row}"][data-column="${column}"]`
    ) as HTMLElement;
    cell.innerText = calculateFormula(formula);
    cellData[row][column].value = calculateFormula(formula);
    cellData[row][column].formula = formula;
    formulaBar.value = "";
  };

  const decodeCell = (str: string) => {
    const column = str.charCodeAt(0) - 65;
    const row = Number(str[1]);

    const cell = document.querySelector(
      `[data-row="${row}"][data-column="${column}"]`
    ) as HTMLElement;

    return cell.innerText;
  };

  const calculateFormula = (formula: string) => {
    const formulaArray = formula.split(" ");

    for (let i = 0; i < formulaArray.length; i++) {
      const ch = formulaArray[i].charCodeAt(0);
      if (ch >= 65 && ch <= 90) {
        formulaArray[i] = decodeCell(formulaArray[i]);
      }
    }

    const newFormula = formulaArray.join(" ");
    return eval(newFormula);
  };

  return (
    <>
      <div className="page-actions-cont">
        <div className="page-action">Home</div>
        <div className="page-action selected-page-action">File</div>
        <div className="page-action">Insert</div>
        <div className="page-action">Layout</div>
        <div className="page-action">Help</div>
      </div>
      <div className="cellprop-actions-cont">
        <span className="material-icons copy">content_copy</span>
        <span className="material-icons cut">content_cut</span>
        <span className="material-icons paste">content_paste</span>
        <select className="font-family-prop">
          <option value="monospace">Monospace</option>
          <option value="sans-serif">Sans-Serif</option>
          <option value="fantasy">Fantasy</option>
          <option value="cursive">Cursive</option>
        </select>
        <select className="font-size-prop">
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
        </select>
        <span
          className="material-icons bold"
          onClick={boldHandler}
          style={getBoldStyle()}
        >
          format_bold
        </span>
        <span
          className="material-icons italic"
          onClick={italicHandler}
          style={getItalicStyle()}
        >
          format_italic
        </span>
        <span
          className="material-icons underline"
          onClick={underlineHandler}
          style={getUnderlineStyle()}
        >
          format_underlined
        </span>
        <span className="left material-icons alignment">format_align_left</span>
        <span className="center material-icons alignment">
          format_align_center
        </span>
        <span className="right material-icons alignment">
          format_align_right
        </span>
        <div className="color-prop">
          <span className="material-icons">format_color_text</span>
          <input type="color" className="font-color-prop" />
        </div>
        <div className="color-prop">
          <span className="material-icons">format_color_fill</span>
          <input type="color" className="BGcolor-prop" />
        </div>
        <span className="material-icons download">cloud_download</span>
        <span className="material-icons open">cloud_upload</span>
      </div>
      <div className="formula-actions-cont">
        <input
          type="text"
          id="address-bar"
          className="address-bar"
          value={selectedCell}
        />
        <img
          className="formula-icon"
          src="https://img.icons8.com/ios/50/000000/formula-fx.png"
        />
        <input
          type="text"
          className="formula-bar"
          id="formula-bar"
          onKeyDown={(e) => {
            if (e.key == "Enter") blurHandler();
          }}
        />
      </div>
      <div className="grid-cont">
        <div className="top-left-dummy-box"></div>

        <div className="address-col-cont">
          {Array(EXCEL_ROWS)
            .fill("")
            .map((item, index) => (
              <div className="address-col">{index}</div>
            ))}
        </div>

        <div className="cells-cont">
          <div className="address-row-cont">
            {Array(EXCEL_COLUMNS)
              .fill("")
              .map((item, index) => (
                <div className="address-row">
                  {String.fromCharCode(index + 65)}
                </div>
              ))}
          </div>

          <div>
            {Array(EXCEL_ROWS)
              .fill("")
              .map((item, index) => (
                <div style={{ display: "flex" }}>
                  {Array(EXCEL_COLUMNS)
                    .fill("")
                    .map((item1, index1) => (
                      <div
                        contentEditable
                        className="cell"
                        onClick={() => {
                          setSelectedCell(
                            `${String.fromCharCode(65 + index1)}${index}`
                          );
                        }}
                        data-row={index}
                        data-column={index1}
                      ></div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="sheet-actions-cont">
        <div className="sheet-add-icon">
          <span className="material-icons">post_add</span>
        </div>
        <div className="sheets-folder-cont"></div>
      </div>
    </>
  );
};

export default Excel;
