import { AgrimateColors, Spacing } from "@/constants/design";
import { LinearGradient } from "expo-linear-gradient";
import { Bird, Power } from "lucide-react-native";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FeederSide = "both" | null;

interface Props {
  feederActive: boolean;
  activeFeeder: FeederSide;
  isFeeding?: boolean;

  powerLoading?: boolean;
  feedingLoading?: boolean;

  onFeederChange?: (feeder: FeederSide) => void;

  onTogglePower?: () => void;
}
export function FeederStatusCard({
  feederActive,
  activeFeeder,
  isFeeding,
  powerLoading,
  feedingLoading,
  onFeederChange,
  onTogglePower,
}: Props) {
  return (
    <View style={styles.card}>
      {/* HEADER */}
      <LinearGradient
        colors={[AgrimateColors.primary, "#24563f"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={[styles.decCircle, styles.decCircleTop]} />
        <View style={[styles.decCircle, styles.decCircleBottom]} />

        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <Bird size={18} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Feeder Control</Text>
            {isFeeding != false && (
              <Text style={styles.subtitle}>{isFeeding ? "Feeding" : ""}</Text>
            )}
          </View>

          <View
            style={[
              styles.statusPill,
              isFeeding
                ? styles.feeding
                : feederActive
                  ? styles.on
                  : styles.off,
            ]}
          >
            <View
              style={[
                styles.dot,
                isFeeding
                  ? styles.dotFeeding
                  : feederActive
                    ? styles.dotOn
                    : styles.dotOff,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                !feederActive &&
                  !isFeeding && { color: AgrimateColors.primary },
              ]}
            >
              {feederActive ? "ON" : "OFF"}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* BODY */}
      <View style={styles.body}>
        <Text style={styles.subtitle}>
          {activeFeeder ? "Both Feeders" : "No side selected"}
        </Text>
        {/* POWER BUTTON */}
        <Pressable
          onPress={onTogglePower}
          style={[
            styles.powerButton,
            feederActive ? styles.powerOn : styles.powerOff,
            powerLoading && styles.disabled,
          ]}
          disabled={powerLoading}
        >
          {powerLoading ? (
            <>
              <View style={styles.powerIcon}>
                <ActivityIndicator color="#fff" size="small" />
              </View>

              <Text style={styles.powerText}>
                {feederActive ? "Powering Off..." : "Powering On..."}
              </Text>
            </>
          ) : (
            <>
              <View style={styles.powerIcon}>
                <Power size={16} color="#fff" />
              </View>

              <Text style={styles.powerText}>
                {feederActive ? "Power ON" : "Power OFF"}
              </Text>
            </>
          )}
        </Pressable>
        {/* FEEDER SIDE BUTTONS — disabled until powered on */}
        <Pressable
          onPress={() =>
            onFeederChange?.(activeFeeder === "both" ? null : "both")
          }
          style={[
            styles.feederBtn,
            styles.feederBtnFull,
            activeFeeder === "both" && styles.activeBtn,
            (!feederActive || feedingLoading) && styles.disabled,
          ]}
          disabled={!feederActive || feedingLoading}
        >
          {feedingLoading ? (
            <>
              <View
                style={[
                  styles.feederIcon,
                  activeFeeder === "both" && styles.activeIcon,
                ]}
              >
                <ActivityIndicator
                  size="small"
                  color={
                    activeFeeder === "both" ? "#fff" : AgrimateColors.primary
                  }
                />
              </View>

              <Text
                style={[
                  styles.feederText,
                  activeFeeder === "both" && styles.activeText,
                ]}
              >
                {activeFeeder === "both"
                  ? "Stopping Feed..."
                  : "Starting Feed..."}
              </Text>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.feederIcon,
                  activeFeeder === "both" && styles.activeIcon,
                ]}
              >
                <Bird
                  size={18}
                  color={
                    activeFeeder === "both" ? "#fff" : AgrimateColors.primary
                  }
                />
              </View>

              <Text
                style={[
                  styles.feederText,
                  activeFeeder === "both" && styles.activeText,
                ]}
              >
                {activeFeeder === "both" ? "Stop Feeding" : "Start Feeding"}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    marginBottom: Spacing.sm,
  },

  header: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: "relative",
    overflow: "hidden",
  },

  decCircle: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 999,
  },

  decCircleTop: {
    width: 90,
    height: 90,
    top: -45,
    right: -20,
  },

  decCircleBottom: {
    width: 70,
    height: 70,
    bottom: -35,
    left: -20,
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
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
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

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  on: {
    backgroundColor: "#22C55E",
  },

  feeding: {
    backgroundColor: "#22C55E",
  },

  off: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
  },

  dotOn: {
    backgroundColor: "#fff",
  },

  dotFeeding: {
    backgroundColor: "#fff",
  },

  dotOff: {
    backgroundColor: AgrimateColors.primary,
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

  hint: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    paddingVertical: 2,
  },

  grid3: {
    flexDirection: "row",
    gap: 8,
  },

  feederBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    gap: 4,
  },

  activeBtn: {
    backgroundColor: AgrimateColors.accent,
    borderColor: AgrimateColors.accent,
  },

  feederIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(34,84,63,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  activeIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  feederText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },

  activeText: {
    color: "#fff",
  },

  rateWrapper: {
    marginTop: 4,
  },

  stopButton: {
    backgroundColor: "#DC2626",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  stopText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  disabled: {
    opacity: 0.4,
  },

  powerButton: {
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  powerOn: {
    backgroundColor: AgrimateColors.accent,
  },

  powerOff: {
    backgroundColor: "#DC2626",
  },

  powerIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  powerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  feederBtnFull: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 12,
  },
});
