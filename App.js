/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import TimerMixin from 'react-timer-mixin';


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';


// var TimerMixin = require('react-timer-mixin')


// var Dimensions = require('react-dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

var ImageData = require('./src/Json/ImageData.json')

  
 export default class App extends Component {
   constructor(props, context) {
     super(props, context);

     [
      'startTimer',
      'stopTimer',
      'renderAllImage',
      'renderPageCircle',
      
  ].forEach(func => {
      this[func] = this[func].bind(this);
    });//绑定func


     this.state = {
       currentPage: 0,
     }
     
     console.log('====================================');
     console.log(ScreenWidth);
     console.log(ScreenHeight);
     console.log(this.props.duration)
     console.log('====================================');
   }

  
   
//注册计时器
  // mixins = [TimerMixin];
   
  render() {
    
    return (
      <View style={styles.container}>
          <ScrollView 
            ref= 'ScrollView'
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            pagingEnabled = {true}
            // 当一帧滚动结束
            // onMomentumScrollEnd = {this.onAnimationEnd}
            onMomentumScrollEnd = {(e) =>this.onAnimationEnd(e) }
            onScrollBeginDrag = {this.stopTimer}
            onScrollEndDrag = {this.startTimer }
            
            >
            {this.renderAllImage()}
            
          </ScrollView>
          <View style = {styles.pageViewStyle} >
            {this.renderPageCircle()}
          </View>
       
      </View>
    );
  }

  // 实现一些复杂的操作
  componentDidMount() {
    // 开启定时器
    this.startTimer();
  }
  componentWillUnmount() {
    
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }
  // 开启定时器
  startTimer(){
    // 拿到ScrollView
    var scrollView = this.refs.ScrollView;
    var imgCount = ImageData.data.length;
    
    // 添加定时器
    this.timer = setInterval( () => {
      // 2.1 设置圆点
      var activePage = 0;
      // 2.2 判断
      if((this.state.currentPage+1) >= imgCount){ // 越界
         activePage = 0;
      }else{
         activePage = this.state.currentPage+1;
      }

      // 2.3 更新状态机
      this.setState({
        currentPage: activePage
      });

      // 2.4 让scrollView滚动起来
      var offsetX = activePage * ScreenWidth;
      scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});

   }, this.props.duration);

  }

  stopTimer(){
    console.log('停止timer')
    clearInterval(this.timer);
  }

  renderAllImage(){

    var allImage = [];
    var imageArr = ImageData.data;
    for (let i = 0; i < imageArr.length; i++) {
      var imageItem = imageArr[i];

      
      //创建组件装入数组s
      allImage.push(
   
        <Image
          key = {i} 
          source = {{uri:imageItem.img}}
          style = {{width: ScreenWidth,height: 150}} >
          
       
        </Image>

      );
    }
    // 返回数组
    return allImage;
  }

  renderPageCircle(){
    var indicatorArr = [];
    var imgArr = ImageData.data;
    var style;

    for (let index = 0; index < imgArr.length; index++) {
      // const element = array[index];

      style = (index == this.state.currentPage)? {color: 'orange'} : {color: '#FFFFFF'}
      indicatorArr.push(
          <Text key = {index} style = {[{fontSize: 25},style]} >
            &bull;

          </Text>
      );
      
    }
    return indicatorArr;
  }

  onAnimationEnd(e){
    // 1.水平方向偏移量
    var offsetX = e.nativeEvent.contentOffset.x;
    // 2.当前页数
    var currentPage = Math.floor(offsetX/ScreenWidth);//向下取整
    // console.log(currentPage)
    // 3.更新状态机，重新绘制UI
    this.setState({
      currentPage: currentPage
    });
  }

}


App.defaultProps = {
  duration: 2000,
};



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    marginBottom: 20,
  
    

  },

  pageViewStyle: {
    width: ScreenWidth,
    height: 25,
    backgroundColor:'rgba(0,0,0,0.4)',    
    // 定位
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    // backgroundColor: 'green',
  },
});


