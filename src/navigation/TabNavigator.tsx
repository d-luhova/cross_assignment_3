import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsStack from "./stacks/RestaurantsStack";
import MyBookingsStack from "./stacks/MyBookingStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={RestaurantsStack} />
      <Tab.Screen name="Bookings" component={MyBookingsStack} />
    </Tab.Navigator>
  );
}
