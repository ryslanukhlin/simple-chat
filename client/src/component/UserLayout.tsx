import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, BellOutlined, TeamOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import '../scss/UserLayout.scss';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CustomBadge } from './CustomElement/CustomBadge';
import { useTypeDispatch } from '../hooks/useTypedDispatch';

const { Content, Sider } = Layout;

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { NotificationCount, NotificationMessages } = useTypedSelector(
        (state) => state.NotificationReducer,
    );
    const { collapsed } = useTypedSelector((state) => state.PagesMetadataReducer);
    const { setCollepsed } = useTypeDispatch();

    return (
        <Layout className="Layout">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollepsed}
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
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <Link to="/frends"> Друзья</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="3"
                        icon={
                            collapsed ? (
                                <CustomBadge
                                    badgeKey={1}
                                    collapsed={collapsed}
                                    txt={<BellOutlined />}
                                    count={NotificationCount}
                                />
                            ) : (
                                <BellOutlined />
                            )
                        }>
                        <Link to="/notification">
                            <CustomBadge
                                badgeKey={1}
                                collapsed={collapsed}
                                txt={'Уведомления'}
                                count={collapsed ? 0 : NotificationCount}
                            />
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key="4"
                        icon={
                            collapsed ? (
                                <CustomBadge
                                    badgeKey={2}
                                    collapsed={collapsed}
                                    txt={<MessageOutlined />}
                                    count={NotificationMessages.length}
                                />
                            ) : (
                                <MessageOutlined />
                            )
                        }>
                        <Link to="/messages">
                            <CustomBadge
                                badgeKey={2}
                                collapsed={collapsed}
                                txt={'Сообшения'}
                                count={collapsed ? 0 : NotificationMessages.length}
                            />
                        </Link>
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
