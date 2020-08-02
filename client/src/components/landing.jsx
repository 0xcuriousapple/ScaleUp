import React from 'react';
import { Row, Col, Button, Modal, Card, Input } from 'antd';
import HeroImg from './hero.png';
// import './cloud.css'
import Logo from './logo.png';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;
class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liveCampVisible: false, createCampVisible: false, liveCamp: [], name: '', desc: '', funds: [], mapNametoAddress: {}, checkifcampexists: {}, confirmLoading: false, ModalText: '' };
    }
    open() {
        this.props.open();
    }
    render() {
        return (
            /* Landing Hero Section */
            <div className="landing">

                <Row className="hero">
                    <Col sm={24} md={12} className="hero-txt">
                        <img src={Logo} style={{ height: '190px', width: 'auto' }} />
                        <div className="hero-title">Scale Up</div>
                        <div className="hero-details">
                            Scaling Businesses By Colloboration<br />
                            <div className="tagline">
                                Making India AtmaNirbhar
							</div>
                        </div><br />

                        <Button onClick={() => this.open()} size="large" type="primary">Get Started</Button>


                    </Col>
                    <Col style={{ textAlign: 'center' }} sm={24} md={12}>
                        {' '}
                        <img className="hero-img" src={HeroImg} />

                    </Col>

                </Row>



            </div>
        );
    }
}

export default Landing;