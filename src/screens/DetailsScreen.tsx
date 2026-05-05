import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';      
import { COLORS } from '../constants/colors';
import ButtonPrimary from '../components/ButtonPrimary';
import { MaterialIcons } from "@expo/vector-icons";

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <ButtonPrimary
              title="Find a table"
              icon={<MaterialIcons name="search" size={14} color={COLORS.white} />}
              onPress={() => {}}
            /> 
    </View>
  );
}   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    },
});
