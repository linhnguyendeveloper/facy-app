import React from 'react'
import { Layout, Breadcrumb } from 'antd'
const { Header, Content } = Layout

const CustomHeader = () => {
  return (
    <>
      <Header
        className="site-layout-background"
        style={{ padding: 0, backgroundColor: 'white', height: 50 }}
      />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Course</Breadcrumb.Item>
          <Breadcrumb.Item>Classes Teacher</Breadcrumb.Item>
        </Breadcrumb>
      </Content>
    </>
  )
}

export default CustomHeader
