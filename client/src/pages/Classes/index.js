import React from 'react';
import { Table, Tag, Space } from 'antd';
import {UsergroupDeleteOutlined} from '@ant-design/icons'
const Attendances = ({attendances}) => {
    const columns = [
        {
          title: 'Class',
          dataIndex: 'classId',
          key: 'classId',
          render: text => <span>SE1302</span>,
        },
        {
            title: 'Course',
            dataIndex: 'courseId',
            key: 'courseId',
            render: text => <span>PMG201</span>,
          },  {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: text => <span>{text}</span>,
          },  {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
            render: text => <span>{text}</span>,
          },  {
            title: 'Slot',
            dataIndex: 'time',
            key: 'time',
            render: text => <span>{text}</span>,
          },
          ,  {
            title: 'Teacher',
            dataIndex: 'time',
            key: 'time',
            render: text => <span>PhucTC</span>,
          }
          ,  {
            title: 'Students',
            dataIndex: 'time',
            key: 'time',
            render: text =><UsergroupDeleteOutlined />,
          }
      ];
    return (
        <div style={{margin:40}}>
            <p style={{margin:30,fontSize:22,fontWeight:'bold'}}>ATTENDANCES</p>
            <Table columns={columns} dataSource={attendances}/>
        </div>
    );
};

export default Attendances;