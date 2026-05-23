import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import AppIcon from "./AppIcon";
import ButtonPrimary from "./ButtonPrimary";
import Toast from "./Toast";
import { COLORS } from "../constants/colors";
import { SHADOWS } from "../constants/shadows";
import { TYPOGRAPHY } from "../constants/typography";
import { useUser } from "../context/UserContext";
import useTheme from "../hooks/useTheme";
import { getNameError, getPhoneError } from "../utils/contactValidation";

export default function ProfileForm() {
  const { user, updateUser } = useUser();
  const { colors } = useTheme();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [saved, setSaved] = useState(false);
  const [focusedField, setFocusedField] = useState<"name" | "phone" | null>(
    null
  );
  const nameError = getNameError(name);
  const phoneError = getPhoneError(phone);
  const showNameError = !!name.trim() && !!nameError;
  const showPhoneError = !!phone.trim() && !!phoneError;

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
  }, [user]);

  const handleSave = () => {
    updateUser({
      name: name.trim(),
      phone: phone.trim(),
    });
    setSaved(true);
  };

  const isDisabled = !!nameError || !!phoneError;

  return (
    <View style={styles.container}>
      <View style={styles.fieldWrapper}>
        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
        <View style={styles.inputShadow}>
          <TextInput
            placeholder="Your name"
            placeholderTextColor={colors.placeholderText}
            value={name}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            onChangeText={(value) => {
              setName(value);
              setSaved(false);
            }}
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.inputBackground,
                borderColor: colors.border,
              },
              focusedField === "name" && styles.inputFocused,
              showNameError && styles.inputError,
            ]}
          />
        </View>
        {showNameError && <Text style={styles.errorText}>{nameError}</Text>}
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
            onChangeText={(value) => {
              setPhone(value);
              setSaved(false);
            }}
            keyboardType="phone-pad"
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.inputBackground,
                borderColor: colors.border,
              },
              focusedField === "phone" && styles.inputFocused,
              showPhoneError && styles.inputError,
            ]}
          />
        </View>
        {showPhoneError && <Text style={styles.errorText}>{phoneError}</Text>}
      </View>

      <ButtonPrimary
        title="Save profile"
        icon={<AppIcon name="check" size={14} color={COLORS.white} />}
        onPress={handleSave}
        disabled={isDisabled}
      />

      {saved && (
        <View style={styles.toastWrapper}>
          <Toast
            title="Profile saved"
            description="These details will fill booking contacts automatically."
            onClose={() => setSaved(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  toastWrapper: {
    marginTop: "auto",
  },
});
