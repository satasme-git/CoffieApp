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
// import FlashMessage, {showMessage} from 'react-native-flash-message';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Toast from 'react-native-simple-toast';

import {Button} from 'react-native-elements';
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhone: '',
      TextInputPassword: '',
      loading: false,
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

    if (
      TextInputName == '' ||
      TextInputEmail == '' ||
      TextInputPassword == '' ||
      TextInputPhone == ''
    ) {
       Toast.show('All fields must be filled', Toast.SHORT, [
      'UIAlertController',
      
    ]);
      // Toast.showWithGravity('All fields must be filled', Toast.LONG, Toast.BOTTOM);
      // if (TextInputPhone == '') {
     
      //   Toast.showWithGravity('Please enter phone number', Toast.LONG, Toast.BOTTOM);
      //   this.setState({
      //     optionError: 'Please select an option first',
      //     errorFound: 'true',
      //   });
      // } else {
      //   this.setState({
      //     optionError: '',
      //     errorFound: '',
      //   });
      // }
      // if (TextInputPassword == '') {
      //   Toast.showWithGravity('Please enter password.', Toast.LONG, Toast.BOTTOM);
     
      //   this.setState({
      //     pwError: 'Please enter password',
      //     errorFound: 'true',
      //   });
      // } else {
      //   this.setState({
      //     pwError: '',
      //     errorFound: '',
      //   });
      // }

      // if (TextInputEmail == '') {
      //   Toast.showWithGravity('Please enter email.', Toast.LONG, Toast.BOTTOM);
       
      //   this.setState({
      //     emailError: 'Please enter email',
      //     errorFound: 'true',
      //   });
      // } else {
      //   this.setState({
      //     emailError: '',
      //     errorFound: '',
      //   });
      // }
      // if (TextInputName == '') {
     
       
      //   this.setState({
      //     unameError: 'Please enter user name',
      //     errorFound: 'true',
      //   });
      // } else {
      //   this.setState({
      //     unameError: '',
      //     errorFound: '',
      //   });
      // }
    } else {
     
      this.setState({
        unameError: '',
        optionError: '',
        emailError: '',
        mobileError: '',
        pwError: '',
      });

      let emailValidateregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let mobileValidateregex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
      if (emailValidateregex.test(TextInputEmail) == true) {
        this.setState({
          emailError: '',
          errorFound: '',
        });

        // if (this.state.errorFound != 'false' && this.state.errorFound == '') {
          this.setState({
            loading: true,
          });

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
                  loading: true,
                },
                function () {},
              );

              let id = responseJson.userid;

              Alert.alert('Register success' );

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



            
        //   this.state.errorFound = 'false';
        // }
      } else {
        Toast.show('Email address is invalid');
      
        this.setState({
          emailError: 'Invalid email',
          errorFound: 'true',
        });
      }
    }
  };
   componentDidMount(){
   
    // Toast.show('This is a toast.');
    // Toast.show('This is a long toast.', Toast.LONG);
    
    // Toast.showWithGravity('This is a long toast at the top.', Toast.LONG, Toast.TOP);
    
    // Toast.show('This is nicely visible even if you call this when an Alert is shown', Toast.SHORT, [
    //   'UIAlertController',
    // ]);
   
  }
 
  
  render() {
    const {loading} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
         {/* <FlashMessage id={1} duration={1000} /> */}
        
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
                keyboardType="numeric"
                maxLength={10}
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

            

              <Button
                title="Sign Up"
                   loading={loading}
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
                    marginTop: 40,
                  })
                }
                onPress={this.InputUsers}
              />

              
            </Animatable.View>
          
          </View>
        </ScrollView>
    
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
