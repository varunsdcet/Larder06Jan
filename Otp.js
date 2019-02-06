import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'
const GLOBAL = require('./Global');
import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
var codes = "";


export default class Otp extends Component<Props> {
  showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }
state = {
    phone: '',
    password:'',
    loading :false,
  };

  buttonClickListener = () =>{


     if (codes == ''){
       alert('Please Enter Otp')
     } else if (codes != GLOBAL.otps){
        alert('Otp not Match')
     }


       else {
      this.showLoading()
       const url = 'http://139.59.76.223/larder/webservice/signup'

       fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     name: GLOBAL.username,
     mobile: GLOBAL.mobile,
     email: GLOBAL.email,
     password: GLOBAL.password,
     image :'user.png',
     organisation: GLOBAL.organisationID,
     deviceType: Platform.OS,
     deviceToken: "",
     deviceID  : "",
     authID : "",
     auth : "Normal",
     employeeID : GLOBAL.employeeId,


   }),
  }).then((response) => response.json())
     .then((responseJson) => {
  this.hideLoading()

   if (responseJson[0].result == "success"){
     AsyncStorage.setItem('mobile', responseJson[0].mobile);
     AsyncStorage.setItem('userID', responseJson[0].userID);
     AsyncStorage.setItem('username', responseJson[0].name);
     AsyncStorage.setItem('email', responseJson[0].email);
     GLOBAL.userID = responseJson[0].userID;
     GLOBAL.username = responseJson[0].name;
     GLOBAL.mobile = responseJson[0].mobile;
     GLOBAL.email = responseJson[0].email;
     this.props.navigation.navigate('TabNavigator')
   }
     })
     .catch((error) => {
       console.error(error);
        alert('Unable to process your request Please try again after some time')
     });
     }
   }






  _onFulfill(code){
  codes =  code
  }

  render() {
    let { phone,password } = this.state;
    if(this.state.loading){
 return(
   <View style={{flex: 1,  backgroundColor: 'black'}}>
   <ActivityIndicator style = {{ position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
      }}

  size="large" color="#90BA45" />
   </View>
 )
}
    return (
      <KeyboardAwareScrollView style = {{backgroundColor:'black',width : windowW ,height :windowH,flex:1}}>


 <View style={{margin: 0,marginTop: 40}}>

 <Text style = {{margin : 10 ,width : windowW - 20 ,color :'white' ,fontSize :28 ,fontFamily :'TypoGraphica'}}>
Verify your number
 </Text>

 <Text style = {{margin : 10 ,width : windowW - 40 ,color :'white' ,fontSize :22 ,fontFamily :'TypoGraphica'}}>
Otp has been sent to your mobile number.
 </Text>


 <CodeInput
     ref="codeInputRef1"
     keyboardType="numeric"
     secureTextEntry
     className={'border-b'}
     space={5}
     size={30}
     inputPosition='center'
     activeColor = 'white'
     inactiveColor =  'white'
     onFulfill={(code) => this._onFulfill(code)}
   />


</View>
<TouchableOpacity

    onPress={() => this.buttonClickListener()}
  >
<Image style={{width : 70 ,height : 60 ,marginTop :80 , marginLeft:windowW - 80,resizeMode :'contain'}}
source={require('./next.png')}/>

</TouchableOpacity>


      </KeyboardAwareScrollView>

    );
  }
}
