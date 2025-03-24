import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role"); 
    console.log("User role:", userRole);
    setIsAdmin(userRole === "admin");
    
    // Thêm style để ngăn scroll ngang
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    
    return () => {
      // Dọn dẹp khi component unmount
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      {/* Truyền isAdmin vào Header để kiểm soát menu */}
      <Header isAdmin={isAdmin} />
      
      <main className="flex-grow pb-[50px] overflow-x-hidden w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
