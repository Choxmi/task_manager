import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from "antd";
import SideBar from "./Components/base/sidebar";
import AppHeader from "./Components/base/header";
import { Content } from "antd/es/layout/layout";
import { items } from "./Constants";

function AppRouter() {
  const routes = [];
  items.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => child.url && child.element ? routes.push(child) : null)
    } else {
      if (item.url && item.element) {
        routes.push(item);
      }
    }
  })
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => route.auth ? <Route path={route.url} element={<Layout>
          <SideBar />
          <Layout>
            <AppHeader />
            <Content style={{ margin: '24px 16px', padding: 24, minHeight: '90vh' }}>
              {route.element}
            </Content>
          </Layout>
        </Layout >} /> : <Route path={route.url} element={route.element} />)}
      </Routes>
    </BrowserRouter>
  )
}
export default AppRouter;