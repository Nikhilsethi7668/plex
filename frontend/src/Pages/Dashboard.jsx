import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token"); // Remove token on logout
        localStorage.removeItem("user");
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 md:flex md:items-center md:justify-between">
                <h1 className="text-lg font-bold mb-2 md:mb-0">
                    Welcome, {user ? user.firstName : "User"}!
                </h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-sm px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    Logout
                </button>
            </header>

            {/* Main Content */}
            <div className="flex flex-grow flex-col md:flex-row">
                {/* Sidebar */}
                <nav className="bg-gray-800 text-white w-full md:w-64 p-4 space-y-4">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/dashboard/upload"
                                className="block px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                Campaigns
                            </NavLink>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                Invoices
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                Account Settings
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Main Section */}
                <main className="flex-grow p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Dashboard Content
                        </h2>
                        <p className="text-gray-600">
                            Here you can manage your campaigns, invoices, and account
                            settings.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            <NavLink to="/campaigns">
                                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                                    <h3 className="font-semibold text-blue-700">Campaigns</h3>
                                    <p className="text-blue-600 text-sm">
                                        Manage your active and past campaigns.
                                    </p>
                                </div>
                            </NavLink>
                            <div className="bg-green-100 p-4 rounded-lg shadow-md">
                                <h3 className="font-semibold text-green-700">Invoices</h3>
                                <p className="text-green-600 text-sm">
                                    View and manage your invoices easily.
                                </p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                                <h3 className="font-semibold text-yellow-700">
                                    Account Settings
                                </h3>
                                <p className="text-yellow-600 text-sm">
                                    Update your profile and security settings.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p className="text-sm">© 2025 Your Company. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
