import * as React from 'react';
import {Button, Text, View, TouchableOpacity, LogBox,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Avatar, Icon, Badge} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
LogBox.ignoreAllLogs(true);

import {
  CofeeDetails,
  TabScreentest,
  Cart,
  StripPaymentwebview,
  TestScreen,
  MainHome,
  SplashScreen,
  SignIn,
  Home,
  Profile,
  Search,
  Details,
  Menu,
  PlaceOrder,
  FirstPage,
  MainPage,
  SignUp,
  WhereHouse,
  AboutUs,
  AboutUsScreeen,
  FoodForm,
  StripePayment,
  CardFormScreen,
  WishList,
  Events,
  
  BoxesCart,
  


} from './src/componants';

import {CartComponant} from './src';
import {CustomDrawerContent} from './src';
import BoxessFree from './src/componants/BoxessFree';
import CommercialBoxes from './src/componants/CommercialBoxes';
import HomeAppliance from './src/componants/HomeAppliance';



const AuthStack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();
const StackApp = createStackNavigator();
const MenuStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Wherehouse = createStackNavigator();
const AboutUss = createStackNavigator();

const Tab = createMaterialTopTabNavigator();
function TabNavigator() {
  // options={{
  //   headerShown:true
  // }}
  return (
   
    <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 12 },
      tabStyle: { width: 100 },
      style: { backgroundColor: 'green' },
    }}
      screenOptions={({route}) => ({
        headerShown:true
        // tabBarLabel: ({focused, color, size}) => {
          // let iconName;

          // if (route.name === 'Home') {
          //   iconName = focused ? IMAGE.ICON_HOME : IMAGE.ICON_HOME_BLACK;
          // } else if (route.name === 'Settings') {
          //   iconName = focused ? IMAGE.ICON_SETTING : IMAGE.ICON_SETTING_BLACK;
          // }

          // You can return any component that you like here!
         
        // },
      })}
      // tabBarOptions={{
      //   activeTintColor: 'red',
      //   inactiveTintColor: 'gray',
      // }}
    >
      <Tab.Screen
        name="AboutUsScreeen"
        options={{headerShown: true}}
        component={AboutUsScreeen}
      />
      <Tab.Screen name="FoodForm" component={FoodForm} options={{}} />
    </Tab.Navigator>
    // {/* // </NavigationContainer> */}
  );
}

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="WishList"
      options={{headerShown: false}}
      component={WishList}
    />
  </SearchStack.Navigator>
);

// const MenuStackScreen = ({ }) => (
//   <MenuStack.Navigator>
//     <MenuStack.Screen
//       options={{ headerShown: false }}

//       component={TabScreentest}
//     />

//   </MenuStack.Navigator>
// );

const DrawerStackScreen = ({navigation}) => (
  <Drawer.Navigator
    initialRouteName="tabs"
    drawerStyle={{backgroundColor: 'transparent'}}
    drawerContent={() => <CustomDrawerContent navigation={navigation} />}>
    <Drawer.Screen name="tabs" component={TabsCreen} />
    <Drawer.Screen name="AboutUsScreeen" component={AboutUsScreeen} />
    <Drawer.Screen name="WhereHouse" component={WhereHouse} />
    <Drawer.Screen name="Events" component={Events} />
    <Drawer.Screen name="BoxessFree" component={BoxessFree} />
    <Drawer.Screen name="CommercialBoxes" component={CommercialBoxes} />
    <Drawer.Screen name="HomeAppliance" component={HomeAppliance} />
    
    {/* <Drawer.Screen name="TabNavigator" component={TabNavigator} /> */}
    
    
  </Drawer.Navigator>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="MainHome"
      options={{
        headerShown: true,
        title: 'Home s',
        headerTitleStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#3B7457',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 18}}
            onPress={() => navigation.openDrawer()}>
            <Icon
              // raised
              name="bars"
              type="font-awesome"
              color="white"
              iconStyle={{fontSize: 25, fontWeight: 'normal'}}
              onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>
        ),
      }}
      component={MainHome}
    />
  </HomeStack.Navigator>
);

