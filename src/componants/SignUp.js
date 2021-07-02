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
  Dimensions
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

import {Validation} from '../components/Validation'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhone: '',
      TextInputPassword: '',

      showAlert: false,

      nview:false,
      eview:false,
      mview:false,
      pview:false,

      isVisible:false

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

    if (TextInputName=='' && TextInputEmail=='' && TextInputPhone=='' && TextInputPassword==''){
      this.setState({
        nview:true,
        eview:true,
        mview:true,
        pview:true
      })
    }
    else if (TextInputName=='' && TextInputEmail=='' && TextInputPhone=='' ){
      this.setState({
        nview:true,
        eview:true,
        pview:false,
        mview:true
      })
    }
    else if (TextInputName=='' && TextInputEmail=='' && TextInputPassword=='' ){
      this.setState({
        nview:true,
        eview:true,
        pview:true,
        mview:false
      })
    }
    else if (TextInputName=='' && TextInputPassword=='' && TextInputPhone=='' ){
      this.setState({
        nview:true,
        eview:false,
        pview:true,
        mview:true
      })
    }
    else if (TextInputPassword=='' && TextInputEmail=='' && TextInputPhone=='' ){
      this.setState({
        nview:false,
        eview:true,
        pview:true,
        mview:true
      })
    }
    else if (TextInputEmail=='' && TextInputPhone=='' ){
      this.setState({
        nview:false,
        eview:true,
        pview:false,
        mview:true
      })
    }
    else if (TextInputEmail=='' && TextInputName=='' ){
      this.setState({
        nview:true,
        eview:true,
        pview:false,
        mview:false
      })
    }
    else if (TextInputPassword=='' && TextInputPhone==''){
      this.setState({
        nview:false,
        eview:false,
        mview:true,
        pview:true
      })
    }
    else if (TextInputName=='' && TextInputPassword==''){
      this.setState({
        nview:true,
        eview:false,
        mview:false,
        pview:true
      })
    }
    else if (TextInputName=='' && TextInputPhone==''){
      this.setState({
        nview:true,
        eview:false,
        mview:true,
        pview:false
      })
    }
    else if (TextInputEmail=='' && TextInputPassword=='' ){
      this.setState({
        nview:false,
        eview:true,
        pview:true,
        mview:false
      })
    }
    else if (TextInputName=='' ){
      this.setState({
        nview:true,
        eview:false,
        mview:false,
        pview:false
      })
    }
    else if (TextInputEmail=='' ){
      this.setState({
        nview:false,
        eview:true,
        mview:false,
        pview:false
      })
    }
    else if (TextInputPhone=='' ){
      this.setState({
        nview:false,
        eview:false,
        mview:true,
        pview:false
      })
    }
    else if (TextInputPassword=='' ){
      this.setState({
        nview:false,
        eview:false,
        mview:false,
        pview:true
      })
    }

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

        console.log(responseJson)
          
          
        let id = responseJson.userid;

        // Alert.alert('Register success' );

        if (responseJson.userid != undefined) {
          AsyncStorage.setItem('memberNames', TextInputName).then(
            (responseJson) => {
              this.props.navigation.navigate('wherehouse');
            },
          );
          AsyncStorage.setItem('memberId', '' + responseJson.userid);
        } 
        else if (responseJson=='Already') {
          // showMessage({
          //   message: 'Registration fail Fail',
          //   description: 'Username or password incorrect',
          //   backgroundColor: 'red',
          // });
          this.setState({
            isVisible:true
          })
        }
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  render() {
    const {isVisible} = this.state;

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
            <Modal 
                  isVisible={isVisible}
                  // isVisible={true}
                  backdropOpacity={0.5}
                  animationIn={'bounceIn'}
                  >
                    <View>
                      <View style={{flexDirection:'row',marginBottom:-30,zIndex:1}}>
                        <View style={{backgroundColor: '#ea3f37',height:40,width:windowWidth-100,borderTopLeftRadius:5,alignItems:'center',padding:10,flexDirection:'row'}} >
                          <MaterialIcons
                              name="error"
                              size={25}
                              color={'white'}
                              style={{alignSelf:'center',paddingRight:10}}
                          />

                          <Text style={{color:'white'}}>Error</Text>
                        </View>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderRightWidth: 20,
                          borderTopWidth: 40,
                          borderRightColor: "transparent",
                          borderTopColor: "#ea3f37",
                        }}/>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderLeftWidth: 5,
                          borderRightWidth: 5,
                          borderBottomWidth: 10,
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          borderBottomColor: "#940700",
                          marginLeft:-5
                        }}/>
                      </View>
                      
                     <View style={{backgroundColor:'white',padding:15,paddingTop:40,borderRadius:5}}>
                      <Text style={{fontSize:16}}>Gmail Already Registerd</Text>
            
                      <Button 
                      title="Ok"
                      
                      titleStyle={{color:'black',fontSize:17}} 
                      buttonStyle={{alignSelf:'flex-end',marginTop:10,paddingVertical:5,borderColor:'#ea3f37',paddingHorizontal:20,backgroundColor:'white',borderWidth:2,borderRadius:10}}
                      onPress={()=>
                      this.setState({
                        isVisible:false
                      })
                      }
                      />
                      
                    </View> 
                    </View>
                    
                  </Modal>

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
              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
                <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputName: TextInputValue})
                }
                style={{
                  // borderColor: 'gray',
                  // borderWidth: 0.5,
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Enter User Name"
                onEndEditing={this.clearFocus}
                autoFocus={false}
                onFocus={()=>this.setState({
                  nview:false
                })}
              />
              {
                this.state.nview==true?
                <Validation text={'Name is Required'}/>
                :
                null
              }
              

              </View>
              
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Email :
              </Text>

              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputEmail: TextInputValue})
                }
                style={{
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Enter Email Address"
                onEndEditing={this.clearFocus}
                autoFocus={false}onFocus={()=>this.setState({
                  eview:false
                })}
              />
              {
                this.state.eview==true?
                <Validation text={'Email is Required'}/>
                :
                null
              }

              </View>

              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Mobile Number :
              </Text>

              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputPhone: TextInputValue})
                }
                style={{
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Enter Mobile Number"
                onEndEditing={this.clearFocus}
                autoFocus={false}
                onFocus={()=>this.setState({
                  mview:false
                })}
              />
              {
                this.state.mview==true?
                <Validation text={'Mobile Number is Required'}/>
                :
                null
              }

              </View>
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Password :
              </Text>

              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
              <TextInput
                blurOnSubmit
                secureTextEntry={true}
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputPassword: TextInputValue})
                }
                style={{
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Enter Password"
                onEndEditing={this.clearFocus}
                autoFocus={false}
                onFocus={()=>this.setState({
                  pview:false
                })}
              />
              {
                this.state.pview==true?
                <Validation text={'Password is Required'}/>
                :
                null
              }

               </View>
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
