import React from "react";
import { Calendar, Badge, Tag } from "antd";
import "../style.scss";
import { EyeOutlined } from "@ant-design/icons";

const TeacherSchedule = ({ attendances, handleSelectSchedule }) => {
  let schedules = []
  attendances.forEach(item=>{
    schedules = [...schedules,...item.schedule.map(lesson=>{
      return {
        className: item.className,
        courseID: item.courseID,
        courseName: item.courseName,
        lectureID:item.lectureID,
        lectureName:item.lectureName,
        lessonCount:lesson.lessonCount,
        date:lesson.date,
        room:lesson.room,
        slot:lesson.slot,
        studentCount:lesson.studentCount,
      }
    })]
  })
;
// console.log(schedules,attendances);
  const currentTeacher =  "TrangNTD11@fpt.edu.vn"
  const getListData = (value) => {
    const dateData = schedules.filter(
      (item) =>
        item.date === value.format("MM/DD/YYYY")
        //  && item.lectureID ===currentTeacher,
    );
    let listData;

    listData = dateData
      ? dateData.map((item) => {
          return {
            type: "success",
            className: item.className,
            courseID: item.courseID,
            room: item.room,
            lessonCount: item.lessonCount,
            slot: item.slot,
          };
        })
      : [];
      console.log(listData);
      return listData;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
      if(listData.length>0)
      return <div className="date-cell">
        <Tag
          color="processing"
          onClick={() => handleSelectSchedule(listData)}
          icon={<EyeOutlined />}
        > View </Tag>
      </div>
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