const WherehouseScreen = ({navigation}) => (
  <Wherehouse.Navigator>
    <Wherehouse.Screen
      name="wherehouse"
      options={{
        headerShown: true,
        title: '',
        headerTitleStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#3B7457',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}
            onPress={() => navigation.openDrawer()}>
            <Icon
              // raised
              name="bars"
              type="font-awesome"
              color="white"
              iconStyle={{fontSize: 25, fontWeight: 'normal',padding:10,borderRadius:20}}
              // onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>
        ),
      }}
      component={MainHome}
    />
  </Wherehouse.Navigator>
);
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      options={{headerShown: false}}
      component={Profile}
    />
  </ProfileStack.Navigator>
);
const AboutUsScreen = ({navigation}) => (
  <AboutUss.Navigator>
    <AboutUss.Screen
      name="AboutUs"
      options={{
        headerShown: true,
        title: 'About Us',
        headerTitleStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#3B7457',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 18}}
            onPress={() => navigation.openDrawer()}>
            <Icon
              // raised
              name="bars"
              type="font-awesome"
              color="white"
              iconStyle={{fontSize: 25, fontWeight: 'normal'}}
            />
          </TouchableOpacity>
        ),
      }}
      component={AboutUs}
    />
  </AboutUss.Navigator>
);

const TabsCreen = ({navigation}) => (
  <Tabs.Navigator
    initialRouteName="wherehouse"
    activeColor="#3B7457"
    inactiveColor="#bdbdbd"
    barStyle={{backgroundColor: 'white'}}>
    <Tabs.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
      name="wherehouse"
      component={WherehouseScreen}
    />
    {/* <Tabs.Screen
      options={{
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }}
      name="Home" component={HomeStackScreen} /> */}
    <Tabs.Screen
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
      name="Profile"
      component={ProfileStackScreen}
      onPress={() => navigation.openDrawer()}
    />
    <Tabs.Screen
      options={{
        tabBarLabel: 'Loyality Card',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="credit-card" color={color} size={26} />
        ),
      }}
      name="WhereHouse"
      component={WhereHouse}
    />
    {/* <Tabs.Screen
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cart" color={color} size={26} />
        ),
      }}
      name="SearchStackScreen" component={SearchStackScreen} /> */}
  </Tabs.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="SplashScreen">
        <StackApp.Screen
          name="drawer"
          options={{headerShown: false}}
          component={DrawerStackScreen}
        />
        <StackApp.Screen
          name="SplashScreen"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        <StackApp.Screen
          name="SignIn"
          options={{headerShown: false}}
          component={SignIn}
        />
        <StackApp.Screen
          name="CofeeDetails"
          options={{
            headerShown: false,
            title: 'Our Menu',
            headerStyle: {backgroundColor: '#fff', elevation: 0},
          }}
          component={CofeeDetails}
        />
        <StackApp.Screen
          name="MainHome"
          options={{headerShown: true}}
          component={MainHome}
        />
        <StackApp.Screen
          name="Home"
          options={{headerShown: false}}
          component={TabsCreen}
        />
        <StackApp.Screen
          name="TabScreentest"
          options={{
            headerShown: true,
            title: 'Our Menu',
            headerStyle: {backgroundColor: '#fff', elevation: 0},
          }}
          component={TabScreentest}
        />
        {/* <StackApp.Screen name="WhereHouse" options={{ headerShown: false }} component={WhereHouse} /> */}
        <StackApp.Screen
          name="AboutUs"
          options={{headerShown: false}}
          component={AboutUsScreen}
        />
        {/* <StackApp.Screen name="AboutUsScreeen" options={{ headerShown: false }} component={AboutUsScreeen} /> */}
        <StackApp.Screen
          name="Cart"
          options={{headerShown: true}}
          component={Cart}
        />
        <StackApp.Screen
          name="FoodForm"
          options={{headerShown: true}}
          component={FoodForm}
        />
        <StackApp.Screen
          name="CardFormScreen"
          options={{headerShown: true}}
          component={CardFormScreen}
        />
        {/* <StackApp.Screen name="WishList" options={{ headerShown: false, headerStyle: { backgroundColor: '#fff', elevation: 0 } }} component={WishList} /> */}
        <StackApp.Screen
          name="StripPaymentwebview"
          options={{headerShown: true}}
          component={StripPaymentwebview}
        />
        <StackApp.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />

        <StackApp.Screen name="Boxes Cart"  component={BoxesCart}/>
  
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
