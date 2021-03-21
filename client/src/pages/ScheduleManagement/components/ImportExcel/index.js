import React ,{useEffect} from "react";
import { message, Popconfirm } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import "./ImportExcel.scss";
import { importExcel } from "../../../../utils/importExcel";
const ImportExcel = ({ setData, data, postMany, get, token, userRights,status,organizations }) => {
  const mappingFieldNames = {
    name: "Name",
    id: "ID",
    email:"Email",
    class:"Class",
    slot:'Slot',
    date:'Date',
    room:"Room",
    class_id:'Class',
    week:'Week',
    index:'Index'
    
  };
  const handleImportExcel = (info) => {
    importExcel(info, mappingFieldNames, data, postMany, setData, get, token,
      null,
      null,
      0,
      organizations);
  };

  const handleClick = () => {
  };
  useEffect(() => {
    const  arr = {
      week1: [{
      class: "SE1301",
      date: 44273,
      index: 1,
      room: 201,
      slot: 1,
      week: 1
    }, {
      class: "SE1302",
      date: 44274,
      index: 2,
      room: 201,
      slot: 2,
      week: 1
    }, {
      class: "SE1303",
      date: 44275,
      index: 3,
      room: 201,
      slot: 3,
      week: 1
    }, {
      class: "SE1304",
      date: 44276,
      index: 4,
      room: 201,
      slot: 4,
      week: 1
    }],
      week2: [{
      class: "SE1305",
      date: 44277,
      index: 5,
      room: 201,
      slot: 5,
      week: 2
    }, {
      class: "SE1306",
      date: 44278,
      index: 6,
      room: 201,
      slot: 5,
      week: 2
    }, {
      class: "SE1307",
      date: 44279,
      index: 7,
      room: 201,
      slot: 2,
      week: 2
    }, {
      class: "SE1308",
      date: 44280,
      index: 8,
      room: 201,
      slot: 3,
      week: 2
    }],
      week3: [{
      class: "SE1309",
      date: 44281,
      index: 9,
      room: 201,
      slot: 4,
      week: 3
    }, {
      class: "SE1310",
      date: 44282,
      index: 10,
      room: 201,
      slot: 1,
      week: 3
    }, {
      class: "SE1311",
      date: 44283,
      index: 11,
      room: 201,
      slot: 2,
      week: 3
    }, {
      class: "SE1312",
      date: 44284,
      index: 12,
      room: 201,
      slot: 4,
      week: 3
    }],
      week4: [{
      class: "SE1313",
      date: 44285,
      index: 13,
      room: 201,
      slot: 6,
      week: 4
    }, {
      class: "SE1314",
      date: 44286,
      index: 14,
      room: 201,
      slot: 5,
      week: 4
    }, {
      class: "SE1315",
      date: 44287,
      index: 15,
      room: 201,
      slot: 6,
      week: 4
    }, {
      class: "SE1316",
      date: 44288,
      index: 16,
      room: 201,
      slot: 6,
      week: 4
    }]
    }
    const abc = Object.keys(arr).map(item=>{
     return arr[item].map(week=>{
       return {
         week:week.week,
         date:week.date,
         slot:week.slot,
         class:week.class,
         room:week.room
       }
     })
    })
    const bcd = abc.map((item,index)=>{
      return {
        week:item[0].week,
        data_in_week: item.map((row)=>{
          return {
            date:row.date,
            data_in_date:[
              {
                slot:row.slot,
                class:row.class,
                room:row.room
              }
            ]
          }
        })
      }
    })
    if (status && status?.ok || status?.nOk || status?.nUpdate) {
      message.info(`Thêm thành công ${status?.ok} bản ghi, cập nhật thành công ${status?.nUpdate} bản ghi, thất bại ${status?.nOk} bản ghi!`);
      // setTimeout(()=>{window.location.reload()},600)
    }}, [status]);
    const onUpload = () => {
      document.getElementById("upload-file").click();
    };
  return (
    <span style={{ marginLeft: 10 }} onClick={handleClick}>
      <input
        type="file"
        id="upload-file"
        placeholder="Import Excel"
        onChange={handleImportExcel}
        className="import-excel-input"
        // disabled={!checkFunctionPermission(userRights, "/insertMany-tscd")}
        style={{visibility:'hidden'}}
      />
       <Popconfirm title="You sure you want to import file ?" onConfirm={onUpload}>
        <label htmlFor="upload-file" className="ant-btn import-excel">
          Import Excel &nbsp;
          <FileAddOutlined className="file-add-outlined" />
        </label>
      </Popconfirm>
    </span>
  );
};

export default ImportExcel;
