export const getSelectedIndex = (str:string) => {
    const columnIndex = Number(str[1]);
    const rowIndex = Number(str[0].charCodeAt(0) - 65);
    return [rowIndex,columnIndex];
}