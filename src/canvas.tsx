import React from "react";
import { Canvas, Column, Row, Span, Text } from "@hyper-elements/react";
import { fonts, marigold, palette } from "./theme";
import {
  Eyebrow,
  HeroArt,
  PetalDivider,
  Wordmark,
} from "./components";
import { appointment, clinic, doctor, patient, vitals } from "./data";

const posterVitals = [vitals[0], vitals[1], vitals[2]];

export default function AppointmentCanvas() {
  return (
    <Canvas
      theme={marigold}
      width={1080}
      height={1350}
      title={`Marigold Clinic — appointment card for ${patient.fullName}`}
      style={{
        backgroundColor: palette.pine,
        padding: [64, 72],
        gap: 30,
        justifyContent: "space-between",
      }}
    >
      {/* Top */}
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark onDark />
        <Text
          style={{
            fontSize: 13,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 700,
            color: palette.marigoldLight,
          }}
        >
          Appointment card
        </Text>
      </Row>

      {/* Art */}
      <Column style={{ alignItems: "center", gap: 6 }}>
        <HeroArt width={520} />
        <Eyebrow onDark center>
          {`Your next visit · ${clinic.name}`}
        </Eyebrow>
        <Text
          style={{
            fontFamily: fonts.heading,
            fontSize: 176,
            fontWeight: 600,
            fontStyle: "italic",
            lineHeight: 1,
            color: palette.cream,
            textAlign: "center",
          }}
        >
          {appointment.day}
        </Text>
        <Text
          style={{
            fontFamily: fonts.heading,
            fontSize: 40,
            fontWeight: 600,
            color: palette.cream,
            textAlign: "center",
          }}
        >
          {appointment.weekday}, {appointment.month} {appointment.year} · {appointment.time}
        </Text>
        <Text style={{ fontSize: 17, color: palette.sand, textAlign: "center" }}>
          {appointment.type} with {doctor.name}
        </Text>
      </Column>

      {/* Vitals strip */}
      <Column style={{ alignItems: "center", gap: 22 }}>
        <PetalDivider onDark />
        <Row style={{ gap: 56, justifyContent: "center" }}>
          {posterVitals.map((v) => (
            <Column key={v.label} style={{ alignItems: "center", gap: 4, width: 240 }}>
              <Text
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 44,
                  fontWeight: 600,
                  color: palette.cream,
                  lineHeight: 1.05,
                  textAlign: "center",
                }}
              >
                {v.value}{" "}
                <Span style={{ fontFamily: fonts.body, fontSize: 16, fontWeight: 500, color: palette.sage }}>
                  {v.unit}
                </Span>
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: palette.marigoldLight,
                  textAlign: "center",
                }}
              >
                {v.label}
              </Text>
            </Column>
          ))}
        </Row>
      </Column>

      {/* Bottom card */}
      <Column
        style={{
          backgroundColor: palette.cream,
          borderRadius: 26,
          padding: [28, 36],
          gap: 8,
        }}
      >
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Column style={{ gap: 3 }}>
            <Text style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: palette.marigoldDeep }}>
              Patient
            </Text>
            <Text style={{ fontWeight: 700, fontSize: 19, color: palette.ink }}>
              {patient.fullName}, {patient.age}
            </Text>
          </Column>
          <Column style={{ gap: 3, alignItems: "end" }}>
            <Text style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: palette.marigoldDeep }}>
              Where
            </Text>
            <Text style={{ fontWeight: 700, fontSize: 19, color: palette.ink }}>{clinic.address}</Text>
          </Column>
        </Row>
        <Text style={{ fontSize: 13, color: palette.muted }}>
          Care, in full bloom. Sample template — all names and details are fictional.
        </Text>
      </Column>
    </Canvas>
  );
}
