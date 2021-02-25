import React from "react";
import { UsergroupDeleteOutlined } from "@ant-design/icons";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import ViewUsers from "./components/ViewUsers";

const getColumns = (
  setVisibleModal,
  setIsEdit,
  setVisibleModalUsers,
  setIdClicked,
  className,
  courseName,
  teacherName,
) => {
  return [
    {
      title: "Class",
      dataIndex: "classId",
      key: "classId",
      render: (text) => <span>{className}</span>,
    },
    {
      title: "Course",
      dataIndex: "courseId",
      key: "courseId",
      render: (text) => <span>{courseName}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (text) => <span>{text}</span>,
    },
    ,
    {
      title: "Teacher",
      dataIndex: "time",
      key: "time",
      render: (text) => <span>{teacherName}</span>,
    },
    {
      title: "Students",
      dataIndex: "studentCount",
      key: "studentCount",
      render: (text, record) => (
        <>
          <ViewUsers
            setVisibleModalUsers={setVisibleModalUsers}
            setIdClicked={setIdClicked}
            id={record.lessonCount}
            studentCount={text}
          />
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (text, record) => {
        return (
          <>
            <Edit setVisibleModal={setVisibleModal} setIsEdit={setIsEdit} />
            <Delete />
          </>
        );
      },
    },
  ];
};
export default getColumns;
