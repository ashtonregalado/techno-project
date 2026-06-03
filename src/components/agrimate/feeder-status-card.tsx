import { AgrimateColors, Spacing, Typography } from "@/constants/design";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Ellipse, Line, Path, Rect } from "react-native-svg";
import { Button } from "./button";
import { Card } from "./card";

interface FeederStatusCardProps {
  isFeeding: boolean;
  onStart?: () => void;
  onStop?: () => void;
}

const FEEDER_HEIGHT = 180;

export function FeederStatusCard({
  isFeeding,
  onStart,
  onStop,
}: FeederStatusCardProps) {
  const animationValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isFeeding) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: true,
          }),
        ]),
      );

      animation.start();
    }

    return () => animation?.stop();
  }, [isFeeding]);

  const pelletTranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <Card style={styles.card}>
      {/* Header */}
      <LinearGradient
        colors={[AgrimateColors.primary, "#24563f"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View>
          <Text style={styles.title}>Smart chicken feeder</Text>
          <Text style={styles.subtitle}>Real-time monitoring</Text>
        </View>

        <View
          style={[
            styles.badge,
            isFeeding ? styles.feedingBadge : styles.standbyBadge,
          ]}
        >
          <Text style={styles.badgeText}>
            {isFeeding ? "FEEDING" : "STANDBY"}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Illustration Background */}
        <LinearGradient
          colors={["#fef3c7", "#fed7aa"]}
          style={styles.illustrationContainer}
        >
          <View style={{ height: FEEDER_HEIGHT }}>
            <Svg width="100%" height={FEEDER_HEIGHT} viewBox="0 0 200 140">
              {/* Ground */}
              <Rect
                x="0"
                y="115"
                width="200"
                height="25"
                fill="#d97706"
                opacity="0.3"
              />
              <Line
                x1="0"
                y1="115"
                x2="200"
                y2="115"
                stroke="#92400e"
                strokeWidth="2"
              />

              {/* Hopper */}
              <Path
                d="M70 30 L130 30 L120 70 L80 70 Z"
                fill={AgrimateColors.primary}
              />

              <Rect x="70" y="25" width="60" height="8" rx="3" fill="#52b788" />

              {/* Feed Window */}
              <Rect
                x="85"
                y="40"
                width="30"
                height="25"
                rx="2"
                fill="#F59E0B"
                opacity="0.3"
              />

              <Rect
                x="85"
                y="55"
                width="30"
                height="10"
                rx="1"
                fill="#F59E0B"
              />

              {/* Tube */}
              <Rect
                x="95"
                y="70"
                width="10"
                height="25"
                fill={AgrimateColors.primary}
              />

              {/* Tray */}
              <Ellipse cx="100" cy="95" rx="35" ry="8" fill="#F59E0B" />

              <Rect x="65" y="95" width="70" height="3" fill="#d97706" />

              {/* Pellets in tray */}
              {[80, 88, 95, 105, 112, 120].map((x) => (
                <Circle key={x} cx={x} cy="97" r="2.5" fill="#fbbf24" />
              ))}

              {/* Chickens */}
              <Chicken x={50} />
              <Chicken x={150} flipped />
            </Svg>

            {/* Animated Pellets */}
            {isFeeding && (
              <>
                {[0, 1, 2].map((i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.pellet,
                      {
                        transform: [
                          {
                            translateY: pelletTranslateY,
                          },
                        ],
                        left: `50%`,
                        marginLeft: (i - 1) * 8,
                      },
                    ]}
                  />
                ))}
              </>
            )}
          </View>
        </LinearGradient>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Button
            label="START"
            onPress={onStart}
            variant="primary"
            style={styles.button}
          />

          <Button
            label="STOP"
            onPress={onStop}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </Card>
  );
}

function Chicken({ x, flipped = false }: { x: number; flipped?: boolean }) {
  return (
    <>
      <Ellipse
        cx={x}
        cy="110"
        rx="12"
        ry="10"
        fill="white"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />

      <Circle
        cx={x}
        cy="100"
        r="8"
        fill="white"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />

      <Circle cx={flipped ? x - 3 : x + 3} cy="98" r="1.5" fill="#1B4332" />

      <Path
        d={
          flipped
            ? `M${x - 10} 102 L${x - 5} 102 L${x - 7.5} 104 Z`
            : `M${x + 5} 102 L${x + 10} 102 L${x + 7.5} 104 Z`
        }
        fill="#F59E0B"
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    padding: 0,
    marginBottom: Spacing.lg,
  },

  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  feedingBadge: {
    backgroundColor: "#22c55e",
  },

  standbyBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  content: {
    padding: Spacing.md,
  },

  illustrationContainer: {
    borderRadius: 16,
    overflow: "hidden",
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },

  buttonRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },

  button: {
    flex: 1,
  },

  pellet: {
    position: "absolute",
    top: 75,
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#fbbf24",
  },
});
