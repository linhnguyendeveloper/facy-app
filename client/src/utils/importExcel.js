import XLSX from "xlsx";
import moment from 'moment'
import { message } from "antd";


export const importExcel = (
  info,
  mappingFieldNames,
  data,
  postMany,
  setData,
  get,
  token,
  geographies,
  categories,
  sheetName = 0,
  organizations,
) => {
  var files = info.target.files,
    f = files ? files[0] : "";
  var reader = new FileReader();
  reader.onload = async function (e) {
    var result = new Uint8Array(e.target.result);
    var workbook = XLSX.read(result, { type: "array" });
    const wordsheetName = workbook.SheetNames[sheetName];
    const wordsheet = workbook.Sheets[wordsheetName];
    let jsonData = XLSX.utils.sheet_to_json(wordsheet, {
      header: 1,
      blankRows: false,
      defval: "",
    });
    const keyMapping = jsonData.splice(0, 1)[0].map((keyName) => {
      for (const [key, value] of Object.entries(mappingFieldNames)) {
        if (value.trim() === keyName.trim()) return key;
      }
    });
    let arr = [];
    jsonData.forEach((row, index) => {
      const newRow = {};
      row.forEach((item, itemIndex) => {
        if(['date_in_use','contract_date','date_use'].includes(keyMapping[itemIndex]) &&item) {
          newRow[`${keyMapping[itemIndex]}`]= moment(new Date(Math.round((item - 25569)*86400*1000)).toLocaleDateString()).format('YYYY/MM/DD')
        }
        else 
        newRow[`${keyMapping[itemIndex]}`] = item || "";
      });
      arr.push(newRow);
    });
    let dataPosts = [],
      arrWithKey = [];
    arr.forEach((item) => {
      dataPosts.push({ ...item });
      let dataWithKey = { ...item, key: Math.random() };
      arrWithKey.push(dataWithKey);
    });
    // change geography value
    dataPosts = dataPosts.map((item, index) => {
      return {
        ...item,
      };
    });
    // await postMany(dataPosts, token);
    // setData([...data, ...arrWithKey]);
    // get(token);
  

  };
  f ? reader.readAsArrayBuffer(f) : void 0;
};
