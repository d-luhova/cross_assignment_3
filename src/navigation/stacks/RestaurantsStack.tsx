import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import DateTimeScreen from '@/src/screens/DateTimeScreen';
import ContactScreen from '../../screens/ContactScreen';

const Stack = createNativeStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="DateTime" component={DateTimeScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
}