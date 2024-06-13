import React from 'react';
import styled from "styled-components";
import {NavLink, Outlet} from "react-router-dom";


const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const MainContent = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .subtitle {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .content {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #e0e0e0;
  padding: 20px;
  
  .sidebar-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .sidebar-content {
    font-size: 16px;
    line-height: 1.5;
  }
`;
const SideBarNavLink = styled(NavLink)`
  display: block;
  margin-bottom: 10px;
  
  &:hover {
    text-decoration: underline;
  }
`;
const NavBar = styled.div`
    background-color: #333;
    color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .logo {
      font-size: 24px;
      font-weight: bold;
    }
    
    .user-info {
      font-size: 16px;
    }
`;
const Dashboard = () => {
    return (
        <DashboardContainer>
            <NavBar></NavBar>
            <Sidebar>
                <SideBarNavLink to={'/products'}>Products</SideBarNavLink>
                <SideBarNavLink to={'/customers'}>Customers</SideBarNavLink>
                <SideBarNavLink to={'orders'}>Orders</SideBarNavLink>
            </Sidebar>
            <MainContent>
                <Outlet/>
            </MainContent>
        </DashboardContainer>
    );
};
export default Dashboard;
