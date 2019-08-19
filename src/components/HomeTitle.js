import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { COLOR } from '../constants'

class HomeTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/undraw_high_five.png')}
          style={styles.logo}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Indonesia Bright</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  logo: {
    marginLeft: 10,
    height: 80,
    width: 80
  },
  titleContainer: {
    marginLeft: 10,
    alignContent: 'center',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 20,
    color: COLOR.base,
    fontWeight: '700'
    // fontFamily: 'monospace'
  }
})

export default HomeTitle
