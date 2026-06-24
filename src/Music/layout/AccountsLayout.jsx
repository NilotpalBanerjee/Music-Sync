import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    MenuOutlined,
    LogoutOutlined,
    DownOutlined,
    DashboardOutlined,
    LeftOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useAuthContext } from "../../Components/context/AuthContext";

const AccountsLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const { accountsLogout } = useAuthContext();
    const location = useLocation();

    const fullScreenRoutes = [
        "/accounts-total-pending-payment",
    ];
    const menuItems = [
        {
            name: "Dashboard",
            icon: DashboardOutlined,
            path: "/accounts-dashboard",
            fullScreen: false
        },
    ];

    useEffect(() => {
        if (collapsed) setOpenMenu(null);
    }, [collapsed]);

    useEffect(() => {
        const currentPath = location.pathname;
        if (fullScreenRoutes.includes(currentPath)) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [location.pathname]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* SIDEBAR */}
            <aside
                className={`${collapsed ? "w-20" : "w-64"
                    } bg-slate-800 text-white flex flex-col transition-all duration-300 ease-in-out`}
            >
                {/* LOGO */}
                <div className="h-14 bg-green-800 flex items-center justify-center shrink-0">
                    {collapsed ? (
                        <img src="/jac.png" className="w-9 h-9" alt="logo" />
                    ) : (
                        <div className="flex items-center gap-3 px-3">
                            <img src="/jac.png" className="w-9 h-9" alt="logo" />
                            <span className="font-semibold text-sm whitespace-nowrap">
                                Jharkhand Academic Council
                            </span>
                        </div>
                    )}
                </div>

                {/* MENU */}
                <nav className="flex-1 pt-3">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isOpen = openMenu === index;

                        // SINGLE MENU
                        if (!item.children) {
                            return (
                                <Tooltip
                                    key={index}
                                    title={collapsed ? item.name : ""}
                                    placement="right"
                                >
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center ${collapsed ? "justify-center" : ""
                                            } gap-3 px-4 h-11 transition-all duration-200
                                        ${isActive
                                                ? "bg-green-700"
                                                : "hover:bg-slate-700 text-gray-200"
                                            }`
                                        }
                                    >
                                        <Icon className="text-lg" />
                                        {!collapsed && (
                                            <span className="text-sm">{item.name}</span>
                                        )}
                                    </NavLink>
                                </Tooltip>
                            );
                        }

                        // PARENT MENU
                        return (
                            <div key={index}>
                                <Tooltip title={collapsed ? item.name : ""} placement="right">
                                    <button
                                        onClick={() => {
                                            if (collapsed) {
                                                setCollapsed(false);
                                                setOpenMenu(index);
                                                return;
                                            }
                                            setOpenMenu(isOpen ? null : index);
                                        }}
                                        className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"
                                            } px-4 h-11 hover:bg-slate-700 transition-all duration-300`}
                                    >
                                        <div
                                            className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""
                                                }`}
                                        >
                                            <Icon className="text-lg" />
                                            {!collapsed && (
                                                <span className="text-sm">{item.name}</span>
                                            )}
                                        </div>

                                        {!collapsed &&
                                            (isOpen ? <DownOutlined /> : <LeftOutlined />)}
                                    </button>
                                </Tooltip>

                                {/* SUBMENU */}
                                {isOpen && !collapsed && (
                                    <div className="bg-slate-700">
                                        {item.children.map((sub, i) => (
                                            <NavLink
                                                key={i}
                                                to={sub.path}
                                                className={({ isActive }) =>
                                                    `block pl-14 pr-4 py-2 text-sm transition
                                                ${isActive
                                                        ? "bg-green-700 text-white"
                                                        : "text-gray-200 hover:bg-slate-600"
                                                    }`
                                                }
                                            >
                                                {sub.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>

            {/* RIGHT SIDE */}
            <div className="flex flex-col flex-1">
                {/* HEADER */}
                <header className="h-14 bg-green-700 text-white flex items-center justify-between px-4 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-xl"
                        >
                            <MenuOutlined />
                        </button>

                        <h1 className="font-semibold text-sm md:text-xl">
                            Madhyama Examination - 2026
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={accountsLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm"
                        >
                            <LogoutOutlined />
                            Sign Out
                        </button>
                    </div>
                </header>

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-3 bg-gray-200">
                    <Outlet />
                </main>

                {/* FOOTER */}
                <footer className="h-12 bg-white/50 flex items-center justify-between px-2 text-sm shrink-0">
                    <span className="font-semibold">
                        © 2026 Jharkhand Academic Council | All Rights Reserved
                    </span>
                    <span className="font-semibold">Version - 1.0.0</span>
                </footer>
            </div>
        </div>
    );
};

export default AccountsLayout;
