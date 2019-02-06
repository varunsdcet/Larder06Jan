import React, {Component} from 'react';
import { StyleSheet, Text, View,Image, Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
export default class Splash extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    }
}

 changeComponent = (component) =>{
    this.setState({componentSelected: component});
  }
 constructor(props) {
    super(props)
    this.state = {
      isVideoPlaying :true

    }
  }

  componentDidMount(){

    setTimeout(() => {
    var value =  AsyncStorage.getItem('userID');
     value.then((e)=>{
      GLOBAL.userID = e;

     })
     var values =  AsyncStorage.getItem('username');
      values.then((e)=>{
       GLOBAL.username = e;

      })
      var values =  AsyncStorage.getItem('mobile');
       values.then((e)=>{
        GLOBAL.mobile = e;

       })

   this.setState({isVideoPlaying:false})

   var value =  AsyncStorage.getItem('userID');
     value.then((e)=>{
     if (e == '' || e == null ){
       this.props.navigation.navigate('Slider')
     }else {
        this.props.navigation.navigate('TabNavigator')
     }

     })

   }, 5000);

}

  render() {
    return (
      <View style={styles.container}>

       <Image style = {{width :window.width ,height : window.height}}
         source={require('./splash.png')}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
