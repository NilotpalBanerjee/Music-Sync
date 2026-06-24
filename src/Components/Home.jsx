import "../index.css";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, MailOutlined, } from "@ant-design/icons";

const HomePage = () => {
    const navigate = useNavigate();

    const openPopup = () => {
        const width = window.screen.availWidth;
        const height = window.screen.availHeight;

        const popup = window.open(
            `${window.location.origin}/principal`,
            "PrincipalLoginWindow",
            `width=${width},
            height=${height},
            top=0,
            left=0,
            resizable=yes,
            scrollbars=yes`
        );

        // if popup blocked
        if (!popup || popup.closed || typeof popup.closed === "undefined") {
            alert("Popup blocked! Please allow popups for this site and click again.");
            return;
        }

        // focus popup if opened
        popup.focus();
    };
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top Bar */}
            <div className="bg-green-700 text-white text-sm text-left py-4 pl-34 ">
                Report any problems or questions to <MailOutlined />{" "}ithelp.jac@gmail.com
            </div>

            {/* Hero Section */}
            <div className="relative">
                <div className="h-[580px] bg-cover bg-center relative" style={{ backgroundImage: "url('/building.jpeg')", }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
                    <div className="relative z-10 max-w-6xl mx-auto px-2 pt-10 text-white">
                        {/* Logo + Title Row */}
                        <div className="flex flex-col  items-center md:items-start gap-4">
                            <img
                                src="/jac.png"
                                alt="Logo"
                                className="w-50 h-50 md:w-36 md:h-36 object-contain"
                            />
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                    Jharkhand Academic Council
                                </h1>
                                <p className="text-xl md:text-3xl mt-2 text-gray-200">
                                    Madhyama Registration/Examination 2026
                                </p>
                            </div>
                        </div>
                        {/* Notice Strip */}
                        <div className="mt-6 overflow-hidden bg-orange-500 py-3 rounded-lg shadow-lg">
                            <div
                                className="whitespace-nowrap text-white text-sm md:text-base font-medium marquee"
                            >
                                this ticker for testing on 22-02-2029
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration Cards */}
            <div className="max-w-7xl mx-auto px-6 -mt-28 relative z-20">
                <div className="group bg-yellow-500 rounded-md shadow-xl py-10 px-15 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-6 mb-10">
                        <img
                            src="/service-1.png"
                            alt="logo"
                            className="h-15 w-15 object-contain transition duration-300 shake-img"
                        />
                        <h2 className="text-white text-4xl font-semibold">
                            Madhyama
                        </h2>
                    </div>
                    <button className="bg-blue-600 hover:bg-gray-700 text-white text-lg px-7 py-3 rounded-full font-semibold shadow-lg"
                        // onClick={() => navigate("/principal")}
                        onClick={openPopup}
                    >
                        REGISTRATION
                    </button>
                </div>
            </div>

            {/* Notices Section */}
            <div className="w-[80%] mx-auto px-6 mt-30 mb-20">
                <h2 className="text-5xl font-semibold text-center mb-5">Notices</h2>
                <hr className="border-t-stone-300" />
                <div className="bg-white shadow-md rounded-lg overflow-hidden mt-10">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Notice</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4">20-02-2025</td>
                                <td className="px-6 py-4 font-medium">abcd</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded flex items-center gap-2 justify-end">
                                        <EyeOutlined />
                                        View
                                    </button>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4">05-02-2025</td>
                                <td className=" px-6 py-4 font-medium">
                                    Updated Academic Calendar for Even Semester 2024-25
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded flex items-center gap-2 justify-end">
                                        <EyeOutlined size={16} /> View
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-green-700 text-white py-4 mt-auto">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm">
                    <p>Copyright © JAC. All Right Reserved.</p>
                    <div className="space-x-6">
                        <a href="#" className="hover:underline">
                            Privacy & Policy
                        </a>
                        <a href="#" className="hover:underline">
                            Terms & Conditions of Use
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
