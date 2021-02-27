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
  sheetName = 0
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
    let index = 0;
    dataPosts = dataPosts.map((item, index) => {
      return {
        ...item,
        geography_id: geographies?.find(location => item.geography_id === location.name)?.id || 1,
        organization_id: 1,
        price: item.price ? item.price : 0,
        staff_id: 1,
        id: ++index,
        category_id: categories?.find(childItem => childItem.code === item.code_group)?.id || 0,
        contract_no: item.contract_no?item.contract_no:"-",
        serial: item.serial ? item.serial:"-",
        status: item.status ? item.status: 2
      };
    });
    await postMany(dataPosts, token);
    message.info("Import excel thành công !");
    setTimeout(()=> {
      window.location.reload()
     },1000) ;
    // setData([...data, ...arrWithKey]);
    // get(token);
  };
  f ? reader.readAsArrayBuffer(f) : void 0;
};
