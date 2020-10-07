// Login.js
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
import Icon from 'react-native-vector-icons/Feather';
import Password_Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class StockReceipt extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
      username: this.props.navigation.state.params.user,
      PO: '',
      poStatus: '',
      data: [],
    }

  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
        <View style = {{paddingBottom: 120}}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require('./img/logo.png')}
            />  
            </View>
            <View style = {{alignItems: 'center'}}>
                <View style = {styles.phone_input}>
                  
                        <TextInput style={styles.iteminput}
                                underlineColorAndroid="transparent"
                                placeholder="PO Number"
                                placeholderTextColor="#1795e6"
                                autoCapitalize="none"   
                                keyboardType= 'numeric'         
                                onChangeText={PO => this.setState({ PO })}
                                onFocus = {() =>{ 
                                //  this.state.data = require('./test.json');
                                  this.props.navigation.navigate('AutoCompleteScreenView', {nav:this.state.current_screen, data : this.state.data})}}
                                value={this.state.jobNumber}
                            />
   
                       
                </View>
                 <TouchableOpacity
                            style={styles.otp_send}
                            onPress={() =>{ 
                             // this.props.navigation.navigate('ReceiptPreview', { user: this.state.username})
                             alert("unfortunantely the next screen cannot work without api at the moment")
                            }}
                            >           
                            <Text style={{fontSize:18,color:'white'}}>Submit</Text>
                    </TouchableOpacity>
        </View>
    </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
      container: {    
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        backgroundColor:'white'
      },
      iteminput: {
        width: "80%",
        paddingLeft: 20,
        fontSize: 18,
        color:'#1795e6',
      },phone_input:{
        justifyContent:'center',
        width:220,
        height:50,
        backgroundColor:'#f2f6f9',
        borderRadius:25,
        marginBottom:20,
        color:'#1795e6'
    
      },
      otp_send:{
        justifyContent: 'center',
        alignItems: 'center',
        width:130,
        height:45,
        backgroundColor:'#1795e6',
        borderRadius:30,
        marginBottom: 35,
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