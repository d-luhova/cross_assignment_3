import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AppIcon from "../components/AppIcon";
import ButtonPrimary from "../components/ButtonPrimary";
import TitleCard from "../components/TitleCard";
import NavBar from "../components/navigation/NavBar";
import { COLORS } from "../constants/colors";
import { SHADOWS } from "../constants/shadows";
import { TYPOGRAPHY } from "../constants/typography";
import restaurants from "../data/Restaurants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { USER_ID } from "../data/user";
import LoadingModal from "../components/LoadingModal";
import useTheme from "../hooks/useTheme";
import { useAppDispatch } from "../store/hooks";
import { createBookingThunk } from "../features/bookings/bookingsThunks";
import { useUser } from "../context/UserContext";
import { getNameError, getPhoneError } from "../utils/contactValidation";

export default function ContactScreen({ route, navigation }: any) {
  const { restaurantId, guests, date, time } = route.params;

  const restaurant = restaurants.find((item) => item.id === restaurantId);
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [accepted, setAccepted] = useState(false);
  const [focusedField, setFocusedField] = useState<"name" | "phone" | null>(
    null
  );
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const nameError = getNameError(name);
  const phoneError = getPhoneError(phone);
  const showNameError = !!name.trim() && !!nameError;
  const showPhoneError = !!phone.trim() && !!phoneError;

  useEffect(() => {
    setName((currentName) => currentName || user.name);
    setPhone((currentPhone) => currentPhone || user.phone);
  }, [user]);

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

      navigation.navigate("Bookings", {
        success: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !!nameError || !!phoneError || !accepted;

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
              <View style={styles.inputShadow}>
                <TextInput
                  placeholder="Your name"
                  placeholderTextColor={colors.placeholderText}
                  value={name}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={setName}
                  style={[
                    styles.input,
                    focusedField === "name" && styles.inputFocused,
                    showNameError && styles.inputError,
                    {
                      color: colors.text,
                      backgroundColor: colors.inputBackground,
                    },
                  ]}
                />
              </View>
              {showNameError && (
                <Text style={styles.errorText}>{nameError}</Text>
              )}
            </View>
            <View style={styles.fieldWrapper}>
              <Text style={[styles.label, { color: colors.text }]}>Phone</Text>
              <View style={styles.inputShadow}>
                <TextInput
                  placeholder="+49..."
                  placeholderTextColor={colors.placeholderText}
                  value={phone}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={[
                    styles.input,
                    focusedField === "phone" && styles.inputFocused,
                    showPhoneError && styles.inputError,
                    {
                      color: colors.text,
                      backgroundColor: colors.inputBackground,
                    },
                  ]}
                />
              </View>
              {showPhoneError && (
                <Text style={styles.errorText}>{phoneError}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAccepted((prev) => !prev)}
          >
            <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
              {accepted && (
                <AppIcon name="check" size={16} color={COLORS.white} />
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
            icon={<AppIcon name="check" size={14} color={COLORS.white} />}
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

  inputShadow: {
    borderRadius: 12,
    ...SHADOWS.soft,
  },

  inputError: {
    borderColor: COLORS.error[400],
  },

  inputFocused: {
    borderColor: COLORS.primary[400],
  },

  errorText: {
    ...TYPOGRAPHY.body.s,
    color: COLORS.error[400],
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
