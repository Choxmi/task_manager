import {
    UserOutlined,
    DesktopOutlined,
    PieChartOutlined,
    DiffOutlined,
    FileDoneOutlined,
} from '@ant-design/icons';
import Home from './Pages/Home';
import Login from "./Pages/Login";
import Register from './Pages/Register';

function getItem(label, key, icon, children, url = null, element = null, auth = true, nav = true) {
    return {
        key,
        icon,
        children,
        label,
        url,
        element,
        auth,
        nav
    };
}

export const items = [
    getItem('Dashboard', '1', <PieChartOutlined />, null, '/', <Home />),
    getItem('Login', '2', <PieChartOutlined />, null, '/login', <Login />, false, false),
    getItem('Register', '3', <PieChartOutlined />, null, '/register', <Register />, false, false),
];