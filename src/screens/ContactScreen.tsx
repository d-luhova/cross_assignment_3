import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import ButtonPrimary from "../components/ButtonPrimary";
import TitleCard from "../components/TitleCard";
import NavBar from "../components/navigation/NavBar";

import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import restaurants from "../data/Restaurants";
import { createBooking } from "../services/tablesApi";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { USER_ID } from "../data/user";
import LoadingModal from "../components/LoadingModal";
import useTheme from "../hooks/useTheme";
import { useAppDispatch } from "../store/hooks";
import { createBookingThunk } from "../features/bookings/bookingsThunks";

export default function ContactScreen({ route, navigation }: any) {
  const { restaurantId, guests, date, time } = route.params;

  const restaurant = restaurants.find((item) => item.id === restaurantId);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const handleBooking = async () => {
    setLoading(true);

    try {
      await dispatch(
        createBookingThunk({
          userId: USER_ID,
          restaurantId,
          guests,
          date,
          time,
          name,
          phone,
        })
      ).unwrap();

      navigation.navigate("Bookings");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !name || !phone || !accepted;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, backgroundColor: colors.background },
        ]}
      >
        <NavBar
          title="Contact details"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <TitleCard
            title={restaurant?.title || "Restaurant"}
            subtitle="Leave your contact information so that the restaurant administration can call you if necessary."
          />
          <View style={styles.form}>
            <View style={styles.fieldWrapper}>
              <Text style={[styles.label, { color: colors.text }]}>Name</Text>
              <TextInput
                placeholder="Your name"
                placeholderTextColor={colors.placeholderText}
                value={name}
                onChangeText={setName}
                style={[styles.input, { color: colors.text }]}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text style={[styles.label, { color: colors.text }]}>Phone</Text>
              <TextInput
                placeholder="+49..."
                placeholderTextColor={colors.placeholderText}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAccepted((prev) => !prev)}
          >
            <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
              {accepted && (
                <MaterialIcons name="check" size={16} color={COLORS.white} />
              )}
            </View>
            <Text
              style={[styles.checkboxText, { color: colors.secondaryText }]}
            >
              I agree with the Terms and Conditions and Privacy Policy.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.footer, { borderColor: colors.border }]}>
          <View style={styles.bookingInfo}>
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>
              {date}
            </Text>
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>
              {time}
            </Text>
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>
              {guests} guests
            </Text>
          </View>
          <ButtonPrimary
            title="To book"
            icon={<MaterialIcons name="check" size={14} color={COLORS.white} />}
            onPress={handleBooking}
            disabled={isDisabled}
          />
        </View>
        <LoadingModal visible={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 24,
    gap: 32,
  },

  form: {
    gap: 24,
  },

  fieldWrapper: {
    gap: 8,
  },

  label: {
    ...TYPOGRAPHY.action.m,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.secondary[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    ...TYPOGRAPHY.body.m,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.primary[400],
    borderRadius: 6,

    alignItems: "center",
    justifyContent: "center",
  },

  checkboxActive: {
    backgroundColor: COLORS.primary[400],
  },

  checkboxText: {
    flex: 1,
    ...TYPOGRAPHY.body.s,
    lineHeight: 18,
  },

  footer: {
    padding: 24,
    gap: 16,
    borderTopWidth: 1,
  },

  bookingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoText: {
    ...TYPOGRAPHY.body.s,
  },
});
