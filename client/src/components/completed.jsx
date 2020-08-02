import React from 'react';
import { List, Card } from 'antd';
import PlaceOrder from './placeorder'
import './ongoing.css'
import { Typography } from 'antd';

import { Table, Tag, Space } from 'antd';
const { Title, Text } = Typography;
// const data = [
//     {
//         title: 'Title 1',
//     },
//     {
//         title: 'Title 2',
//     },
//     {
//         title: 'Title 3',
//     },
//     {
//         title: 'Title 4',
//     },

// ]

class OnGoing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            temptabledata : {}
        }
    }
    temptabledata = {}
    fori(i)
    {
        const { contract, accounts } = this.props.data;
        contract.methods.getAllCompletedOrder(i).call({ from: accounts[0], gas: 3000000 })
        .then((result2)=>{

            var temp = this.state.data;
          
            console.log(result2);
            if(typeof this.temptabledata[i] === 'undefined')
            {
                this.temptabledata[i] = [];
            }
            for(var j=0; j<result2.length;j++)
            {
                
                this.temptabledata[i].push({
                    key : `${j+1}`,
                    buyer : result2[j].add,
                    quantity : result2[j].requirement
                })
            }
            console.log(i, this.temptabledata[i]);
            temp.push({

                orderid: i,
                material : result2[0].material,
                option : result2[0].id,
                dataSource :this.temptabledata[i]
            })

            this.setState({data : temp})
        })
    }
    componentDidMount = async () => {

        const { contract, accounts } = this.props.data;
        contract.methods.getOrderCount().call({ from: accounts[0], gas: 3000000 })
        .then((result) => {

      
          for(var i=0;i<result;i++)
          {
              this.fori(i);
         
          }
        
        
        
        })
    }
    render() {

        const columns = [
            {
              title: 'Buyer',
              dataIndex: 'buyer',
              key: 'buyer',
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity',
            },
        ];
            
        return (
            <div className='page'>
                <List
                    grid={{ gutter: 16, column: 2}}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={`Order : ${item.orderid}`}>
                            <p className ="cardheader"><Text>Material: </Text>{item.material}</p>
                            <p className ="cardheader"><Text >Option ID: </Text>{item.option}</p>
                            <Table dataSource={item.dataSource} columns={columns} />;
                            
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default OnGoing;