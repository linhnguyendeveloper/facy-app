import React,{useState,useEffect} from "react";
import { Modal, Tabs } from "antd";

const { TabPane } = Tabs;
const ModalScheduleDetail = ({
  modalScheduleDetailOpen,
  handleCancelOpenDetail,
  modalScheduleDetailData,
}) => {
  const [scheduleDetail,setScheduleDetail] = useState([])
  useEffect(()=>{
    setScheduleDetail(modalScheduleDetailData)
  },[modalScheduleDetailData])
  return (
    <Modal
      visible={modalScheduleDetailOpen}
      title="Detail Schedule"
      onCancel={handleCancelOpenDetail}
      onOk={handleCancelOpenDetail}
    >
      <Tabs defaultActiveKey="1">
        {scheduleDetail.length>0 && scheduleDetail.sort((a,b)=>a.slot-b.slot).map((item) => (
          <TabPane tab={`Slot ${item.slot}`} key={item.slot}>
            <div>Room : {item?.room}</div>
            <div>Course : {item?.courseID}</div>
            <div>Class : {item?.className}</div>
            {/* <div>Lesson Count : {item?.lessonCount}</div> */}
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default ModalScheduleDetail;
