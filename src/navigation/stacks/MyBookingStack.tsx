import BookingScreen from "@/src/screens/BookingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function MyBookingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 260,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
}
