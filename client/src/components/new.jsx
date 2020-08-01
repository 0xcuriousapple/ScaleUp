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


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materiallist: [],
            optionlist:["Select Material to see options available for that material"],
            optionrawdata : [],
            id : " ",
            quality : " ",
            quantity : " ",
            unitcost :" ",
        }
    }
    MaterialClicked = (m) => {
        const { contract, accounts } = this.props.data;
        contract.methods.getOptionsOfMaterial(m).call({ from: accounts[0], gas: 3000000 })
        .then((result) => {

            this.setState({optionrawdata : result})

            var tlist = []
            for(var i=0;i< result.length; i++)
            {
              tlist.push(result[i].name);
            }
            this.setState({ optionlist: tlist });
        })
    }

    OptionClicked = (m) => {
      
        this.setState({
            id : "1",
            quality : "Supreme",
            quantity : 10,
            unitcost :1000,
        })
    }
    componentDidMount = async () => {
        const { contract, accounts } = this.props.data;
        contract.methods.getAllMaterials().call({ from: accounts[0], gas: 3000000 })
        .then((result) => {
            
            this.setState({ materiallist: result });
        })




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
                            {this.state.materiallist.map(item => (
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
                            {this.state.optionlist.map(item => (
                                  <ListItem button onClick={() => { this.OptionClicked(item) }}>

                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}

                        </List>
                        <Divider />

                    </Col >

                    <Col span={5} className="card">
                        <Card style={{ width: 300 }}>
                            <p>ID : {this.state.id}</p>
                            <p>Quality: {this.state.quality}</p>
                            <p>Quantity Required: {this.state.quantity}</p>
                            <p>UnitCost: {this.state.unitcost}</p>
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