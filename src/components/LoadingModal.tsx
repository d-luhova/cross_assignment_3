import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  visible: boolean;
};

export default function LoadingModal({
  visible,
}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary[400]}
          />
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
  },

  content: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
});