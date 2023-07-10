import React, { useState } from 'react';
import { Button, Input, Menu, Modal } from 'antd';
import './menu.css'
import {
    ArrowLeftOutlined,
    FilePdfOutlined,
    DeleteOutlined,
    RiseOutlined,
    ShareAltOutlined,
    CheckOutlined,
    CloseOutlined,
    DeliveredProcedureOutlined,
    EllipsisOutlined
} from '@ant-design/icons';

function MenuRequest(): JSX.Element {

    const [isModalOpenApprove, setIsModalOpenApprove] = useState(false);
    const [isModalOpenReject, setIsModalOpenReject] = useState(false);
    const [isModalOpenShare, setIsModalOpenShare] = useState(false);

    const showModalShare = () => {
        setIsModalOpenShare(true);
    }

    const showModalApprove = () => {
        setIsModalOpenApprove(true);
    };

    const showModalReject = () => {
        setIsModalOpenReject(true);
    };

    const handleApprove = () => {
        setIsModalOpenApprove(false);
    }

    const handleReject = () => {
        setIsModalOpenReject(false);
    };

    const handleClose = () => {
        setIsModalOpenApprove(false);
        setIsModalOpenReject(false);
    };

    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu'>
                <Menu.Item key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="download" icon={<FilePdfOutlined />}>
                    Download file
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />}>
                    Delete
                </Menu.Item>
                <Menu.Item key="progress" icon={<RiseOutlined />}>
                    Progress
                </Menu.Item>
                <Menu.Item onClick={showModalShare} key="share" icon={<ShareAltOutlined />}>
                    Share
                </Menu.Item>
                <Modal title="Share" open={isModalOpenShare} footer={
                    <div>
                        <Button type="primary" onClick={handleShare}>Approve</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Input />
                </Modal>
                <Menu.Item onClick={showModalApprove} key="approve" icon={<CheckOutlined />}>
                    Approve
                </Menu.Item>
                <Modal title="Note" open={isModalOpenApprove} footer={
                    <div>
                        <Button type="primary" onClick={handleApprove}>Approve</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Input />
                </Modal>
                <Menu.Item onClick={showModalReject} key="reject" icon={<CloseOutlined />}>
                    Reject
                </Menu.Item>
                <Modal title="Reason" open={isModalOpenReject} footer={
                    <div>
                        <Button type="primary" onClick={handleReject}>Reject</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Input />
                </Modal>
                <Menu.Item key="forward" icon={<DeliveredProcedureOutlined />}>
                    Forward
                </Menu.Item>
                <Menu.Item key="ellipsis" icon={<EllipsisOutlined />}>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuRequest;