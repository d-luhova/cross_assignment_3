import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ProfileForm from "../components/ProfileForm";
import TitleCard from "../components/TitleCard";
import NavBar from "../components/navigation/NavBar";
import useTheme from "../hooks/useTheme";

export default function ProfileScreen({ navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, backgroundColor: colors.background },
        ]}
      >
        <NavBar title="Profile" onBackPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <TitleCard
            title="Your data"
            subtitle="Save your contact information once and use it automatically when booking a table."
          />
          <ProfileForm />
        </View>
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
});
