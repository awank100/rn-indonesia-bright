import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

const propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  supportAction: PropTypes.func.isRequired
}

const SupportButton = props => {
  const { item, supportAction, index } = props
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row'
      }}
    >
      <TouchableOpacity onPress={() => supportAction(item, index)}>
        <Image
          source={
            item.expressSupports && item.expressSupports.length > 0
              ? require('../../assets/images/support_on.png')
              : require('../../assets/images/support_off.png')
          }
          style={{ height: 25, width: 25}}
        />
      </TouchableOpacity>
      <View style={{ paddingLeft: 5, alignSelf: 'center' }}>
        <Text style={{ fontSize: 13 }}>{`${item.supportCount} supports`}</Text>
      </View>
    </View>
  )
}

SupportButton.propTypes = propTypes

export default SupportButton
