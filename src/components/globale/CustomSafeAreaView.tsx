import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const CustomSafeAreaView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {children}
    </SafeAreaView>
  )
}

export default CustomSafeAreaView