import { useCallback, useState } from "react";
import { USER_ID } from "../data/user";

import { FlatList, StyleSheet, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import BookingCard from "../components/BookingCard";
import ButtonPrimary from "../components/ButtonPrimary";
import EmptyState from "../components/EmptyState";
import TitleCard from "../components/TitleCard";
import Toast from "../components/Toast";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

import restaurants from "../data/Restaurants";

import { deleteBooking, getTables } from "../services/tablesApi";
import DeleteBookingModal from "../components/DeleteBookingModal";  

export default function BookingScreen({ route, navigation }: any) {
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState<null | {
    title: string;
    description: string;
  }>(null);

  const loadBookings = async () => {
    try {
      const data = await getTables();
      const filtered = data.filter((item: any) => item.userId === USER_ID);
      setBookings(filtered);
    } catch (error) {
      console.log(error);
    }
  };
  const insets = useSafeAreaInsets();
  const [selectedBookingId, setSelectedBookingId] =
  useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadBookings();

      if (route.params?.success) {
        setToast({
          title: "Done!",
          description: "Booking created successfully.",
        });

        navigation.setParams({
          success: false,
        });
      }
    }, []),
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);

      setBookings((prev) => prev.filter((item: any) => item.id !== id));

      setToast({
        title: "Done!",
        description: "Booking cancelled successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TitleCard
        style={{ marginTop: 32 }}
        title="Your Tables"
        subtitle="Your upcoming bookings will appear here. You can cancel them up to 2 hours before the reservation time."
      />

      {bookings.length === 0 ? (
        <>
          <EmptyState
            title="No bookings yet"
            subtitle="Start by booking at Wein & Brot."
            icon={
              <MaterialCommunityIcons
                name="calendar-month"
                size={120}
                color={COLORS.grey[200]}
              />
            }
          />
          <ButtonPrimary
            title="Find a table"
            icon={
              <MaterialIcons name="search" size={14} color={COLORS.white} />
            }
            onPress={() => navigation.navigate("Restaurants")}
          />
        </>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.list}
            data={bookings}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }: any) => {
              const restaurant = restaurants.find(
                (r) => r.id === item.restaurantId,
              );

              return (
                <BookingCard
                  title={restaurant?.title || ""}
                  date={item.date}
                  time={item.time}
                  guests={`${item.guests} guests`}
                  onDelete={() => setSelectedBookingId(item.id)}
                />
              );
            }}
          />
          <DeleteBookingModal
           visible={!!selectedBookingId}
           onCancel={() => setSelectedBookingId(null)}
           onConfirm={() => {
            if (selectedBookingId) {
              handleDelete(selectedBookingId);
              setSelectedBookingId(null);
              }
            }}
          />
        </>
      )}

      {toast && (
        <Toast
          title={toast.title}
          description={toast.description}
          onClose={() => setToast(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 24,
    gap: 32,
  },

  list: {
    gap: 16,
    paddingBottom: 24,
  },
});
