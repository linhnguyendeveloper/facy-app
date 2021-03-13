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
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [visibleModalUsers, setVisibleModalUsers] = useState(false);
  const [idClicked, setIdClicked] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const [course, setCourse] = useState("");
  useEffect(() => {
    attendances && attendances.length > 0 && setCourse(attendances[0].courseID);
  }, [attendances]);
  useEffect(() => {
    getUserAttendances(user.email);
  }, []);
  const courseAttendances = attendances.find((item) => item.courseID == course);
  const columns = getColumns(
    setVisibleModal,
    setIsEdit,
    setVisibleModalUsers,
    setIdClicked,
    courseAttendances?.className,
    courseAttendances?.courseID,
    courseAttendances?.lectureID,
  );
  return (
    <>
      {/* <Add setVisibleModal={setVisibleModal} setIsEdit={setIsEdit} /> */}
      <Select
        style={{ marginBottom: 20 }}
        value={course}
        onChange={(value) => {
          setCourse(value);
        }}
      >
        {attendances.map((item) => {
          return <Option value={item.courseID}>{item.courseID}</Option>;
        })}
      </Select>
      <ExportExcel
        columns={[
          { key: "class", title: "Course" },
          { key: "slot", title: "Slot" },
          { key: "date", title: "Date" },
          { key: "present", title: "Status" },
        ]}
        data={user_attendances.map((item) => {
          return {
            class: item.class,
            slot: item.slot,
            date: item.updated_at.substring(0, 10),
            present: item.status ? "Present" : "Absent",
            email: item.email,
          };
        })}
        fileName={user.full_name + " Attendances Report "}
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
        schedule={courseAttendances?.schedule}
      />
      <Table columns={columns} dataSource={courseAttendances?.schedule} />
    </>
  );
};

export default TableManagement;
