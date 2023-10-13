import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import Modal from "../components/Modal/Modal";
import { ModalContext } from "../contextApi/ModalContextApi";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showModal } = useContext(ModalContext);

  return (
    <div>
      {/* ======== Page Wrapper Start ======== */}
      <div className="flex h-screen overflow-hidden">
        {/* ======== Sidebar Start ======== */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* ======== Sidebar End ======== */}

        {/* ======== Content Area Start ======== */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* ======== Header Start ======== */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* ======== Header End ======== */}

          {/* ======== Main Content Start ======== */}
          <main>
            <div
              id="main-area"
              className="mx-auto max-w-screen-2xl min-h-screen p-4 md:p-6 2xl:p-10 bg-[#F1F5F9] relative"
            >
              <Outlet />
              {showModal && (
                <div className="absolute md:top-[80px] top-5 lg:left-[350px]">
                  <Modal />
                </div>
              )}
            </div>
          </main>
          {/* ======== Main Content End ======== */}
        </div>
        {/* ======== Content Area End ======== */}
      </div>
      {/* ======== Page Wrapper End ======== */}
    </div>
  );
};

export default MainLayout;
