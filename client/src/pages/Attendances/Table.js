import { React, useEffect, useState } from "react";
import getColumns from "./columns";
import { Select, Table } from "antd";
import Add from "./components/Add";
import ModalAddEdit from "./components/ModalAddEdit";
import ModalUsers from "./components/ModalUsers";
import ExportExcel from "./components/ExportExcel";
const { Option } = Select;
const TableManagement = ({
  attendances,
  getUserAttendances,
  user_attendances,
  getAttendanceClass,
  class_attendances,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [visibleModalUsers, setVisibleModalUsers] = useState(false);
  const [idClicked, setIdClicked] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [course, setCourse] = useState("");
  const listSubject = [
    ...new Set(class_attendances.map((item) => item.subject)),
  ];
  let dataByEachSubject = {};
  listSubject.forEach((subject) => {
    dataByEachSubject[`${subject}`] = class_attendances
      .filter((item) => item.subject === subject)
      .map((item) => {
        return {
          class: item.class,
          slot: item.slot,
          date: item.updated_at.substring(0, 10),
          present: item.status ? "Present" : "Absent",
          email: item.email,
          subject: item.subject,
        };
      });
  });
  useEffect(() => {
    setCourse(listSubject[1]);
  }, [class_attendances]);
  useEffect(() => {
    getUserAttendances(user.email);
    getAttendanceClass("SE1301");
  }, []);
  const isTeacher = user?.role[0] == "TEACHER";
  const listAttendances = isTeacher
    ? class_attendances
    : class_attendances.filter((item) => item.email === user.email);
  const columns = getColumns(
    setVisibleModal,
    setIsEdit,
    setVisibleModalUsers,
    setIdClicked,
    "class",
    "subject",
    user.full_name,
    isTeacher,
  );
  let listAttendancesForTeacher = [];
  listAttendances &&
    listAttendances.length > 0 &&
    listAttendances.forEach((item, index) => {
      if (index < listAttendances.length - 1)
        if (
          item.slot !== listAttendances[index + 1].slot ||
          item.updated_at.substring(0, 10) !==
            listAttendances[index + 1].updated_at.substring(0, 10)
        )
        listAttendancesForTeacher.push({
            slot: item.slot,
            room: item.room,
            class: item.class,
            subject: item.subject,
            updated_at: item.updated_at,
            id:item.id,
          });
    });
    const data = isTeacher ? listAttendancesForTeacher : listAttendances
  return (
    <>
      <Select
        style={{ marginBottom: 20 }}
        value={course}
        onChange={(value) => {
          setCourse(value);
        }}
      >
        {listSubject.map((item) => {
          return <Option value={item}>{item}</Option>;
        })}
      </Select>
      <ExportExcel
        columns={[
          { key: "subject", title: "Course" },
          { key: "email", title: "Student" },
          { key: "slot", title: "Slot" },
          { key: "date", title: "Date" },
          { key: "present", title: "Status" },
          { key: "student", title: "Student" },
          { key: "count", title: "Present" },
          { key: "rate", title: "Absent rate" },
          { key: "status", title: "Status" },
          { key: "isFinal", title: "Note" },
        ]}
        data={dataByEachSubject}
        course={course}
        fileName={"SE1301" + " Attendances Report "}
      />
      <ModalAddEdit
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        isEdit={isEdit}
      />
      <ModalUsers
        visibleModalUsers={visibleModalUsers}
        setVisibleModalUsers={setVisibleModalUsers}
        idClicked={idClicked}
        schedule={class_attendances}
      />
      <Table
        columns={columns}
        dataSource={
          course
            ? data.filter((item) => item?.subject == course)
            : data
        }
      />
    </>
  );
};

export default TableManagement;
