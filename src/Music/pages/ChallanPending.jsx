import React, { useState } from "react";
import { Card, Table, Input, Button, Tag } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import Breadcrumb from "../layout/AccountsBreadcrumb";

const ChallanPending = () => {
    const [searchText, setSearchText] = useState("");

    // Same data as screenshot
    const data = [
        {
            key: "1",
            slno: 1,
            district: "GIRIDIH",
            schoolName: "SANSKRIT HIGH SCHOOL, JHARKHAND DHAM, GIRIDIH",
            challanNumber: "JC26M22002001",
            noOfStudents: 1,
            challanDate: "04-02-2026 07:53 PM",
        },
        {
            key: "2",
            slno: 2,
            district: "GIRIDIH",
            schoolName: "SANSKRIT HIGH SCHOOL, DORANDA, GIRIDIH",
            challanNumber: "JC26M22001001",
            noOfStudents: 3,
            challanDate: "11-02-2026 07:33 PM",
        },
    ];

    const columns = [
        {
            title: "Sl. No",
            dataIndex: "slno",
            key: "slno",
            width: 80,
            sorter: (a, b) => a.slno - b.slno,
        },
        {
            title: "District",
            dataIndex: "district",
            key: "district",
        },
        {
            title: "School Name",
            dataIndex: "schoolName",
            key: "schoolName",
        },
        {
            title: "Challan Number",
            dataIndex: "challanNumber",
            key: "challanNumber",
        },
        {
            title: "No. of Students",
            dataIndex: "noOfStudents",
            key: "noOfStudents",
            align: "center",
        },
        {
            title: "Challan Generation Date & Time",
            dataIndex: "challanDate",
            key: "challanDate",
            render: (date) => (
                <Tag className="!bg-blue-500 !text-white !px-2 !py-0 !rounded">
                    {date}
                </Tag>
            ),
        },
    ];

    const filteredData = data.filter((item) =>
        item.schoolName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-4">
            <Breadcrumb
                heading="Total Rejected Payments"
                title="Total Rejected Payments"
            />

            <Card className="!border-t-4 !border-t-green-600 shadow-md">
                {/* Top Section */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <Button
                            type="primary"
                            icon={<FileExcelOutlined />}
                            className="!bg-green-600 hover:!bg-green-700 border-none"
                        >
                            Export to Excel
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="font-medium">Search:</span>
                        <Input
                            placeholder="Search..."
                            className="w-64"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10 }}
                    bordered
                    size="middle"
                    rowKey="key"
                    components={{
                        header: {
                            cell: (props) => (
                                <th
                                    {...props}
                                    className="!bg-blue-100 text-center font-semibold"
                                />
                            ),
                        },
                    }}
                />
            </Card>
        </div>
    );
};

export default ChallanPending;