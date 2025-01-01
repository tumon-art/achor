import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser()
  console.log("userssss", user)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className=" text-green-400 font-extrabold text-3xl" >Edit app/index.tsx to edit this screen.</Text>
      <Link href='../../(auth)/sign-in'> Sign in </Link>
      <Link href='../../(root)/(tabs)/tasks'> Tasks </Link>
      <Link href="../../(root)/(tabs)/notes"> Notes </Link>
    </View>
  );
}
