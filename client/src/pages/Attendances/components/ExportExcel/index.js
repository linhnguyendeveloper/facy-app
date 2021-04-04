import React from "react";
import { Button } from "antd";
import Excel from "exceljs";
import { exportExcel } from "../../../../utils/exportExcel";
import { FileExcelOutlined } from "@ant-design/icons";
import moment from "moment";
import "./ExportExcel.scss";

const ExportExcel = ({ data, columns, fileName, course }) => {
  const students = [
    "linhnvde130002@fpt.edu.vn",
    "lebaongoc6161@gmail.com",
    "nguyenntde130045@fpt.edu.vn",
    "trilvde130014@fpt.edu.vn",
    "tinhbtde130006@fpt.edu.vn",
    "thuannvde130018@fpt.edu.vn",
  ];
  let studentCount = [];
  const totalSlot = 5; //mock
  const listAttendances = data[`${course}`] ? data[`${course}`] : [];
  students.forEach((student) => {
    let count = 0;
    listAttendances.forEach((attendance) => {
      if (attendance.email === student && attendance.present === "Present")
        count++;
    });
    const rate = Math.round(( (totalSlot - count) / totalSlot) * 100);
    studentCount.push({
      student: student,
      count: count,
      rate: rate + " %",
      isFinal: rate > 20 ? "Banned" : "",
    });
  });
  const handleExport = () => {
    let keys = Object.keys(studentCount[0]);
    let sheetColumns = [];
    keys.forEach((col) => {
      const colHeader = columns.find((item) => item.key === col)?.title;
      colHeader &&
        sheetColumns.push({
          header: colHeader,
          key: col,
        });
    });
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet();

 
    const header = [
      "Student",
      "Present",
      "Absent Rate",
      "Note",
      
    ];
    worksheet.columns = sheetColumns;
    worksheet.spliceRows(2, 1, header);
 
    worksheet.getCell("A1").value = "DANH SACH THAM GIA KI THI FINAL";
    worksheet.mergeCells("A1:D1");
    worksheet.getRow(1).height = 35;
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "left",
      wrapText: true,
    };
    worksheet.getColumn(1).width = 40; // column B
    worksheet.getColumn(2).alignment = { horizontal: "center" }; // column B
    worksheet.getColumn(3).alignment = { horizontal: "center" }; // column B
    worksheet.getColumn(4).alignment = { horizontal: "center" }; // column B

    worksheet.getColumn(3).width = 15; // column B
    worksheet.getColumn(4).width = 15; // column B
    worksheet.name = course;
    studentCount.forEach((item) => {
      let row = worksheet.addRow(item);
      let rateCell = row.getCell(3);
      let statusCell = row.getCell(4);
      if (item.isFinal === "Banned") {
        rateCell.font = {
          color: { argb: "FF0000" },
        };
        statusCell.font = {
          color: { argb: "FF0000" },
        };
      }
    });
    exportExcel(workbook, 'Danh sach thi mon ' + course + ' '+moment().format("DD-MM-YYYY"));
  };
  // const handleExport = () => {
  //   let keys = ['student','attendance']
  //   let sheetColumns = [];
  //   keys.forEach((col) => {
  //     const colHeader = columns.find((item) => item.key === col)?.title;
  //     colHeader &&
  //       sheetColumns.push({
  //         header: colHeader,
  //         key: col,
  //       });
  //   });
  //   let workbook = new Excel.Workbook();
  //   let worksheet = workbook.addWorksheet();
  //   worksheet.columns = sheetColumns;
  //   worksheet.getColumn(3).width = 20; // column B
  //   // studentPresents.forEach((item) => worksheet.addRow(item));
  //   // exportExcel(workbook, fileName + moment().format("DD-MM-YYYY"));
  // };
  return (
    <Button className="export-excel" onClick={handleExport}>
      Get Your Attendance Report
      <FileExcelOutlined className="file-excel-outlined" />
    </Button>
  );
};

export default ExportExcel;
