import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/redux/store'
import SplashScreen from 'react-native-splash-screen'
// Routes
import AppContainer from './src/AppContainer'

class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
