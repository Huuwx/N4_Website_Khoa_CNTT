import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role"); 
    console.log("User role:", userRole); // Debug xem có lấy đúng không
    setIsAdmin(userRole === "admin");
  }, [location.pathname]); // Chạy lại khi đường dẫn thay đổi

  return (
    <div className="flex flex-col min-h-screen">
      {/* Truyền isAdmin vào Header để kiểm soát menu */}
      <Header isAdmin={isAdmin} />
      
      <main className="flex-grow mt-8">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;