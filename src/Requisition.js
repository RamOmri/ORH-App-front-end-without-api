'use strict';
import React from 'react'
import {
  StyleSheet,
  Text, TextInput,
  View, Button, ImageBackground,
  Image, TouchableOpacity,
  Alert,StatusBar,ScrollView, RecyclerViewBackedScrollViewBase,
  BackHandler 
} from 'react-native'
import {  
    UIActivityIndicator,    
  } from 'react-native-indicators';
  import QRCodeScanner from 'react-native-qrcode-scanner';
  import {NavigationInjectedProps, withNavigation} from 'react-navigation'
  
export default class Requisition extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
      RequisitonNumber: '',
      username: this.props.navigation.getParam('user'),
    }
     
    _Go_To_Preview(){
      this.props.navigation.navigate('RequisitionItems', {user: this.state.username, num: "1234"}) 
    }
    
    componentWillMount() {
      //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
      //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
     
     //this.props.navigation.navigate('Menu')
      //return true;
      
    }
  

  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
        <View style = {{paddingBottom: 160}}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('./img/logo.png')}
                    />  
         </View>
                    <View style = {{justifyContent:'center', alignItems: 'center'}}>
                    
                       {/* <View style={styles.phone_input}>
                         <TextInput style={styles.iteminput}
                                underlineColorAndroid="transparent"
                                placeholder="Requisition Number"
                                placeholderTextColor="#1795e6"
                                autoCapitalize="none"  
                                keyboardType = 'numeric'          
                                onChangeText={ (num) => {
                                  this.state.RequisitonNumber = num
                                }}
                                value={this.state.jobNumber}
                            /> 
                        </View>*/}

                        <TouchableOpacity
                            style={styles.next_style}
                            onPress={() =>{ 

                             this._Go_To_Preview();
                             
                            }}
                            >           
                            <Text style={{fontSize:14,color:'white'}}>Create New</Text>
                    </TouchableOpacity>
                    </View>
       
    </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
    phone_input:{
        justifyContent:'center',
        width:220,
        height:50,
        backgroundColor:'#f2f6f9',
        borderRadius:25,
        marginBottom:28,
        color:'#1795e6'
    
      },
    iteminput: {
        width: "80%",
        paddingLeft: 10,
        fontSize: 14,
        color:'#1795e6',
      },
      container: {    
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        backgroundColor:'white'
      },
      otp_send:{
        justifyContent: 'center',
        alignItems: 'center',
        width:200,
        height:55,
        backgroundColor:'#1795e6',
        borderRadius:30,
        marginBottom: 20,
      },
      next_style:{
        justifyContent: 'center',
        alignItems: 'center',
        width:180,
        height:50,
        backgroundColor:'#1795e6',
        borderRadius:30,
      },
      screen_title:{
        color: '#1795e6',
        fontSize: 25,
        fontFamily: 'Times New Roman',
        marginBottom: 24,
        borderBottomColor: '#3380FF',
        borderBottomWidth: 5,
        paddingRight: 15,
        paddingLeft:15,
      },
      logo:{
       width:150,
       height:100,
       justifyContent: "flex-start",
      }
})