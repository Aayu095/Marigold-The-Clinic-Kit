import React from "react";
import {
  Circle,
  Column,
  Line,
  Path,
  Polygon,
  Rect,
  Row,
  Span,
  Svg,
  Text,
} from "@hyper-elements/react";
import { fonts, palette } from "./theme";
import type { LabResult, Vital } from "./data";

// Shared art + building blocks for Marigold. Svg motifs live here and are
// used by Page, Document and Canvas — never by Email (Svg is not allowed
// in an Email root), which has its own typographic wordmark below.

const rad = (deg: number) => (deg * Math.PI) / 180;

function petalPoints(cx: number, cy: number, angle: number, r0: number, r1: number, halfW: number) {
  const ux = Math.cos(rad(angle));
  const uy = Math.sin(rad(angle));
  const vx = -uy;
  const vy = ux;
  const bx = cx + ux * r0;
  const by = cy + uy * r0;
  const p = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;
  return `${p(bx + vx * halfW, by + vy * halfW)} ${p(cx + ux * r1, cy + uy * r1)} ${p(bx - vx * halfW, by - vy * halfW)} ${p(cx + ux * (r0 - 6), cy + uy * (r0 - 6))}`;
}

/** The marigold: two rings of diamond petals around a terracotta heart. */
export function MarigoldFlower({ size = 96 }: { size?: number }) {
  const outer = Array.from({ length: 12 }, (_, i) => i * 30);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" title="Marigold flower">
      {outer.map((a) => (
        <Polygon key={`o${a}`} points={petalPoints(60, 60, a, 30, 56, 10)} style={{ fill: palette.marigold }} />
      ))}
      {inner.map((a) => (
        <Polygon key={`i${a}`} points={petalPoints(60, 60, a, 14, 33, 8)} style={{ fill: palette.marigoldLight }} />
      ))}
      <Circle cx={60} cy={60} r={14} style={{ fill: palette.terracotta }} />
      <Circle cx={54} cy={54} r={2.4} style={{ fill: palette.cream }} />
      <Circle cx={66} cy={56} r={2.4} style={{ fill: palette.cream }} />
      <Circle cx={60} cy={66} r={2.4} style={{ fill: palette.cream }} />
    </Svg>
  );
}

/** A sun rising inside a garden arch — the hero motif. */
export function SunArch({ width = 300, height = 250 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 200" title="Sun arch">
      <PathArch />
    </Svg>
  );
}

function PathArch() {
  return (
    <>
      <Path d="M30 200 L30 95 A90 90 0 0 1 210 95 L210 200 Z" style={{ fill: palette.sand }} />
      <Path d="M55 200 L55 102 A65 65 0 0 1 185 102 L185 200 Z" style={{ fill: palette.marigoldLight }} />
      <Circle cx={120} cy={128} r={30} style={{ fill: palette.marigold }} />
      <Rect x={30} y={188} width={180} height={12} style={{ fill: palette.pine }} />
    </>
  );
}

/** One ECG pulse travelling across a band. Drawn with Lines (no fills). */
export function PulseLine({ width = 560, color = palette.marigold }: { width?: number; color?: string }) {
  const mid = 24;
  const pts: Array<[number, number]> = [
    [0, mid],
    [width * 0.3, mid],
    [width * 0.335, 7],
    [width * 0.37, 39],
    [width * 0.395, mid],
    [width * 0.58, mid],
    [width * 0.605, 14],
    [width * 0.63, 33],
    [width * 0.65, mid],
    [width, mid],
  ];
  return (
    <Svg width={width} height={44} viewBox={`0 0 ${width} 44`} title="Pulse line">
      {pts.slice(0, -1).map(([x1, y1], i) => (
        <Line key={i} x1={x1} y1={y1} x2={pts[i + 1][0]} y2={pts[i + 1][1]} style={{ stroke: color, strokeWidth: 3 }} />
      ))}
    </Svg>
  );
}

