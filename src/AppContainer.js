import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
// Screens
import HomeScreen from './screens/Home'
import ProfileScreen from './screens/Profile'
import LoginScreen from './screens/Auth/Login'
import RegisterScreen from './screens/Auth/Register'
import CommentScreen from './screens/Comment'
import CreateExpressScreen from './screens/CreateExpress'

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Comment: {
      screen: CommentScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const routes = navigation.state.routes
      if (routes[routes.length - 1].routeName !== 'Home') {
        return {
          tabBarVisible: false
        }
      }
      return {}
    }
  }
)

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen
  }
})

const CreateExpressStack = createStackNavigator({
  CreateExpress: {
    screen: CreateExpressScreen
  }
})

const AppTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name="home" color={tintColor} />
        )
      }
    },
    CreateExpress: {
      screen: () => <div />,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name="plus" color={tintColor} />
        ),
        tabBarLabel: 'New',
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate('NewExpress')
        }
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name="user" color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null
    },
    shifting: true,
    activeColor: '#FF6433',
    barStyle: { backgroundColor: 'white' }
  }
)

const AppStackNavigator = createStackNavigator({
  AppTabNavigator,
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
  NewExpress: CreateExpressScreen
})

const AppContainer = createAppContainer(AppStackNavigator)

export default AppContainer
