import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from '@/src/screens/BookingScreen';

const Stack = createNativeStackNavigator();

export default function MyBookingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Booking" component={BookingScreen} /> 
    </Stack.Navigator>
  );
}