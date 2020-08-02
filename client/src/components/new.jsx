import React from 'react';
import { Button } from 'antd';
import { message } from 'antd';
import { Typography } from 'antd';
import { Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Input, Tooltip } from 'antd';
import { Progress } from 'antd';


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
            optionmap : {},
            
            //card
            material:" ",
            option:" ",
            id : " ",
            quality : " ",
            quantity : " ",
            unitcost : 0,
            currreq : 0,
            percent : 0,
        }
    }
    MaterialClicked = (m) => {
        const { contract, accounts } = this.props.data;
        contract.methods.getOptionsOfMaterial(m).call({ from: accounts[0], gas: 3000000 })
        .then((result) => {

            this.setState({optionrawdata : result, material : m})

            var tlist = []
            var toptionmap = {}
            for(var i=0;i< result.length; i++)
            {
              tlist.push(result[i].name);
              toptionmap[result[i].name] = i;
            }
            this.setState({ optionlist: tlist , optionmap : toptionmap });
        })
    }

    OptionClicked = (m) => {
        
        if(typeof this.state.optionmap[m] != 'undefined'){

            var per = 
            (this.state.optionrawdata[this.state.optionmap[m]].currentReq/
            this.state.optionrawdata[this.state.optionmap[m]].quantity)*100;
        this.setState({
            id : this.state.optionrawdata[this.state.optionmap[m]].id,
            option : this.state.optionrawdata[this.state.optionmap[m]].name,
            quality : this.state.optionrawdata[this.state.optionmap[m]].quality,
            quantity : this.state.optionrawdata[this.state.optionmap[m]].quantity,
            unitcost : this.state.optionrawdata[this.state.optionmap[m]].unitcost,
            currreq : this.state.optionrawdata[this.state.optionmap[m]].currentReq,
            percent : per
        })
    }
    }
    componentDidMount = async () => {
        const { contract, accounts } = this.props.data;
        contract.methods.getAllMaterials().call({ from: accounts[0], gas: 3000000 })
        .then((result) => {
            
            this.setState({ materiallist: result });
        })
    }

    call=(id)=>{
        console.log(id);
        const { contract, accounts } = this.props.data;
        contract.methods.getOptionsOfMaterial(this.state.material).call({ from: accounts[0], gas: 3000000 })
        .then((result) => {

            this.setState({optionrawdata : result, material : m})

            var tlist = []
            var toptionmap = {}
            for(var i=0;i< result.length; i++)
            {
              tlist.push(result[i].name);
              toptionmap[result[i].name] = i;
            }
            this.setState({ optionlist: tlist , optionmap : toptionmap });
            
            var m = this.state.optionrawdata[id].name;
            if(typeof this.state.optionmap[m] != 'undefined'){

                var per = 
                (this.state.optionrawdata[this.state.optionmap[m]].currentReq/
                this.state.optionrawdata[this.state.optionmap[m]].quantity)*100;
                this.setState({
                id : this.state.optionrawdata[this.state.optionmap[m]].id,
                option : this.state.optionrawdata[this.state.optionmap[m]].name,
                quality : this.state.optionrawdata[this.state.optionmap[m]].quality,
                quantity : this.state.optionrawdata[this.state.optionmap[m]].quantity,
                unitcost : this.state.optionrawdata[this.state.optionmap[m]].unitcost,
                currreq : this.state.optionrawdata[this.state.optionmap[m]].currentReq,
                percent : per
            })
        }
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
                        <Card title="New Order" style={{ width: 300 }}>
                            <p className ="cardheader"><Text>Material: </Text>{this.state.material}</p>
                            <p className ="cardheader"><Text >Option: </Text>{this.state.option}</p>
                            <p className ="cardheader"><Text >Quality: </Text>{this.state.quality}</p>
                            <p className ="cardheader"><Text >Batch Size: </Text>{this.state.quantity}</p>
                            <p className ="cardheader"><Text >Unit Cost: </Text>{this.state.unitcost}</p>
                            <p className ="cardheader"><Text >Units Sold: </Text>{this.state.currreq}</p>
                            <Progress percent={this.state.percent} status="active" />
                        </Card>

                    </Col>
                    <Col span={3} className="button">
                        {/* <Button type="primary" >
                            Place Order
                        </Button> */}
                      
                        <PlaceOrder data={this.state} contractdata={this.props.data} call={this.call}/>
                      
                    </Col>
                </Row>
            </div >

        )
    }
}

export default New;