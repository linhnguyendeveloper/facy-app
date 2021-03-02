import React from 'react'
import { Layout, Breadcrumb,Button } from 'antd'
const { Header, Content } = Layout
const PageLocation = ({item1,item2}) => {
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{item1}</Breadcrumb.Item>
          <Breadcrumb.Item>{item2}</Breadcrumb.Item>
        </Breadcrumb>
      </Content>
    );
};

export default PageLocation;