import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useSelector } from 'react-redux';
import { items } from "../../Constants";

const SideBar = () => {
    const collapsed = useSelector((state) => state.layout.collapsed);

    return (<Sider trigger={null} collapsible collapsed={collapsed} className="web-only">
        <div className='fos-logo text-center mt-3'>
            {collapsed ? <span>T</span> : <span>TASKS</span>}
        </div>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {items.map(item => {
                if (item.nav) {
                    if (item.children) {
                        return (
                            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                                {item.children.map(child => (
                                    <Menu.Item key={child.key} icon={child.icon} onClick={() => { if (child.url) window.location.href = child.url; }}>
                                        {child.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={item.key} icon={item.icon} onClick={() => { if (item.url) window.location.href = item.url; }}>
                                {item.label}
                            </Menu.Item>
                        );
                    }
                } else {
                    return null;
                }
            })}
        </Menu>
    </Sider>)
}

export default SideBar;