import React, { useState } from 'react';
import MenuAdd from '../MenuAdd';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form, Select, DatePicker, Radio, RadioChangeEvent, Upload, Button } from 'antd';
import './addRequest.css'
import { UploadOutlined } from '@ant-design/icons';


function AddRequest(): JSX.Element {
    const profile = false;
    const { Option } = Select;
    const [value, setValue] = useState(2);
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };



    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuAdd />
                    <div className='page-content'>
                        <div className='table-request'>
                            <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                            <div className='table-content'>
                                <Form className='form-add-request'>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Applicant"
                                                name="Applicant"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Dapartment"
                                                name="Department"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Select something!',
                                                    },
                                                ]}
                                                initialValue="1"
                                                labelCol={{ span: 24 }}
                                            >

                                                <Select className='select-add-request' >
                                                    <Option value="1" >
                                                        Nghiên cứu R&D                                                    </Option>
                                                    <Option value="2">
                                                        IT/ Technical                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="User"
                                                name="User"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Select something!',
                                                    },
                                                ]}
                                                initialValue="1"
                                                labelCol={{ span: 24 }}
                                            >
                                                <Select>
                                                    <Option value="1">
                                                        bangnm@o365.vn, Developer
                                                    </Option>
                                                    <Option value="2">
                                                        bu.test5@o365.vn, Tài xế
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Moblie"
                                                name="Mobile"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Cost Center"
                                                name="CostCenter"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Total passengers"
                                                name="Totalpassengers"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Usage time from"
                                                name="Totalpassengers"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <DatePicker placeholder='From date time' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <label>Usage time to<span className='required'>*</span></label>
                                            <Form.Item>
                                                <DatePicker placeholder='To date time' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <label>Pick time<span className='required'>*</span></label>
                                            <Form.Item>
                                                <DatePicker placeholder='Pick time' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <label>Pick location <span className='required'>*</span></label>
                                            <Form.Item
                                                name="Picklocation"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}>
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <label>Destination <span className='required'>*</span></label>
                                            <Form.Item
                                                name="Destination"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}>
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <label>Reason <span className='required'>*</span></label>
                                            <Form.Item
                                                name="Reason"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}>
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                        <div className='attention-radio'>
                            <p>Chú ý: Trường hợp Phòng Hành Chính không đủ xe để đáp ứng yêu cầu điều xe của bộ phận, Phòng Hành Chính đề nghị sắp xếp phương tiện khác thay thế (thuê xe ngoài, hoặc dùng thẻ taxi, Grab,...) và chi phí sẽ hạch toán theo bộ phận yêu cầu.</p>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>Yes</Radio>
                                <Radio value={2}>No</Radio>
                            </Radio.Group>
                        </div>
                        <div className='Attachment'>
                            <b>Attachment(s)</b>
                        </div>
                        <div className='reply-upload-comment'>
                            <Upload>
                                <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>Add attachments</Button>
                                <span> (Maximum 20MB per file)</span>
                            </Upload>
                        </div>
                    </div>
                </div>
            )
            }
        </RequestLayout >
    );
}

export default AddRequest;