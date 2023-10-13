import { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "../../assets";
import routes from "./../../routes/index";
import { ModalContext } from "../../contextApi/ModalContextApi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const { setShowModal } = useContext(ModalContext);

  // close on click outside
  useEffect(() => {
    const mainArea = document.getElementById("main-area");
    const clickHandler = () => {
      setSidebarOpen(false);
    };
    mainArea.addEventListener("click", clickHandler);
  });

  return (
    <aside
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-[18.125rem] flex-col overflow-y-hidden bg-[#1C2434] text-[#C6CCD7] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header Start */}
      <div className="flex items-center justify-center h-[120px] gap-2 my-8 lg:py-8 relative bg-white mx-6 rounded-md">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="w-[120px] rounded-md" />
        </NavLink>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block absolute top-5 right-5 lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* Sidebar Header End */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu Start */}
        <nav className="px-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {routes.map((route, index) => {
              const { path, title, icon: Icon } = route;
              return (
                <li
                  key={index}
                  onClick={() => setShowModal(false)}
                  className={`p-2 rounded-md text-lg border-b border-gray-700 hover:bg-[#333A48] ${
                    pathname === path && "bg-[#333A48]"
                  }`}
                >
                  <NavLink
                    to={path}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-full flex items-center gap-2"
                  >
                    <Icon />
                    {title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Sidebar Menu End */}
      </div>
    </aside>
  );
};

export default Sidebar;
