import { useEffect, useCallback, useMemo, useState } from "react";
import { USER_ID } from "../data/user";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";

import AppIcon from "../components/AppIcon";
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

export default function BookingScreen({ navigation }: any) {
  const bookings = useAppSelector((state) => state.bookings.items);
  const dispatch = useAppDispatch();

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const [toast, setToast] = useState<null | {
    title: string;
    description: string;
  }>(null);

  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const restaurantMap = useMemo(() => {
    return Object.fromEntries(restaurants.map((r) => [r.id, r]));
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const data = await getTables();
      const filtered = data.filter((item: any) => item.userId === USER_ID);

      dispatch(setBookings(filtered));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookings.length === 0) {
      loadBookings();
    }
  }, []);

  const handleSelectBooking = useCallback((id: string) => {
    setSelectedBookingId(id);
  }, []);

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

  const renderItem = useCallback(
    ({ item }: any) => {
      const restaurant = restaurantMap[item.restaurantId];

      return (
        <BookingCard
          title={restaurant?.title || ""}
          date={item.date}
          time={item.time}
          guests={`${item.guests} guests`}
          onDelete={() => handleSelectBooking(item.id)}
        />
      );
    },
    [restaurantMap, handleSelectBooking]
  );

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

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.content}>
          <EmptyState
            title="No bookings yet"
            subtitle="Start by booking at Wein & Brot."
            icon={
              <AppIcon
                name="calendar-days"
                size={120}
                color={COLORS.secondary[100]}
              />
            }
          />

          <ButtonPrimary
            title="Find a table"
            icon={
              <AppIcon name="search" size={14} color={COLORS.white} />
            }
            onPress={() => navigation.navigate("Restaurants")}
          />
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.list}
            data={bookings}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItem}
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
        <View style={styles.toast}>
          <Toast
            title={toast.title}
            description={toast.description}
            onClose={() => setToast(null)}
          />
        </View>
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
  content: {
    flex: 1,
    padding: 24,
  },
  toast: {
    paddingTop: 0,
    padding: 24,
    width: "100%",
    alignSelf: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
