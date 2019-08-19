import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Button, ListItem, Avatar } from 'react-native-elements'
import { NavigationActions, StackActions } from 'react-navigation'
// Actions
import { fetchProfile, logout } from './actions'
// Constants
import { COLOR } from '../../constants'
// Components
import Loading from '../../components/Loading'

class ProfileScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      // height: 80,
      backgroundColor: COLOR.base
    },
    title: 'Profile',
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  async componentDidMount() {
    await this.fetchProfile()
  }

  fetchProfile = async () => {
    this.setState({ isLoading: true })
    const result = await this.props.dispatch(fetchProfile())
    this.setState({ isLoading: false })
    if (result.status === 403) {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'AppTabNavigator' }),
          NavigationActions.navigate({ routeName: 'Login' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  logout = async () => {
    await this.props.dispatch(logout())
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'AppTabNavigator' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { isLoading } = this.state
    const { profile } = this.props.Auth

    if (isLoading || profile === null) {
      return <Loading />
    }

    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10, alignSelf: 'center' }}>
          <Avatar
            rounded
            source={{
              uri: profile.avatar
            }}
            style={{ height: 200, width: 200 }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <ListItem
            title={`${profile.name} (${profile.username})`}
            leftIcon={{ type: 'font-awesome', name: 'user', color: COLOR.base }}
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <Button
            type="outline"
            title="Logout"
            titleStyle={{ color: COLOR.base }}
            buttonStyle={{ borderColor: COLOR.base }}
            onPress={this.logout}
          />
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

const mapStateToProps = state => {
  return {
    Auth: state.Auth
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)
