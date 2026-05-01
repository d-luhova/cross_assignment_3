import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';

export default function TabBar() {
  return (
    <View style={styles.tabBar}>
      
      <TouchableOpacity style={styles.tab}>
        <MaterialIcons name="restaurant" size={20} color={COLORS.primary[400]} />
        <Text style={styles.active}>Restaurants</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <MaterialIcons name="calendar-today" size={20} color={COLORS.grey[200]} />
        <Text style={styles.inactive}>My Bookings</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 88,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary[50],
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
  },    
  active: {
    marginTop: 8,
    ...TYPOGRAPHY.action.m,     
    color: COLORS.grey[700]
  },
  inactive: {
    marginTop: 8,
    ...TYPOGRAPHY.action.m,
    color: COLORS.grey[500]
  }
});
