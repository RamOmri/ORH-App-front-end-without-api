'use strict';
import React from 'react'
import {
  StyleSheet,
  Text, TextInput,
  View, Button, ImageBackground,
  Image, TouchableOpacity,
  Alert,StatusBar,ScrollView, FlatList,
  BackHandler,
} from 'react-native'
import {  
    UIActivityIndicator,    
  } from 'react-native-indicators';
  import QRCodeScanner from 'react-native-qrcode-scanner';
  import { NavigationEvents, NavigationActions, StackActions } from 'react-navigation'

  import AsyncStorage from '@react-native-community/async-storage';

export default class RequisitionItems extends React.Component {
static navigationOptions = {
    header: null
};
  state = {
        ItemNumber: '',
        ItemQuantity: '',
        ItemQuantityColor: "#f2f6f9",
        Line: 1,
        itemExists: true,
        data: [],
        RequisitionNumber: this.props.navigation.state.params.num,
        username: this.props.navigation.state.params.user,
        Supplier: '',
    }
   
    QuantityInput(){
        return {
            justifyContent:'center',
            width:220,
            height:50,
            backgroundColor:this.state.ItemQuantityColor,
            borderRadius:25,
            marginBottom:10,
            color:'#1795e6'
          }
    }
    NextLine(){
     
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

     
    }
    
    componentWillUnmount() {
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
 
    }
    
    handleBackButtonClick() {
                      alert("Please press Cancel to go back")
      return true;
      
    }
    componentDidMount(){
      

    }
    checkItemValidity(){
        
      this.state.Line++;
      this.storeItem(this.state.Line.toString(), this.state.ItemNumber, 
      this.state.ItemQuantity.toString(), this.state.Supplier, "Description obtained from server");
                           
    }

    async storeItem(key, item, quantity, Supplier, desc) {
      try {
          //we want to wait for the Promise returned by AsyncStorage.setItem()
          //to be resolved to the actual value before returning the value
         await AsyncStorage.setItem(key, item);
         await AsyncStorage.setItem(key + ' quantity', quantity)
         await AsyncStorage.setItem(key + ' desc', desc)
         await AsyncStorage.setItem(key + ' supplier', Supplier)

         this.state.ItemNumber = '';
         this.state.ItemQuantity = '';
         this.state.Supplier = '';
         this.forceUpdate();
          return;
      } catch (error) {
        alert(error)
      }
    }

    _retrieveData = async () => {
      var items = [];
      try {
         for(var i = 1; i <= this.state.Line; i++){
            let value = await AsyncStorage.getItem(i.toString());
            let quantityValue = await AsyncStorage.getItem(i.toString() + ' quantity');
            let Supplier = await AsyncStorage.getItem(i.toString() + ' supplier');
            let desc = await AsyncStorage.getItem(i.toString() + ' desc')
            if (value !== null) {
              items.push({
                ItemCode: value,
                Supplier: Supplier,
                Quantity: quantityValue,
                Description: desc,
            });
            }
            else{
              //alert("value is null");
            }
        }
        this.state.data = items
       //alert(this.state.data)
      } catch (error) {
        // Error retrieving data
        alert(error + ' error in retrieve data');
      }
      AsyncStorage.clear();

      
      this.props.navigation.navigate('RequisitionPreview', {val: items, Line: this.state.Line, jobNumber: this.props.navigation.getParam('jobNumber'), user:this.state.username, num: this.state.RequisitionNumber});
      this.state.data = [];
    }; 

  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
        <View style = {{paddingBottom: 130}}>
        <NavigationEvents
                          onDidFocus={() =>{
                            
                                if(this.props.navigation.getParam('backPressed')){AsyncStorage.clear();
                                let d = this.props.navigation.getParam('data');
                                this.state.Line = 1;
                                for(let i = 0; i < d.length; i++){
                                  this.storeItem(this.state.Line.toString(), d[i].ItemCode, d[i].Quantity, d[i].Supplier, d[i].Description);
                                  this.state.Line++;
                                  //this.state.Line++;
                                } 
                                //this.state.Line++;
                                this.forceUpdate(); 
                              }
                          }}
                          />
            <View style = {{paddingBottom: 15}}>
                    <Image
                        style={styles.logo}
                        resizeMode='contain'
                        source={require('./img/logo.png')}
                        />  
            </View>
           
                <View style = {styles.screen_title}>
     <Text style={{fontSize:45,color:'#1795e6',margin:10, fontWeight: 'bold' }}>RQ {this.state.RequisitionNumber}: </Text>
                      <Text style={{fontSize:14,color:'#2481D2'}}>
                        Line number: {this.state.Line}
                      </Text>
                </View>
                    <View style = {{justifyContent:'center', alignItems: 'center'}}>
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

                            <View style= {styles.phone_input}>
                            <TextInput style={styles.iteminput}
                                                underlineColorAndroid="transparent"
                                                placeholder="Supplier"
                                                placeholderTextColor="#1795e6"
                                                autoCapitalize="none"           
                                                onChangeText={Supplier => {this.setState({ Supplier })
                                                    
                                                }}
                                                value={this.state.Supplier}
                                            />
                            </View>   

                            <View style= {styles.phone_input}>
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
               
                  
       <View style = {{flexDirection: 'row'}}>
         <TouchableOpacity
            style={styles.otp_send}
            onPress={() =>{
              if(this.state.ItemNumber === '' || this.state.ItemQuantity === '' || this.state.Supplier === ''){
                alert('please do not leave any fields empty')
              }
              else{
                this.checkItemValidity()
             
                
            }
                            }}
          >           
            <Text style={{fontSize:18,color:'white'}}>Save Line</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.preview_button}
            onPress={() =>{
              if(this.state.ItemNumber === ''){
              this._retrieveData();
              //var dataSent = 
              }
              else{
                alert('Please save line or delete item number')
                //  this.StoreAndPreview();
              }
            }}
          >           
            <Text style={{fontSize:18,color:'white'}}>Preview</Text>
          </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center',alignItems:'center'}}>
              <TouchableOpacity
                    style={styles.cancel_button}
                    onPress={() =>{
                      AsyncStorage.clear();
                      this.state.data = []
                      this.props.navigation.dispatch(StackActions.popToTop());
                }}
              >           
                <Text style={{fontSize:18,color:'white'}}>Cancel</Text>
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
        marginBottom: 5,
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
        width:100,
        height:40,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:30,
        marginBottom: 110,
        marginLeft:20,
        marginRight: 15,
      },
      cancel_button:{
        justifyContent: 'center',
        alignItems: 'center',
        width:200,
        height:50,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:30,
        marginBottom: 110,
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