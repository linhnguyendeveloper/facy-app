import "../../App.css";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from 'antd';
import "./style.scss";
import Graph from './Graph'
import { Select } from 'antd';
function Admin({ login, isAuthen, history, userAuth }) {
    const { Option, OptGroup } = Select;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <div className="Admin">
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Total Student" className="dbCard" bordered={false}>
                        getTotalStudent()
        </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Enrolment" className="dbCard" bordered={false}>
                        getTotalEnrolment()
        </Card>
                </Col>
                <Col span={6}>
                    <Card title="Attendance Rate" className="dbCard" bordered={false}>
                        getTotalEnrolment() = true /  getTotalEnrolment() = false * 100 +'%'
        </Card>
                </Col>
                <Col span={6}>
                    <Card title="Evaluation" className="dbCard" bordered={false}>
                        Guaranteed
        </Card>
                </Col>
            </Row>
            <Row className="selectSemester">
                <Col span={4}>
                    <Select defaultValue="Fall2020" style={{ width: 200 }} onChange={handleChange}>
                        <OptGroup label="2020">
                            <Option value="Fall2020">Fall 2020</Option>
                            <Option value="Summer2020">Summer 2020</Option>
                            <Option value="Spring2020">Spring 2020</Option>
                        </OptGroup>
                        <OptGroup label="2019">
                            <Option value="Fall2019">Fall 2019</Option>
                            <Option value="Summer2019">Summer 2019</Option>
                            <Option value="Spring2019">Spring 2019</Option>
                        </OptGroup>
                    </Select>

                </Col>

            </Row>
            <Row>
                <Col span={24}>

                    <Graph />
                </Col>

            </Row>
        </div>
    );
}

export default Admin
