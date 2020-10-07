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

export default class Login extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
       username: 'user_one',
       password: '', 
       progress_icon:'none'
    }
 componentDidMount(){
  console.disableYellowBox = true;
 }
_handle_Login(username,password){
  this.props.navigation.navigate('Menu',{user:this.state.username,value:'Please scan Job', role: "Admin"})
} 

  render() {
    return (
      <ImageBackground style={styles.container}
        source={require('./img/background.png')}
        imageStyle={{ resizeMode: 'stretch' }}
      > 
        
        <Image
        style={styles.logo}
        resizeMode='contain'
        source={require('./img/logo.png')}
        />        
        <Text style={{fontSize:20,color:'#1795e6',margin:30}}>Log in to ORH-Scanning</Text>
        <View  style={styles.phone_input}>
        <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
          <Icon 
          name="user" 
          color={'#1795e6'}
          size={25}       
          />
        </View>
        <TextInput style={styles.iteminput}
            underlineColorAndroid="transparent"
            placeholder="User Name"
            placeholderTextColor="#1795e6"
            autoCapitalize="none"            
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <View  style={styles.phone_input}>
        <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
          <Password_Icon 
          name="onepassword" 
          color={'#1795e6'}
          size={25}       
          />
        </View>
        <TextInput style={styles.iteminput}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#1795e6"
            autoCapitalize="none"            
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.otp_send}
          onPress={() => this._handle_Login(this.state.username,this.state.password)}
        >           
          <Text style={{fontSize:18,color:'white'}}>LOG IN</Text>
        </TouchableOpacity>
        <View style={{display:this.state.progress_icon,width:'100%',alignItems:'center',marginTop:50}}>
          <UIActivityIndicator color='#1795e6' style={styles.ActivityIndicatorStyle}/>
        </View>     
        
      </ImageBackground>
     // </ScrollView>
    )
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
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    fontFamily: 'Zawgyi'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})