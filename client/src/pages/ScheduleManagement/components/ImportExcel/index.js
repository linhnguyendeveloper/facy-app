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
    class:"Class"
    
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
