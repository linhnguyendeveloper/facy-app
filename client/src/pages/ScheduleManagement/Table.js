import { React, useEffect, useState } from "react";
import getColumns from "./columns";
import { Select, Table } from "antd";
import Add from "./components/Add";
import ModalAddEdit from "./components/ModalAddEdit";
import ModalUsers from "./components/ModalUsers";
import ImportExcel from "./components/ImportExcel";
const { Option } = Select;
const TableManagement = ({ attendances }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [visibleModalUsers, setVisibleModalUsers] = useState(false);
  const [idClicked, setIdClicked] = useState("");

  const [course, setCourse] = useState("");
  useEffect(() => {
    attendances && attendances.length > 0 && setCourse(attendances[0].courseID);
  }, [attendances]);
  const courseAttendances = attendances.find(item=>item.courseID==course)
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
      {/* <Select
      style={{marginBottom:20}}
        value={course}
        onChange={(value) => {
          setCourse(value);
        }}
      >
        {attendances.map((item) => {
          return <Option value={item.courseID}>{item.courseID}</Option>;
        })}
      </Select> */}
      <ImportExcel/>
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
