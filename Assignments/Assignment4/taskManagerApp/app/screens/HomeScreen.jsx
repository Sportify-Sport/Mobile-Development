import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const tasks = [
    { id: '1', name: 'לקנות חלב', description: 'לקנות חלב מהסופר' },
    { id: '2', name: 'להכין שיעורי בית', description: 'לסיים את המשימות בקורס תכנות' },
  ];

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18 }}>{item.name}</Text>
      <Button
        title="לפרטים"
        onPress={() => navigation.navigate('Details', { task: item })}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;