import React, { Component } from 'react';

import { 
    
    Text,
    View,
    StyleSheet,
    ListView,
    Image,
    TouchableOpacity,
    
 } from 'react-native';

class Home extends Component {

    constructor(props) {
        super(props);
        
    }
    

    render() {
        return (
            <View style = {styles.container} >
                <Text>
                    首页
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default Home;