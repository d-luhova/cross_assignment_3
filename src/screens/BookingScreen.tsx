import { useCallback, useState } from "react";
import { USER_ID } from "../data/user";

import { FlatList, StyleSheet, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import BookingCard from "../components/BookingCard";
import ButtonPrimary from "../components/ButtonPrimary";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";
import DeleteBookingModal from "../components/DeleteBookingModal";
import { COLORS } from "../constants/colors";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import restaurants from "../data/Restaurants";

import { deleteBooking, getTables } from "../services/tablesApi";

import useTheme from "../hooks/useTheme";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setBookings, removeBooking } from "../features/bookings/bookingsSlice";
import BookingsHero from "../components/BookingsHero";

export default function BookingScreen({ route, navigation }: any) {
  const bookings = useAppSelector((state) => state.bookings.items);
  const dispatch = useAppDispatch();

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const [toast, setToast] = useState<null | {
    title: string;
    description: string;
  }>(null);

  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  const loadBookings = async () => {
    const data = await getTables();
    const filtered = data.filter((item: any) => item.userId === USER_ID);
    dispatch(setBookings(filtered));
  };

  useFocusEffect(
    useCallback(() => {
      if (bookings.length === 0) {
        loadBookings();
      }

      if (route.params?.success) {
        setToast({
          title: "Done!",
          description: "Booking created successfully.",
        });

        navigation.setParams({
          success: false,
        });
      }
    }, [bookings.length, route.params?.success])
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      dispatch(removeBooking(id));
      setToast({
        title: "Done!",
        description: "Booking cancelled successfully.",
      });
    } catch (error) {
      console.log(error);
      setToast({
        title: "Error",
        description: "Failed to cancel booking.",
      });
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: colors.background,
        },
      ]}
    >
      <BookingsHero />

      {bookings.length === 0 ? (
        <>
          <EmptyState
            title="No bookings yet"
            subtitle="Start by booking at Wein & Brot."
            icon={
              <MaterialCommunityIcons
                name="calendar-month"
                size={120}
                color={COLORS.secondary[100]}
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
                (r) => r.id === item.restaurantId
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
  },

  list: {
    gap: 12,
    padding: 24,
    paddingTop: 32,
  },
});
