import { Col, Row, Form, Select, Button, Radio, RadioChangeEvent, message, Spin, Alert } from 'antd';
import Input from 'rc-input';
import React, { useEffect, useState } from 'react';
import './doneRequest.css'
import { SaveFilled } from '@ant-design/icons';
import request from "../../../Utils/request";
import { useNavigate, useParams } from 'react-router-dom';


const { Option } = Select;

function DoneRequest(props: any) {

    const { requestCode } = props;
    const [checkFeedback, setCheckFeedback] = useState<boolean>(true);
    const [dataRotation, setDataRotation] = useState<any>({});
    const [dataDriver, setDataDriver] = useState<any>({})
    const { requestId } = useParams();
    const [departmentDetail, setDepartmentDetail] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [comment, setComment] = useState({
        comment: "",
    });




    useEffect(() => {
        setLoading(true);
        const getRotation = async () => {
            const endpoint = "/request/vehicle/rotation";
            await request.get(endpoint).then((res) => {
                setDataRotation(res.data.Data);
            }
            );
        }
        const getDepartmentDetail = async () => {
            const endpoint = "/request/Id=" + requestId;
            await request.get(endpoint).then((res) => {
                setDepartmentDetail(res.data.Data.Department.Id);
            }
            );
        }
        const getDriver = async () => {
            const endpoint = "departmentMember/position?departmentId=" + departmentDetail;
            await request.get(endpoint).then((res) => {
                setDataDriver(res.data.Data);
            }
            );
        }
        getDriver();
        getDepartmentDetail();
        getRotation();
        setLoading(false);

    }, [departmentDetail, requestId])

    const onChange = (e: RadioChangeEvent) => {
        setCheckFeedback(e.target.value);
    };
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log(values.Note);
        setComment((prevComment) => ({
            ...prevComment,
            comment: "Request " + requestCode + " has been Done  - Note: " + values.Note === undefined ? "No Note" : values.Note
        }));
        values.RequestId = requestId;
        values.Type = checkFeedback;
        console.log("hello", values);
        request.post("/request/vehicle/create", values)
            .then((response) => {
                const data = response.data;
                if (data) {
                    request.postForm("/request/comment/requestId=" + requestId, comment)
                    localStorage.setItem("Data", data?.Data);
                    if (data.Success === false) {
                        message.error(data.Message);
                    } else {
                        navigate("/request/carbooking");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div>
            {loading
                ?
                (<Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                    <Alert
                        style={{ width: '100%', textAlign: 'center' }}
                        message="Loading..."
                        description="There are some issues happening, please wait a moment or you can try reloading the page"
                        type="info"
                    />
                </Spin>)
                :
                (
                    <div>
                        <div className='done-request-feedback-title'>Section for Administration enter feedback vehicle type</div>
                        <div className='done-request-feedback'>
                            <Form
                                onFinish={onFinish}
                                className='form-add-request '
                            >
                                <Form.Item name="RequestId" hidden>
                                    <Input type="text" value={requestId} />
                                </Form.Item>
                                <Radio.Group name="Type" onChange={onChange} value={checkFeedback} style={{ width: '100%' }}>
                                    <Radio className='done-request-check-radio' value={true}>1. Company vehicle</Radio>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Driver"
                                                name="DriverId"
                                                labelCol={{ span: 24 }}
                                            >
                                                <Select
                                                    disabled={!checkFeedback}
                                                    showSearch
                                                    optionFilterProp="children"
                                                    filterOption={(inputValue, option) =>
                                                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                    }
                                                >
                                                    {Array.isArray(dataDriver) ? (
                                                        dataDriver.map((driver: { User: { Id: string, FullName: string } }) => (
                                                            <Option key={driver.User.Id}>
                                                                {driver.User.FullName}
                                                            </Option>
                                                        ))
                                                    ) : (
                                                        <div>No workflow data available.</div>
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Mobile"
                                                name="DriverMobile"
                                                rules={[

                                                    {
                                                        pattern: /^[0-9]*$/,
                                                        message: 'Mobile must be a number',
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input disabled={!checkFeedback} type='text' inputMode='numeric' name='Mobile' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Car plate"
                                                name="DriverCarplate"
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input disabled={!checkFeedback} type='text' inputMode='numeric' name='Carplate' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Rotation"
                                                name="RotaionId"
                                                labelCol={{ span: 24 }}
                                            >
                                                <Select
                                                    disabled={!checkFeedback}
                                                    showSearch
                                                    optionFilterProp="children"
                                                    filterOption={(inputValue, option) =>
                                                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                    }
                                                >
                                                    {Array.isArray(dataRotation) ? (
                                                        dataRotation.map((rotation: { Id: number; Type: string; }) => (
                                                            <Option key={rotation.Id}>
                                                                {rotation.Type}
                                                            </Option>
                                                        ))
                                                    ) : (
                                                        <div>No workflow data available.</div>
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Radio className='done-request-check-radio' value={false}>2. Rented car, taxi</Radio>
                                    <Row className='row-request'>
                                        <Col span={12} className='col-request'>
                                            <Form.Item
                                                label="Reason"
                                                name="Reason"
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input disabled={checkFeedback} type='text' name='Reason'></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                                <Row className='row-request'>
                                    <Col span={18} className='col-request'>
                                        <Form.Item
                                            label="Note"
                                            name="Note"
                                            labelCol={{ span: 24 }}
                                        >
                                            <Input type='text' name='Note'></Input>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18}></Col>
                                    <Col span={4}>
                                        <Form.Item style={{ float: 'right' }}>
                                            <Button htmlType="submit" icon={<SaveFilled />} className='done-request-feedback-btn'>Submit</Button>
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}></Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default DoneRequest;