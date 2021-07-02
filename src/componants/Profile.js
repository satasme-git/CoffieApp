import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {CustomHeader} from '../index';
import {Avatar,Button} from 'react-native-elements';
import QRCode from 'react-native-qrcode-generator';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
// import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
// const options = {
//   title: 'Select Avatar',
//   takePhotoButtonTitle: 'Take a photo',
//   chooseFromLibraryButtonTitle: 'choose from galary',
//   quality: 1
// }
var options = {
  title: 'Select Image',
  customButtons: [
    {
      name: 'customOptionKey',
      title: 'Choose Photo from Custom Option',
    },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: '',
      _id: '',
      _name: '',
      _email: '',
      _mobile_no: '',
      _points: 0,
      _cus_id: '',
      _orderCount: '0',
      _orderboxCount: 0,
      imageSource: null,
      dataa: null,
      abc: '',
    };
  }
  state = {
    text: 'https://facebook.github.io/react-native/',
  };
  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('cus_id');
    this.setState({
      isLoading: false,
      _cus_id: myArray,
    });
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.getoPoints();
      this.getorderCount();
      this.getorderBoxCount();
      this.getoprofileDetails();
    });
   
  }
  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }
  selectPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        const imdata = response.data;

        this.setState({
          isLoading: false,
          imageSource: source,
          abc: '',
          dataa: imdata,
        });

        this.uploadPhoto();
      }
    });
  }
  async uploadPhoto() {
    var aaaa = this.state.dataa;
    const myArray = await AsyncStorage.getItem('cus_id');

    RNFetchBlob.fetch(
      'POST',
      'https://satasmemiy.tk/api/fileUpload',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      [
        {name: 'image', filename: 'image.png', type: 'image/png', data: aaaa},
        {name: 'member_id', data: myArray},
      ],
    )
      .then((resp) => {
        console.log(resp.text());
        Alert.alert('Success', 'Upload successfully', [{text: 'OK'}]);
      })
      .catch((err) => {
        Alert.alert('Error', 'Something went wrong', [{text: 'OK'}]);
        console.log(err);
      });

    this.setState({
      isLoading: false,

      dataa: '',
    });
  }
  async getoPoints() {
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://satasmemiy.tk/api/points/' + myArray, {
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
          _points: responseJson.points,
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
          _name: responseJson.name,
          _email: responseJson.email,
          _mobile_no: responseJson.mobile_no,
          text: responseJson.mobile_no,
          // _points: responseJson.points,
          _cus_id: myArray,
          abc: responseJson.image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getorderCount() {
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://satasmemiy.tk/api/countorder/' + myArray, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          _orderCount: responseJson.orders_Count,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getorderBoxCount() {
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://satasmemiy.tk/api/countorderbox/' + myArray, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          _orderboxCount: responseJson.orderbox_Count,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async refresh() {
    this.getorderCount();
    this.getorderBoxCount();
    // const myArray = await AsyncStorage.getItem('cus_id');
    const myArray = await AsyncStorage.getItem('cus_id');
    fetch('https://satasmemiy.tk/api/profile/' + myArray, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          _id: responseJson.id,
          _name: responseJson.name,
          _email: responseJson.email,
          _mobile_no: responseJson.mobile_no,
          text: responseJson.mobile_no,
          _points: responseJson.points,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          title=""
          isHome={true}
          bdcolor="#3B7457"
          bgcolor="#3B7457"
          navigation={this.props.navigation}
        />
        {this.state._cus_id != null ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.header}>
              <View style={{height: 200}}>
                <View
                  style={{
                    backgroundColor: '#3B7457',
                    height: 240,
                    zIndex: -1,
                  }}></View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: 240,
                  }}>
                  <Avatar
                    rounded
                    showEditButton
                    size={120}
                    // source={
                    //   this.state.imageSource !== null
                    //     ? this.state.imageSource
                    //     : require('../images/profiled.png')
                    // }

                    source={
                      this.state.abc != ''
                        ? {
                            uri:
                              'https://satasmemiy.tk/images/Customer/' +
                              this.state.abc,
                          }
                        : this.state.imageSource !== null
                        ? this.state.imageSource
                        : require('../images/profiled.png')
                    }
                    containerStyle={{
                      margin: 10,
                      shadowColor: 'rgba(0,0,0, .4)', // IOS
                      shadowOffset: {height: 3, width: 8},
                      borderWidth: 6,
                      borderColor: 'white', // IOS
                      shadowOpacity: 3, // IOS
                      shadowRadius: 5,
                      elevation: 8,
                    }}
                    onEditPress={() => console.log('edit button pressed')}
                    onLongPress={() => console.log('component long pressed')}
                    // onPress={() => this.props.navigation.navigate('ProfileImageView')}
                    editButton={{
                      name: 'edit',
                    }}
                    onPress={() => this.selectPhoto()}
                    // showAccessory
                    // onAccessoryPress={() => this.selectPhoto()}
                    // accessory={{ size: 33, style: { backgroundColor: 'gray', height: 45, paddingTop: 3, width: 45, borderRadius: 25, alignItems: 'center', alignContent: 'center' } }}
                  />

                  <Text
                    style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
                    {this.state._name}
                  </Text>
                  <Text style={{color: 'white'}}>{this.state._email}</Text>
                </View>
              </View>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig">
              <View style={{height: 500}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 40,
                    }}>
                    <Text
                      style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        color: '#3B7457',
                      }}>
                      {this.state._orderCount != null
                        ? this.state._orderCount
                        : 0}
                    </Text>
                    <Text style={{fontSize: 16, marginTop: -10}}>Orders</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 40,
                    }}>
                    <Text
                      style={{fontSize: 45, fontWeight: 'bold', color: '#3B7457'}}>
                      {this.state._points != null ? this.state._points : 0}
                    </Text>
                    <Text style={{fontSize: 16, marginTop: -10}}>Points</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 40,
                    }}>
                    <Text
                      style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        color: '#3B7457',
                      }}>
                      {this.state._orderboxCount != null
                        ? this.state._orderboxCount
                        : 0}
                    </Text>
                    <Text style={{fontSize: 16, marginTop: -10}}>
                      Box Orders
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <QRCode
                    value={'' + this.state._mobile_no}
                    size={200}
                    bgColor="black"
                    fgColor="white"
                  />

                  {/* <TouchableOpacity
                  style={{marginTop: 20}}
                  onPress={() => this.selectPhoto()}>
                  <Text>refresh</Text>
                </TouchableOpacity> */}
                </View>
              </View>
            </Animatable.View>
          </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
              
            <Text>Please login</Text>
            <Button
           
              title="Login"
              activeOpacity={0.5}
             
              titleStyle={{color: 'white'}}
              buttonStyle={
                (styles.submitText,
                {
                  backgroundColor: 'red',
                  borderRadius: 5,
                  // width: '100%',
                  borderColor: 'white',
                  color: '#ccc',
                  padding: 5,
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  marginTop:10,
                })
              }
              
              onPress={()=>this.props.navigation.navigate('SignIn')}
            />

          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9100',

    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,

    elevation: 2,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  header: {
    justifyContent: 'center',
    // alignItems: 'center',

    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    height: 200,
  },
  title: {
    color: '#85375a',
    fontWeight: 'normal',
    fontSize: 18,
  },
  text: {
    color: 'gray',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  // footer: {
  //   marginTop: 20,
  //   flex: 1,
  //   backgroundColor: 'white',

  //   paddingHorizontal: 10,
  //   // paddingVertical: 30,
  //   height: 500,
  // },
  container: {},
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  circleGradient: {
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  linearGradient: {
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
  triangleCorner: {
    // position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    // zIndex: -1,
    // borderRightWidth: 600,
    borderTopWidth: 170,
    borderRightColor: 'transparent',
    borderTopColor: '#3B7457',
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingVertical: 20,
    padding: 20,
    //  paddingHorizontal: 20
  },
  // header: {
  //   flex: 1,
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  // },
});
