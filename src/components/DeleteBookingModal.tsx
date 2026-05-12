import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteBookingModal({
  visible,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Cancel reservation
            </Text>

            <Text style={styles.description}>
              Are you sure you want to cancel
              booking?
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onConfirm}
            >
              <Text style={styles.cancelText}>
                Yes, cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keepButton}
              onPress={onCancel}
            >
              <Text style={styles.keepText}>
                No, keep it
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  modal: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: COLORS.white,
    padding: 16,
    gap: 20,
  },

  content: {
    gap: 8,
  },

  title: {
    ...TYPOGRAPHY.heading.h3,
    color: COLORS.grey[700],
    textAlign: "center",
  },

  description: {
    ...TYPOGRAPHY.body.s,
    color: COLORS.grey[500],
    textAlign: "center",
    lineHeight: 18,
  },

  actions: {
    flexDirection: "row",
    gap: 8,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.error[400],
    alignItems: "center",
    justifyContent: "center",
  },

  keepButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary[400],
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    ...TYPOGRAPHY.action.m,
    color: COLORS.error[400],
  },

  keepText: {
    ...TYPOGRAPHY.action.m,
    color: COLORS.white,
  },
});