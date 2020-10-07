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
 import PhotoUpload from 'react-native-photo-upload'
 import ImagePicker from 'react-native-image-picker'
 import ImageResizer from 'react-native-image-resizer';

export default class PhotoUploadScreen extends Component{
static navigationOptions = {
    header: null
};
state = {
          jobNumber: this.props.navigation.getParam('jobNumber'),
          user: this.props.navigation.getParam('user'),
          photo: [],
          imageList: [],
          progress_icon:'none',
        }


      handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          this.setState({photo: this.state.imageList})
          if (response.uri) {

            ImageResizer.createResizedImage(response.uri, 640, 480, 'JPEG', 80)
            .then(response => {
               this.state.photo.push(response)
              this.state.photo.reverse()
              this.setState({imageList: this.state.photo})
            })
            .catch(err => {
            alert('error compressing image')
            });        
          }
         
        })
      }

      uploadImages = () => {
        if(this.state.imageList.length == 0){
          alert('please select at least one image')
          return 0
        }
        
        this.setState({progress_icon:'flex'})
        var formData = new FormData()
          for(i  = 0; i < this.state.imageList.length; i++){
            formData.append(`product[images_attributes[${i}][file]]`, {uri: this.state.imageList[i].uri, name: 'image.jpg', type: 'image/jpeg'})
          }
          formData.append("JobNumber", this.state.jobNumber);
          formData.append("User", this.state.user); 
           alert('200, image/s uploaded successfully')
           this.props.navigation.navigate('Menu')                 
      }
  render() {
    return (
      <ImageBackground  style={[styles.container,{display:this.state.main_view}]}
        source={require('./img/background.png')}
        imageStyle={{ resizeMode: 'stretch' }}
      >
        
        <View style = {{marginBottom: 20}}>
            <Button title="Choose Photo" style = {{width: 400}} onPress={()=>{
                                  this.handleChoosePhoto()
                                
                                }
                                } />
         </View>
        <ScrollView>
              <View style = {{alignItems: 'center'}}>
                
                      <FlatList
                      extraData={this.state} 
                        data = {this.state.imageList}
                        
                        renderItem = {({item, index}) => (
                          
                          <TouchableOpacity onPress={()=>{
                         

                            Alert.alert(
                              'Delete Image?',
                              '',
                              [ 
                                
                                {text: 'Yes', 
                                onPress: () => {
                                        if(this.state.imageList.length == 1){
                                              this.state.imageList = []
                                                                                
                                          }
                                      else{
                                            this.state.imageList.splice(index, 1)
                                                                                    
                                            }
                                            this.forceUpdate()
                                }, 
                                style: 'ok'},
                                {
                                  text:'No',
                                  style:'cancel'
                                }
                              ]
                            );             
                              }  
                            }>
                              <Image
                            
                              source={{ uri: item.uri }}
                              style={{ width: 350, height: 500, marginBottom: 10, borderWidth:5, borderColor: 'black', resizeMode: 'stretch'}}
                            />
                         </TouchableOpacity>   

                        

                        )}
                        />
                    
                            
                       
              </View>
      </ScrollView> 
                          <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity
                                  style={styles.confirm_button}
                                  onPress={() =>{
                                   this.uploadImages() 
                                   // this.props.navigation.navigate('Menu')
                                  }}
                                >           
                                  <Text style={{fontSize:18,color:'white'}}>Upload Photos</Text>
                                </TouchableOpacity>

                            </View>
                                   <View style={{display:this.state.progress_icon,width:'100%',alignItems:'center',marginTop:20, marginBottom:20}}>
                                  <UIActivityIndicator color='#1795e6' style={styles.ActivityIndicatorStyle}/>
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
        width:200,
        height:50,
        backgroundColor:'#1795e6',
        fontSize: 20,
        borderRadius:10,
        marginBottom: 7,
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
      Supplier_style:{
        color: '#1D4BBD',
        fontSize: 20,
        fontFamily: 'Times New Roman',
        borderTopColor:'#3380FF',
       // paddingRight:100,
        paddingLeft:20,
        paddingTop:5,
        alignItems: 'flex-start'
      }, 
      qty_style:{
        color: '#1D4BBD',
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