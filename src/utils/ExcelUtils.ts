export const getSelectedIndex = (str:string) => {
    const rowIndex = Number(str[1]);
    const columnIndex = Number(str[0].charCodeAt(0) - 65);
    return [rowIndex,columnIndex];
}