import MenuAdd from '../MenuAdd/menuAdd';
import SendApprover from '../SendApprover/sendApprover';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form, Select, DatePicker } from 'antd';
import './addRequest.css'
import { ChangeEvent, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { changeFormatDatePostRequest } from '../../../Utils/formatDate.js';


function AddRequest(): JSX.Element {

    const { Option } = Select;

    const profile = false;

    const futureTime = dayjs().add(24, 'hours');
    const usageMoment = dayjs();
    const updatefutureTime = changeFormatDatePostRequest(futureTime);
    const updateMoment = changeFormatDatePostRequest(usageMoment);

    const [initialValue, setInitialValue] = useState('Bang Minh Nguyen');


    const [formData, setFormData] = useState({
        SenderId: "005DDF64-B5FE-45CD-896F-84755E572414",
        DepartmentId: "C35112A9-52CD-4323-8511-20ABF7964A1F",
        ReceiverId: "2F271114-5CC5-4728-A56A-A39CDE018F2B",
        Mobile: null as string | null,
        CostCenter: null as string | null,
        TotalPassengers: null as string | null,
        PickLocation: '',
        Destination: '',
        Reason: '',
        ApplyNote: false,
        UsageFrom: updateMoment,
        UsageTo: updatefutureTime,
        PickTime: updateMoment
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'applicant') {
            setInitialValue(value);
        }
    };

    const handleSelectChange = (value: string, field: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleDatePicker = (value: Dayjs | null, field: string) => {
        if (value) {
            const formattedValue = value.format('YYYY-MM-DD HH:mm:ss');
            const updateformattedValue = changeFormatDatePostRequest(formattedValue);
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: updateformattedValue,
            }));
        }
    };


    // console.log(formData);


    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuAdd formData={formData} />
                    <div className='page-content'>
                        <div className='table-request'>
                            <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                            <div className='table-content'>
                                <Form
                                    className='form-add-request'
                                >
                                    <Row className='row-request'>
                                        {/*Request Applicant*/}
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
                                                initialValue={initialValue}
                                            >
                                                <Input type='text' name='applicant' value={formData.SenderId} readOnly onChange={handleInputChange} className='cursor-notallow-applicant' />
                                            </Form.Item>
                                        </Col>
                                        {/*Request Department*/}
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

                                                <Select
                                                    value={formData.DepartmentId}
                                                    onChange={(value) => handleSelectChange(value, 'department')}
                                                    showSearch
                                                    optionFilterProp="children"
                                                    filterOption={(inputValue, option) =>
                                                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                    }
                                                >
                                                    <Option value="1" >
                                                        Nghiên cứu R&D
                                                    </Option>
                                                    <Option value="2">
                                                        IT/ Technical
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        {/*Request User*/}
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
                                                <Select
                                                    value={formData.SenderId}
                                                    onChange={(value) => handleSelectChange(value, 'senderUser')}
                                                    showSearch
                                                    optionFilterProp="children"
                                                    filterOption={(inputValue, option) =>
                                                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                    }
                                                >
                                                    <Option value="1">
                                                        bangnm@o365.vn, Developer
                                                    </Option>
                                                    <Option value="2">
                                                        bu.test5@o365.vn, Tài xế
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        {/*Request Mobile*/}
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Mobile"
                                                name="Mobile"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Mobile is required',
                                                    },
                                                    {
                                                        pattern: /^[0-9]*$/,
                                                        message: 'Mobile must be a number',
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input type='text' inputMode='numeric' name='Mobile' value={formData.Mobile ?? ''} onChange={handleInputChange} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='row-request'>
                                        {/*Request Cost Center*/}
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Cost Center"
                                                name="CostCenter"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Cost Center" is required'
                                                    },
                                                    {
                                                        pattern: /^[0-9]*$/,
                                                        message: 'Cost Center must be a number',
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input type='text' inputMode='numeric' name='CostCenter' value={formData.CostCenter ?? ''} onChange={handleInputChange} />
                                            </Form.Item>
                                        </Col>
                                        {/*Request Total passengers*/}
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Total passengers"
                                                name="Totalpassengers"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Total passengers" is required'
                                                    },
                                                    {
                                                        pattern: /^[0-9]*$/,
                                                        message: 'Mobile must be a number',
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input type='text' inputMode='numeric' name='TotalPassengers' value={formData.TotalPassengers ?? ''} onChange={handleInputChange} />
                                            </Form.Item>
                                        </Col>
                                        {/*Request Usage time from*/}
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Usage time from"
                                                name="Usagetimefrom"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Usage time from" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                                initialValue={dayjs()} // Giá trị mặc định là thời gian hiện tại
                                            >
                                                <DatePicker
                                                    value={dayjs(formData.UsageFrom)}
                                                    onChange={(value) => handleDatePicker(value, 'usageFrom')}
                                                    showTime
                                                    placeholder='From date time'
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        {/*Request Usage time to*/}
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Usage time to"
                                                name="Usagetimeto"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Usage time to" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                                initialValue={futureTime} // Giá trị mặc định là thời gian sau 24 giờ
                                            >
                                                <DatePicker
                                                    value={dayjs(formData.UsageTo)}
                                                    onChange={(value) => handleDatePicker(value, 'usageTo')}
                                                    showTime
                                                    placeholder='To date time'
                                                    style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Pick time"
                                                name="Picktime"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Pick time" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                                initialValue={dayjs()} // Giá trị mặc định là thời gian hiện tại
                                            >
                                                <DatePicker
                                                    value={dayjs(formData.PickTime)}
                                                    onChange={(value) => handleDatePicker(value, 'pickTime')}
                                                    showTime placeholder='Pick time'
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Pick location"
                                                name="Picklocation"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Pick location" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input type='text' name='PickLocation' value={formData.PickLocation} onChange={handleInputChange}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Destination "
                                                name="Destination"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Destination" is required'

                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input type='text' name='Destination' value={formData.Destination} onChange={handleInputChange}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Reason"
                                                name="Reason"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Reason" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input type='text' name='Reason' value={formData.Reason} onChange={handleInputChange}></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                        <SendApprover />
                    </div>
                </div>
            )
            }
        </RequestLayout >
    );
}

export default AddRequest;