import React from 'react';
import { Layout } from 'antd'
const { Footer } = Layout
const CustomFooter = () => {
    return (
        <Footer style={{ textAlign: 'center', height: 1 }}>
          <p style={{ marginTop: -10 }}>
            Copyright©2021 Facy Team - FPT University Da Nang
          </p>
        </Footer>
    );
};

export default CustomFooter;