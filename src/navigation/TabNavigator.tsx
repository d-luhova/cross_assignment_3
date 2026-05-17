import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/navigation/TabBar";
import MyBookingsStack from "./stacks/MyBookingStack";
import RestaurantsStack from "./stacks/RestaurantsStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Restaurants" component={RestaurantsStack} options={{
        popToTopOnBlur: true,
        }}/>
      <Tab.Screen name="Bookings" component={MyBookingsStack} />
    </Tab.Navigator>
  );
}
