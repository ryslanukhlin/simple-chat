import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import '../scss/UserLayout.scss';

const { Content, Sider } = Layout;

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapse] = React.useState<boolean>(false);

    return (
        <Layout className="Layout">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapse.bind(null, (prev) => !prev)}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    left: 0,
                }}>
                <h1 className="Titel">{collapsed ? 'SC' : 'Simple - Chat'}</h1>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/"> Главная</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        <Link to="/frebds"> Друзья</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content className="site-layout-background">{children}</Content>
            </Layout>
        </Layout>
    );
};

export default UserLayout;
