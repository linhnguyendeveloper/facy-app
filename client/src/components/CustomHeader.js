import React from 'react'
import { Layout, Breadcrumb,Button } from 'antd'
const { Header, Content } = Layout

const CustomHeader = () => {
  return (
    <>
      <Header
        className="site-layout-background"
        style={{ padding: 0, backgroundColor: 'white', height: 50 }}
      >
       <Button type="danger" style={{float:"right",marginTop:9,marginRight:9}}>Log out</Button>
      </Header>
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
