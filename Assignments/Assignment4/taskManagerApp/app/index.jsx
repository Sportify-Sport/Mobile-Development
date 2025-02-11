import React from "react";
import { Link, useRouter } from "expo-router";
import { Button, View, Text } from "react-native";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationConta, iner } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import DetailScreen from "./screens/DetailScreen";
import AddEditScreen from "./screens/AddEditScreen";

// const Tab = createBottomTabNavigator();
const router = useRouter();

export default function App() {
  return (
    <View>
      <Text>Haha</Text>
      <Text>Index Page</Text>
      <Link
        href="/about"
        style={{
          color: "blue",
          borderRadius: 2,
          borderColor: "black",
          borderWidth: 2,
          padding: 5,
          margin: 5,
        }}
      >
        About with un/focus
      </Link>

      <Button
        title="go 2 page wo header"
        onPress={() => router.navigate("./pageWOHeader")}
      />
      <View style={{ height: 20 }} />

      <Link
        href={{
          pathname: './screens/ListScreen',
          params: {} //pay atention this will run only once 
          // when the link is rendered the first time and will not change after 
          // each time the link is pressed
        }}
        style={{margin: 20, color: 'blue'}}
        >
        go 2 page with data using Link
      </Link>
    </View>
  );
}

{
  /* <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="List" component={ListScreen} options={{ title: 'Task List' }} />
        <Tab.Screen name="Detail" component={DetailScreen} options={{ title: 'Task Details' }} />
        <Tab.Screen name="AddEdit" component={AddEditScreen} options={{ title: 'Add/Edit Task' }} />
      </Tab.Navigator>
    </NavigationContainer> */
}
