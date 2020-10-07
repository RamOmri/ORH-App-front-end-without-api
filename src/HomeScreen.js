'use strict';

import React from 'react'
import {
  StyleSheet,
  Text, TextInput,
  View, Button, ImageBackground,
  Image, TouchableOpacity,
  Alert,StatusBar,ScrollView
} from 'react-native'
import {  
    UIActivityIndicator,    
  } from 'react-native-indicators';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends React.Component {
static navigationOptions = {
    header: null
};
state = {
    progress_icon:'none',
    qr_view:'none',
    main_view:'flex',
    scaned_value:"Please scan Job", 
    current_screen: "HomeScreen",
 }
 componentDidMount(){
    // alert(this.props.navigation.state.params.value)
    this.setState({scaned_value:this.props.navigation.state.params.value})
 }
_handle_scan(){
     this.props.navigation.navigate('ScanScreen', {nav:this.state.current_screen})    
}

_handle_save(value){

    Alert.alert(
      'ORH-Scanning',
      'Job successfully saved!',
      [ 
        
        {text: 'OK', onPress: () => this.props.navigation.navigate('ReloadScreen'), style: 'ok'}
      ]
    );
}

  render() {
    return (
      
       
      <ImageBackground  style={[styles.container,{display:this.state.main_view}]}
        source={require('./img/background.png')}
        imageStyle={{ resizeMode: 'stretch' }}
      > 
        
        <Image
        style={styles.logo}
        resizeMode='contain'
        source={require('./img/logo.png')}
        />        
        <TouchableOpacity
          style={styles.otp_send}
          onPress={() => this._handle_scan()}
        >           
          <Text style={{fontSize:18,color:'white'}}>SCAN JOB</Text>
        </TouchableOpacity>
        <View style={styles.scan_view}>
           <Text style={styles.scaned_txt}>{this.props.navigation.state.params.value}</Text>
        </View>
        <TouchableOpacity
          style={styles.otp_send}
          onPress={() => this._handle_save(this.props.navigation.state.params.value)}
        >           
          <Text style={{fontSize:18,color:'white'}}>SAVE JOB</Text>
        </TouchableOpacity>
        <View style={{display:this.state.progress_icon,width:'100%',alignItems:'center',marginTop:50}}>
          <UIActivityIndicator color='#1795e6' style={styles.ActivityIndicatorStyle}/>
        </View> 
        
      </ImageBackground>
     
      
   
    );
  }
}

const styles = StyleSheet.create({
ActivityIndicatorStyle: {
    flex: 1,
justifyContent: 'center',
alignItems:'center',
    //position:'absolute',    
    },
container: {    
    alignItems: 'center',
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    backgroundColor:'white'
},
scan_view:{
    justifyContent: 'center',
    alignItems: 'center',
    width:280,
    height:200,
    backgroundColor:'#1795e6',
    borderRadius:25,
    margin:20,
    padding:10,
},
scaned_txt:{
   color:'white',
   fontSize:18,
   textAlign:'center'
},
  centerText: {
    flex: 1,
    fontSize: 18,
    padding:20,
    
    color: '#1795e6',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
    padding:20,
  },
  buttonTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width:280,
    height:50,
    backgroundColor:'#1795e6',
    borderRadius:25,
  },
  logo:{
    marginTop:70,
    width:200,
    height:100,
  },
  phone_input:{
    width:280,
    height:50,
    backgroundColor:'#f2f6f9',
    borderRadius:25,
    flexDirection:'row',
    marginBottom:20,
    color:'#1795e6'
  },
  otp_send:{
    justifyContent: 'center',
    alignItems: 'center',
    width:280,
    height:50,
    backgroundColor:'#1795e6',
    borderRadius:25,
  },
  otp_img:{
    height:80,
    width:80,
    
  },
  item: {
    width: "80%",
    height: 55,
    flexDirection: 'row',
    margin: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 2,

    justifyContent: 'center',

  },
  iteminput: {
    width: "80%",
    paddingLeft: 20,
    fontSize: 18,
    color:'#1795e6'
  },
  itemimage: {
    marginTop: 12,
    height: 25,
    width: 25,
  },
  button: {
    backgroundColor: "#79371A",
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,

  },

  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});
