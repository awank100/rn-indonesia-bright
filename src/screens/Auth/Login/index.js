import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image, TextInput, Text } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import { StackActions, NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Actions
import { login } from '../actions'
// Constants
import { COLOR } from '../../../constants'

class LoginScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.base
    },
    title: 'Login',
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
              source={require('../../../assets/images/undraw_fingerprint.png')}
              style={{ height: 150, width: 150 }}
            />
          </View>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={async (values, { setErrors, setSubmitting }) => {
                const result = await this.props.dispatch(
                  login(values.email, values.password)
                )
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
                isSubmitting
              }) => {
                return (
                  <>
                    <View style={styles.formItem}>
                      <Input
                        placeholder="Telepon / Username / Email"
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
                        onChangeText={handleChange('email')}
                        value={values.email}
                      />
                      <View style={styles.errorInputContainer}>
                        {errors.email &&
                          errors.email.map((error, index) => {
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
                          name="password"
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

                    <View style={styles.buttonSubmit}>
                      <Button
                        title="Login"
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

                    <View style={{ marginTop: 20, alignSelf: 'center' }}>
                      <Text>Don't have account?</Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                      <Button
                        title="Register Now"
                        type="outline"
                        titleStyle={{ color: 'blue' }}
                        disabled={isSubmitting}
                        buttonStyle={{
                          borderRadius: 10,
                          borderColor: 'blue',
                          borderWidth: 2
                        }}
                        onPress={() =>
                          this.props.navigation.navigate('Register')
                        }
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
)(LoginScreen)
