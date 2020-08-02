import React from 'react';
import { Drawer, Menu, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { UserOutlined, SoundOutlined, ForkOutlined, FileSearchOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';
import Landing from './landing';
import New from './new';
import Completed from './completed';
import { GithubOutlined } from '@ant-design/icons';
import Logo from './logo.png';
import './home.scss';

const { Header, Content } = Layout;

const AppMenuMapper = [
    { key: '0', value: 'Home', icon: <HomeOutlined /> },
    { key: '1', value: 'New', icon: <SoundOutlined /> },
    { key: '2', value: 'Batch', icon: <ForkOutlined /> },


]

const LandingMenuMapper = [
    { key: '7', value: 'Docs', link: 'https://docs.google.com/presentation/d/1VjFbRpdo2TxCSc-uY6Fq671_KRXBkoPpbQQf0PSMr9k/edit?usp=sharing' },
    { key: '8', value: 'View on Github', link: 'https://github.com/abhishekvispute/decentralized-Cloud' },
]
let labels = [

]

let mapAuthAddresstoName = {}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            drawerVisible: false,
            selectedMenuItem: '0', selectedPage: <Landing />, contract: "",
            positionofpage: '',
        };
    }

    componentDidMount() {
        const { contract, accounts } = this.props.data;
       
        // this.setState({ accounts: this.props.data.accounts });
        // window.ethereum.on('accountsChanged', (acc) => {
        //     this.setState({ accounts: acc })

        //     if (this.props.data.contract != null) {
        //         this.call();
        //     }
        // })
    }
    call() {

    };

    handleToggleDrawer = (bool) => {
        this.setState({ drawerVisible: bool });
    }
    handleChangeMenu = (key) => {
        this.handleToggleDrawer(false);
        this.setState({ selectedMenuItem: key });
        if (key == '0') this.setState({ positionofpage: '' });
    }
    openpage = () => {
        this.setState({ selectedMenuItem: '1', positionofpage: "Orders", drawerVisible: false });
        console.log(this.props.data);


    }

    render() {
        return (
            <Layout className="home">
                <Header className="header">
                    <MenuOutlined className="menu-unfold" type="default" onClick={() => this.handleToggleDrawer(true)} />
                    <div>{this.state.positionofpage != '' ? this.state.positionofpage : <img src={Logo} style={{ height: '50px', width: 'auto' }} />}</div>
                    <Menu className="desktop-menu" theme="dark" mode="horizontal" selectedKeys={[this.state.selectedMenuItem]}>
                        {this.state.selectedMenuItem !== '0' ? AppMenuMapper.map((obj) => {
                            if (parseInt(obj.key) < 5 && parseInt(obj.key) != 1)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key}>{obj.value}</Menu.Item>
                            else if (parseInt(obj.key) == 1 && !this.state.isNoAuth)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key}>{obj.value}</Menu.Item>

                        }) :
                            LandingMenuMapper.map((obj) => {
                                return <Menu.Item key={obj.key}><a target='_blank' href={obj.link}>{obj.value}</a></Menu.Item>
                            })}
                    </Menu>
                </Header>
                <Drawer title="Welcome, User"
                    placement="left"
                    closable={true}
                    onClose={() => this.handleToggleDrawer(false)}
                    visible={this.state.drawerVisible}>
                    <Menu
                        style={{ width: 256 }}
                        selectedKeys={[this.state.selectedMenuItem]}
                        mode="inline"
                        theme="light">
                        {this.state.selectedMenuItem !== '0' ? AppMenuMapper.map((obj) => {
                            if (parseInt(obj.key) < 5)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key} icon={obj.icon}>
                                    {obj.value}
                                </Menu.Item>
                            else if (parseInt(obj.key) == 1 && !this.state.isNoAuth)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key}>{obj.value}</Menu.Item>

                        }) : LandingMenuMapper.map((obj) => {
                            return <Menu.Item key={obj.key}><a target='_blank' href={obj.link}>{obj.value}</a></Menu.Item>
                        })}
                    </Menu>
                </Drawer>
                {this.state.selectedMenuItem == '0' ? <Landing open={this.openpage} /> :
                    this.state.selectedMenuItem == '1' ? <New data={this.props.data}/> :
                        this.state.selectedMenuItem == '2' ? <Completed data={this.props.data}/> :


                            <div></div>}
            </Layout>
        );
    }
}

export default Home;