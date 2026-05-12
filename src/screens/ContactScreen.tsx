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

export default function ContactScreen({
  route,
  navigation,
}: any) {
  const {
    restaurantId,
    guests,
    date,
    time,
  } = route.params;

  const restaurant = restaurants.find(
    item => item.id === restaurantId
  );
  
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const insets = useSafeAreaInsets();
  const handleBooking = async () => {
    try { 
      setLoading(true);
      await createBooking({
        userId: USER_ID,
        restaurantId,
        guests,
        date,
        time,
        name,
        phone,
      });

      navigation.navigate("Bookings", {
        success: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    } 
  };

  const isDisabled =
    !name || !phone || !accepted;

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      >
      <View style={[styles.container, { paddingTop: insets.top }]}>
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
              <Text style={styles.label}>
                Name
              </Text>
              <TextInput
                placeholder="Your name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>
                Phone
              </Text>
              <TextInput
                placeholder="+49..."
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() =>
              setAccepted(prev => !prev)
            }
          >
            <View
              style={[
                styles.checkbox,
                accepted && styles.checkboxActive,
              ]}
            >
              {accepted && (
                <MaterialIcons
                  name="check"
                  size={16}
                  color={COLORS.white}
                />
              )}
            </View>
            <Text style={styles.checkboxText}>
              I agree with the Terms and
              Conditions and Privacy Policy.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.bookingInfo}>
            <Text style={styles.infoText}>
              {date}
            </Text>
            <Text style={styles.infoText}>
              {time}
            </Text>
            <Text style={styles.infoText}>
              {guests} guests
            </Text>
          </View>
          <ButtonPrimary
            title="To book"
            icon={
              <MaterialIcons
                name="check"
                size={14}
                color={COLORS.white}
              />
            }
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
    backgroundColor: COLORS.white,
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
    color: COLORS.grey[700],
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.secondary[200],
    borderRadius: 12,
    paddingHorizontal: 16,

    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[700],
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
    color: COLORS.grey[600],
    lineHeight: 18,
  },

  footer: {
    padding: 24,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary[100],
  },

  bookingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoText: {
    ...TYPOGRAPHY.body.s,
    color: COLORS.grey[600],
  },
});