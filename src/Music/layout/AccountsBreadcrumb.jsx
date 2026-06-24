import React from "react";
import { Breadcrumb as AntBreadcrumb, Typography } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { Link } from "react-router";

const { Title } = Typography;

const AccountsBreadcrumb = ({ heading, title }) => {
    return (
        <div className="flex items-center justify-between">
            {/* Page Title */}
            <Title level={3}>
                {heading}
            </Title>

            {/* Breadcrumb */}
            <AntBreadcrumb>
                <AntBreadcrumb.Item>
                    <Link to="/accounts-dashboard">
                        <DashboardOutlined /> Home
                    </Link>
                </AntBreadcrumb.Item>

                <AntBreadcrumb.Item>
                    <span className="font-semibold">{title}</span>
                </AntBreadcrumb.Item>
            </AntBreadcrumb>

        </div>
    );
};

export default AccountsBreadcrumb;
