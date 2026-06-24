import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Modal } from "antd";
import {
    MailOutlined,
    LockOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

const AccountsLogin = () => {
    const navigate = useNavigate();

    // OTP modal state
    const [openOtp, setOpenOtp] = useState(false);

    // default otp
    const defaultOtp = "123456";

    // otp boxes (auto filled 123456)
    const [otp, setOtp] = useState(defaultOtp.split(""));

    // open modal after login click
    const handleLogin = () => {
        setOpenOtp(true);
    };

    // change otp input
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // auto focus next
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // verify otp
    const verifyOtp = () => {
        const enteredOtp = otp.join("");

        if (enteredOtp === defaultOtp) {
            setOpenOtp(false);
            navigate("/accounts-dashboard");
        } else {
            Modal.error({
                title: "Invalid OTP",
                content: "OTP not matched",
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-300">
            {/* HEADER */}
            <div className="bg-green-700 flex items-center px-10 py-2">
                <img src="/jac.png" alt="logo" className="w-22 h-22 mr-4" />
                <div className="text-white">
                    <div className="text-3xl font-semibold">
                        Jharkhand Academic Council, Ranchi
                    </div>
                    <div className="text-lg">
                        Madhyama Examination Portal, Year 2026
                    </div>
                </div>
            </div>

            {/* CENTER */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-6">Accounts Login</h1>

                {/* LOGIN BOX */}
                <div className="bg-white rounded shadow-sm p-4 w-100">
                    <p className="text-center text-gray-500 mb-5 text-md">
                        Sign in to start your session
                    </p>

                    {/* SCHOOL ID */}
                    <Input
                        size="large"
                        placeholder="Enter School ID"
                        prefix={<MailOutlined />}
                        className="mb-4"
                    />

                    {/* PASSWORD */}
                    <Input.Password
                        size="large"
                        placeholder="Enter Password"
                        prefix={<LockOutlined />}
                        className="mb-4"
                    />

                    {/* CAPTCHA */}
                    <div className="flex items-center gap-6 mb-4">
                        <div className="border border-gray-300 rounded px-6 py-2 text-md font-bold select-none">
                            7 + 4 = ?
                        </div>
                        <Button icon={<ReloadOutlined />} className="!bg-gray-200">
                            Refresh
                        </Button>
                    </div>

                    <Input size="large" placeholder="Enter CAPTCHA" className="!mb-4" />

                    {/* LOGIN BUTTON */}
                    <Button
                        type="primary"
                        block
                        size="large"
                        onClick={handleLogin}
                        className="!bg-green-700 hover:!bg-green-800 text-lg font-semibold"
                    >
                        Login
                    </Button>
                </div>
            </div>

            {/* FOOTER */}
            <div className="bg-green-700 text-white text-center text-xs py-4">
                <p>
                    Best viewed in all modern browsers (latest versions): Chrome, Firefox.
                    Recommended resolution: 1366 x 768
                </p>
                <p>Please do not access this portal from any mobile devices</p>
                <p>© Copyright JAC 2026. All rights reserved.</p>
            </div>

            {/* OTP MODAL */}
            <Modal open={openOtp} footer={null} closable={false} centered width={500}>
                <div className="text-sm mb-6 text-gray-600">
                    Please enter 6 digit OTP sent to your mobile no ending with *****4613
                </div>

                {/* OTP BOX */}
                <div className="flex justify-between mb-6">
                    {otp.map((data, index) => (
                        <Input
                            key={index}
                            id={`otp-${index}`}
                            maxLength={1}
                            value={data}
                            onChange={(e) => handleChange(e.target.value, index)}
                            className="!w-12 !h-12 text-center text-lg"
                        />
                    ))}
                </div>

                {/* BUTTONS */}
                <div className="flex justify-between">
                    <Button danger>Resend OTP</Button>

                    <Button
                        type="primary"
                        onClick={verifyOtp}
                        className="!bg-blue-600"
                    >
                        Verify & Login
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default AccountsLogin;