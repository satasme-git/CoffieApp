import React, {Component} from 'react';
import {
  StatusBar,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGE} from '../constants/image';
import {CustomHeader} from '../index';
import QRCode from 'react-native-qrcode-generator';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Button} from 'react-native-elements';
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhone: '',
      TextInputPassword: '',

      showAlert: false,
    };
  }

  state = {
    text: 'http://facebook.github.io/react-native/',
    show: true,
  };
  handleClose = () => {
    this.setState({show: false});
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  handleOpen() {
    this.setState({show: true});
  }

  InputUsers = () => {
    const {TextInputName} = this.state;
    const {TextInputEmail} = this.state;
    const {TextInputPhone} = this.state;
    const {TextInputPassword} = this.state;

    fetch('https://satasmemiy.tk/register', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cus_name: TextInputName,
        cus_email: TextInputEmail,
        cus_mobile_number: TextInputPhone,
        cus_password: TextInputPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
          },
          function () {},
        );

        let id = responseJson.userid;

        // Alert.alert('Register success' );

        if (responseJson.userid != undefined) {
          AsyncStorage.setItem('memberNames', TextInputName).then(
            (responseJson) => {
              this.props.navigation.navigate('wherehouse');
            },
          );
          AsyncStorage.setItem('memberId', '' + responseJson.userid);
        } else {
          showMessage({
            message: 'Registration fail Fail',
            description: 'Username or password incorrect',
            backgroundColor: 'red',
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
        />
        <CustomHeader
          title="Sign Up"
          isHome={false}
          bdcolor="#fff"
          navigation={this.props.navigation}
        />
        <FlashMessage duration={1000} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 0,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  marginTop: 15,
                  color: '#00897b',
                }}>
                Sign Up{' '}
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: -3}}>
                Please Enter Below Informations to
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 25}}>
                Create An Account
              </Text>
            </View>
            {/* <View style={{justifyContent:'center',alignItems:'center'}}>
              <Image style={{ width: 210, height: 190, marginLeft: 0 }}
                source={IMAGE.ICON_LOG}
                resizeMode="contain"
              />
            </View> */}
            <Animatable.View animation="fadeInUp">
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 5,
                }}>
                Name :
              </Text>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputName: TextInputValue})
                }
                style={{
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                }}
                placeholder="Enter User Name"
                onEndEditing={this.clearFocus}
                autoFocus={false}
              />
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Email :
              </Text>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputEmail: TextInputValue})
                }
                style={{
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                }}
                placeholder="Enter Email Address"
                onEndEditing={this.clearFocus}
                autoFocus={false}
              />
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Mobile Number :
              </Text>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputPhone: TextInputValue})
                }
                style={{
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                }}
                placeholder="Enter Mobile Number"
                onEndEditing={this.clearFocus}
                autoFocus={false}
              />
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Password :
              </Text>
              <TextInput
                blurOnSubmit
                secureTextEntry={true}
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputPassword: TextInputValue})
                }
                style={{
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                }}
                placeholder="Enter Password"
                onEndEditing={this.clearFocus}
                autoFocus={false}
              />

              {/* <TouchableOpacity
                activeOpacity={1.0}
                ref="touchableOpacity"
                style={{marginTop: 40}}
                onPress={this.InputUsers}>
         
                <LinearGradient
                  colors={['#009984', '#00554D']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0.9}}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity> */}

              <Button
                title="Sign Up"
                activeOpacity={0.5}
                titleStyle={{color: 'white'}}
                buttonStyle={
                  (styles.submitText,
                  {
                    backgroundColor: '#00897b',
                    borderRadius: 15,
                    width: '100%',
                    borderColor: 'white',
                    color: '#ccc',
                    padding: 15,
                    borderWidth: 1,
                    paddingHorizontal: 82,
                    marginTop:40,
                  })
                }
                onPress={this.InputUsers}
              />

              {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                   
                        <View style={[{ alignItems: "center", }, styles.touchableopacity]} >
                        <View style={[{ height: 90, padding: 20, backgroundColor: '#fff', borderRadius: 50 },styles.shaddow]}>
                                <Image source={IMAGE.ICON_INVESTMENT}
                                    style={{ height: 55, width: 55 }}
                                >
                                </Image>
                            </View>
                            <Text style={{ marginTop: 5, color: '#000' }}>Invest</Text>
                        </View>
                    </TouchableOpacity> */}

              {/* <TouchableHighlight style={{backgroundColor:'green',height:50}} onPress={() => this.props.navigation.navigate('TestScreen')}>
                <Text style={styles.text}>
                  Button
            </Text>
              </TouchableHighlight> */}
            </Animatable.View>
            {/* <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ text: text })}
              value={this.state.text}
            />
            <QRCode
              value={this.state.text}
              size={200}
              bgColor='black'
              fgColor='white' /> */}
          </View>
        </ScrollView>
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>test!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('TestScreen')}

          >
            <Text>Sign IN</Text>
   
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    // flex: 1,
    // width: 280,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 14,
    color: 'white',
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});
