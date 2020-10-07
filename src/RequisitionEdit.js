'use strict';
import React from 'react'
import {
  StyleSheet,
  Text, TextInput,
  View, Button, ImageBackground,
  Image, TouchableOpacity,
  Alert,StatusBar,ScrollView, FlatList
} from 'react-native'
import {  
    UIActivityIndicator,    
  } from 'react-native-indicators';
  import QRCodeScanner from 'react-native-qrcode-scanner';
  import {NavigationInjectedProps, withNavigation} from 'react-navigation'
  import AsyncStorage from '@react-native-community/async-storage';
  
export default class RequisitionEdit extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
        number: this.props.navigation.getParam('number'),
        quantity: this.props.navigation.getParam('Quantity')
    }
  
    ConfirmEdit(){
      this.props.navigation.navigate('RequisitionPreview', 
      {delete: false, quan: this.state.quantity, edit: true, addedItem: false})
        
      }

  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
            <View style = {{alignItems: 'center'}}>
               <Text style = {styles.screen_title}>{this.props.navigation.getParam('number')}</Text> 
            </View>
            <View style = {{ alignContent: 'center', justifyContent: 'center', alignItems:'center'}}>

                  <View style={styles.phone_input}>
                <TextInput style={styles.iteminput}
                            underlineColorAndroid="transparent"
                           placeholderTextColor="#1795e6"
                           autoCapitalize="none"
                           keyboardType = 'numeric'             
                           onChangeText={quantity => {this.setState({ quantity })
                                                            
                                                        }}
                                                        
                                                        value={this.state.quantity}
                                                    />
                </View>

                <View style = {{flexDirection: 'row'}}>
                    <TouchableOpacity
                    style={styles.preview_button}
                    onPress={() =>{
                        this.props.navigation.navigate('RequisitionPreview', {delete: true, quan: this.state.quantity, edit: false, addedItem: false})
                    }}
                >           
                    <Text style={{fontSize:14,color:'white'}}>Delete Item</Text>
                </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.preview_button}
                    onPress={() =>{
                    this.ConfirmEdit();
                    }}
                >           
                    <Text style={{fontSize:14,color:'white'}}>Edit</Text>
                </TouchableOpacity>
            </View>

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
        marginBottom:20,
        color:'#1795e6'
        
      },
    iteminput: {
        width: "80%",
        paddingLeft: 20,
        fontSize: 18,
        color:'#1795e6'
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
        width:100,
        height:40,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:30,
        marginBottom: 35,
        marginLeft:60,
        marginRight: 15,
      },
      preview_button:{
        justifyContent: 'center',
        alignItems: 'center',
        width:120,
        height:40,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:30,
        marginBottom: 35,
        marginLeft:20,
        marginRight: 15,
      },
      screen_title:{
        color: '#1795e6',
        fontSize: 50,
        fontFamily: 'Times New Roman',
        marginBottom: 24,
        paddingRight: 15,
        paddingLeft:15,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 120,
      },
      logo:{
       width:150,
       height:100,
       justifyContent: "flex-start",
      }
})