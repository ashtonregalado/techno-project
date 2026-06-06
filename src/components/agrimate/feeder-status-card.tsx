import { AgrimateColors, Spacing } from "@/constants/design";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, ArrowRight, Bird, Power } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FeedRateControl } from "./feed-rate-control";

type FeederSide = "left" | "right" | "both" | null;
interface Props {
  feederActive: boolean;
  activeFeeder: FeederSide;
  feedRate: number;

  onTogglePower?: () => void;
  onFeederChange?: (feeder: FeederSide) => void;
  onRateChange?: (value: number) => void;
}
export function FeederStatusCard({
  feederActive,
  activeFeeder,
  feedRate,
  onTogglePower,
  onFeederChange,
  onRateChange,
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
        {/* Decorative circles */}
        <View style={[styles.decCircle, styles.decCircleTop]} />
        <View style={[styles.decCircle, styles.decCircleBottom]} />

        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <Bird size={18} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Feeder Control</Text>

            <Text style={styles.subtitle}>
              {activeFeeder === "both"
                ? "Both Feeders"
                : `${activeFeeder} Feeder`}{" "}
              - {feedRate} g/s
            </Text>
          </View>

          <View
            style={[styles.statusPill, feederActive ? styles.on : styles.off]}
          >
            <View
              style={[styles.dot, feederActive ? styles.dotOn : styles.dotOff]}
            />

            <Text
              style={[
                styles.statusText,
                !feederActive && {
                  color: AgrimateColors.primary,
                },
              ]}
            >
              {feederActive ? "ON" : "OFF"}
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
            feederActive ? styles.powerOn : styles.powerOff,
          ]}
        >
          <View style={styles.powerIcon}>
            <Power size={16} color="#fff" />
          </View>

          <Text style={styles.powerText}>
            {feederActive ? "Power On" : "Power Off"}
          </Text>
        </Pressable>

        {/* FEEDER BUTTONS */}
        <View style={styles.grid3}>
          {/* LEFT */}
          <Pressable
            onPress={() => onFeederChange?.("left")}
            disabled={!feederActive}
            style={[
              styles.feederBtn,
              activeFeeder === "left" && styles.activeBtn,
              !feederActive && styles.disabled,
            ]}
          >
            <View
              style={[
                styles.feederIcon,
                activeFeeder === "left" && styles.activeIcon,
              ]}
            >
              <ArrowLeft
                size={16}
                color={
                  activeFeeder === "left" ? "#fff" : AgrimateColors.primary
                }
              />
            </View>

            <Text
              style={[
                styles.feederText,
                activeFeeder === "left" && styles.activeText,
              ]}
            >
              Left
            </Text>
          </Pressable>

          {/* BOTH */}
          <Pressable
            onPress={() => onFeederChange?.("both")}
            disabled={!feederActive}
            style={[
              styles.feederBtn,
              activeFeeder === "both" && styles.activeBtn,
              !feederActive && styles.disabled,
            ]}
          >
            <View
              style={[
                styles.feederIcon,
                activeFeeder === "both" && styles.activeIcon,
              ]}
            >
              <Bird
                size={16}
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
              Both
            </Text>
          </Pressable>

          {/* RIGHT */}
          <Pressable
            onPress={() => onFeederChange?.("right")}
            disabled={!feederActive}
            style={[
              styles.feederBtn,
              activeFeeder === "right" && styles.activeBtn,
              !feederActive && styles.disabled,
            ]}
          >
            <View
              style={[
                styles.feederIcon,
                activeFeeder === "right" && styles.activeIcon,
              ]}
            >
              <ArrowRight
                size={16}
                color={
                  activeFeeder === "right" ? "#fff" : AgrimateColors.primary
                }
              />
            </View>

            <Text
              style={[
                styles.feederText,
                activeFeeder === "right" && styles.activeText,
              ]}
            >
              Right
            </Text>
          </Pressable>
        </View>

        {/* FEED RATE */}
        <View style={[styles.rateWrapper]}>
          <FeedRateControl
            feedRate={feedRate}
            onRateChange={onRateChange}
            disabled={!feederActive}
          />
        </View>
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

  disabled: {
    opacity: 0.4,
  },
});
