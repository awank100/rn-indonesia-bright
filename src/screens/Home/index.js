import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
// Components
import HomeTitle from '../../components/HomeTitle'
import ExpressList from '../../components/ExpressList'
// Constants
import { COLOR } from '../../constants'

class HomeScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 80,
      backgroundColor: 'white'
    },
    headerTitle: <HomeTitle />
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLOR.base} barStyle="light-content" />
        <View>
          <ExpressList />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default HomeScreen
