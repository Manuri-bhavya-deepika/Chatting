import React, { useState } from 'react';
import { FaUser, FaProjectDiagram, FaChevronDown, FaChevronUp, FaPlus, FaLightbulb, FaThList, FaSignOutAlt, FaBookmark, FaBars, FaEnvelope, FaFolder, FaUsers, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage] = useState("");

  const toggleProjectsDropdown = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  return (
    // <nav className="bg-gray-900 text-white w-full fixed top-0 left-0 shadow-md z-50">
    <nav className={`bg-gray-900 text-white w-full fixed top-0 left-0 shadow-md z-50 h-16
      ${activePage === "/messaging" ? "hidden md:block" : ""}`}>    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-2xl">
              <FaBars />
            </button>
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>

          <div className="hidden md:flex space-x-6">
            <NavItem onClick={() => navigate('/profile')} icon={<FaUser />} label="Profile" />
            <div className="relative group">
              <button onClick={toggleProjectsDropdown}
                className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition">
                <FaProjectDiagram />
                <span>Projects</span>
                {isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isProjectsOpen && (
                <div className="absolute bg-gray-800 text-white mt-2 rounded-md shadow-lg w-48 group-hover:block">
                  <DropdownItem onClick={() => navigate('/createproject')} icon={<FaPlus />} label="Create Project" />
                  <DropdownItem onClick={() => navigate('/feed')} icon={<FaLightbulb />} label="Feed" />
                  <DropdownItem onClick={() => navigate('/allprojects')} icon={<FaThList />} label="All Projects" />
                  <DropdownItem onClick={() => navigate('/myprojects')} icon={<FaFolder />} label="My Projects" />
                  <DropdownItem onClick={() => navigate('/bookmarks')} icon={<FaBookmark />} label="Bookmarked Projects" />
                  <DropdownItem onClick={() => navigate('/liked-projects')} icon={<FaRegEye />} label="Liked Projects" />
                  <DropdownItem onClick={() => navigate('/collaboration-requests')} icon={<FaUsers />} label="Collaboration Requests" />
                </div>
              )}
            </div>
            <NavItem onClick={() => navigate('/messaging')} icon={<FaEnvelope />} label="Messaging" />
            <NavItem onClick={() => navigate('/logout')} icon={<FaSignOutAlt />} label="Logout" />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2 space-y-2 flex flex-col">
          <NavItem onClick={() => navigate('/profile')} icon={<FaUser />} label="Profile" />
          <button onClick={toggleProjectsDropdown}
            className="flex items-center justify-between p-2 text-white w-full">
            <FaProjectDiagram />
            <span>Projects</span>
            {isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isProjectsOpen && (
            <div className="ml-4 space-y-1">
              <DropdownItem onClick={() => navigate('/createproject')} icon={<FaPlus />} label="Create Project" />
              <DropdownItem onClick={() => navigate('/feed')} icon={<FaLightbulb />} label="Feed" />
              <DropdownItem onClick={() => navigate('/allprojects')} icon={<FaThList />} label="All Projects" />
              <DropdownItem onClick={() => navigate('/myprojects')} icon={<FaFolder />} label="My Projects" />
              <DropdownItem onClick={() => navigate('/bookmarks')} icon={<FaBookmark />} label="Bookmarked Projects" />
              <DropdownItem onClick={() => navigate('/liked-projects')} icon={<FaRegEye />} label="Liked Projects" />
              <DropdownItem onClick={() => navigate('/collaboration-requests')} icon={<FaUsers />} label="Collaboration Requests" />
            </div>
          )}
          <NavItem onClick={() => navigate('/messaging')} icon={<FaEnvelope />} label="Messaging" />
          <NavItem onClick={() => navigate('/logout')} icon={<FaSignOutAlt />} label="Logout" />
        </div>
      )}
    </nav>
  );
};

const NavItem: React.FC<{ onClick: () => void; icon?: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
  <button onClick={onClick}
    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition text-left w-full">
    {icon}
    <span>{label}</span>
  </button>
);

const DropdownItem: React.FC<{ onClick: () => void; icon?: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
  <button onClick={onClick}
    className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-700 text-white">
    {icon}
    <span>{label}</span>
  </button>
);
export default Navbar;
