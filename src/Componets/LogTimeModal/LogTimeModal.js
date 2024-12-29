import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, TimePicker, AutoComplete } from 'antd';
import "./LogTimeModal.scss";
import dayjs from 'dayjs';
import { useForm } from 'antd/es/form/Form';

const LogTimeModal = ({ onSubmit, issues }) => {
    const [visible, setVisible] = useState(false);
    const [filteredIssues, setFilteredIssues] = useState(issues); // Suggestions for autocomplete
    const [form] = Form.useForm();

    const handleSearch = (value) => {
        // Filter issues based on the input value
        setFilteredIssues(
            issues.filter((issue) => issue.toLowerCase().includes(value.toLowerCase()))
        );
    };

    const handleOk = (values) => {
        // Pass form values (issue, date, and time) to the parent component
        onSubmit({
            issue: values.issue, // Selected or entered issue
            date: dayjs(values.date), // Selected date
            time: dayjs(values.time), // Selected time
        });
        setVisible(false); // Close the modal
        form.resetFields();
    };

    const handleCloseModal = () => {
        form.resetFields();
        setVisible(false);
    }

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Log Time
            </Button>
            <Modal
                title="Log Time"
                open={visible}
                onCancel={handleCloseModal}
                footer={null} // Footer is omitted to use form submission
            >
                <Form onFinish={handleOk} form={form}>
                    {/* Issue Search Input with Suggestions */}
                    <Form.Item

                        name="issue"
                        rules={[{ required: true, message: 'Please select or enter an issue!' }]}
                    >
                        <AutoComplete
                            placeholder="Type to search for an issue"
                            onSearch={handleSearch}
                            options={filteredIssues.map((issue) => ({ value: issue }))}
                            filterOption={false} // Disable built-in filter to use custom filtering
                        />
                    </Form.Item>
                    <div className='dates'>
                        {/* Date Picker */}
                        <Form.Item name="date" rules={[{ required: true }]} >
                            <DatePicker placeholder='Date' className='date'/>
                        </Form.Item>

                        {/* Time Picker */}
                        <Form.Item name="time" rules={[{ required: true }]} >
                            <TimePicker format="HH:mm" placeholder='Time' style={{width : "100%"}} className='time'/>
                        </Form.Item>
                    </div>
                    <Form.Item name={"description"} rules={[{ required: true, message: "Please fill the description." }]}>
                        <Input placeholder='Description' />
                    </Form.Item>
                    {/* Submit Button */}
                    <Form.Item className='submit-btn'>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default LogTimeModal;
