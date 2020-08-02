import { Input, Tooltip } from 'antd';
import { Modal, Button } from 'antd';
import React from 'react';
import {  Space } from 'antd';
import { Typography } from 'antd';
import { message } from 'antd';
const { Title, Text } = Typography;

function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
    onChange = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
        }
    };

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
        if (onBlur) {
            onBlur();
        }
    };

    render() {
        const { value } = this.props;
        const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
        ) : (
                'Input a number'
            );
        return (
            <Tooltip
                trigger={['focus']}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    placeholder="Enter Quantity"
                    maxLength={25}
                />
            </Tooltip>
        );
    }
}

export default class NumericInputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            max:0,
            units: "",
            cost : "",
            loadings :false,
        };
    }

    componentDidMount = async () => {
        const { contract, accounts } = this.props.contractdata;
       

       
    }
   
    componentDidUpdate(prevProps, prevState) {
        // check whether client has changed
        if (prevProps.data.quantity !== this.props.data.quantity) {
            this.setState({units : (this.props.data.quantity-this.props.data.currreq)});
        }
    }
    onChange = value => {
        this.setState({ value });
        this.setState({ cost : (parseInt(this.props.data.unitcost)*parseInt(value))})
    };

    submit = () =>{
        if(this.state.cost==""){
            message.error("Please select Material and Product first");
            this.setState({value : ''});
        }
        else
        {
        this.setState({loadings : true })
        const { contract, accounts } = this.props.contractdata;
        contract.methods.placeOrder(this.props.data.material, this.props.data.id, this.state.value).send({ from: accounts[0], gas: 3000000 })
        .then((receipt) => {
            message.success('Order Placed Sucessfully');
            console.log(receipt)
            this.setState({ loadings: false });
            this.props.call(this.props.data.id);
        })
        .catch((err) => {
            message.error('Sorry your order was not successful Please try again');
            this.setState({ loadings: false });
        })
      }
    }
   

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <>
              <Space direction="vertical">
        <Text type="secondary">Units required to complete batch : {this.state.units}</Text>
                        <Text type="secondary" >Cost: {this.state.cost}</Text>
                         <div> <NumericInput style={{ width: 150 }} value={this.state.value} onChange={this.onChange} className="numinput"/></div>
                           <Button type="primary" onClick={this.submit} className="realButton" loading={this.state.loadings}>
                              Place Order
                           </Button>
             </Space>
                    
               
            </>

        );
    }
}

