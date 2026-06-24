import React from "react";
import { Card, Row, Col } from "antd";
import {
    BankOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
    ClockCircleFilled,
    RightCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layout/AccountsBreadcrumb";

export default function AccountsDashboard() {
    const navigate = useNavigate();

    const dashboardCard = [
        {
            id: 1,
            title: "Total Payments Pending for Verification",
            value: "2",
            icon: <ClockCircleFilled />,
            href: "/accounts-total-pending-payment",
            bg: "#06b6d4",
            lowerText: "More info",
        },
        {
            id: 2,
            title: "Total Approved Payments",
            value: "2",
            icon: <CheckCircleFilled />,
            href: "/accounts-total-verified-payment",
            bg: "#16a34a",
            lowerText: "More info",
        },
        {
            id: 3,
            title: "Total Rejected Payments",
            value: "0",
            icon: <CloseCircleFilled />,
            href: "/accounts-total-rejected-payment",
            bg: "#dc2626",
            lowerText: "More info",
        },
        {
            id: 4,
            title: "Challan Pending For FO Submission",
            value: "1",
            icon: <BankOutlined />,
            href: "/accounts-challan-pending",
            bg: "#f59e0b",
            lowerText: "More info",
        },
    ];

    return (
        <div className="p-1">
            <Breadcrumb heading="Madhyama" title="Accounts Dashboard" />
            <Row gutter={[12, 12]}>
                {dashboardCard.map((item) => (
                    <Col xs={24} sm={12} md={12} lg={6} key={item.id}>
                        <Card
                            hoverable={false}
                            onClick={() => navigate(item.href)}
                            className="group cursor-pointer shadow-sm border-none! rounded-2xl! h-[136px]!"
                            style={{ background: item.bg, }}
                        >
                            <div className="flex justify-between items-center">
                                {/* Left */}
                                <div>
                                    <div className="text-4xl font-bold text-white">
                                        {item.value}
                                    </div>

                                    <div className="text-base text-white mt-4 font-medium leading-5 h-10 overflow-hidden">
                                        {item.title}
                                    </div>
                                </div>

                                {/* Right icon */}
                                <div className="text-5xl text-white opacity-70 drop-shadow-lg
                                                transition-all duration-300 group-hover:scale-125">
                                    {item.icon}
                                </div>

                            </div>

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}