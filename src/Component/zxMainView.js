import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { 
    Text,
    View,
    Image,
    NavigatorIOS,
    TabBarIOS,
    StyleSheet,
 } from 'react-native';


 import Home from './zxHome';
 import Message from './zxMessage';
 import Mine from './zxMine';
 import Find from './zxFind';

class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 'home',
        }
    }
    
    

    render() {
        return (

            <TabBarIOS
                tintColor = "orange"
                // barTintColor = 'blue'
            >
                <TabBarIOS.Item 
                    icon = {{uri: 'tabbar_home',scale : 2}}
                    title = "首页"
                    selected = {this.state.selectedItem == 'home'}
                    onPress = {()=> {this.setState({selectedItem:'home'})}}
                >

                    <Home/>
                </TabBarIOS.Item>

                 <TabBarIOS.Item
                    icon = {{uri: 'tabbar_message_center',scale : 2}}
                    title = "消息"
                    selected = {this.state.selectedItem == 'message'}
                    onPress = {()=> {this.setState({selectedItem:'message'})}}
                    
                >
   
                    <Message/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon = {{uri: 'tabbar_discover',scale : 2}}
                    title = "发现"
                    selected = {this.state.selectedItem == 'find'}  
                    onPress = {()=> {this.setState({selectedItem:'find'})}}
                    
                >
 
                    <Find/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon = {{uri: 'tabbar_profile',scale : 2}}
                    title = "我的"
                    selected = {this.state.selectedItem == 'mine'}   
                    onPress = {()=> {this.setState({selectedItem:'mine'})}}
                    
                >

                    <Mine/>
                </TabBarIOS.Item> 

        </TabBarIOS>

                
        );
    }
}

export default MainView;