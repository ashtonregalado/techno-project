import { AgrimateColors, Typography } from "@/constants/design";
import { Layers } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface LayerSelectorProps {
  selectedLayer: "first" | "second";
  onLayerChange: (layer: "first" | "second") => void;
  disabled?: boolean;
}

export function LayerSelector({
  selectedLayer,
  onLayerChange,
  disabled = false,
}: LayerSelectorProps) {
  const layerLabel =
    selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Layers size={16} color={AgrimateColors.primary} />
          </View>

          <Text style={styles.label}>{layerLabel} Layer</Text>
        </View>

        {/* Right Section */}
        <View style={styles.buttonGroup}>
          <Pressable
            onPress={() => {
              if (!disabled) onLayerChange("first");
            }}
            disabled={disabled}
            style={[
              styles.layerButton,
              selectedLayer === "first" && styles.activeButton,
              disabled && styles.disabledButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedLayer === "first" && styles.activeButtonText,
                disabled && styles.disabledFirstButtonText,
              ]}
            >
              First
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              if (!disabled) onLayerChange("second");
            }}
            disabled={disabled}
            style={[
              styles.layerButton,
              selectedLayer === "second" && styles.activeButton,
              disabled && styles.disabledButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedLayer === "second" && styles.activeButtonText,
                disabled && styles.disabledSecondButtonText,
              ]}
            >
              Second
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 10,
    marginBottom: 7,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(34,84,63,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "700",
    color: AgrimateColors.text,
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 6,
  },

  layerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },

  disabledButton: {
    opacity: 0.4,
  },

  activeButton: {
    backgroundColor: AgrimateColors.primary,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },

  disabledFirstButtonText: {
    // color: "#9CA3AF",
    color: "#fff",
  },

  disabledSecondButtonText: {
    color: "#9CA3AF",
  },

  activeButtonText: {
    color: "#fff",
  },
});
