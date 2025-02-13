// // components/BottomNavBar.js
// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const BottomNavBar = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       {/* Home Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Ionicons name="home-outline" size={24} color="#000" />
//         <Text style={styles.buttonText}>Home</Text>
//       </TouchableOpacity>

//       {/* Search Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Search')}
//       >
//         <Ionicons name="search-outline" size={24} color="#000" />
//         <Text style={styles.buttonText}>Search</Text>
//       </TouchableOpacity>

//       {/* List Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('List')}
//       >
//         <Ionicons name="list-outline" size={24} color="#000" />
//         <Text style={styles.buttonText}>List</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     paddingVertical: 10,
//   },
//   button: {
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// export default BottomNavBar;



// components/BottomNavBar.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'List') {
            iconName = 'list';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="List" component={ListScreen} />
    </Tab.Navigator>
  );
}