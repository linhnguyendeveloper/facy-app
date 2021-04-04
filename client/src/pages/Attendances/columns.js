import React from "react";
import { UsergroupDeleteOutlined } from "@ant-design/icons";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import ViewUsers from "./components/ViewUsers";
import { Checkbox } from "antd";

const getColumns = (
  setVisibleModal,
  setIsEdit,
  setVisibleModalUsers,
  setIdClicked,
  className,
  courseName,
  teacherName,
  isTeacher,
) => {
  return [
    // {
    //   title: "Class",
    //   dataIndex: "classId",
    //   key: "classId",
    //   render: (text) => <span>{className}</span>,
    // },
    isTeacher
      ? {
          title: "Course",
          dataIndex: "subject",
          key: "subject",
        }
      : {},
    !isTeacher
      ? {
          title: "Student",
          dataIndex: "email",
          key: "email",
          render: (text) => <span>{text}</span>,
        }
      : {},

    {
      title: "Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => {
        var days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        var months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        var day = days[new Date(text.substring(0, 10)).getDay()];
        return (
          <span>
            {day}, {text.substring(0, 10)}
          </span>
        );
      },
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (text) => <span>{text}</span>,
    },

    isTeacher
      ? {
          title: "Students",
          dataIndex: "studentCount",
          key: "studentCount",
          render: (text, record) => (
            <>
              <ViewUsers
                setVisibleModalUsers={setVisibleModalUsers}
                setIdClicked={setIdClicked}
                id={record.id}
                studentCount={text}
              />
            </>
          ),
        }
      : {},
    !isTeacher
      ? {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (text) => <Checkbox checked={text} />,
        }
      : {},
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (text, record) => {
        return (
          <>
            <Edit setVisibleModal={setVisibleModal} setIsEdit={setIsEdit} />
          </>
        );
      },
    },
  ];
};
export default getColumns;
