import { AgrimateColors, Spacing } from "@/constants/design";
import { LinearGradient } from "expo-linear-gradient";
import { Boxes, ChevronsLeft, ChevronsRight, Power } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  isActive: boolean;
  direction: "forward" | "reverse" | "stop";
  onTogglePower?: () => void;
  onDirectionChange?: (dir: "forward" | "reverse") => void;
}

export function MachineControlCard({
  isActive,
  direction,
  onTogglePower,
  onDirectionChange,
}: Props) {
  return (
    <View style={styles.card}>
      {/* HEADER */}
      <LinearGradient
        colors={[AgrimateColors.primary, AgrimateColors.primary, "#24563f"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Decorative background */}
        <View style={styles.bgCircleTop} />
        <View style={styles.bgCircleBottom} />

        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <Boxes size={20} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Machine Movement</Text>

            {direction !== "stop" && (
              <Text style={styles.subtitle}>{direction}</Text>
            )}
          </View>

          <View
            style={[
              styles.statusBadge,
              isActive ? styles.statusOn : styles.statusOff,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isActive ? styles.statusDotOn : styles.statusDotOff,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                !isActive && { color: AgrimateColors.primary },
              ]}
            >
              {isActive ? "ON" : "OFF"}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* BODY */}
      <View style={styles.body}>
        {/* POWER BUTTON */}
        <Pressable
          onPress={onTogglePower}
          style={[
            styles.powerButton,
            isActive ? styles.powerButtonOn : styles.powerButtonOff,
          ]}
        >
          <View style={styles.powerIconCircle}>
            <Power size={16} color="#fff" />
          </View>
          <Text style={styles.powerText}>
            {isActive ? "Power ON" : "Power OFF"}
          </Text>
        </Pressable>

        {/* DIRECTION BUTTONS */}
        <View style={styles.directionRow}>
          {/* Reverse */}
          <Pressable
            disabled={!isActive}
            onPress={() => onDirectionChange?.("reverse")}
            style={[
              styles.directionButton,
              direction === "reverse" && styles.directionButtonActive,
              !isActive && styles.disabled,
            ]}
          >
            <View
              style={[
                styles.directionIconCircle,
                direction === "reverse" && styles.directionIconCircleActive,
              ]}
            >
              <ChevronsLeft
                size={16}
                color={
                  direction === "reverse" ? "#fff" : AgrimateColors.primary
                }
              />
            </View>
            <Text
              style={[
                styles.directionText,
                direction === "reverse" && styles.directionTextActive,
              ]}
            >
              Reverse
            </Text>
          </Pressable>

          {/* Forward */}
          <Pressable
            disabled={!isActive}
            onPress={() => onDirectionChange?.("forward")}
            style={[
              styles.directionButton,
              direction === "forward" && styles.directionButtonActive,
              !isActive && styles.disabled,
            ]}
          >
            <View
              style={[
                styles.directionIconCircle,
                direction === "forward" && styles.directionIconCircleActive,
              ]}
            >
              <ChevronsRight
                size={16}
                color={
                  direction === "forward" ? "#fff" : AgrimateColors.primary
                }
              />
            </View>
            <Text
              style={[
                styles.directionText,
                direction === "forward" && styles.directionTextActive,
              ]}
            >
              Forward
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    marginBottom: Spacing.md,
  },

  header: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: "relative",
    overflow: "hidden",
  },

  bgCircleTop: {
    position: "absolute",
    top: -50,
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  bgCircleBottom: {
    position: "absolute",
    bottom: -40,
    left: -30,
    width: 70,
    height: 70,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    textTransform: "capitalize",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  statusOn: {
    backgroundColor: "#22C55E",
  },

  statusOff: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
  },

  statusDotOn: {
    backgroundColor: "#fff",
  },

  statusDotOff: {
    backgroundColor: "rgba(27,67,50,0.4)",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },

  body: {
    padding: 10,
    gap: 8,
  },

  powerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    padding: 10,
  },

  powerButtonOn: {
    backgroundColor: AgrimateColors.accent,
  },

  powerButtonOff: {
    backgroundColor: "#DC2626",
  },

  powerIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  powerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  directionRow: {
    flexDirection: "row",
    gap: 8,
  },

  directionButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    gap: 4,
  },

  directionButtonActive: {
    backgroundColor: AgrimateColors.accent,
    borderColor: AgrimateColors.accent,
  },

  directionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(27,67,50,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },

  directionIconCircleActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  directionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },

  directionTextActive: {
    color: "#fff",
  },

  disabled: {
    opacity: 0.4,
  },
});
