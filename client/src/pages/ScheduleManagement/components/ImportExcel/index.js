import React from "react";
import { message } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import "./ImportExcel.scss";
import { importExcel } from "./importExcelModal";
// import { messages } from "../../../../constants/messages";
// import { checkFunctionPermission } from "../../../../utils/checkPermission";
const ImportExcel = ({
  setData,
  data,
  postMany,
  get,
  token,
  userRights,
  geographies,
  categories
}) => {
  const mappingFieldNames = {
    name: "Tên TSCĐ",
    code: "Mã TSCĐ",
    code_group: "Mã nhóm TSCĐ",
    amount: "Số lượng",
    date_in_use: "Ngày đưa vào sử dụng",
    serial: "Số serial",
    sun_organization_code: "Bộ phận quản lý, sử dụng",
    geography_id: "Địa điểm đặt tài sản",
    price: "Nguyên giá",
    approve: "Số/ Ngày QĐ phê duyệt QT",
    invest: "Số/Ngày QĐ đầu tư",
  };
  const handleImportExcel = (info) => {
    // const sheetName = 1;
    // importExcel(
    //   info,
    //   mappingFieldNames,
    //   data,
    //   postMany,
    //   setData,
    //   get,
    //   token,
    //   geographies,
    //   categories,
    //   sheetName
    // );
  };

  const handleClick = () => {
    // !checkFunctionPermission(userRights, "/insertMany-tscd") &&
    //   message.error(messages.errorPermission);
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
      />
      <label htmlFor="upload-file" className="ant-btn import-excel">
        Import Schedule &nbsp;
        <FileAddOutlined className="file-add-outlined" />
      </label>
    </span>
  );
};

export default ImportExcel;
