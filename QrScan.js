import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';
const GLOBAL = require('./Global');
import { NavigationActions,StackActions } from 'react-navigation';
export default class QrScan extends Component {
  static navigationOptions = {
  title: 'Login',
  header: null
};
  constructor(props) {
    super(props);
    this.state = {
      flashMode: false,
      zoom: 0.2,
      check :false,
      acessCode :'',
      boxID :'',
      alertpresent :true,
            camEnabled: true

    };
  }

  render() {



    return (
      <View style={styles.container}>
        <QRscanner onRead={this.onRead}
        cornerBorderColor ='#90ba45'
        cornerRadius={40}
        isRepeatScan = {true}
        cornerBorderRadius={40}
        cornerColor ='#90ba45'
        scanBarColor='#90ba45'
        cornerBorderWidth={10}
        cornerBorderLength={60}
        hintText="Please Align QrCode"
        renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={50}/>
      </View>
    );
  }
  bottomView = ()=>{
    return(
    <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
      <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
        <Text style={{color:'#fff'}}>Flashlight on</Text>
      </TouchableOpacity>
    </View>
    );
  }


  getMoviesFromApiAsync = () => {


        const url = 'http://139.59.76.223/larder/webservice/check_order'

       fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     userID: GLOBAL.userID,
     mobile :GLOBAL.mobile,
     boxId :this.state.boxID,
     accessToken :this.state.acessCode,



   }),
 }).then((response) => response.json())
     .then((responseJson) => {
       var ss = "1"

       if (responseJson.code == ss){
         this.setState({check :false})
       Alert.alert('Thank you!','Your order placed successfully.',
       [
         {text:"OK", onPress:()=>this._YesLogout()
  },
       ],
       {cancelable:false}
       )
       } else {
         this.getMoviesFromApiAsync()
       }






     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });
  }
_scanAga=()=>{
       Alert.alert('Wrong Code Scanned!','It seems you have scanned other than Larder code',
       [
         {text:"OK", onPress:()=>this._YesLogout()
  },
       ],
       {cancelable:false}
       )

}

_YesLogout=()=>{
  this.setState({alertpresent :true})
      this.props
             .navigation
             .dispatch(StackActions.reset({
               index: 0,
               actions: [
                 NavigationActions.navigate({
                   routeName: 'TabNavigator',
                   params: { someParams: 'parameters goes here...' },
                 }),
               ]
             })
             )
}

  onRead = (res) => {
    var y = res.hasOwnProperty("data");

  if (res.data.includes('=')){

  } else {
   if (this.state.alertpresent){
     this.setState({alertpresent : false})
    this._scanAga()
  }

    //alert('It Seems you Scan Other Than Larder Code')
    return
  }
    var boxid = res.data.split("=")

    var k = boxid[1]
     this.setState({boxID:k})

    if (this.state.check == false){
      this.setState({check :true})


      var acess = ""
      fetch('https://www.larder.in/project/login.php')
       .then((response) => response.json())
       .then((responseJson) => {
        acess =  responseJson.data.accessToken

         this.setState({acessCode:acess})

        const url = 'http://139.59.76.223/larder/webservice/open_door_by_scan'

       fetch(url, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     mobile: GLOBAL.mobile,
     accessToken :acess,
     boxId :boxid[1],

    }),
    }).then((response) => response.json())
     .then((responseJson) => {

       var status = "1200"
      var code = responseJson.data.openDoorCode

       if (code == status) {
 alert('Welcome to Larder Booth. Please open the door to shop!')
      this.getMoviesFromApiAsync();
       } else {
         alert('Unable to process your request. Please try again after some time.')
         this.setState({check :false})
       }





     })
     .catch((error) => {
       console.error(error);
        this.hideLoading();
         alert('Unable to process your request Please try again after some time')

     });
       })
       .catch((error) => {
         console.error(error);
       });






  }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
