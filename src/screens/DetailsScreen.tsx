import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import ButtonPrimary from '../components/ButtonPrimary';
import { MaterialIcons } from "@expo/vector-icons";
import DetailsCard from '../components/DetailsCard';

export default function DetailsScreen({ route }: any) {
  const { restaurantId } = route.params;

  return (
    <View style={styles.container}>
      <DetailsCard restaurantId={restaurantId} />
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
