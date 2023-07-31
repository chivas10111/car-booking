import { useDispatch } from 'react-redux';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { Layout, Menu, Dropdown } from 'antd';
import { setLanguage } from '../../Reducers/languageReducer';
import united_states from "../../assets/united_states.svg";
import vietnam from "../../assets/vietnam.svg";

const { Footer } = Layout

const AppFooter = () => {
    const dispatch = useDispatch();

    const handleMenuClick: MenuClickEventHandler = (e) => {
        dispatch(setLanguage(e.key));
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="en">
                <img src={united_states} alt="img-opus" width={20} />
                <span>EN</span>
            </Menu.Item>
            <Menu.Item key="vn">
                <img src={vietnam} alt="img-opus" width={20} />
                <span>VN</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Footer className='mcs-footer'>
            <div>
                <span className='footer-left'><b>Tasken @ Opus Solution</b></span>
                <div className='footer-right'>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <span>
                            <img src={united_states} alt="img-opus" width={20} />
                            <span>EN</span>
                        </span>
                    </Dropdown>
                    <span>Website</span>
                    <span>Terms</span>
                    <span>About</span>
                </div>
            </div>

        </Footer>)
}

export default AppFooter;
