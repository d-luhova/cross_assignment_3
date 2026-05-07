import { View, Text, StyleSheet } from 'react-native';    
import ButtonPrimary from "../components/ButtonPrimary";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from '../constants/colors';
import TitleCard from '../components/TitleCard';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
        <TitleCard
                title="W&B - The Amber Room"
                subtitle="Leave your contact information so that the restaurant administration can call you if necessary."
              />
      <Text>Contact Screen</Text>
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
