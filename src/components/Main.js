import React from 'react';
import Products from "./Products";
import Customers from "./Customers";
import Orders from "./Orders";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";

const Main = () => {
    return (
        <div>
            <Router>
                <Routes>
                   <Route path={'/'} element={<Dashboard/>}>
                       <Route path="/products" element={<Products />} />
                       <Route path="/customers" element={<Customers />} />
                       <Route path="/orders" element={<Orders />} />
                   </Route>
                </Routes>
            </Router>
        </div>
    );
};

export default Main;
