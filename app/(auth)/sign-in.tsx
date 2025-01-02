import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, View, Platform, TouchableOpacity, Image } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useOAuth } from '@clerk/clerk-expo'
import React from 'react'
import googleImg from "../../assets/icons/google.png"

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()


  if (Platform.OS !== 'web') {
    useWarmUpBrowser()
  }

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'achor' }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])
  return (
    <View className='px-2'>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        className=" p-2 border-none ring-2 my-2 rounded-md"
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        className=" p-2 border-none ring-2 my-2 rounded-md"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity
        aria-label='sign-in'
        className=" p-2 bg-primary-300 text-center
        hover:opacity-80
        text-accent-100 rounded-md font-bold my-2"
        onPress={onSignInPress}> Sign in </TouchableOpacity>

      <TouchableOpacity onPress={onPress}>
        <View className=' flex flex-row justify-center my-2 items-center bg-primary-100 p-2'>
          <Image source={googleImg} className="max-h-7 w-auto" resizeMode='contain' />
          {/* NOTE: mt-1 is added as hack */}
          <Text className='text-base text-center font-bold
            bg-primary-100 rounded-md leading-3 mt-1 text-dark' > Continue with Google </Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text>Don't have an account?</Text>
        <Link href="./sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  )
}
