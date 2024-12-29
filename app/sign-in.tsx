import React from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import googleImg from "../assets/icons/google.png"

function SignIn() {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName="h-full flex justify-center items-center">
        <View>
          <Text className='text-md text-center font-light text-dark-200 mb-2'> Welcome to Achor </Text>
          <Text className='text-xl text-center font-bold text-dark'> Let's write whatever you want </Text>
          <Text className='text-xl text-center font-bold text-primary-300' > Note and Tasks </Text>
          <Text className='text-md text-center font-light text-dark-200 mt-10' > Login in Achor with Google </Text>

          <View className=' flex flex-row justify-center items-center gap-2 ring-4 mt-5 ring-primary-200 rounded-lg p-2'>
            <Image source={googleImg} className="max-h-8 max-w-8" resizeMode='contain' />
            {/* NOTE: mt-1 is added as hack */}
            <Text className='text-base text-center font-bold bg-primary-100 leading-3 mt-1 text-dark' > Continue with Google </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
