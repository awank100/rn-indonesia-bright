import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

const propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  loveAction: PropTypes.func.isRequired
}

const LoveButton = props => {
  const { item, loveAction, index } = props

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15
      }}
    >
      <TouchableOpacity onPress={() => loveAction(item, index)}>
        <Icon
          type="font-awesome"
          name={
            item.commentLoves && item.commentLoves.length > 0
              ? 'heart'
              : 'heart-o'
          }
          color={
            item.commentLoves && item.commentLoves.length > 0 ? 'red' : 'black'
          }
        />
      </TouchableOpacity>
    </View>
  )
}

LoveButton.propTypes = propTypes

export default LoveButton
