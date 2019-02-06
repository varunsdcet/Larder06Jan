import React, {Component} from 'react';
import {Platform,ActivityIndicator,NativeModules,
  NativeEventEmitter, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import Button from 'react-native-button'
const GLOBAL = require('./Global');
import { DrawerActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import RazorpayCheckout from 'react-native-razorpay';


export default class Wallet extends Component<Props> {
  static navigationOptions = {
  title: 'Login',
  header: null
};
state = {
    phone: '',
    password:'',
    username:'',
    loading:false,
    balance :'',
  };
  showLoading() {
     this.setState({loading: true})
  }

  hideLoading() {
     this.setState({loading: false})
  }
  buttonClickListeners = () =>{
   this.setState({username :'1000'})
  }
  buttonClickListenerss = () =>{
this.setState({username :'500'})
  }
  buttonClickListenersss = () =>{
this.setState({username :'200'})
  }
  getMoviesFromApiAsync = () => {
  this.showLoading();
        const url = 'http://139.59.76.223/larder/webservice/get_profile'

       fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     userID: GLOBAL.userID,


   }),
 }).then((response) => response.json())
     .then((responseJson) => {
         this.hideLoading();


         GLOBAL.profile = responseJson[0].image
          GLOBAL.username = responseJson[0].name
           GLOBAL.mobile = responseJson[0].mobile
          GLOBAL.email = responseJson[0].email

this.setState({balance :responseJson[0].wallet})

     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });
  }

    componentWillMount() {
      {this.getMoviesFromApiAsync()}
     }
  myPayment = (s) =>{


this.showLoading();
      const url = 'http://139.59.76.223/larder/webservice/add_wallet'

     fetch(url, {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
 body: JSON.stringify({
   userID: GLOBAL.userID,
   amount :s.toString(),


 }),
}).then((response) => response.json())
   .then((responseJson) => {
       this.hideLoading();

this.setState({balance :responseJson[0].wallet})




   })
   .catch((error) => {
     console.error(error);
      this.hideLoading();
       alert('Unable to process your request Please try again after some time')

   });
  }
  buttonClickListener = () =>{
    var s = parseInt(this.state.username)
    var b = s * 100;

    var options = {
              description: 'Larder',
              image: require('./logo.png'),
              currency: 'INR',
              key: 'rzp_live_j6WtEd1MKTdcih',
              amount: b.toString(),

              name: GLOBAL.username,
              prefill: {
                email: GLOBAL.email,
                contact: GLOBAL.mobile,
                name: GLOBAL.username
              },
              theme: {color: '#F37254'}
            }
            RazorpayCheckout.open(options).then((data) => {






                this.myPayment(s)
            }).catch((error) => {
              // handle failure

            });
            RazorpayCheckout.onExternalWalletSelection(data => {



            });

}
  render() {
    var commonHtml = `Wallet Balance :  ${this.state.balance} Points `;
    if(this.state.loading){
  return(
    <View style={{flex: 1 ,backgroundColor: 'black'}}>
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
      <View style = {{flex : 1  }}>

      <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
      {GLOBAL.username}
      </Text>

       <View style = {{flexDirection :'row'}}>

        <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
      <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
  source={require('./back.png')}/>
  </TouchableOpacity>
  <Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
  My Money
  </Text>
  <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Dislaimner')}>
  <Image style={{marginLeft : windowW - 200,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
  source={require('./disclaimer.png')}/>
    </TouchableOpacity>
   </View>

   <Image style={{marginLeft : windowW/2 - 50 ,height : 100 ,marginTop :30 , width : 100,resizeMode :'contain'}}
 source={require('./addmoney.png')}/>


   <Text style = {{alignSelf:'center',marginTop : 50 ,color :'white',fontSize :15}}>
   {commonHtml}
   </Text>
   <Text style = {{alignSelf:'center',marginTop : 10 ,color :'white' ,fontSize :15}}>
    1 Point = 1 INR
   </Text>

   <View style = {{margin :10 ,marginTop : 30,flexDirection :'row',justifyContent :'space-between',alignItems:'space-between'}}>

   <Button
       containerStyle={{padding:10, height:45, overflow:'hidden',borderBottomWidth :2,width :100,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'white',borderRightColor:'white',  borderTopColor :'white',borderBottomColor :'white',backgroundColor :'transparent'}}
       disabledContainerStyle={{backgroundColor: 'grey'}}
       style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
        onPress={this.buttonClickListeners}>
       1000
     </Button>

     <Button
         containerStyle={{padding:10, height:45, overflow:'hidden',borderBottomWidth :2,width :100 ,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'white',borderRightColor:'white',  borderTopColor :'white',borderBottomColor :'white',backgroundColor :'transparent'}}
         disabledContainerStyle={{backgroundColor: 'grey'}}
         style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
          onPress={this.buttonClickListenerss}>
         500
       </Button>


       <Button
           containerStyle={{padding:10, height:45, overflow:'hidden',borderBottomWidth :2,width :100 ,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'white',borderRightColor:'white',  borderTopColor :'white',borderBottomColor :'white',backgroundColor :'transparent'}}
           disabledContainerStyle={{backgroundColor: 'grey'}}
           style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
            onPress={this.buttonClickListenersss}>
           200
         </Button>
    </View>


    <Text style = {{margin : 20 ,color :'#90BA45',fontSize :12,fontFamily :'TypoGraphica'}}>
    Enter Amount
    </Text>

    <TextInput style = {{margin : 30,borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW.width - 20 ,height : 40 ,color :'white' ,fontSize : 16 ,fontFamily :'TypoGraphica'}}
      placeholder="Enter Your Amount"
      placeholderTextColor="white"
     keyboardType = 'numeric'
      onChangeText={(username) => this.setState({username})}
     value={this.state.username}
      >


    </TextInput>

    <Button
        containerStyle={{margin :50,marginTop :10,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#90BA45'}}
        disabledContainerStyle={{backgroundColor: 'white'}}
        style={{fontSize: 14, color: 'white',fontFamily:'TypoGraphica'}}
         onPress={this.buttonClickListener}>
        Add Money
      </Button>
    </View>

      </KeyboardAwareScrollView>

    );
  }
}
