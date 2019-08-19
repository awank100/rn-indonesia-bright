import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { Image } from 'react-native-elements'

const propTypes = {
  item: PropTypes.object.isRequired
}

const BodyCard = props => {
  const { item } = props
  return (
    <View style={{ marginTop: 5, paddingLeft: 15, paddingRight: 15 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>
          {`${item.userId.username} `}
        </Text>
        <Text style={{ fontStyle: 'italic', fontSize: 16 }}>
          {item.message}
        </Text>
      </View>
    </View>
  )
}

BodyCard.propTypes = propTypes

export default BodyCard
