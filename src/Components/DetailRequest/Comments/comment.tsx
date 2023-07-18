import { CommentOutlined, UserOutlined, UploadOutlined, SelectOutlined } from '@ant-design/icons';
import { Input, Button, Avatar, Row, Col, Upload, } from 'antd';
import './comment.css'
import { useEffect, useState } from 'react';
import request from "../../../Utils/request";
import { useParams } from 'react-router';

interface CommentItem {
    author: string;
    content: string;
    datetime: string;
    id: string;
}

function Comment(): JSX.Element {

    const [detailData, setDetailData] = useState<any>({});

    const { requestId } = useParams();

    const [newComment, setNewComment] = useState('');

    const [newReply, setNewReply] = useState('');

    const [showReplyForm, setShowReplyForm] = useState(false);

    const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

    const [comments, setComments] = useState<CommentItem[]>([
        {
            author: 'Bang Minh Nguyen',
            content: '',
            datetime: '04/07/2023 09:33 AM',
            id: '04/07/2023 09:33 AM',
        },
    ]);

    const [replyComments, setReplyComments] = useState<CommentItem[]>([]);

    useEffect(() => {
        const getDetailRequest = async () => {
            const endpoint = "/request/Id=" + requestId;
            const response = await request.get(endpoint).then((res) => {
                setDetailData(res.data.Data);
            }
            );
        }
        getDetailRequest();
    }, [])


    const handleSaveComment = () => {
        if (newComment) {
            const comment: CommentItem = {
                author: 'Bang Minh Nguyen',
                content: newComment,
                datetime: new Date().toLocaleString(),
                id: new Date().toLocaleString(),
            };
            setShowReplyForm(false);
            setComments([...comments, comment]);
            setNewComment('');
            // setReplyToCommentId(null);
            // console.log(comments);
        }
    };

    const handleSaveReply = () => {
        if (newReply) {
            const replyComment: CommentItem = {
                author: 'Bang Minh Nguyen',
                content: newReply,
                datetime: new Date().toLocaleString(),
                id: new Date().toLocaleString(),
            };
            setShowReplyForm(false);
            setReplyComments([...replyComments, replyComment]);
            setNewReply('');
            setReplyToCommentId(null);
        }
    }

    const handleCancelComment = () => {
        setShowReplyForm(false);
    }

    const handleReplyClick = (commentId: string) => {
        setShowReplyForm(true);
        setReplyToCommentId(commentId);
    };

    return (
        <div className='comments-detail-request'>
            <div className='title-comment'>
                <CommentOutlined className='icon-comment' />
                <span> Comments</span>
            </div>
            {!showReplyForm && (
                <div>
                    <Row className='row-comment-box'>
                        <Col span={1}>
                            <Avatar size={37} icon={<UserOutlined />} className='avatar-comment' />
                        </Col>
                        <Col span={6}>
                            <Input.TextArea
                                className='input-comment'
                                placeholder='Write a comment...'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>
                            <Button className='btn-comment' type="primary" onClick={handleSaveComment}>Save</Button>
                        </Col>
                    </Row>
                    <Upload className='upload-comment'>
                        <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>Add attachments</Button>
                        <span> (Maximum 20MB per file)</span>
                    </Upload>
                </div>
            )}

            <div className='comments-detail-request'>
                {comments.map((comment, index) => (
                    <Row className='list-comment' key={comment.id}>
                        <Col span={2} className="comment-avatar">
                            <Avatar size={40} icon={<UserOutlined />} />
                        </Col>
                        <Col span={18}>
                            <span className="comment-author">{comment.author}</span>
                            <span className="comment-date">{comment.datetime}</span>
                            <div className="comment-content"><span>Submit the request </span>{detailData.RequestCode}<span> for approval</span></div>
                        </Col>
                        {!showReplyForm && (
                            <Col span={2} className='comment-reply'>
                                <Button icon={<SelectOutlined />} onClick={() => handleReplyClick(comment.id)}></Button>
                            </Col>
                        )}
                        {showReplyForm && replyToCommentId === comment.id && (
                            <div className='reply-comment'>
                                <div className='reply-row'>
                                    <span className="comment-avatar">
                                        <Avatar size={40} icon={<UserOutlined />} />
                                    </span>
                                    <span>
                                        <Input.TextArea
                                            className='input-comment'
                                            placeholder='Write a reply...'
                                            value={newReply}
                                            onChange={(e) => setNewReply(e.target.value)}
                                        />
                                    </span>
                                    <span>
                                        <Button className='btn-comment btn-save' type="primary" onClick={handleSaveReply}>Save</Button>
                                    </span>
                                    <span>
                                        <Button className='btn-comment btn-cancel' type="primary" onClick={handleCancelComment}>Cancel</Button>
                                    </span>
                                </div>
                                <div className='reply-upload-comment'>
                                    <Upload className='upload-comment'>
                                        <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>Add attachments</Button>
                                        <span> (Maximum 20MB per file)</span>
                                    </Upload>
                                </div>
                            </div>
                        )}
                        <div>
                            {replyComments.map((replyComment, index) => (
                                <Row className='reply-comment-row' key={replyComment.id}>
                                    <Col span={2} className="comment-avatar">
                                        <Avatar size={40} icon={<UserOutlined />} />
                                    </Col>
                                    <Col span={15} style={{ width: '555px' }}>
                                        <span className="comment-author">{replyComment.author}</span>
                                        <span className="comment-date">{replyComment.datetime}</span>
                                        <div className="comment-content">{replyComment.content}</div>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </Row>
                ))}
            </div>
        </div >
    );
}

export default Comment;