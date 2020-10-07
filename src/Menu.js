// Login.js
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import Icon from "react-native-vector-icons/Feather";
import Password_Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    username: this.props.navigation.getParam('user'),
    role: this.props.navigation.getParam('role')
  };

  _Go_StockDispatch() {
    this.props.navigation.navigate("StockDispatch", {
      user: this.state.username
    });
  }

  _Go_Jobs() {
    this.props.navigation.navigate("HomeScreen", {
      user: this.state.username,
      value: "Please scan Job"
    });
  }

  _Go_StockReceipt() {
    this.props.navigation.navigate("StockReceipt", {
      user: this.state.username
    });
  }

  _Go_Requisition() {
    this.props.navigation.navigate("Requisition", {
      user: this.state.username
    });
  }

  render() {
    let { role } = this.state;
    return (
      <ImageBackground
        style={styles.container}
        source={require("./img/background.png")}
        imageStyle={{ resizeMode: "stretch" }}
      >
        <View>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("./img/logo.png")}
          />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 25
            }}
          >
            <Text style={styles.screen_title}>Menu</Text>
            {(role === "Admin" || role === "Job") && (
              <TouchableOpacity
                style={styles.otp_send}
                onPress={() => this._Go_Jobs()}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Jobs</Text>
              </TouchableOpacity>
            )}

            {(role === "Admin" || role === "Stock") && (
              <TouchableOpacity
                style={styles.otp_send}
                onPress={() => this._Go_StockReceipt()}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  Stock Receipt
                </Text>
              </TouchableOpacity>
            )}

            {(role === "Admin" || role === "Stock") && (
              <TouchableOpacity
                style={styles.otp_send}
                onPress={() => this._Go_StockDispatch()}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  Stock Dispatch
                </Text>
              </TouchableOpacity>
            )}

            {(role === "Admin" || role === "Stock") && (
              <TouchableOpacity
                style={styles.otp_send}
                onPress={() => this._Go_Requisition()}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  Requisition
                </Text>
              </TouchableOpacity>
            )}

            {(role === "Admin" || role === "Job") && (
              <TouchableOpacity
                style={styles.otp_send}
                onPress={() => this.props.navigation.navigate('PhotoJobSelect', {
                  user: this.state.username
                })}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  Image Upload
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  otp_send: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 55,
    backgroundColor: "#1795e6",
    borderRadius: 30,
    marginBottom: 35
  },
  screen_title: {
    color: "#1795e6",
    fontSize: 25,
    fontFamily: "Times New Roman",
    marginBottom: 24,
    borderBottomColor: "#3380FF",
    borderBottomWidth: 5,
    paddingRight: 15,
    paddingLeft: 15
  },
  logo: {
    width: 150,
    height: 100,
    justifyContent: "flex-start"
  }
});
