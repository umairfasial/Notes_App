import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Index from './src/navigations/Index'
import { store } from './src/Screens/Store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
    <Index/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})