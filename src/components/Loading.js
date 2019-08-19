import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Loading = props => {
  return (
    <View>
      <ActivityIndicator size={props.size || 'large'} color="#FF6433" />
    </View>
  )
}

export default Loading
