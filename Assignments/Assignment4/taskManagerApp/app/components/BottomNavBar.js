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
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home-outline" size={24} color="#000" />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Search')} // Navigate to Search screen
      >
        <Ionicons name="search-outline" size={24} color="#000" />
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* List Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('List')} // Navigate to List screen
      >
        <Ionicons name="list-outline" size={24} color="#000" />
        <Text style={styles.buttonText}>List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    position: 'absolute', // Position the bar at the bottom
    bottom: 0, // Stick to the bottom
    left: 0,
    right: 0,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default BottomNavBar;