
import React, { Component } from 'react';


import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

var carJson = require('../Json/Car.json');


export default class CarListView extends Component {
    constructor(props, context) {
        super(props, context);
        
        var getSectionData = (dataBolb,sectionID) => {
            return dataBolb[sectionID]
        };
        var getRowData = (dataBlob,sectionID,rowID) => {
            return dataBlob[sectionID + ':' + rowID]
        };

        this.state = {
            dataSource: new ListView.DataSource({
                
                    getRowData :getRowData,//获取组中数据
                    getSectionData: getSectionData,//获取行中数据
                    rowHasChanged: (r1,r2) => r1 !== r2,
                    sectionHeaderHasChanged: (s1,s2) => s1 !== s2,
        
                })
        }
    }
    
    componentDidMount() {
        this.loadDataFormJson()
    }

    loadDataFormJson(){
        var carData = carJson.data

        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];
        var cars = [];
        
        for (var i = 0; i < carData.length; i++) {
            // 1. 把组号放入sectionIDs数组中
            sectionIDs.push(i);
           // 2.把组中内容放入dataBlob对象中

            dataBlob[i] = carData[i].title;
            // 3. 取出该组中所有的车

            cars = carData[i].cars;
            var rowIDTmp = [];
            
            for (var j = 0; j < cars.length; j++) {
               // 把行号放入rowIDs
                rowIDTmp.push(j);
                rowIDs[i] = rowIDTmp;
               // 把每一行中的内容放入dataBlob对象中
                dataBlob[i + ':' + j] = cars[j];
            }
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
            
        });

    }

    renderRowMethod(rowData){
        return(
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.rowStyle}>
                   <Image source={{uri: rowData.icon}} style={styles.rowImageStyle}/>
                   <Text style={{marginLeft:5}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderSectionHeaderMethod(sectionData, sectionID){

        return(
            <View style={styles.sectionHeaderViewStyle}>
               <Text style={{margin:5 ,color:'red'}}>{sectionData}</Text>
            </View>
        );

    }

    render(){
        return(
            <View style={styles.outerViewStyle}> 
                <View style ={styles.headerViewStyle} >
                    <Text style ={{color:'white',fontSize:18}} >
                        汽车列表
                    </Text>
                </View>
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {this.renderRowMethod}
                    renderSectionHeader = {this.renderSectionHeaderMethod}
                >
                
                </ListView>
            </View>
        );
    }


}



const styles = StyleSheet.create({
    outerViewStyle:{
        //占满窗口
          flex:1
      },
  
      headerViewStyle:{
          height:64,
          backgroundColor:'orange',
  
          justifyContent:'center',
          alignItems:'center'
      },
  
      rowStyle:{
          // 设置主轴的方向
          flexDirection:'row',
          // 侧轴方向居中
          alignItems:'center',
          padding:10,
  
          borderBottomColor:'#e8e8e8',
          borderBottomWidth:0.5
      },
  
      rowImageStyle:{
          width:70,
          height:70,
      },
  
      sectionHeaderViewStyle:{
          backgroundColor:'#e8e8e8',
          height:25,
          flexDirection: 'row',
        //   justifyContent:'center',
          alignItems: 'center'
      }
});