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

  import {RNCamera} from 'react-native-camera';

export default class BarCodeScanner extends React.Component {
static navigationOptions = {
    header: null
};
constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = []
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
	    flashMode: RNCamera.Constants.FlashMode.auto,
      },
      progress_icon:'none',
      qr_view:'none',
      main_view:'flex',
      scaned_value:"Please scan Job" ,
      prev_screen: this.props.navigation.state.params.nav,
      torchOn: false
  }
}
  onBarCodeRead = (scanResult) => {
    if (scanResult.data != null) {
            if (!this.barcodeCodes.includes(scanResult.data)) {
              this.setState({scaned_value : scanResult.data})
              Alert.alert(
                'ORH-Scanning',
                scanResult.data,
                [ 
                  
                  {text: 'OK', onPress: () => this._handle_scanOff(), style: 'ok'}
                ]
              );
            }
        }
        return;
   }
   _handle_scanOff(){
     this.props.navigation.navigate(this.state.prev_screen, {val: this.state.scaned_value});
   }
   async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

_custom_alert(value){
    Alert.alert(
        'ORH-Scanning',
        value,
        [ 
          
          {text: 'OK', onPress: () => this._handle_scanOff(value), style: 'ok'}
        ]
      );
}
pendingView() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );
}

  render(){
    return (
        <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
         >
                    <Text style={{
                      backgroundColor: 'white'
                             }}>BARCODE SCANNER</Text>
            </RNCamera>
            
            </View>
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
preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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