export function Eyebrow({
  children,
  onDark = false,
  center = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <Text
      style={{
        fontSize: 11,
        letterSpacing: 3,
        textTransform: "uppercase",
        fontWeight: 700,
        color: onDark ? palette.marigoldLight : palette.marigoldDeep,
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </Text>
  );
}

/** Three petals and dots between sections. */
export function PetalDivider({ onDark = false }: { onDark?: boolean }) {
  const line = onDark ? palette.moss : palette.sandLine;
  return (
    <Svg width={132} height={18} viewBox="0 0 132 18" title="Petal divider">
      <Line x1={0} y1={9} x2={42} y2={9} style={{ stroke: line, strokeWidth: 1.5 }} />
      <Line x1={90} y1={9} x2={132} y2={9} style={{ stroke: line, strokeWidth: 1.5 }} />
      <Circle cx={52} cy={9} r={3} style={{ fill: palette.sage }} />
      <Circle cx={80} cy={9} r={3} style={{ fill: palette.sage }} />
      <Polygon points="57,9 66,2 75,9 66,16" style={{ fill: palette.marigold }} />
    </Svg>
  );
}

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <Row style={{ gap: 12, alignItems: "center" }}>
      <MarigoldFlower size={36} />
      <Column style={{ gap: 1 }}>
        <Text
          style={{
            fontFamily: fonts.heading,
            fontSize: 21,
            fontWeight: 600,
            lineHeight: 1.1,
            color: onDark ? palette.cream : palette.ink,
          }}
        >
          Marigold Clinic
        </Text>
        <Text
          style={{
            fontSize: 9,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 700,
            color: onDark ? palette.marigoldLight : palette.marigoldDeep,
          }}
        >
          Care, in full bloom
        </Text>
      </Column>
    </Row>
  );
}

/** Email-safe wordmark: type and colour only, no Svg. */
export function EmailWordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <Column style={{ gap: 2 }}>
      <Text
        style={{
          fontFamily: fonts.heading,
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.1,
          color: onDark ? palette.cream : palette.ink,
        }}
      >
        Marigold <Span style={{ fontStyle: "italic", color: palette.marigold }}>Clinic</Span>
      </Text>
      <Text
        style={{
          fontSize: 9,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontWeight: 700,
          color: onDark ? palette.marigoldLight : palette.marigoldDeep,
        }}
      >
        Care, in full bloom
      </Text>
    </Column>
  );
}

export function StatusChip({ status, label }: { status: "low" | "in" | "high" | "vital"; label: string }) {
  const flag = status === "low" || status === "high";
  return (
    <Column
      style={{
        backgroundColor: flag ? palette.terracottaTint : palette.sageTint,
        borderRadius: 999,
        padding: [5, 12],
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: flag ? palette.terracottaDeep : palette.moss,
        }}
      >
        {label}
      </Text>
    </Column>
  );
}

export function StatCard({ vital, dark = false }: { vital: Vital; dark?: boolean }) {
  return (
    <Column
      style={{
        backgroundColor: dark ? palette.pine : palette.creamBright,
        border: { width: 1, style: "solid", color: dark ? palette.pine : palette.sandLine },
        borderRadius: 20,
        padding: 24,
        gap: 8,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          color: dark ? palette.marigoldLight : palette.marigoldDeep,
        }}
      >
        {vital.label}
      </Text>
      <Text
        style={{
          fontFamily: fonts.heading,
          fontSize: 38,
          fontWeight: 600,
          lineHeight: 1.05,
          color: dark ? palette.cream : palette.ink,
        }}
      >
        {vital.value}{" "}
        <Span style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, color: dark ? palette.sage : palette.muted }}>
          {vital.unit}
        </Span>
      </Text>
      <Text style={{ fontSize: 13, fontWeight: 600, color: dark ? palette.marigoldLight : palette.moss }}>{vital.status}</Text>
    </Column>
  );
}

