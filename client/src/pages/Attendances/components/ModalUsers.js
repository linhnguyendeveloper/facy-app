import { React, useState } from "react";
import { Modal, message, Checkbox } from "antd";
import { Table } from "antd";

const ModalUsers = ({
  visibleModalUsers,
  setVisibleModalUsers,
  idClicked,
  schedule,
}) => {
  const handleOkCheckAttendances = () => {
    setVisibleModalUsers(false);
    message.info("Update attendance success !");
  };
  const handleCancel = () => {
    setVisibleModalUsers(false);
  };
  const clickedCourse =
    schedule && schedule.find((item) => (item.id ==  idClicked));
  const listUserAttendances =
    schedule &&
    schedule.filter(
      (item) =>
        item.slot == clickedCourse?.slot &&
        item.subject == clickedCourse?.subject &&
        item.created_at.substring(0, 10) == clickedCourse?.created_at.substring(0, 10) 
    );
  const columns = [
    // {
    //   title: "Name",
    //   dataIndex: "full_name",
    //   key: "full_name",
    // },
    {
      title: "Student  ",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Attendances",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <Checkbox checked={record.status} />,
    },
  ];
  // console.log(listUserAttendances)
  return (
    <Modal
      title={"Users attendances"}
      visible={visibleModalUsers}
      onOk={handleOkCheckAttendances}
      onCancel={handleCancel}
      className="modal-add-edit"
      forceRender
    >
      <Table dataSource={listUserAttendances || []} columns={columns} />
    </Modal>
  );
};

export default ModalUsers;
