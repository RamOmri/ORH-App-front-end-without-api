'use strict';
import React from 'react'
import {
  StyleSheet,
  Text, TextInput,
  View, Button, ImageBackground,
  Image, TouchableOpacity,
  Alert,StatusBar,ScrollView, RecyclerViewBackedScrollViewBase, 
} from 'react-native'
import {  
    UIActivityIndicator,    
  } from 'react-native-indicators';
  import QRCodeScanner from 'react-native-qrcode-scanner';
  import {NavigationInjectedProps, withNavigation} from 'react-navigation'
  
export default class StockDispatch extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
      jobNumber: '',
      scaned_value: '',
      current_screen: "StockDispatch",
      data: [], 
      numberExists: false,
      username: this.props.navigation.getParam('user'),
    }

   
    componentDidMount(){ 
      this.props.navigation.addListener("didFocus", () => {
       var number = this.props.navigation.getParam('value')
      this.setState({jobNumber : number});
      this.forceUpdate();
      // alert(this.props.navigation.state.params.value)
    });
       
     
   }
   
    _handle_scan(){
        this.props.navigation.navigate('ScanScreen',{nav:this.state.current_screen});  
     
   }
   
   

  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
        <View style = {{paddingBottom: 130}}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('./img/logo.png')}
                    />  
         </View>
                    <View style = {{justifyContent:'center', alignItems: 'center'}}>
                     <View style = {{justifyContent:'center', alignItems: 'center'}}>
                    <TouchableOpacity
                            style={styles.otp_send}
                            onPress={() =>{ this._handle_scan();
                              
                            }}
                            >           
                            <Text style={{fontSize:18,color:'white'}}>Scan Job</Text>
                    </TouchableOpacity>
                    </View>
                        <View style={styles.phone_input}>
                        <TextInput style={styles.iteminput}
                                underlineColorAndroid="transparent"
                                placeholder="Job Number"
                                placeholderTextColor="#1795e6"
                                autoCapitalize="none"            
                                onChangeText={jobNumber => this.setState({ jobNumber })}
                                onFocus = {() =>{ 
                                //  this.state.data = require('./test.json');
                                  this.props.navigation.navigate('AutoCompleteScreenView', {nav:this.state.current_screen, data : this.state.data, username: this.state.username})}}
                                value={this.state.jobNumber}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.next_style}
                            onPress={() =>{ 
                              this.state.numberExists = true;
                              this.props.navigation.navigate('StockItem',{jobNumber: this.state.jobNumber, user:this.state.username, num: this.state.jobNumber});
                             
                            }}
                            >           
                            <Text style={{fontSize:14,color:'white'}}>Next</Text>
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
        marginBottom:60,
        color:'#1795e6'
    
      },
    iteminput: {
        width: "80%",
        paddingLeft: 20,
        fontSize: 18,
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
        width:140,
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