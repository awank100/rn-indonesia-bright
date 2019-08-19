import AsyncStorage from '@react-native-community/async-storage'

export const saveToken = async token => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (error) {
    throw error
  }
}

export const readToken = async () => {
  try {
    return await AsyncStorage.getItem('token')
  } catch (error) {
    throw error
  }
}

export const saveProfile = async profile => {
  try {
    await AsyncStorage.setItem('profile', JSON.stringify(profile))
  } catch (error) {
    throw error
  }
}

export const readProfile = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem('profile')
    return JSON.parse(retrievedItem)
  } catch (error) {
    throw error
  }
}

export const clearStorage = async () => {
  try {
    return await AsyncStorage.clear()
  } catch (error) {
    throw error
  }
}
