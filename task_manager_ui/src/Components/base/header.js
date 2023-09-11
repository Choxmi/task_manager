import { Button, Dropdown, Space, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../../Reducers/Layout';
import { items } from '../../Constants'
import SideBar from "./sidebar";
import { useEffect } from "react";

const AppHeader = () => {
    const { token: { colorBgContainer }, } = theme.useToken();
    const collapsed = useSelector((state) => state.layout.collapsed)
    const page = useSelector((state) => state.layout.page)
    const dispatch = useDispatch()

    const handleMenuClick = (e) => {
        console.log('click', e);
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            window.location.href = "/login";
        }
    }, []);

    return (<Header style={{ padding: 0, background: colorBgContainer }}>
        <div className='d-flex justify-content-between'>
            <div className='d-flex'>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => dispatch(toggleSidebar())}
                    style={{ fontSize: '16px', width: 64, height: 64 }}
                />
            </div>
            <div className='fos-heading'>{page}</div>
            <div className='d-flex'>
                <div className='mt-1'>
                    <Button className='border-0' onClick={() => { window.localStorage.removeItem('token'); window.location.href = '/login'; }}>
                        <Space>
                            <UserOutlined />
                        </Space>
                    </Button>
                </div>
            </div>
        </div>
    </Header>)
}

export default AppHeader;