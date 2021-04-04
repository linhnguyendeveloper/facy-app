import React from "react";
import { Modal, message, Input } from "antd";

const ModalAddEdit = ({ visibleModal, setVisibleModal, isEdit }) => {
  const handleOkAdd = () => {
    setVisibleModal(false);
    message.info("Added");
  };
  const handleOkEdit = () => {
    setVisibleModal(false);
    message.success("Request send success. Please wait for you teacher to verify.");
  };
  const handleCancel = () => {
    setVisibleModal(false);
  };
  return (
    <Modal
      title={"Request change attendance status"}
      visible={visibleModal}
      onOk={isEdit ? handleOkEdit : handleOkAdd}
      onCancel={handleCancel}
      className="modal-add-edit"
      forceRender
    >
      <p >Assigned Teacher :</p>
      <Input value={"Truong Cong Phuc"} />
      <p style={{ marginTop: 20 }}>What is your reason ?</p>
      <Input />
    </Modal>
  );
};

export default ModalAddEdit;
