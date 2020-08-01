import React from 'react';
import { Button } from 'antd';
import { message } from 'antd';
import { Typography } from 'antd';
import { Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Progress } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Input, Tooltip } from 'antd';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AddIcon from '@material-ui/icons/Add';

import './new.css'
import PlaceOrder from './placeorder'
const { Paragraph } = Typography;
const { Title, Text } = Typography;

const data = [
    {
        key: '1',
        FileName: 'Mike',
    },
];

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ["hello", "world"]
        }
    }
    MaterialClicked = (m) => {
        console.log(m);
    }
    componentDidMount = async () => {







    }
    render() {

        const columns = [
            {
                title: 'File Name',
                dataIndex: 'FileName',
                key: 'FileName',
            }
        ]
        return (
            // <div className="tabledata">
            //     <Table columns={columns} dataSource={data} />
            // </div>


            <div className="page">
                <Row>
                    <Col span={6} className="lCol" >
                        <Text className="listHeader">Materials</Text>
                        <Divider />
                        <List component="nav" aria-label="main mailbox folders">
                            {this.state.list.map(item => (
                                <ListItem button onClick={() => { this.MaterialClicked(item) }}>

                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}

                        </List>
                        <Divider />
                    </Col >

                    <Col span={6} className="lCol">
                        <Text className="listHeader">Options</Text>
                        <Divider />
                        <List component="nav" aria-label="main mailbox folders">
                            {this.state.list.map(item => (
                                <ListItem button>

                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}

                        </List>
                        <Divider />

                    </Col >

                    <Col span={5} className="card">
                        <Card style={{ width: 300 }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>

                    </Col>
                    <Col span={1} className="button">
                        {/* <Button type="primary" >
                            Place Order
                        </Button> */}
                        <PlaceOrder />
                    </Col>
                </Row>
            </div >

        )
    }
}

export default New;