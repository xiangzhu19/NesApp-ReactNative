import React, { Component } from 'react';

import { 
    
    Text,
    View,
    StyleSheet,
 } from 'react-native';

class Find extends Component {

    constructor(props) {
        super(props);
        
    }
    

    render() {
        return (
            <View style = {[styles.container]} >
                <Text>
                    发现
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

export default Find;