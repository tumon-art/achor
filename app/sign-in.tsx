import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

function SignIn() {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName="h-full flex justify-center items-center">
        <View>

          <Text className='text-lg font-light'> Welcome to Achor </Text>
          <Text> Let's think and write whatever you want </Text>
          <Text> Login to Achor with Google </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
