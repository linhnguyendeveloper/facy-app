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
    
    </>
  )
}

export default CustomHeader
