import React, { useState, useEffect } from "react";
import { Button, Input, message, Modal, Tabs } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const ModalScheduleDetail = ({
  modalScheduleDetailOpen,
  handleCancelOpenDetail,
  modalScheduleDetailData,
}) => {
  const [scheduleDetail, setScheduleDetail] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setScheduleDetail(modalScheduleDetailData);
  }, [modalScheduleDetailData]);
  return (
    <Modal
      visible={modalScheduleDetailOpen}
      title="Detail Schedule"
      onCancel={handleCancelOpenDetail}
      onOk={handleCancelOpenDetail}
    >
      <Tabs defaultActiveKey="1">
        {scheduleDetail.length > 0 &&
          scheduleDetail
            .sort((a, b) => a.slot - b.slot)
            .map((item) => (
              <TabPane tab={`Slot ${item.slot}`} key={item.slot}>
                <div>Room : {item?.room}</div>
                <div>Course : {item?.courseID}</div>
                <div>Class : {item?.className}</div>
                <Button
                  style={{ marginTop: 10 }}
                  color="primary"
                  onClick={() => setEdit(true)}
                >
                  Change Time <ClockCircleOutlined />{" "}
                </Button>
                {/* <div>Lesson Count : {item?.lessonCount}</div> */}
              </TabPane>
            ))}
      </Tabs>
      <Modal
        visible={edit}
        onOk={() => {
          setEdit(false);
          message.success('Change time success !')
        }}
        title="Change Time"
      >
        <p>
          Date <Input type="date" />
        </p>
        <p>
          Slot <Input type="number" />
        </p>
        <p>
          Room <Input />
        </p>
      </Modal>
    </Modal>
  );
};

export default ModalScheduleDetail;
