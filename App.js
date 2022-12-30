import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Index from './src/navigations/Index'
import { store } from './src/Screens/Store'
import { Provider } from 'react-redux'
import { MyProvider } from './src/Screens/usecontext/Pracontext'

const App = () => {
  return (
    <Provider store={store}>
      <MyProvider>
    <Index/>
    </MyProvider>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})