// Login.js
import React, { Component } from 'react'
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
import Icon from 'react-native-vector-icons/Feather';
import Password_Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { List, ListItem,  } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation';

export default class StockPreview extends Component{
static navigationOptions = {
    header: null
};
state = {
        numberOfLines: this.props.navigation.getParam('Line'),
        data: this.props.navigation.getParam('val'),
        firstLoad: true,
        ObjectToSend:[],
        username: this.props.navigation.getParam('user'),
        scaned_value: this.props.navigation.getParam('num'),
        editedItem: -1,
        reload: false,
        jobNumber: this.props.navigation.getParam('jobNumber'),
        progress_icon: 'none'
        }
constructor(props) {
  super(props)
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

componentWillMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  this.props.navigation.navigate('StockItem', {data : this.state.data, backPressed: true});
  return true;
}

    

    componentDidMount(){
        //if(this.state.firstLoad == true){
          //  this.setState({firstLoad : false});
          //  this.state.data = this.props.navigation.getParam('val')
           //  this.forceUpdate(); 
           // alert(JSON.stringify(this.state.data));
           // this._retrieveData(this.state.numberOfLines.toString()); 
      //  }
        //else{
          //this.state.data = this.props.navigation.getParam('val')
        //  this.forceUpdate();
       // }
   
    }
    
    
    _retrieveData = async (line) => {
        try {
            var value = await AsyncStorage.getItem(line);
            if (value !== null) {
                // Our data is fetched successfully
                
            }
            else{
                alert(value + ' error');
             
            }
        } catch (error) {
            alert(error)
        }
    }


      createObject(){
          this.state.ObjectToSend.push({
            User : this.state.username,
            JobNumber : this.state.scaned_value,
            Items: this.state.data,
          });
      }

      sendObject(){
        this.createObject();
        let obj =   this.state.ObjectToSend;
       
          this.props.navigation.navigate('StockDispatch');
      }
      createLineNumber(line){
        return parseInt(line) + 1;
      }
  render() {
    return (
      <ImageBackground style={styles.container}
      source={require('./img/background.png')}
      imageStyle={{ resizeMode: 'stretch' }}
    > 
          <View style = {styles.container}>
                <View style = {styles.screen_title}>
                    <Text style={{fontSize:40,color:'#235CBB',margin:15}}>{this.state.jobNumber} </Text>
                </View>
                      <ScrollView
                        style = {{flex: 1}}
                        scrollEnabled = {true}
                      >
                        <View style={{justifyContent:'flex-start', paddingTop: 10, marginBottom: 100, height:'90%'}}>

                        <NavigationEvents
                          onDidFocus={() =>{
                              if(this.props.navigation.getParam('delete') && this.state.reload == false && !this.props.navigation.getParam('addedItem')){
                                this.state.data.splice(this.state.editedItem, 1);
                                // item = item - 1;
                                 //delete this.state.data[item];
                                 this.props.navigation.setParams({delete: false})
                                 deleteItem = false;
                                 reload = true;
                                 this.forceUpdate();
                              }
                              else if(this.props.navigation.getParam('edit') && this.state.reload == false && !this.props.navigation.getParam('addedItem')){
                                this.state.data[this.state.editedItem].Quantity = this.props.navigation.getParam('quan');
                                reload = true;
                                this.forceUpdate();
                              }

                              
                          }}
                          />
                              <FlatList
                              scrollEnabled = {true}
                              contentContainerStyle={styles.cardcontainer}
                                data = {Object.keys(this.state.data)}
                                renderItem={({ item }) => (
                                  <View style={{flexDirection:'column'}}> 
                                    
                                <Text  style={styles.Item_title}
                                  onPress = {() =>{
                                    this.state.editedItem = item;
                                    this.state.reload = false;
                                    this.props.navigation.navigate('EditPreviewItem', {Quantity:this.state.data[item].Quantity, number:this.state.data[item].ItemCode})
                                     // this.state.EditIndex = item;
                                      
                                        
                                      
                                      this.props.navigation.addListener("didFocus", () => {
                                      
                                            /*  var deleteItem = this.props.navigation.getParam('delete'); 
                                              if(deleteItem == true){ 
                                                this.state.data.splice(item, 1);
                                               // item = item - 1;
                                                //delete this.state.data[item];
                                                this.props.navigation.setParams({delete: false})
                                                deleteItem = false;
                                              } 
                                              if(deleteItem === false){
                                                  this.state.data[item].Quantity = this.props.navigation.getParam('quan');
                                                }
                                                edit = false;
                                                            this.forceUpdate();*/
                                          
                                      });
                                  }}
                                >
                                
                                  {this.createLineNumber(item)}: {this.state.data[item].ItemCode} - {this.state.data[item].description}
                                  
                                 
                                 </Text>
                                  <Text style={styles.qty_style}
                                     onPress = {() =>{/*
                                      this.props.navigation.navigate('EditPreviewItem', {Quantity:this.state.data[item].Quantity, number:this.state.data[item].ItemNumber})
                                      this.state.EditIndex = item;

                                        this.props.navigation.addListener("didFocus", () => {
                                            var deleteItem = this.props.navigation.getParam('delete'); 
                                            if(deleteItem == true){ 
                                              this.state.data.splice(item, 1);
                                              //item = item - 1;
                                              //delete this.state.data[item];
                                              deleteItem = false;
                                            } 
                                            if(deleteItem === false){
                                                this.state.data[this.state.EditIndex].Quantity = this.props.navigation.getParam('quan');
                                              }
                                                          this.forceUpdate();
                                        });*/
                                    }}
                                  >
                                     qty: {this.state.data[item].Quantity}</Text>
                                </View>
                                )}
                              />
                          
                        </View>
                      </ScrollView>

                              <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity
                                  style={styles.confirm_button}
                                  onPress={() =>{
                                      this.createObject();
                                      this.sendObject();
                                      //this.props.navigation.navigate('StockDispatch', {user:this.state.username})
                                  }}
                                >           
                                  <Text style={{fontSize:18,color:'white'}}>Confirm Items</Text>
                                </TouchableOpacity>

                            </View>
                      </View>
         
               
             
            
    </ImageBackground>
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
        width:200,
        height:45,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:30,
        marginBottom: 10,
        marginLeft:20,
        marginRight: 15,
        marginTop:5,
      },
      screen_title:{
        color: '#1795e6',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        marginBottom: 15,
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
        paddingLeft:45,
        paddingBottom:5,
        alignItems: 'flex-start'
      },
      TriangleShapeView: {
        //To make Triangle Shape
        width: 0,
        height: 0,
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 30,
        rotation:180,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#256ADC',
        paddingLeft:4,
        marginLeft:4,
        marginRight:7,
        marginBottom:10,
        marginTop:7
      },
      logo:{
       width:150,
       height:100,
       marginTop:5,
       justifyContent: "flex-start",
      }
})