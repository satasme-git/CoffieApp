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
  LogBox,
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
  publishableKey: 'pk_live_cVXHeRbbcgl00vzc2kgb6vyy',
});

const sugar = [
  {label: 'Cash payment', value: '1'},
  {label: 'Card payment', value: '2'},
];
export class Cart extends PureComponent {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
    success: null,
    modalVisible: false,
    show: false,
    // _alert_heading: 'defaultt',
    _subtitle: 'default',
  };

  handleOpen() {
    this.setState({show: true});
  }

  handleClose = () => {
    this.setState({show: false});
    this.props.navigation.navigate('TabScreentest');
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
      _alert_heading: 'default',
      cart_details: '',
      _payment_method: 'Cash',
      _subtitle: 'default',
      pressed: false,
      tokens: '',
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
    // var paymentMethod;
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
    this.props.navigation.navigate('TabScreentest');
  };

  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    this.getCartData();

    // this.viewListData();
  }
  setRbsheet_height() {
    this.setState(
      {
        _rbsheet_height: 80,
      },
      // this.changestateheight,
    );
    this.RBSheet.open();
  }

  getCartData() {
    let {pPrice, total = 0} = this.props;
    db.listCartData(this.state.dbs)
      .then((results) => {
        result = results;

        var jsonTextValues = [];
        result.map((item, index) => {
          jsonTextValues.push({
            label: item.pId,
            value: item.pName,
          });
        });

        for (var i = 0; i < result.length; i++) {
          pPrice = result[i].pPrice;
          total += parseFloat(pPrice);
        }

        this.setState({
          isLoading: false,
          _list_elimination: results,
          _total: total,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    db.listCartTopins(this.state.dbs)
      .then((data) => {
        this.setState({
          cart_details: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  substracttem(id, price, qty, cId) {
    db.getMinusValue(this.state.dbs, cId)
      .then((data) => {
        if (data > 1) {
          var valQty = qty - 1;
          var itemqty = 1;
          if (valQty >= 1) {
            itemqty = valQty;
          } else {
            itemqty = 1;
          }
          var price1 = price * itemqty;
          let data = {
            pQty: this.state._pQty,
            _pPrice: price1,
            pId: id,
            cID: cId,
          };
          db.subItemQty(this.state.dbs, data)
            .then((result) => {
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addItem(id, price, qty, cId) {
    // var abc = price / qty;
    var price1 = price * (qty + 1);

    let data = {
      pQty: this.state._pQty,
      _pPrice: price1,
      pId: id,
      cID: cId,
    };

    db.addItemQty(this.state.dbs, data)
      .then((result) => {
        this.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteData(id) {
    db.deleteItem(this.state.dbs, id)
      .then((result) => {
        this.getData();
      })
      .catch((err) => {
        console.log(err);
        this.setState = {};
      });
  }
  getData() {
    let {pPrice, total = 0} = this.props;
    db.listCartItems(this.state.dbs)
      .then((data) => {
        let result = data;

        for (var i = 0; i < result.length; i++) {
          pPrice = result[i].pPrice;
          total += parseFloat(pPrice);
        }
        this.setState({
          isLoading: false,
          _list_elimination: data,
          _total: total,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async componentDidMount() {
    // this.RBSheet.open();
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const myArray = await AsyncStorage.getItem('cus_id');

    this.setState({
      isLoading: false,
      _cus_id: myArray,
    });
  }

  doPayment = async () => {
    this.setState({
      pressed: true,
    });

    // Use firebase serve for local testing if you don't have a paid firebase account
    fetch('https://us-central1-coffee-app-fb513.cloudfunctions.net/payWithStripe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: 100,
      currency: "usd",
      token: this.state.token
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });;
  };
  emptyCartData() {
    this.cart_data();
    db.deleteCartData(this.state.dbs)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });

    this.handleOpen();
  }
  testcartdetails() {
    db.listCartDataTest(this.state.dbs)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  cart_data = async () => {
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

    fetch('https://satasmemiy.tk/api/cart_data', {
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
        result,
        cart_details: this.state.cart_details,
        // cart_details
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.length; i++) {
          qty = responseJson[i].qty;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleCardPayPress = async () => {
    try {
      // this.setState({loading: true, token: null});
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: false,
        requiredBillingAddressFields: 'full',

        prefilledInformation: {
          billingAddress: {
            name: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: '',
            postalCode: ''
          },
        },
        
      });

      this.setState({
        loading: false,
        token:token,
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
                  uri: 'https://satasmemiy.tk/images/food/' + item.pImage,
                }}
                style={{width: 90, height: 80}}
              />
            </View>
          </Left>
          <Body style={{marginLeft: -100}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 3,
              }}>
              <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                {item.pName}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ff4081',
                  width: 65,
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

            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontSize: 10, color: 'gray'}}>
              {item.pDescription}
            </Text>
            {item.pSize != '' ? (
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: 'red',
                  marginTop: 5,
                }}>
                {item.pSize}
              </Text>
            ) : null}

            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontSize: 13, fontWeight: 'bold', color: 'green'}}>
              {item.pExtra}
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
                {item.pPrice}{' '}
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
                  this.substracttem(
                    item.pId,
                    item.pOnePrice,
                    item.pQty,
                    item.cId,
                  )
                }
              />
              <Text
                style={{
                  color: 'gray',
                  paddingLeft: 10,
                  paddingEnd: 10,
                  paddingTop: 5,
                }}>
                {item.pQty}
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
                  this.addItem(item.pId, item.pOnePrice, item.pQty, item.cId)
                }
              />
            </View>
          </Body>
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
            {/* <ScrollView
              contentInsetAdjustmentBehavior="automatic"
             
            
              style={styles.scrollView}> */}
            <FlatList
              initialScrollIndex={0}
              nestedScrollEnabled={true}
              contentContainerStyle={{
                padding: 15,
                paddingTop: StatusBar.currentHeight || 0,
              }}
              ListEmptyComponent={this.emptyComponent}
              scrollEnabled={true}
              keyExtractor={this.keyExtractor}
              data={this.state._list_elimination}
              renderItem={this.renderItem}
            />

            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                }}>
                <View style={{padding: 10, flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column', width: 120}}>
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

                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      US $ {Math.floor(this.state._total * 100) / 100}
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
                    // justifyContent: 'center',
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
    // width: '100%'
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
    width: '67%',
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
