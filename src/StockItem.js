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
  import {NavigationEvents, NavigationInjectedProps, withNavigation} from 'react-navigation'
  import AsyncStorage from '@react-native-community/async-storage';
  
export default class StockItem extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
        ItemNumber: '',
        ItemQuantity: '',
        ItemQuantityColor: "#f2f6f9",
        Line: 1,
        data: [],
        itemExists: false,
        scaned_value: this.props.navigation.getParam('num'),
        username: this.props.navigation.state.params.user,
        current_screen: 'StockItem'
    }
   
    QuantityInput(){
        return {
            justifyContent:'center',
            width:220,
            height:50,
            backgroundColor:this.state.ItemQuantityColor,
            borderRadius:25,
            marginBottom:5,
            color:'#1795e6'
          }
    }
    componentDidMount(){
      this.props.navigation.addListener("didFocus", () => {
        var number = this.props.navigation.getParam('val')
       this.setState({ItemNumber : number});
       this.forceUpdate();
       // alert(this.props.navigation.state.params.value)
     });
    }
    SaveLine(){
                                  let line = (this.state.Line).toString();
                                  let num = this.state.ItemNumber;
                                  let q = this.state.ItemQuantity;
                                  let desc = "item description obtained from the server"
                                  //alert(JSON.stringify(responseJson[i]));
                                  this.storeItem(line, num, q, desc);

                                  this.state.itemExists = true;
                                  this.state.ItemNumber = '';
                                  this.state.Line = this.state.Line + 1;
                                  this.setState({ItemQuantity: ''})
                                 
    }


    async storeItem(key, item, q, desc) {
      try {
          //we want to wait for the Promise returned by AsyncStorage.setItem()
          //to be resolved to the actual value before returning the value
         await AsyncStorage.setItem(key, item);
         await AsyncStorage.setItem(key + ' quantity', q)
         await AsyncStorage.setItem(key + ' desc', desc)
          return;
      } catch (error) {
        alert(error)
      }
    }

    _retrieveData = async () => {
      var items = [];
      try {
         for(var i = 1; i < this.state.Line; i++){
           
            var value = await AsyncStorage.getItem(i.toString());
            var quantityValue = await AsyncStorage.getItem(i.toString() + ' quantity');
            var valueDesc = await AsyncStorage.getItem(i.toString() + ' desc');
            if (value !== null && quantityValue !== null) {
              items.push({
                ItemCode: value,
                Quantity: quantityValue,
                description: valueDesc,
            });
            }
            
        }
        this.state.data = items
       //alert(this.state.data)
      } catch (error) {
        // Error retrieving data
        alert(error + ' error in retrieve data');
      }
      AsyncStorage.clear();
      this.state.ItemNumber = ''
      this.state.ItemQuantity = ''
       this.props.navigation.navigate('StockPreview', {val: this.state.data, Line: this.state.Line, jobNumber: this.props.navigation.getParam('jobNumber'), user:this.state.username, num: this.state.scaned_value, addedItem: true});
    }; 
    _handle_scan(){
      this.props.navigation.navigate('BarCodeScanner',{nav:this.state.current_screen});  
   
 }
  render() {
    return (
    

      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
        <View style = {{paddingBottom: 100}}>
            <NavigationEvents
                          onDidFocus={() =>{
                                if(this.props.navigation.getParam('backPressed')){
                                let d = this.props.navigation.getParam('data');
                                this.state.Line = 1;
                                for(let i = 0; i < d.length; i++){
                                  this.storeItem(this.state.Line.toString(), d[i].ItemCode, d[i].Quantity, d[i].description);
                                  this.state.Line++;
                                } 
                                //this.state.Line++;
                                this.forceUpdate(); 
                              }
                          }}
                          />

            <View style = {{paddingBottom: 35}}>
                    <Image
                        style={styles.logo}
                        resizeMode='contain'
                        source={require('./img/logo.png')}
                        />  
            </View>
           
                <View style = {styles.screen_title}>
     <Text style={{fontSize:20,color:'#1795e6',marginLeft:5, marginRight:5, marginBottom:15}}>{this.props.navigation.getParam('jobNumber')}: </Text>
                      <Text style={{fontSize:14,color:'#2481D2'}}>
                        Line number: {this.state.Line}
                      </Text>
                </View>
                    <View style = {{justifyContent:'center', alignItems: 'center'}}>
                          <View style = {{justifyContent:'center', alignItems: 'center'}}>
                              <TouchableOpacity
                                      style={styles.otp_send}
                                      onPress={() =>{ this._handle_scan();
                                        
                                      }}
                                      >           
                                      <Text style={{fontSize:18,color:'white'}}>Scan Item</Text>
                                    </TouchableOpacity>
                              </View>
                            <View style={styles.phone_input}>
                                  

                            <TextInput style={styles.iteminput}
                                                underlineColorAndroid="transparent"
                                                placeholder="Item Number"
                                                placeholderTextColor="#1795e6"
                                                autoCapitalize="none"            
                                                onChangeText={ItemNumber => {this.setState({ ItemNumber })
                                                    
                                                }}
                                                
                                                value={this.state.ItemNumber}
                                            />
                            </View>   
                            <View style= {this.QuantityInput()}>
                            <TextInput style={styles.iteminput}
                                                underlineColorAndroid="transparent"
                                                placeholder="Quantity"
                                                placeholderTextColor="#1795e6"
                                                autoCapitalize="none"    
                                                keyboardType = 'numeric'        
                                                onChangeText={ItemQuantity => this.setState({ ItemQuantity })}
                                                value={this.state.ItemQuantity}
                                            />
                            </View>   
                            
            </View>    
             
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems:'center', alignContent: 'center'}}>
            <TouchableOpacity
                style={styles.preview_button}
                onPress={() =>{this.SaveLine();
                  
                                }}
              >           
                <Text style={{fontSize:18,color:'white'}}>Save Line</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.preview_button}
                onPress={() =>{
                  this._retrieveData();
                }}
              >           
                <Text style={{fontSize:18,color:'white'}}>Preview</Text>
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
        marginBottom:5,
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
        width:220,
        height:50,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:30,
        marginBottom: 12,
        //marginLeft:60,
        //marginRight: 15,
      },
      preview_button:{
        justifyContent: 'center',
        alignItems: 'center',
        width:100,
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
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        marginBottom: 5,
        paddingRight: 15,
        paddingLeft:15,
        justifyContent:'center',
        alignItems: 'center'
      },
      logo:{
       width:150,
       height:100,
       justifyContent: "flex-start",
      }
})