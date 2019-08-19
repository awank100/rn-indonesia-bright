import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Avatar, Divider, Button } from 'react-native-elements'
import Moment from 'moment'
// Actions
import { setParams, fetchList, fetchNextList, doLove } from './action'
// Constants
import { COLOR } from '../../constants'
// Components
import LoveButton from './components/LoveButton'
import CommentForm from './components/CommentForm'
import Loading from '../../components/Loading'

class CommentScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.base
    },
    title: 'Comments',
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    },
    tabBarVisible: false
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      refreshing: false,
      dummy: 0
    }
  }

  async componentDidMount() {
    await this.fetchData()
  }

  fetchData = async () => {
    const params = {
      page: 1
    }

    this.setState({ isLoading: true, refreshing: true })
    this.props.dispatch(setParams(params))
    const result = await this.props.dispatch(fetchList())
    this.setState({
      dummy: this.state.dummy + 1,
      isLoading: false,
      refreshing: false
    })
  }

  fetchNextData = async () => {
    const state = this.props.Express
    const params = {
      page: state.page + 1
    }

    this.setState({ isLoading: true, refreshing: true })
    this.props.dispatch(setParams(params))
    const result = await this.props.dispatch(fetchNextList())
    this.setState({
      dummy: this.state.dummy + 1,
      isLoading: false,
      refreshing: false
    })
  }

  love = async (comment, index) => {
    if (this.props.profile === null) {
      // eslint-disable-next-line no-alert
      alert('Silahkan login')
    } else {
      const result = await this.props.dispatch(doLove(comment._id, index))
      this.setState({ dummy: this.state.dummy + 1 })
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <Avatar
                rounded
                style={{ height: 35, width: 35 }}
                source={{ uri: item.userId.avatar }}
              />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                  {item.userId.username}
                </Text>
                <View style={{ flexDirection: 'row', width: 100 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#555', fontSize: 12 }}>
                      {Moment(item.createdAt).fromNow()}
                    </Text>
                  </View>
                  <Text
                    style={{ color: '#555', fontSize: 12, fontWeight: 'bold' }}
                  >
                    {`${item.loveCount > 0 ? item.loveCount : ''}`}{' '}
                    {`${
                      item.loveCount >= 1
                        ? item.loveCount === 1
                          ? 'like'
                          : 'likes'
                        : ''
                    }`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.commentBody}>
              <Text style={{ fontStyle: 'italic' }}>{item.message}</Text>
            </View>
          </View>

          <LoveButton item={item} index={index} loveAction={this.love} />
        </View>

        {index === this.props.Comment.data.length - 1 && (
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
    const { express } = this.props.Comment
    const { isLoading, refreshing } = this.state

    if (isLoading && this.props.Comment.data.length === 0) {
      return <Loading />
    }
    
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.expressContainer}>
            <View style={styles.expressHeader}>
              <Avatar
                rounded
                style={{ height: 35, width: 35 }}
                source={{ uri: express.userId.avatar }}
              />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                  {express.userId.username}
                </Text>
                <Text style={{ color: '#555', fontSize: 12 }}>
                  {Moment(express.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <View style={styles.expressBody}>
              <Text style={{ fontStyle: 'italic' }}>{express.message}</Text>
            </View>
          </View>

          <Divider style={{ marginTop: 10, backgroundColor: '#777' }} />

          <FlatList
            data={this.props.Comment.data}
            renderItem={this.renderItem}
            refreshing={refreshing}
            onRefresh={this.fetchData}
            keyExtractor={item => item._id}
            extraData={this.state.dummy}
          />
        </View>

        <CommentForm />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  expressContainer: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  expressHeader: {
    flexDirection: 'row'
  },
  expressBody: {
    marginTop: 10
  },
  commentContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  commentHeader: {
    flexDirection: 'row'
  },
  commentBody: {
    marginTop: 5
  }
})

const mapStateToProps = state => {
  return {
    profile: state.Auth.profile,
    Comment: state.Comment
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentScreen)
