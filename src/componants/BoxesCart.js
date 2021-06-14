import React, {PureComponent} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  ScrollView,
  Alert,

} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {List, ListItem, Left, Body, Right} from 'native-base';
import {Icon, Avatar} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Database from '../Database';
import {StatusBar} from 'react-native';
import {parse} from 'react-native-svg';
import {Button} from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

import stripe from 'tipsi-stripe';
import SwitchSelector from 'react-native-switch-selector';
const db = new Database();

stripe.setOptions({
  publishableKey: 'pk_test_Wim6Z9pN58qzMYDDXvsPMrR0',
});

const sugar = [
  {label: 'Cash payment', value: '1'},
  {label: 'Card payment', value: '2'},
];
export class BoxesCart extends PureComponent {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
    success: null,
    modalVisible: false,
    show: false,
    // _alert_heading: 'defaultt',
    _subtitle: '',
  };

  handleOpen() {
    this.setState({show: true});
  }

  handleClose = () => {
    this.setState({show: false});
    this.props.navigation.navigate('BoxessFree');
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  constructor(props) {
    super(props);
    this.state = {
      dbs: '',
      _list_elimination: [],
      _pQty: 1,
      _pPrice: 5,
      _total: 0,
      tokenId: '',
      loading: true,
      showAlert: false,
      _cus_id: '',
      _rbsheet_height: 80,
      _alert_heading: 'defaultt',
      cart_details: '',
      _payment_method: 'Cash',
      pressed: false,
      _category:'',
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    });
    this.loadDbVarable = this.loadDbVarable.bind(this);
  }
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  changeSML(value) {
    var smlval = value;

    if (value == 1) {
      this.setState({
        _alert_heading: 'Order Successful',
        _subtitle: 'Thank you! Order is complete',
        _payment_method: 'Cash',
      });

      this.emptyCartData();
    }
    if (value == 2) {
      this.setState({
        _alert_heading: 'Payment Successful',
        _subtitle: 'Thank you! Payment is complete',
        _payment_method: 'Card',
      });
      this.handleCardPayPress();
      this.RBSheet.close();
    }
  }
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
    this.props.navigation.navigate('BoxessFree');
  };

  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    this.getCartData();
  }
  setRbsheet_height() {
    this.setState({
      _rbsheet_height: 80,
    });
    this.RBSheet.open();
  }

  getCartData() {
    let {bPrice, result, total = 0,category} = this.props;
    db.listBoxCartData(this.state.dbs)
      .then((results) => {
        result = results;

        var jsonTextValues = [];
        result.map((item, index) => {
          jsonTextValues.push({
            label: item.bId,
            value: item.bName,
          });
        });

        for (var i = 0; i < result.length; i++) {
          bPrice = result[i].bPrice;
          total += parseFloat(bPrice);
          category = result[i].bCategory;
          
        }

        this.setState({
          isLoading: false,
          _list_elimination: results,
          _total: total,
          _category: category,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  substracttem(id, price, qty) {
    var price1 = price * (qty - 1);
    let data = {
      bQty: this.state._pQty,
      _pPrice: price1,
      bId: id,
    };
    db.subItemBoxQty(this.state.dbs, data)
      .then((result) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addItem(id, price, qty) {

    var price1 = price * (qty + 1);
    let data = {
      bQty: this.state._pQty,
      _pPrice: price1,
      bId: id,
    };

    db.addItemBoxQty(this.state.dbs, data)
      .then((result) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteData(id) {
    db.deleteBoxCartItem(this.state.dbs, id)
      .then((result) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
        this.setState = {};
      });
  }
  // getData() {
  //   let {pPrice, total = 0} = this.props;
  //   db.listCartItems(this.state.dbs)
  //     .then((data) => {
  //       let result = data;

  //       for (var i = 0; i < result.length; i++) {
  //         pPrice = result[i].pPrice;
  //         total += parseFloat(pPrice);
  //       }
  //       this.setState({
  //         isLoading: false,
  //         _list_elimination: data,
  //         _total: total,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('cus_id');

    this.setState({
      isLoading: false,
      _cus_id: myArray,
    });
    
  }

  doPayment = async () => {
    this.setState({
      pressed:true,
    });
    // Use firebase serve for local testing if you don't have a paid firebase account
    fetch(
      'https://us-central1-coffee-app-fb513.cloudfunctions.net/payWithStripe',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          amount: Math.floor(this.state._total) * 100,
          currency: 'aud',
          token: this.state.tokenId,
          payment_method_types: ['card'],
        }),
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          success: responseJson.status == 'succeeded' ? true : false,
          response: responseJson,
        });

        if (responseJson.status == 'succeeded') {

          this.emptyCartData();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  emptyCartData() {

    this.cart_data();
    db.deleteBoxCartData(this.state.dbs)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });

    this.handleOpen();
  }

  // testcartdetails() {

  //   db.listCartDataTest(this.state.dbs)
  //   .then((result) => {

  //     console.log("asdasdasdasd"+result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
  cart_data = async () => {
    let qty,bQty,bPrice,id;
    let order_id =
      new Date().getMonth() +
      '' +
      new Date().getFullYear() +
      '' +
      new Date().getHours() +
      '' +
      new Date().getMinutes() +
      '' +
      new Date().getSeconds();

    fetch('https://satasmemiy.tk/api/cart_box_data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: order_id,
        cus_id: this.state._cus_id,
        order_total: this.state._total,
        payment_method: this.state._payment_method,
        bCategory:this.state._category,
        result:this.state._list_elimination,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
       
        for (var i = 0; i < this.state._list_elimination.length; i++) {
          id = this.state._list_elimination[i].bId;

        }
      
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleCardPayPress = async () => {
    try {
      const token = await stripe.paymentRequestWithCardForm({

        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
          },
        },
      });

      this.setState({
        tokenId: token.id,
        loading: false,
        token,
      });
    } catch (error) {
      this.setState({loading: false});
    }
  };

  renderItem = ({item}) => {
    return (
      <Animatable.View animation="flipInX">
        <ListItem
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            marginBottom: 15,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 20,
            marginLeft: 0,
          }}>
          <Left style={{paddingLeft: 10}}>
            <View>
              <Image
                source={{
                  uri: 'https://satasmemiy.tk/images/Box/' + item.bImage,
                }}
                style={{width: 90, height: 80}}
              />
            </View>
          </Left>
          <Body style={{marginLeft: -60}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              {item.bTitle}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontSize: 10, color: 'gray'}}>
              {item.bDescription}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View
                style={{
                  backgroundColor: 'gray',
                  borderRadius: 10,
                  marginTop: 2,
                  width: 16,
                  height: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  type="font-awesome"
                  color="gray"
                  iconStyle={{fontSize: 11}}
                  name="dollar"
                  color="white"
                  onPress={() => {}}
                />
              </View>
              <Text
                style={(styles.dateText, {marginLeft: 5, fontWeight: 'bold'})}>
                {item.bPrice}{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Avatar
                rounded
                showEditButton
                size={26}
                icon={{name: 'minus', type: 'font-awesome', color: '#2e7d32'}}
                containerStyle={{
                  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                  shadowOffset: {height: 3, width: 8},
                  borderWidth: 1,
                  borderColor: 'white', // IOS
                  shadowOpacity: 3, // IOS
                  shadowRadius: 5,
                  elevation: 2,
                  backgroundColor: '#b2dfdb',
                }}
                onPress={() =>
                  this.substracttem(item.bId, item.bOnePrice, item.bQty)
                }
              />
              <Text
                style={{
                  color: 'gray',
                  paddingLeft: 10,
                  paddingEnd: 10,
                  paddingTop: 5,
                }}>
                {item.bQty}
              </Text>
              <Avatar
                rounded
                showEditButton
                size={26}
                icon={{name: 'plus', type: 'font-awesome', color: '#2e7d32'}}
                containerStyle={{
                  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                  shadowOffset: {height: 3, width: 8},
                  borderWidth: 1,
                  borderColor: 'white', // IOS
                  shadowOpacity: 3, // IOS
                  shadowRadius: 5,
                  elevation: 2,
                  backgroundColor: '#b2dfdb',
                }}
                onPress={() =>
                  this.addItem(item.bId, item.bOnePrice, item.bQty)
                }
              />
            </View>
          </Body>
          <Right style={{bottom: 40}}>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ff4081',
                  width: 70,
                  paddingLeft: 10,
                  paddingRight: 10,
                  padding: 5,
                  borderRadius: 20,
                  alignItems: 'center',
                  right: -10,
                }}
                onPress={() => {
                  this.deleteData(item.cId);
                }}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Right>
        </ListItem>
      </Animatable.View>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    const {loading, token, success, response} = this.state;
    const {movies} = this.state;

    if (success == true) {
    }
    const {modalVisible} = this.state;

    const {showAlert} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <SCLAlert
          theme="success"
          show={this.state.show}
          title={this.state._alert_heading}
          subtitle={this.state._subtitle}
          onRequestClose={this.handleClose}
          cancellable={false}>
          <SCLAlertButton theme="success" onPress={this.handleClose}>
            Done
          </SCLAlertButton>
        </SCLAlert>

        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
        />
        <View style={{flex: 1}}>
          <View style={{marginLeft: 20, marginTop: 30}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>My Order</Text>
          </View>
          <View style={styles.container}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <FlatList
                contentContainerStyle={{
                  padding: 15,
                  paddingTop: StatusBar.currentHeight || 0,
                }}
                ListEmptyComponent={this.emptyComponent}
                scrollEnabled={false}
                keyExtractor={this.keyExtractor}
                data={this.state._list_elimination}
                renderItem={this.renderItem}
              />
            </ScrollView>

            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                }}>
                <View style={{padding: 10, flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column',width:120}}>
                    <Text
                      style={{
                        paddingLeft: 13,
                        fontWeight: 'normal',
                        fontSize: 15,
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 13,
                        // paddingRight: 13,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      US ${Math.floor(this.state._total*100)/100}
                    </Text>
                  </View>

                  {token == null ? (
                    <TouchableOpacity
                      style={styles.buttonstyle}
                      loading={loading}
                      onPress={() => this.setRbsheet_height()}>
                      <Text style={{color: 'white'}}>Check out</Text>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      {token && (
                        <Button
                          loading={loading}
                          title="Pay"
                          activeOpacity={0.5}
                          disabled={this.state.pressed}
                          titleStyle={{color: 'white'}}
                          buttonStyle={
                            (styles.submitText,
                            {
                              backgroundColor: 'red',
                              borderRadius: 15,
                              width: '100%',
                              borderColor: 'white',
                              color: '#ccc',
                              padding: 15,
                              borderWidth: 1,
                              paddingHorizontal: 82,
                            })
                          }
                          onPress={this.doPayment}
                        />
                      )}
                      {success && <></>}
                    </View>
                  )}
                </View>
              </View>
              <RBSheet
                ref={(ref) => {
                  this.RBSheet = ref;
                }}
                animationType="slide"
                closeOnDragDown={false}
                closeOnDragUp={false}
                closeOnPressMask={true}
                height={this.state._rbsheet_height}
                openDuration={80}
                customStyles={{
                  container: {
                    alignItems: 'center',

                    backgroundColor: 'white',
                    borderRadius: 20,
                  },
                  wrapper: {
                    backgroundColor: 'transparent',
                  },
                }}>
                <View
                  style={{
                    height: 80,
                    width: '100%',
                    backgroundColor: '#009984',
                    borderRadius: 20,
                    marginTop: 3,
                    padding: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', padding: 6}}>
                      <Text style={{color: 'white', fontSize: 16}}>
                        Payment{' '}
                      </Text>
                      <Text style={{color: 'white', fontSize: 16}}>
                        Method :
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '75%',
                        alignItems: 'flex-end',
                        marginTop: 5,
                      }}>
                      <SwitchSelector
                        options={sugar}
                        initial={0}
                        selectedColor={'white'}
                        borderWidth={2}
                        buttonColor={'#009984'}
                        borderColor={'white'}
                        borderWidth={0.2}
                        hasPadding
                        height={45}
                        onPress={(value) => this.changeSML(value)}
                        // width={50}
                      />
                    </View>
                  </View>
                </View>
              </RBSheet>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    backgroundColor: 'red',

    borderRadius: 25,

    width: 110,
  },
  buttonstyle: {
    backgroundColor: '#009984',
    borderRadius: 15,
    width: '67%',
    padding: 0,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paybuttonstyle: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: '70%',
    padding: 0,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
