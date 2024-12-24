import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className=" text-green-400 font-extrabold text-3xl" >Edit app/index.tsx to edit this screen.</Text>
      <Link href='../../(root)/(tabs)/tasks.tsx'> Tasks </Link>
      <Link href="../../(root)/(tabs)/notes.tsx"> Notes </Link>
    </View>
  );
}
