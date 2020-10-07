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

export default class ReceiptPreviewEdit extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
        username: this.props.navigation.getParam('user'),
        jobNumber: '',
        numberExists: false, 
        progress_icon:'none',
    }
  
     checkNumber(){
       /*
          checks whether number for job is correct
       */
       if(this.state.jobNumber == '') return 0

      this.setState({progress_icon:'flex'})
      
      this.state.numberExists = true;
          this.setState({progress_icon: 'none'})
          this.props.navigation.navigate('PhotoUploadScreen', {jobNumber: this.state.jobNumber, user: this.state.username})

} 
  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
             <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("./img/logo.png")}
          />
          <View style = {{alignItems: 'center'}}>
              <Text style = {styles.subtitle}>
                  Input a valid job-number
              </Text>
                <View style={styles.phone_input}>
                    <TextInput style={styles.iteminput}
                                underlineColorAndroid="transparent"
                                placeholder="Job Number"
                                placeholderTextColor="#1795e6"
                                autoCapitalize="none"            
                                onChangeText={jobNumber => this.setState({ jobNumber })}
                                value={this.state.jobNumber}
                            />
                    </View>
                    <TouchableOpacity
                            style={styles.otp_send}
                            onPress={() => this.checkNumber()}
                        >
                         
                            <Text style={{ fontSize: 18, color: "white" }}>
                            Submit
                            </Text>
                        </TouchableOpacity>
                         <View style={{display:this.state.progress_icon,width:'100%',alignItems:'center',marginTop:50}}>
                                  <UIActivityIndicator color='#1795e6' style={styles.ActivityIndicatorStyle}/>
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
      subtitle: {
        color: '#1795e6',
        fontSize: 16,
        fontFamily: 'Times New Roman',
        marginBottom: 10,
        paddingRight: 15,
        paddingLeft:15,
        justifyContent:'center',
        alignItems: 'center',
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
        marginBottom: 5,
        marginRight: 15,
      },
      preview_button:{
        justifyContent: 'center',
        alignItems: 'center',
        width:180,
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
       marginBottom: 200,
       justifyContent: "flex-start",
      }
})