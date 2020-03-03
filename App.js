/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { SettingScreen } from "./component/AppStack/SettingScreen";
import { ArchiveScreen } from "./component/AppStack/ArchiveScreen";
import { CashScreen } from "./component/AppStack/CashScreen";
import { HomeScreen } from "./component/AppStack/HomeScreen";
import { LoginScreen } from "./component/AuthStack/LoginScreen";
import { RollScreen } from "./component/AuthStack/RollScreen";
import { LoadScreen } from "./component/LoadScreen";
import { FinderScreen } from './component/AppStack/FinderScreen';
import { FoundScreen } from './component/AppStack/FoundScreen';
import { ChatScreen } from './component/AppStack/ChatScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roll : '',
    }
    let oldRender = Text.render;
    Text.render = function (...args) {
      let origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{ fontFamily: 'IRANSansMobile_Light' }, origin.props.style],
      });
    };
  }

  render() {
    return (
      <SafeAreaProvider>
        <AppContainer>
          <TabNavigator roll={this.state.roll} />
        </AppContainer>
      </SafeAreaProvider>
    )
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  Home: { screen: HomeScreen, navigationOptions: { title: 'خانه' } },
  Cash: { screen: CashScreen, navigationOptions: { title: 'کیف پول' } },
  Archive: { screen: ArchiveScreen, navigationOptions: { title: 'گزارشات' } },
  Setting: { screen: SettingScreen, navigationOptions: { title: 'تنظیمات' } },
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
     
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName , params } = navigation.state;
        let IconComponent = FontAwesome5;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
          // IconComponent = ConsultationIconWithBadge;
        } else if (routeName === 'Cash') {
          iconName = 'wallet';
        } else if (routeName === 'Archive') {
          iconName = 'file-contract';
        } else if (routeName === 'Setting') {
          iconName = 'user-cog';
        }
        return (
          <IconComponent name={iconName} style={{ fontSize: 25 }} color={tintColor} />
        );
        // You can return any component that you like here!
      },
      tabBarPosition: 'bottom',
     
    }),
    tabBarOptions: {
      activeTintColor: '#175082',
      inactiveTintColor: '#9fb1c8',
      showLabel: true,
      swipeEnabled: true,
      showIcon: true,
      labelStyle: {
        fontSize: 10,
        fontFamily: 'IRANSansMobile_Bold',
      },
      iconStyle: {
        width: '100%',
      },
      indicatorStyle: {
        opacity: 0,
      },

      style: {
        width: '100%',
        flex: 0.1,
        justifyContent: 'center',
        backgroundColor: 'white',
        // height: 80,
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1,
        },
      },
    },
    initialRouteName: 'Home'
  },
);
const AuthStack = createStackNavigator(
  { Login: LoginScreen, ChooseRoll: RollScreen },
  {
    initialRouteName: 'ChooseRoll',
    headerMode: 'none',
  });

const AppStack = createStackNavigator({ Tab: TabNavigator, Finder: FinderScreen, Found: FoundScreen, Chat: ChatScreen }, {
  headerMode: 'none',
  initialRouteName:'Tab'
});

const AppContainer = createAppContainer(createAnimatedSwitchNavigator(
  {
    Load: LoadScreen,
    Auth: AuthStack,
    App: AppStack,

  },
  {
    initialRouteName: 'Load',
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="fade"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
),
);


export default App;
