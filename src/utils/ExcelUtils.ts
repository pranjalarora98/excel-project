export const getSelectedIndex = (str:string) => {
    const rowIndex = Number(str[1]);
    const columnIndex = Number(str[0].charCodeAt(0) - 65);
    return [rowIndex,columnIndex];
}

export const constructGraph = (rows:number,cols:number) => {
    
    const graph = [];

    for(let i=0;i<rows;i++)
    {
        const graphRow = [];
        for(let j=0;j<cols;j++){
         graphRow.push([]);
        }
        graph.push(graphRow);
    }
  return graph;
}