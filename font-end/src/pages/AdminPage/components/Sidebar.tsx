type SidebarProps = {
    activeTab: number;
    setActiveTab: (tabId: number) => void;
  };
  
  const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const menuItems = [
      { id: 1, title: "Môi trường giáo dục" },
      { id: 2, title: "Chương trình đào tạo" },
      { id: 3, title: "Hoạt động sinh viên" },
    ];
  
    return (
      <aside className="w-64 bg-blue-900 text-white min-h-screen p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 cursor-pointer rounded-lg ${
                activeTab === item.id ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </aside>
    );
  };
  
  export default Sidebar;
  