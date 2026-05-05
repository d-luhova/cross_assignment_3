import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';      
import EmptyState from '../components/EmptyState';
import { COLORS } from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import Toast from '../components/Toast';
import { useState } from 'react';
import BookingCard from '../components/BookingCard';
import ButtonPrimary from '../components/ButtonPrimary';
import TitleCard from '../components/TitleCard';

export default function BookingScreen() {
    const [visible, setVisible] = useState(true);
  return (
    <View style={styles.container}>
      <Text>Booking Screen</Text>  
      <TitleCard
              title="W&B – The Amber Room"
              subtitle="Leave your contact information so that the restaurant administration can call you if necessary."
            />
      <BookingCard
              title="W&B – The Amber Room"
              date="2023-10-15"
              time="19:00"
              guests="4"
            />
      <View style={{ flex: 1, padding: 16 }}>
        <Button title="Show Toast" onPress={() => setVisible(true)} />
        {visible && (
          <Toast
            title="Done!"
            description="Booking cancelled successfully."
            onClose={() => setVisible(false)}
          />
        )}
      </View> 
      <ButtonPrimary
           title="Find a table"
           icon={<MaterialIcons name="search" size={14} color={COLORS.white} />} 
           onPress={() => {}}
            />    
      <EmptyState
            title="No bookings yet"
            subtitle="Start by booking at Wein & Brot."
            icon={<MaterialCommunityIcons name="calendar-month" size={120} color={COLORS.grey[200]}/>}
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
