import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

const propTypes = {
  item: PropTypes.object.isRequired,
  commentAction: PropTypes.func.isRequired
}

const CommentButton = props => {
  const { item, commentAction } = props
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row'
      }}
    >
      <TouchableOpacity onPress={() => commentAction(item)}>
        <Icon type="font-awesome" name="comment-o" />
      </TouchableOpacity>
      <View style={{ paddingLeft: 5, alignSelf: 'center' }}>
        <Text style={{ fontSize: 13 }}>{`${item.commentCount} comments`}</Text>
      </View>
    </View>
  )
}

CommentButton.propTypes = propTypes

export default CommentButton
