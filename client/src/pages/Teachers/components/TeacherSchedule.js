import React from "react";
import { Calendar, Badge, Tag } from "antd";
import "../style.scss";
import { EyeOutlined } from "@ant-design/icons";

const TeacherSchedule = ({ attendances, handleSelectSchedule, schedules }) => {
  const currentTeacher = "TrangNTD11@fpt.edu.vn";
  const getListData = (value) => {
    const listSchedules = [];
    schedules && schedules.forEach((item) => {
          item.data_in_date.forEach((it) => {
            listSchedules.push({ ...it, date: item.date ,class:item.class});
          });
        })
    const dateData = listSchedules.filter(
      (item) => item.date === value.format("MM/DD/YYYY")
    );
    let listData;
      console.log(schedules);
    listData = dateData
      ? dateData.map((item) => {
          return {
            type: "success",
            className: item.class,
            courseID: item.subject_id,
            room: item.room,
            lessonCount: item.lessonCount,
            slot: item.slot,
          };
        })
      : [];

    return listData;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    if (listData.length > 0)
      return (
        <div className="date-cell">
          <Tag
            color="processing"
            onClick={() => handleSelectSchedule(listData)}
            icon={<EyeOutlined />}
          >
            {" "}
            View{" "}
          </Tag>
        </div>
      );
  };
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  return (
    <div>
      <Calendar
        style={{ padding: 20, border: "1px solid black" }}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </div>
  );
};

export default TeacherSchedule;
