import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Roulette from 'react-native-casino-roulette';
import wheel from './wheel.png';
import marker from './marker.png';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');
const { widthe, heightw } = Dimensions.get('window');
const numbers = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]
const options  = numbers.map((o)=>({index:o}))
const customOptions = numbers.map((o)=> (
  <Text index={o}>{o}</Text>
));
export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
   return {
      header: () => null
   }
}
  constructor(props){
    super(props);
    this.onRotate = this.onRotate.bind(this);
    this.onRotateChange = this.onRotateChange.bind(this);
    this.onRotateCustom = this.onRotateCustom.bind(this);
    this.onRotateCustomChange = this.onRotateCustomChange.bind(this);
    this.state={
      option:"Option selected:",
      optionCustom:"Option selected:",
      rouletteState:'stop',
      rouletteCustomState:'stop'
    }
  }
  render() {
    const{option, rouletteState, optionCustom, rouletteCustomState} = this.state
    return (
      <View style = {{flex : 1 , width : width ,height : window.height ,backgroundColor:'black' }}>

      <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
      {GLOBAL.username}
      </Text>

       <View style = {{flexDirection :'row'}}>

        <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
      <Image style={{marginLeft : 10 ,height : 15 ,marginTop :25 , width : 15,resizeMode :'contain'}}
  source={require('./back.png')}/>
  </TouchableOpacity>
  <Text style = {{color :'white',fontSize : 16 ,marginLeft : 15, marginTop :21 }}>
  Quiz
  </Text>

   </View>
        <Text style = {{margin : 19 ,color :'white',fontFamily:'TypoGraphica'}}>
          {`Option selected: ${option}`}
        </Text>
       <View style = {{alignSelf :'center'}}>
        <Roulette
                  enableUserRotate={rouletteState=='stop'}
                  background={wheel}
                  onRotate={this.onRotate}
                  onRotateChange={this.onRotateChange}
                  marker={marker}
                  options={options}
                  markerWidth={20} >
        </Roulette>
</View>
 <Text style = {{fontSize : 20,alignSelf :'center',color :'white',fontFamily:'TypoGraphica'}}>
 Lucky Draw Contest.
 </Text>
 <Text style = {{margin:13,alignSelf :'center',color :'white',fontFamily:'TypoGraphica'}}>
Here your chance to win some wallet credit daily.You just need to spin the wheel once daily and you can win wallet credit daily.Result will be announces daily at 11.59PM
 </Text>



      </View>
    );
  }

  onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
  }

  onRotate(option) {
    const url = 'http://139.59.76.223/larder/webservice/record_quiz'

   fetch(url, {
   method: 'POST',
   headers: {
   'Content-Type': 'application/json',
   },
   body: JSON.stringify({
   userID: GLOBAL.userID,
   number :option.index.toString(),


   }),
   }).then((response) => response.json())
   .then((responseJson) => {

     if (responseJson[0].result == "success"){
    alert('Successfully  Quiz Submitted.')
     } else {
       alert('You Play Once in a Day')
     }


   })
   .catch((error) => {
   console.error(error);

     alert('Unable to process your request Please try again after some time')

   });
    this.setState({
      option:option.index
    })
  }

  onRotateCustomChange(state) {
    this.setState({
      rouletteCustomState: state
    })
  }

  onRotateCustom(option) {

    this.setState({
      optionCustom:option.props.index
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
