import { createStackNavigator ,createAppContainer ,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import Slider from './Slider.js';
import Splash from './Splash.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Support from './Support.js';
import Dislaimner from './Dislaimner.js';
import MyBlog from './MyBlog.js';
import OrderHistory from './OrderHistory.js';
import Otp from './Otp.js';
import Recommended from './Recommended.js';
import OrderDetail from './OrderDetail.js';
import Landing from './Landing.js';
import BoothList from './BoothList.js';
import BoothDetail from './BoothDetail.js';
import Ingredients from './Ingredients.js';
import QrScan from './QrScan.js';
import Organisation from './Organisation.js';
import Wallet from './Wallet.js';
import Quiz from './Quiz.js';
import Home from './Home.js';
import Account from './Account.js';
import EditProfile from './EditProfile.js';
import WalletHistory from './WalletHistory.js';
import Search from './Search.js';
import Video from './Video.js';
import My from './My.js';
import ChangePassword from './ChangePassword.js';
import {NavigationActions} from 'react-navigation';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,Button,Image,Alert} from 'react-native';


const TabNavigator = createBottomTabNavigator({
            Home: { screen: Home,
            navigationOptions : {
    title:'Explore',

    tabBarLabel: 'Explore',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./searchs.png')}
        style={{width:20, height:20}}
      />
      }
       },
           QrScan: { screen: QrScan ,
                navigationOptions : {
    title:'Scan',
    tabBarLabel: 'Scan',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./scan.png')}
        style={{width:20, height:20}}
      />
      }
    },

    Recommended: { screen: Recommended ,
          navigationOptions : {
    title:'',
    tabBarLabel: '',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>

      <View style={{height:70, width:70, borderRadius:35,backgroundColor: '#90BA45',
          }}>

      <Image
        source={require('./deal.png')}
        style={{width:70, height:70,alignSelf:'center',resizeMode:'contain'}}
        />
     </View>

      }},


           BoothList: { screen: BoothList ,
                navigationOptions : {
    title:'Booths',
    tabBarLabel: 'Booths',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./booths.png')}
        style={{width:20, height:20}}
      />
      }
    },
            Account :{screen:Account,
                  navigationOptions : {
    title:'Account',
    tabBarLabel: 'Account',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require('./account.png')}
        style={{width:20, height:20}}
      />
      }
},
  },


 {
    defaultNavigationOptions: ({ navigation }) => ({



      tabBarIcon: () => (
      <Image
        source={require('./account.png')}
        style={{width:20, height:20}}
      />
      )
    }),
    tabBarOptions: {
      activeTintColor: '#90BA45',
      inactiveTintColor: 'white',
      inactiveBackgroundColor:'black',
      activeBackgroundColor:'black',
      showIcon:'true'
    },

  }
);


const StackNavigator = createStackNavigator({
   Splash: { screen: Splash },
  Slider: { screen: Slider },
    Landing: { screen: Landing },
    TabNavigator: { screen: TabNavigator },
    My: { screen: My },
  EditProfile: { screen: EditProfile },
    Support: { screen: Support },

    ChangePassword: { screen: ChangePassword },
    Search: { screen: Search },
            Home: { screen: Home },
    Recommended: { screen: Recommended },
    Quiz: { screen: Quiz },
    MyBlog: { screen: MyBlog },
    Account: { screen: Account },
  WalletHistory: { screen: WalletHistory },
  Dislaimner: { screen: Dislaimner },

    Wallet: { screen: Wallet },
    QrScan: { screen: QrScan },
OrderHistory: { screen: OrderHistory },

           BoothList: { screen: BoothList },
           BoothDetail: { screen: BoothDetail },

           Video: { screen: Video },
           Login: { screen: Login },
           Ingredients: { screen: Ingredients },
OrderDetail: { screen: OrderDetail },
           Signup: { screen: Signup ,
navigationOptions: ({ navigation }) => ({
 headerTintColor: 'white',
   title: 'Signup',
    headerStyle: {
    backgroundColor: 'black'

  }

}),
},

Otp: { screen: Otp ,
navigationOptions: ({ navigation }) => ({
headerTintColor: 'white',
title: 'Otp',
headerStyle: {
backgroundColor: 'black'

}

}),
},


Organisation: { screen: Organisation ,
navigationOptions: ({ navigation }) => ({
headerTintColor: 'white',
title: 'Organisation',
headerStyle: {
backgroundColor: 'black'

}

}),
},

},
{headerMode :'none'}
);

export default createAppContainer(StackNavigator);
