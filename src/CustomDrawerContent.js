import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
export class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      abc: '',
      login_title: '',
      _id: '',
      _name: '',
      _email: '',
      _cus_id: '',
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
        this.loadVal();
        this.getoprofileDetails();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }
  async getoprofileDetails() {
   
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://satasmemiy.tk/api/profile/' + myArray, {
      method: 'post',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 2,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
      
        this.setState({
          isLoading: false,
          _id: responseJson.id,
          // _name: responseJson.name,
          // _email: responseJson.email,
          // _cus_id: myArray,
          abc : responseJson.image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    
  }

  async loadVal() {
    let loginval = null;
    AsyncStorage.getItem('cus_id').then((value) => {
      loginval = value;
      if (loginval == null) {
        this.setState({
          login_title: 'Login',
        });
      } else {
        this.setState({
          login_title: 'Log Out',
        });
      }
    });
  }
  doLogout() {
    AsyncStorage.removeItem('cus_name').then((res) => {
      this.props.navigation.navigate('SignIn');
      AsyncStorage.removeItem('cus_id');
      AsyncStorage.removeItem('menu');
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff', opacity: 0.9}}>
        <ScrollView>
          <ImageBackground
           
            source={require('./images/undraw_pilates_gpdb.png')}
            style={{
              width: 300,
              paddingLeft: 30,
              paddingBottom: 0,
              paddingTop: 50,
              backgroundColor: '#0C5D39',
            }}>
            <Avatar
              rounded
              showEditButton
              size={100}
              source={
                this.state.abc != '' ? { uri: "https://satasmemiy.tk/images/Customer/" + this.state.abc } :require('./images/profiled.png')
                
              }

              // source={require('./images/profiled.png')}
              onEditPress={() => console.log('edit button pressed')}
              onLongPress={() => console.log('component long pressed')}
              // onPress={() => this.props.navigation.navigate('ProfileImageView')}
              editButton={{
                name: 'edit',
              }}></Avatar>

            <Text style={{color: 'white', fontSize: 15, marginVertical: 8}}>
              {this.state.userName}
            </Text>
          </ImageBackground>

          <View
            style={{
              backgroundColor: '#0C5D39',
              paddingTop: 5,
              paddingBottom: 10,
            }}>
            {/* <TouchableOpacity style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('SignIn')}>
                            <View style={{ flexDirection: "row", padding: 5, backgroundColor: '#3B7457' }}>
                                <Icon

                                    name='user'
                                    type='font-awesome'
                                    color='white'
                                    iconStyle={{ fontSize: 25, fontWeight: 'normal', paddingLeft: 15, paddingRight: 15, paddingTop: 3 }}
                                />
              
                                <Text style={{ paddingLeft: 5, paddingTop: 8, paddingBottom: 11, color: 'white' }}>Login Or Register </Text>
                            </View>

                        </TouchableOpacity> */}
            <TouchableOpacity
              style={[{paddingLeft: 10, paddingRight: 10, paddingTop: 2}]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('wherehouse')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '#3B7457',
                }}>
                <Icon
                  name="home"
                  type="font-awesome"
                  color="white"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 3,
                  }}
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingTop: 8,
                    paddingBottom: 11,
                    color: 'white',
                  }}>
                  Home{' '}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{paddingLeft: 10, paddingRight: 10, paddingTop: 2}]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('AboutUsScreeen')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '#3B7457',
                }}>
                <Icon
                  name="university"
                  type="font-awesome"
                  color="white"
                  iconStyle={{
                    fontSize: 18,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                  }}
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingTop: 8,
                    paddingBottom: 11,
                    color: 'white',
                  }}>
                  About Us{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{paddingLeft: 10, paddingRight: 10, paddingTop: 2}]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('WhereHouse')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '#3B7457',
                }}>
                <Icon
                  name="id-card"
                  type="font-awesome"
                  color="white"
                  iconStyle={{
                    fontSize: 18,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                  }}
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingTop: 8,
                    paddingBottom: 11,
                    color: 'white',
                  }}>
                  Loyalty Card{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{paddingLeft: 10, paddingRight: 10, paddingTop: 2}]}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Events')}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '#3B7457',
                }}>
                <Icon
                  name="id-card"
                  type="font-awesome"
                  color="white"
                  iconStyle={{
                    fontSize: 18,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                  }}
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingTop: 8,
                    paddingBottom: 11,
                    color: 'white',
                  }}>
                  Events{' '}
                </Text>
              </View>
            </TouchableOpacity>

            <Collapse
              style={[{paddingLeft: 10, paddingRight: 10, paddingTop: 2}]}
              activeOpacity={0.5}>
              <CollapseHeader>
                <View style={{width: '100%'}}>
                  {/* <TouchableOpacity style={[{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }]} activeOpacity={0.5} > */}
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      backgroundColor: '#3B7457',
                    }}>
                    <Icon
                      name="id-card"
                      type="font-awesome"
                      color="white"
                      iconStyle={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 8,
                      }}
                    />
                    <View style={styles.SeparatorLine} />
                    <Text
                      style={{
                        paddingLeft: 5,
                        paddingTop: 8,
                        paddingBottom: 11,
                        color: 'white',
                      }}>
                      Boxes free{' '}
                    </Text>
                  </View>
                  {/* </TouchableOpacity> */}
                </View>
              </CollapseHeader>

              <CollapseBody>
                {/* <Animatable.View animation="fadeInLeft"> */}
                <Collapse>
                  <CollapseHeader>
                    <TouchableOpacity
                      style={[
                        {borderBottomWidth: 0.5, borderBottomColor: 'white'},
                      ]}
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate('BoxessFree')
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 5,
                          paddingLeft: 55,
                          backgroundColor: '#4c8c6b',
                        }}>
                        <View style={styles.SeparatorLine} />
                        <Text
                          style={{
                            paddingLeft: 5,
                            paddingTop: 8,
                            paddingBottom: 11,
                            color: 'white',
                          }}>
                          Residential Boxes{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        {borderBottomWidth: 0.5, borderBottomColor: 'white'},
                      ]}
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate('CommercialBoxes')
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 5,
                          paddingLeft: 55,
                          backgroundColor: '#4c8c6b',
                        }}>
                        <View style={styles.SeparatorLine} />
                        <Text
                          style={{
                            paddingLeft: 5,
                            paddingTop: 8,
                            paddingBottom: 11,
                            color: 'white',
                          }}>
                          Commercial Boxes{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[{}]}
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate('HomeAppliance')
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 5,
                          paddingLeft: 55,
                          backgroundColor: '#4c8c6b',
                        }}>
                        <View style={styles.SeparatorLine} />
                        <Text
                          style={{
                            paddingLeft: 5,
                            paddingTop: 8,
                            paddingBottom: 11,
                            color: 'white',
                          }}>
                          Home Appliance Boxes{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </CollapseHeader>
                </Collapse>
                {/* </Animatable.View> */}
              </CollapseBody>
            </Collapse>

            <TouchableOpacity
              style={[{paddingLeft: 10, paddingRight: 10, paddingTop: 2}]}
              activeOpacity={0.5}
              onPress={() => this.doLogout()}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  backgroundColor: '#3B7457',
                }}>
                <Icon
                  name="sign-out"
                  type="font-awesome"
                  color="white"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                  }}
                />
                <View style={styles.SeparatorLine} />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingTop: 8,
                    paddingBottom: 11,
                    color: 'white',
                  }}>
                  {this.state.login_title}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  profile: {
    width: 80,
    height: 80,
    borderWidth: 8,
    borderRadius: 40,
    borderColor: '#fff',
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    // backgroundColor: '#f78a2c',
    //borderWidth: .5,
    // borderColor: '#fff',
    height: 50,

    //borderRadius: 5,
    // margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    // color:'#fff'
  },
});
