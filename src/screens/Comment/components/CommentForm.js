import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TextInput, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
// Actions
import { create } from '../action'
// Constants
import { COLOR } from '../../../constants'

const CommentForm = () => {
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        message: ''
      }}
      onSubmit={async (values, { setFieldValue, setSubmitting }) => {
        const result = await dispatch(create(values))
        if (result.status) {
          setFieldValue('message', '')
        }
        setSubmitting(false)
      }}
    >
      {({ values, isSubmitting, handleSubmit, handleChange, handleBlur }) => {
        return (
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <TextInput
                multiline
                placeholder="Tulis komentar"
                value={values.message}
                onBlur={handleBlur('message')}
                onChangeText={handleChange('message')}
              />
            </View>
            <Button
              icon={{
                type: 'font-awesome',
                name: 'send',
                size: 15,
                color: 'white'
              }}
              disabled={isSubmitting}
              onPress={handleSubmit}
              buttonStyle={styles.btnSend}
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            />
          </View>
        )
      }}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  btnSend: {
    backgroundColor: COLOR.base,
    borderRadius: 10
  }
})

export default CommentForm
