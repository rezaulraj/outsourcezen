import React from "react";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="bg-[var(--color-primary-bg)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
