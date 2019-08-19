import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

const propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  notRelevanAction: PropTypes.func.isRequired
}

const NotRelevanButton = props => {
  const { item, index, notRelevanAction } = props

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row'
      }}
    >
      <TouchableOpacity onPress={() => notRelevanAction(item, index)}>
        <Icon
          type="font-awesome"
          name="times"
          color={
            item.expressNotRelevans && item.expressNotRelevans.length > 0
              ? 'red'
              : 'black'
          }
        />
      </TouchableOpacity>
      <View style={{ paddingLeft: 5, alignSelf: 'center' }}>
        <Text style={{ fontSize: 13 }}>{`${
          item.notRelevanCount
        } not relevan`}</Text>
      </View>
    </View>
  )
}

NotRelevanButton.propTypes = propTypes

export default NotRelevanButton
