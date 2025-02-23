import React, { useEffect, useState } from "react";
import { EXCEL_ROWS, EXCEL_COLUMNS } from "../utils/Constant";

import "../styles.css";

const Excel = () => {
  const [selectedCell, setSelectedCell] = useState("");

  const constructGrid = () => {
    const col = document.querySelector(".address-col-cont");
    const row = document.querySelector(".address-row-cont");
    const cellBody = document.querySelector(".cells-cont");

    for (let i = 0; i < EXCEL_ROWS; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "address-col");
      cell.innerText = String(i);
      col?.appendChild(cell);
    }

    for (let i = 0; i < EXCEL_COLUMNS; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "address-row");
      cell.innerText = String.fromCharCode(65 + i);
      row?.appendChild(cell);
    }

    for (let i = 0; i < EXCEL_ROWS; i++) {
      const cell = document.createElement("div");
      cell.style.display = "flex";
      for (let j = 0; j < EXCEL_COLUMNS; j++) {
        const columnCell = document.createElement("div");
        columnCell.setAttribute("class", "cell");
        columnCell.setAttribute("contenteditable", "true");
        columnCell.addEventListener("click", (e) => {
          setSelectedCell(`${String.fromCharCode(j + 65)}${i}`);
        });
        cell.appendChild(columnCell);
      }
      cellBody?.appendChild(cell);
    }
  };

  useEffect(() => {
    constructGrid();
  }, []);

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
        <span className="material-icons bold">format_bold</span>
        <span className="material-icons italic">format_italic</span>
        <span className="material-icons underline">format_underlined</span>
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
        <input type="text" className="address-bar" value={selectedCell} />
        <img
          className="formula-icon"
          src="https://img.icons8.com/ios/50/000000/formula-fx.png"
        />
        <input type="text" className="formula-bar" />
      </div>
      <div className="grid-cont">
        <div className="top-left-dummy-box"></div>
        <div className="address-col-cont"></div>
        <div className="cells-cont">
          <div className="address-row-cont"></div>
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