/** Computed range bar: sand track, sage reference band, value marker. */
export function RangeBar({ labResult, width = 240 }: { labResult: LabResult; width?: number }) {
  const { bar, status } = labResult;
  const markerX = (bar.markerPct / 100) * width;
  const bandX = (bar.bandStartPct / 100) * width;
  const bandW = Math.max(6, (bar.bandWidthPct / 100) * width);
  return (
    <Svg width={width} height={28} viewBox={`0 0 ${width} 28`} title={`${labResult.name} range bar`}>
      <Rect x={0} y={11} width={width} height={6} rx={3} style={{ fill: "#E7D9BC" }} />
      <Rect x={bandX} y={11} width={bandW} height={6} rx={3} style={{ fill: palette.sage }} />
      <Rect
        x={Math.min(width - 5, Math.max(0, markerX - 2.5))}
        y={4}
        width={5}
        height={20}
        rx={2.5}
        style={{ fill: status === "in" ? palette.pine : palette.terracotta }}
      />
      <Circle
        cx={Math.min(width - 5, Math.max(5, markerX))}
        cy={14}
        r={5}
        style={{ fill: status === "in" ? palette.pine : palette.terracotta, stroke: palette.creamBright, strokeWidth: 2 }}
      />
    </Svg>
  );
}

/** One lab row: name, big result, computed range bar, computed status chip. */
export function LabRow({ labResult, barWidth = 240 }: { labResult: LabResult; barWidth?: number }) {
  return (
    <Row
      style={{
        gap: 18,
        alignItems: "center",
        padding: [13, 2],
        border: { bottom: { width: 1, style: "solid", color: palette.sandLine } },
      }}
    >
      <Column style={{ width: 178, gap: 2 }}>
        <Text style={{ fontWeight: 600, fontSize: 15 }}>{labResult.name}</Text>
        <Text style={{ fontSize: 12, color: palette.muted }}>Reference {labResult.refLabel}</Text>
      </Column>
      <Column style={{ width: 104 }}>
        <Text style={{ fontFamily: fonts.heading, fontSize: 23, fontWeight: 600, lineHeight: 1.1 }}>
          {labResult.display}{" "}
          <Span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 500, color: palette.muted }}>{labResult.unit}</Span>
        </Text>
      </Column>
      <Column style={{ flex: 1, gap: 3 }}>
        <RangeBar labResult={labResult} width={barWidth} />
      </Column>
      <Column style={{ width: 106, alignItems: "end" }}>
        <StatusChip status={labResult.status} label={labResult.statusLabel} />
      </Column>
    </Row>
  );
}

/** Arch + marigold-sun composed in ONE Svg — a single coordinate system,
 *  so the overlap is exact in every renderer (Layer stacking offsets
 *  differently in the image renderer). The flower IS the sun. */
export function HeroArt({ width = 480 }: { width?: number }) {
  const height = Math.round(width * (400 / 480));
  const cx = 240;
  const cy = 218;
  const outer = Array.from({ length: 12 }, (_, i) => i * 30);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
  const mini = (mx: number, my: number) => (
    <>
      {outer.map((a) => (
        <Polygon key={`m${mx}-${a}`} points={petalPoints(mx, my, a, 7, 17, 4.5)} style={{ fill: palette.marigold }} />
      ))}
      <Circle cx={mx} cy={my} r={5.5} style={{ fill: palette.terracotta }} />
    </>
  );
  return (
    <Svg width={width} height={height} viewBox="0 0 480 400" title="Sun arch with marigold">
      <Path d="M50 400 L50 195 A190 190 0 0 1 430 195 L430 400 Z" style={{ fill: palette.sand }} />
      <Path d="M95 400 L95 208 A145 145 0 0 1 385 208 L385 400 Z" style={{ fill: palette.marigoldLight }} />
      {outer.map((a) => (
        <Polygon key={`ho${a}`} points={petalPoints(cx, cy, a, 50, 96, 18)} style={{ fill: palette.marigold }} />
      ))}
      {inner.map((a) => (
        <Polygon key={`hi${a}`} points={petalPoints(cx, cy, a, 27, 60, 14)} style={{ fill: palette.sand }} />
      ))}
      <Circle cx={cx} cy={cy} r={27} style={{ fill: palette.terracotta }} />
      <Circle cx={cx - 9} cy={cy - 7} r={3.4} style={{ fill: palette.cream }} />
      <Circle cx={cx + 8} cy={cy - 2} r={3.4} style={{ fill: palette.cream }} />
      <Circle cx={cx - 2} cy={cy + 9} r={3.4} style={{ fill: palette.cream }} />
      <Rect x={50} y={378} width={380} height={22} style={{ fill: palette.moss }} />
      {mini(112, 352)}
      {mini(368, 352)}
    </Svg>
  );
}
