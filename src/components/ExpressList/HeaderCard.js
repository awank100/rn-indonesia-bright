import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Avatar } from 'react-native-elements'
import Moment from 'moment'

const propTypes = {
  item: PropTypes.object.isRequired
}

const HeaderCard = props => {
  const { item } = props
  return (
    <View style={{ flexDirection: 'row', paddingLeft: 15, paddingRight: 15 }}>
      <View>
        <Avatar
          rounded
          style={{ height: 35, width: 35 }}
          source={{ uri: item.userId.avatar }}
        />
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>
          {item.userId.username}
        </Text>
        <Text style={{ color: '#555' }}>
          {Moment(item.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  )
}

HeaderCard.propTypes = propTypes

export default HeaderCard
