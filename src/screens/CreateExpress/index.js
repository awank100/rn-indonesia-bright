import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { NavigationActions, StackActions } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'
import { Formik } from 'formik'
// Actions
import { fetchProfile } from '../Profile/actions'
import { firstStep, update, upload } from './action'
// Constants
import { COLOR } from '../../constants'
// Components
import Loading from '../../components/Loading'
import { baseUrl } from '../../api'

const options = {
  title: 'Pilih Gambar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

class CreateExprssScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      // height: 80,
      backgroundColor: COLOR.base
    },
    title: 'Tambah Pesan',
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      detail: null,
      image: null,
      uploading: false
    }
  }

  async componentDidMount() {
    await this.fetchProfile()
    await this.firstStep()
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

  firstStep = async () => {
    this.setState({ isLoading: true })
    const result = await this.props.dispatch(firstStep())
    this.setState({ isLoading: false })
    if (result.status) {
      this.setState({ detail: result.data })
    }
  }

  launchImageLibrary = async () => {
    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = response
        this.setState({
          image: source
        })
        await this.upload()
      }
    })
  }

  launchCamera = async () => {
    ImagePicker.launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = response
        this.setState({
          image: source
        })
        await this.upload()
      }
    })
  }

  upload = async () => {
    this.setState({ uploading: true })
    const data = new FormData()

    data.append('image', {
      name: this.state.image.fileName,
      type: this.state.image.type,
      uri:
        Platform.OS === 'android'
          ? this.state.image.uri
          : this.state.image.uri.replace('file://', '')
    })

    const result = await this.props.dispatch(
      upload(this.state.detail._id, data)
    )
    if (result.status) {
      this.setState({ detail: result.data })
    } else {
      alert(result.errors.image[0])
    }
    this.setState({ uploading: false })
  }

  render() {
    const { isLoading, detail, uploading } = this.state
    if (isLoading || detail === null) {
      return <Loading />
    }

    return (
      <View style={styles.container}>
        <View style={styles.btnUpload}>
          <Button
            type="outline"
            title="Pilih Gambar"
            titleStyle={{ paddingLeft: 10, color: COLOR.base }}
            icon={
              <Icon
                type="material-icons"
                name="perm-media"
                size={15}
                color={COLOR.base}
              />
            }
            buttonStyle={{ borderColor: COLOR.base }}
            onPress={this.launchImageLibrary}
            disabled={this.state.uploading}
          />
          <Button
            type="outline"
            title="Ambil Gambar"
            titleStyle={{ paddingLeft: 10, color: COLOR.base }}
            icon={
              <Icon
                type="font-awesome"
                name="camera"
                size={15}
                color={COLOR.base}
              />
            }
            buttonStyle={{ borderColor: COLOR.base }}
            onPress={this.launchCamera}
            disabled={uploading}
          />
        </View>
        {uploading && (
          <View style={{ marginTop: 20 }}>
            <Loading />
          </View>
        )}
        {detail.imageUrl && (
          <View style={{ marginTop: 5 }}>
            <Image
              source={{ uri: `${baseUrl}/${detail.imageUrl}` }}
              style={{ height: 300, resizeMode: 'cover' }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        )}
        <View style={{ flex: 1, margin: 20 }}>
          <Formik
            initialValues={{
              message: ''
            }}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
              const result = await this.props.dispatch(
                update(this.state.detail._id, values)
              )
              if (result.status) {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'AppTabNavigator' })
                  ]
                })
                this.props.navigation.dispatch(resetAction)
              } else {
                setErrors(result.errors)
              }
              setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              handleSubmit
            }) => {
              return (
                <View style={{ flex: 1 }}>
                  <Text>Pesanmu:</Text>
                  <TextInput
                    multiline
                    placeholder="Tulis pesanmu untuk Indonesia lebih baik ..."
                    value={values.message}
                    onBlur={handleBlur('message')}
                    onChangeText={handleChange('message')}
                    style={{ fontSize: 20 }}
                  />
                  <View style={styles.errorInputContainer}>
                    {errors.message &&
                      errors.message.map((error, index) => {
                        return (
                          <Text key={index} style={styles.errorInputText}>
                            {error}
                          </Text>
                        )
                      })}
                  </View>
                  <Button
                    title="Kirim"
                    titleStyle={{ color: 'white', paddingLeft: 10 }}
                    icon={
                      <Icon
                        type="font-awesome"
                        name="send"
                        size={15}
                        color="white"
                      />
                    }
                    buttonStyle={{ backgroundColor: COLOR.base }}
                    disabled={uploading || isSubmitting}
                    onPress={handleSubmit}
                  />
                </View>
              )
            }}
          </Formik>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnUpload: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  errorInputContainer: {
    marginLeft: 0
  },
  errorInputText: {
    color: 'red'
  }
})

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateExprssScreen)
