import React from 'react'
import { Layout, Breadcrumb,Button } from 'antd'
const { Header, Content } = Layout

const CustomHeader = () => {
  const user =localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null

  return (
    <>
      <Header
        className="site-layout-background"
        style={{ padding: 0, backgroundColor: 'white', height: 50 }}
      >
      {!user ? null : <>Hello Linh<Button type="danger" style={{float:"right",marginTop:9,marginRight:9}}>Log out</Button></> }
       
      </Header>
     
    </>
  )
}

export default CustomHeader
