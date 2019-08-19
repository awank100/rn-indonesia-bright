import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image, TextInput, Text } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import { StackActions, NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Actions
import { register } from '../actions'
// Constants
import { COLOR } from '../../../constants'

class RegisterScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.base
    },
    title: 'Register',
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/undraw_authentication.png')}
              style={{ height: 150, width: 150 }}
            />
          </View>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{
                name: '',
                username: '',
                password: '',
                passwordConfirmation: ''
              }}
              onSubmit={async (values, { setErrors, setSubmitting }) => {
                const result = await this.props.dispatch(register(values))
                if (result.status === false) {
                  setErrors(result.errors)
                } else {
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: 'AppTabNavigator'
                      })
                    ]
                  })
                  this.props.navigation.dispatch(resetAction)
                }
                setSubmitting(false)
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue
              }) => {
                return (
                  <>
                    <View style={styles.formItem}>
                      <Input
                        placeholder="Nama"
                        placeholderTextColor="white"
                        leftIcon={
                          <Icon
                            type="font-awesome"
                            name="user"
                            size={24}
                            color="white"
                          />
                        }
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        containerStyle={{
                          backgroundColor: COLOR.base,
                          borderRadius: 10
                        }}
                        inputStyle={{ color: 'white' }}
                        onChangeText={handleChange('name')}
                        value={values.name}
                      />
                      <View style={styles.errorInputContainer}>
                        {errors.name &&
                          errors.name.map((error, index) => {
                            return (
                              <Text key={index} style={styles.errorInputText}>
                                {error}
                              </Text>
                            )
                          })}
                      </View>
                    </View>

                    <View style={styles.formItem}>
                      <Input
                        placeholder="Username"
                        placeholderTextColor="white"
                        leftIcon={
                          <Icon
                            type="font-awesome"
                            name="user"
                            size={24}
                            color="white"
                          />
                        }
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        containerStyle={{
                          backgroundColor: COLOR.base,
                          borderRadius: 10
                        }}
                        inputStyle={{ color: 'white' }}
                        onChangeText={handleChange('username')}
                        value={values.username}
                      />
                      <View style={styles.errorInputContainer}>
                        {errors.username &&
                          errors.username.map((error, index) => {
                            return (
                              <Text key={index} style={styles.errorInputText}>
                                {error}
                              </Text>
                            )
                          })}
                      </View>
                    </View>

                    <View style={styles.formItem}>
                      <View style={styles.inputPasswordContainer}>
                        <View style={{ marginLeft: 20 }}>
                          <Icon type="font-awesome" name="key" color="white" />
                        </View>
                        <TextInput
                          placeholder="Password"
                          placeholderTextColor="white"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          secureTextEntry={true}
                          style={{
                            color: 'white',
                            fontSize: 18,
                            padding: 10
                          }}
                        />
                      </View>
                      <View style={styles.errorInputContainer}>
                        {errors.password &&
                          errors.password.map((error, index) => {
                            return (
                              <Text
                                key={index}
                                numberOfLines={2}
                                style={styles.errorInputText}
                              >
                                {error}
                              </Text>
                            )
                          })}
                      </View>
                    </View>

                    <View style={styles.formItem}>
                      <View style={styles.inputPasswordContainer}>
                        <View style={{ marginLeft: 20 }}>
                          <Icon type="font-awesome" name="key" color="white" />
                        </View>
                        <TextInput
                          placeholder="Konfirmasi Password"
                          placeholderTextColor="white"
                          value={values.passwordConfirmation}
                          onChangeText={handleChange('passwordConfirmation')}
                          secureTextEntry={true}
                          style={{
                            color: 'white',
                            fontSize: 18,
                            padding: 10
                          }}
                        />
                      </View>
                      <View style={styles.errorInputContainer}>
                        {errors.passwordConfirmation &&
                          errors.passwordConfirmation.map((error, index) => {
                            return (
                              <Text
                                key={index}
                                numberOfLines={2}
                                style={styles.errorInputText}
                              >
                                {error}
                              </Text>
                            )
                          })}
                      </View>
                    </View>

                    <View style={styles.buttonSubmit}>
                      <Button
                        title="Register"
                        type="outline"
                        titleStyle={{ color: COLOR.base }}
                        onPress={() => handleSubmit()}
                        disabled={isSubmitting}
                        buttonStyle={{
                          borderRadius: 10,
                          borderColor: COLOR.base,
                          borderWidth: 2
                        }}
                      />
                    </View>
                  </>
                )
              }}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  formContainer: {
    flex: 3,
    margin: 20
  },
  formItem: {
    marginTop: 10
  },
  inputPasswordContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR.base,
    borderRadius: 10,
    alignItems: 'center'
  },
  errorInputContainer: {
    marginLeft: 10
  },
  errorInputText: {
    color: 'red'
  },
  buttonSubmit: {
    marginTop: 30
  }
})

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  null,
  mapDispatchToProps
)(RegisterScreen)
