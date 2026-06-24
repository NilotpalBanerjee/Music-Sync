import React, { useState } from "react";
import { Form, Card, Table, Input, Button, Tag, Modal, Row, Col } from "antd";
import { FileExcelOutlined, CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import Breadcrumb from "../layout/AccountsBreadcrumb";

const PaymentsPending = () => {
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();

    // Sample Data (same as screenshot)
    const data = [
        {
            key: "1",
            slno: 1,
            district: "RANCHI",
            schoolName: "GOVT. SANSKRIT HIGH SCHOOL, RANCHI",
            challanNumber: "JC26M11001001",
            noOfStudents: 1,
            challanDate: "02-03-2026 12:45 PM",
            paymentMode: "OFFLINE",
        },
        {
            key: "2",
            slno: 2,
            district: "LOHARDAGA",
            schoolName: "SHANKARACHARYA SANSKRIT HIGH SCHOOL, LOHARDAGA",
            challanNumber: "JC26M13001001",
            noOfStudents: 2,
            challanDate: "07-02-2026 07:33 PM",
            paymentMode: "OFFLINE",
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
        {
            title: "Payment Mode",
            dataIndex: "paymentMode",
            key: "paymentMode",
        },
        {
            title: "Initiate Verification",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Button
                    type="primary"
                    size="small"
                    className="!bg-yellow-500 hover:!bg-yellow-600 border-none"
                    onClick={() => {
                        setSelectedRecord(record);
                        setIsModalOpen(true);
                    }}
                >
                    Initiate Verification
                </Button>
            ),
        },
    ];

    const filteredData = data.filter((item) =>
        item.schoolName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-4">
            <Breadcrumb
                heading="Payments Pending for Verification"
                title="Payments Pending for Verification"
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

            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={850}
                closeIcon={<CloseOutlined style={{ color: "white", fontSize: 18 }} />}
                styles={{
                    content: {
                        padding: 0,
                        borderRadius: "8px",
                        overflow: "hidden",
                    },
                    header: { display: "none" },
                }}
            >
                {/* HEADER */}
                <div className="bg-blue-900 px-6 py-4">
                    <div className="text-white text-lg font-semibold">
                        Challan Details
                    </div>
                </div>

                <div style={{ padding: 24 }}>
                    <div style={{ display: "flex", gap: 30 }}>

                        {/* LEFT SIDE - DETAILS */}
                        <div style={{ flex: 1 }}>
                            <Form
                                layout="horizontal"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                                labelAlign="left"
                            >
                                <Form.Item label="Payment Mode">
                                    <Input value="OFFLINE" disabled />
                                </Form.Item>

                                <Form.Item label="Transaction Date & Time">
                                    <Input value="02-03-2026" disabled />
                                </Form.Item>

                                <Form.Item label="Transaction Number">
                                    <Input value="123456789" disabled />
                                </Form.Item>

                                <Form.Item label="Bank Name">
                                    <Input value="1234567890" disabled />
                                </Form.Item>

                                <Form.Item label="Amount">
                                    <Input prefix="₹" value="1290.00" disabled />
                                </Form.Item>
                            </Form>
                        </div>

                        {/* RIGHT SIDE - IMAGE */}
                        <div style={{ width: 260, textAlign: "center" }}>
                            <div
                                style={{
                                    border: "1px solid #d9d9d9",
                                    padding: 10,
                                    marginBottom: 15,
                                }}
                            >
                                <img
                                    src="jac.png"
                                    alt="Proof"
                                    style={{ width: "100%" }}
                                />
                            </div>

                            <Button type="primary">
                                <DownloadOutlined /> Download
                            </Button>
                        </div>
                    </div>

                    {/* FOOTER BUTTONS */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 10,
                            marginTop: 30,
                        }}
                    >
                        <Button type="primary">Approve</Button>
                        <Button danger>Reject</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PaymentsPending;