import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { Image, Divider, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
// Components
import Loading from '../../components/Loading'
import HeaderCard from './HeaderCard'
import BodyCard from './BodyCard'
import SupportButton from './SupportButton'
import NotRelevanButton from './NotRelevanButton'
import CommentButton from './CommentButton'
// Constants
import { COLOR } from '../../constants'
// Actions
import {
  setParams,
  fetchList,
  fetchNextList,
  doSupport,
  doNotRelevan
} from '../../redux/expressAction'
import { setExpress } from '../../screens/Comment/action'
import { fetchProfile } from '../../screens/Profile/actions'
import { baseUrl } from '../../api'

class ExpressList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      refreshing: false
    }
  }

  async componentDidMount() {
    await this.fetchProfile()
    await this.fetchData()
  }

  fetchProfile = async () => {
    const getProfile = await this.props.dispatch(fetchProfile(false))
  }

  fetchData = async () => {
    const params = {
      page: 1
    }

    this.setState({ isLoading: true, refreshing: true })
    this.props.dispatch(setParams(params))
    const result = await this.props.dispatch(fetchList())
    this.setState({ isLoading: false, refreshing: false })
  }

  fetchNextData = async () => {
    const state = this.props.Express
    const params = {
      page: state.page + 1
    }

    this.setState({ isLoading: true, refreshing: true })
    this.props.dispatch(setParams(params))
    const result = await this.props.dispatch(fetchNextList())
    this.setState({ isLoading: false, refreshing: false })
  }

  support = async (express, index) => {
    if (this.props.profile === null) {
      this.props.navigation.navigate('Login')
    } else {
      const result = await this.props.dispatch(doSupport(express._id, index))
    }
  }

  notRelevan = async (express, index) => {
    if (this.props.profile === null) {
      this.props.navigation.navigate('Login')
    } else {
      const result = await this.props.dispatch(doNotRelevan(express._id, index))
    }
  }

  showComment = express => {
    this.props.dispatch(setExpress(express))
    this.props.navigation.navigate('Comment')
  }

  renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={{ paddingTop: 10 }}>
          <HeaderCard item={item} />

          {item.imageUrl && (
            <View style={{ marginTop: 5 }}>
              <Image
                source={{ uri: `${baseUrl}/${item.imageUrl}` }}
                style={{ height: 300, resizeMode: 'cover' }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          )}

          <View style={{ marginTop: 5, paddingLeft: 15 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}
            >
              <SupportButton
                item={item}
                index={index}
                supportAction={this.support}
              />

              <CommentButton
                item={item}
                index={index}
                commentAction={this.showComment}
              />

              <NotRelevanButton
                item={item}
                index={index}
                notRelevanAction={this.notRelevan}
              />
            </View>
          </View>

          <BodyCard item={item} />
        </View>

        <Divider style={{ marginTop: 10, backgroundColor: '#777' }} />

        {index === this.props.Express.data.length - 1 && (
          <View style={{ margin: 10 }}>
            <Button
              title="Tampilkan Lebih"
              type="outline"
              buttonStyle={{ borderColor: COLOR.base, borderRadius: 10 }}
              titleStyle={{ color: COLOR.base }}
              onPress={this.fetchNextData}
              loading={this.state.isLoading}
            />
          </View>
        )}
      </View>
    )
  }

  render() {
    const { isLoading, refreshing } = this.state
    if (isLoading && this.props.Express.data.length === 0) {
      return <Loading />
    }
    return (
      <View style={{}}>
        <FlatList
          data={this.props.Express.data}
          renderItem={this.renderItem}
          refreshing={refreshing}
          onRefresh={this.fetchData}
          style={{ marginBottom: 10 }}
          contentContainerStyle={{ marginBottom: -10 }}
          keyExtractor={item => item._id}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.Auth.profile,
    Express: state.Express
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(ExpressList))
