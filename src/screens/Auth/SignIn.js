import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setUser } from "@modules/redux/auth/actions";
import { setLikes } from "@modules/redux/lists/actions";
import { TextInput, NormalButton } from "@components";
import { AuthService, ListingsService } from "@modules/services";
import { isEmpty, validateEmail, validateLength } from "@utils/functions";
import configs from "@constants/configs";
import { colors } from "@constants/themes";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      errorEmail: "",
      password: "",
      errorPassword: ""
    };
  }

  onValidateEmail(email) {
    this.setState({ email }, () => {
      if (isEmpty(this.state.email)) {
        this.setState({ errorEmail: 'Please enter email' });
      } else {
        if (!validateEmail(this.state.email)) {
          this.setState({ errorEmail: "Invaild email, please enter correct email again" })
        } else {
          this.setState({ errorEmail: '' });
        }
      }
    })
  }

  onValidatePassword(password) {
    this.setState({ password }, () => {
      if (isEmpty(this.state.password)) {
        this.setState({ errorPassword: 'Please enter password' });
      } else {
        if (!validateLength(this.state.password, 6)) {
          this.setState({ errorPassword: 'Please enter 6+ characters' })
        } else {
          this.setState({ errorPassword: '' });
        }
      }
    })
  }

  EPSIGNIN() {
    if (isEmpty(this.state.email)) {
      this.setState({ errorEmail: 'Please enter email' });
    }
    if (isEmpty(this.state.password)) {
      this.setState({ errorPassword: 'Please enter password' });
    }
    if (!isEmpty(this.state.email) && !isEmpty(this.state.password) && isEmpty(this.state.errorEmail) && isEmpty(this.state.errorPassword)) {
      this.setState({ loading: true });
      this.SIGNIN();
    }
  }

  async FBSIGNIN() {
    try {
      await Facebook.initializeAsync(configs.facebookID);
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', "email"],
      });
      if (result.type == "success") {
        fetch(`https://graph.facebook.com/me?access_token=${result.token}`)
          .then(response => response.json())
          .then((res) => {
            fetch(`https://graph.facebook.com/${res.id}?fields=birthday,email,hometown&access_token=${result.token}`)
              .then(resp => resp.json())
              .then((json) => {
                this.setState({ email: json.email, password: '123456', loading: true }, () => {
                  this.SIGNIN();
                });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (e) {
      return { error: true }
    }
  }

  async GGSIGNIN() {
    try {
      const result = await Google.logInAsync({
        // androidClientId: configs.google_auth_config.androidClientId,
        iosClientId: configs.google_auth_config.iosClientId,
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        this.setState({ email: result.user.email, password: '123456', loading: true }, () => {
          this.SIGNIN();
        })
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true };
    }
  }

  SIGNIN() {
    AuthService.getUser({
      email: this.state.email,
      password: this.state.password
    }).then(async (res) => {
      this.setState({ loading: false });
      if (res.count > 0) {
        this.props.setUser(res.users[0]);
        var likes = await ListingsService.getLike(res.users[0].id);
        this.props.setLikes(likes);
        this.props.navigation.pop();
      } else {
        this.setState({ loading: false }, () => {
          this.setState({ errorEmail: "User email or password is wrong" });
        });
      }
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <View style={{ width: wp('100%'), height: hp('100%'), backgroundColor: '#E3E3E3' }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <StatusBar hidden />
          <View style={{ marginTop: 30, width: wp("100%"), alignItems: "flex-start", paddingLeft: 10 }}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}><Icon name="close" type="ant-design" size={30} /></TouchableOpacity>
          </View>
          <Text style={{ marginVertical: 10, fontSize: 34, fontWeight: 'bold' }}> Sign In</Text>
          <TextInput
            title="Email" iconName="email" iconType="fontisto" iconSize={20}
            value={email} secureTextEntry={false} autoCapitalize="none"
            onChangeText={(email) => this.onValidateEmail(email)}
          />
          <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorEmail}</Text>
          <TextInput
            title="Password" iconName="lock" iconType="entypo" iconSize={20}
            value={password} secureTextEntry={true}
            onChangeText={(password) => this.onValidatePassword(password)}
          />
          <Text style={{ width: '90%', marginTop: 5, marginLeft: 100, fontSize: 12, color: colors.RED.DEFAULT }}>{this.state.errorPassword}</Text>
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#0073E4"
            text="Sign In"
            textColor={colors.WHITE}
            onPress={() => this.EPSIGNIN()}
          />
          <TouchableOpacity style={{ marginTop: 20 }}><Text style={{ color: "#0072DC", textDecorationLine: "underline" }}>Forgot Password?</Text></TouchableOpacity>
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#C4DAF0"
            text="Sign in Facebook"
            textColor="#0072DC"
            onPress={() => this.FBSIGNIN()}
          />
          <NormalButton
            width={wp("90%")}
            height={40}
            color="#F0C4C4"
            text="Sign in Google"
            textColor="#EA5050"
            onPress={() => this.GGSIGNIN()}
          />
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ fontSize: 12 }}>Don't you have account? </Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.replace("SignUp");
            }}><Text style={{ fontSize: 12, color: colors.BLUE.PRIMARY, textDecorationLine: "underline" }}>Sign Up</Text></TouchableOpacity>
          </View>
          <Modal animationType="fade" transparent={true} visible={this.state.loading} >
            <View style={{ flex: 1, backgroundColor: '#00000080', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: "center" }}>
                <ActivityIndicator style={{ height: 80 }} size="large" color={colors.BLACK} />
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
    alignItems: 'center'
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setUser: (data) => {
      dispatch(setUser(data))
    },
    setLikes: (data) => {
      dispatch(setLikes(data));
    }
  }
}
export default connect(undefined, mapDispatchToProps)(SignIn);