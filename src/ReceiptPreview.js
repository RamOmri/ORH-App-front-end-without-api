// Login.js
import React, { Component } from 'react'
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
import Icon from 'react-native-vector-icons/Feather';
import Password_Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { List, ListItem,  } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation';

export default class ReceiptPreview extends Component{
static navigationOptions = {
    header: null
};

    constructor(props){
      super(props)
      this.state = {
          data: this.props.navigation.getParam('val'),
          username: this.props.navigation.getParam('user'),
          editedItem: -1,
          SendObject: null,
          received: [],
          quantityOpen:[],
          index: 0
          }
          for(let i = 0; i < this.state.data.items.length; i++){
            this.state.received[i] = 0;
            this.state.quantityOpen[i] = this.state.data.items[i].quantityOrdered - this.state.data.items[i].quantityReceived

          }
      }
        CreateObject(){
          let items = [];
          for(let i = 0; i < this.state.data.items.length; i++){
            items.push({
              ItemCode : this.state.data.items[i].itemCode,
              Quantity : this.state.received[i]
            });
          }
            this.state.SendObject = {
                User: this.state.username,
                PurchaseOrderNumber: this.state.data.poNumber,
                JobNumber : this.state.data.items[0].job,
                Items: items,
            };
        }

        componentDidMount(){
          
        }

        SendObject(){
        let obj =   this.state.SendObject;
          fetch(`${api.endPoints.loc}/api/Stock/receipt`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
            
          }).then((response)=>{
            alert("Update Completed. Receipt# " + this.state.data.poNumber);
    
          }).catch(function(error){
            alert(error + ' error when sending items')
          })
          this.props.navigation.navigate('StockReceipt');
        }
  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
          <View style = {styles.container}>
                <View>
                    <Text style={{fontSize:40,color:'#235CBB',margin:5}}>{this.state.data.poNumber} </Text>
                    <Text style={styles.screen_subtitle}>{this.state.data.supplierName}</Text>
                </View>
                      <ScrollView
                        style = {{flex: 1}}
                        scrollEnabled = {true}
                      >
                        <View style={{justifyContent:'flex-start', paddingTop: 10, marginBottom: 100, height:'90%'}}>
                            <NavigationEvents
                            onDidFocus={() =>{
                                 if(this.props.navigation.getParam('edit')){ 
                                    let editedQuantity = this.props.navigation.getParam('quan');
                                   
                                    this.state.received[this.state.editedItem] = editedQuantity;
                                    this.forceUpdate();
                                }

                            }}
                            />
                              <FlatList
                              scrollEnabled = {true}
                              contentContainerStyle={styles.cardcontainer}
                                data = {Object.keys(this.state.data.items)}
                                renderItem={({ item }) => (
                                  <View style={{flexDirection:'column'}}> 
                                    
                                <Text  style={styles.Item_title}
                                  onPress = {() =>{
                                      this.state.editedItem = item;
                                    this.props.navigation.navigate('ReceiptPreviewEdit', {code: this.state.data.items[item].itemCode , quantity: this.state.received[item]});
                                  }}
                                >
                                
                                    {this.state.data.items[item].itemCode} - Quantity Recieved: {this.state.received[item]}
                                  
                                 
                                 </Text>
                                  <Text style={styles.qty_style}
                                     onPress = {() =>{
                                    }}
                                  >
                                     Quantity Open: {this.state.quantityOpen[item]}
                                     </Text>
                                </View>
                                )}
                              />
                          
                        </View>
                      </ScrollView>
                               <View style = {{flexDirection:'row', justifyContent: 'center', alignContent: 'center'}}>   
                                    <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity
                                        style={styles.confirm_button}
                                        onPress={() =>{
                                            this.props.navigation.navigate('StockReceipt');
                                        }}
                                        >           
                                        <Text style={{fontSize:18,color:'white'}}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity
                                        style={styles.confirm_button}
                                        onPress={() =>{
                                            this.CreateObject();
                                            this.SendObject();
                                        }}
                                        >           
                                        <Text style={{fontSize:14,color:'white'}}>Confirm and Load</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>  
                      </View>
         
               
             
            
    </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
      container: {    
        padding: 0,
        paddingTop: 15,
        margin: 0,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor:'white'
      },
     
      cardcontainer: {
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 4,
        borderWidth: 0,
        flex: 1
       },
      confirm_button:{
        justifyContent: 'center',
        alignItems: 'center',
        width:150,
        height:45,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:30,
        marginBottom: 7,
        marginLeft:5,
        marginRight: 15,
        marginTop:5,
      },
      screen_title:{
        color: '#1795e6',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        marginBottom: 0,
        paddingRight: 15,
        paddingLeft:15,
      },
      screen_subtitle:{
        color: '#235CBB',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        marginBottom: 25,
        paddingRight: 15,
        paddingLeft:15,
      },
      Item_title:{
        color: '#1795e6',
        fontSize: 20,
        fontFamily: 'Times New Roman',
        borderTopColor:'#3380FF',
        borderTopWidth:0.5,
       // paddingRight:100,
        paddingLeft:20,
        paddingTop:5,
        alignItems: 'flex-start'
      }, 
      qty_style:{
        color: '#1795e6',
        fontSize: 20,
        fontFamily: 'Times New Roman',
        borderBottomColor: '#3380FF',
        borderBottomWidth: 1,
       // paddingRight:100,
        paddingLeft:20,
        paddingBottom:5,
        alignItems: 'flex-start'
      },
      logo:{
       width:150,
       height:100,
       marginTop:5,
       justifyContent: "flex-start",
      }
})