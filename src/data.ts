// Marigold Clinic — one fictional patient file drives every output.
// Lab status and range-bar geometry are COMPUTED from value vs reference
// range here, never hard-coded in the templates.

export type LabStatus = "low" | "in" | "high";

export interface LabResult {
  name: string;
  value: number;
  display: string;
  unit: string;
  refLow: number;
  refHigh: number;
  refLabel: string;
  status: LabStatus;
  statusLabel: string;
  bar: {
    scaleMin: number;
    scaleMax: number;
    bandStartPct: number;
    bandWidthPct: number;
    markerPct: number;
  };
}

function lab(
  name: string,
  value: number,
  unit: string,
  refLow: number,
  refHigh: number,
  decimals = 0,
): LabResult {
  const status: LabStatus = value < refLow ? "low" : value > refHigh ? "high" : "in";
  const span = refHigh - refLow;
  const pad = span * 0.6;
  let scaleMin = refLow - pad;
  if (refLow >= 0 && scaleMin < 0) scaleMin = 0;
  const scaleMax = refHigh + pad;
  const pct = (v: number) =>
    Math.min(99, Math.max(1, ((v - scaleMin) / (scaleMax - scaleMin)) * 100));
  return {
    name,
    value,
    display: value.toFixed(decimals),
    unit,
    refLow,
    refHigh,
    refLabel: `${refLow.toFixed(decimals)} – ${refHigh.toFixed(decimals)} ${unit}`,
    status,
    statusLabel: status === "in" ? "In range" : status === "low" ? "Low" : "High",
    bar: {
      scaleMin,
      scaleMax,
      bandStartPct: pct(refLow),
      bandWidthPct: pct(refHigh) - pct(refLow),
      markerPct: pct(value),
    },
  };
}

export const clinic = {
  name: "Marigold Clinic",
  wordmark: "Marigold",
  tagline: "Care, in full bloom.",
  address: "14 Rosewood Lane, Bengaluru",
  phone: "+91 80 4000 0000",
};

export const patient = {
  firstName: "Anaya",
  fullName: "Anaya Sharma",
  age: 34,
  id: "MRC-2026-0117",
};

export const doctor = {
  name: "Dr. Meera Rao",
  shortName: "Dr. Rao",
  role: "Internal Medicine",
};

export const appointment = {
  weekday: "Friday",
  day: "27",
  month: "November",
  year: "2026",
  dateLong: "Friday, 27 November 2026",
  time: "10:30 AM",
  type: "Annual review & lab discussion",
  reason: "Annual health review, with a look at this season's blood work",
  sampleDate: "24 November 2026",
  reportDate: "27 November 2026",
};

export const followUp = {
  dateLong: "Thursday, 18 February 2027",
  time: "10:30 AM",
  note: "Recheck for vitamin D and HbA1c",
};

export interface Vital {
  label: string;
  value: string;
  unit: string;
  status: string;
}

export const vitals: Vital[] = [
  { label: "Blood pressure", value: "118/76", unit: "mmHg", status: "Steady" },
  { label: "Resting heart rate", value: "68", unit: "bpm", status: "Calm" },
  { label: "Oxygen · SpO2", value: "98", unit: "%", status: "Clear" },
  { label: "Temperature", value: "98.4", unit: "°F", status: "Normal" },
  { label: "Body mass index", value: "23.1", unit: "BMI", status: "In range" },
];

// Exactly two results sit outside their reference range — vitamin D (low)
// and HbA1c (just above range). Everything else is in range, by design, so
// the flags and the doctor's note tell one clear story.
export const labs: LabResult[] = [
  lab("Hemoglobin", 13.2, "g/dL", 12.0, 15.5, 1),
  lab("HbA1c", 5.9, "%", 4.0, 5.6, 1),
  lab("Vitamin D", 18, "ng/mL", 30, 100),
  lab("TSH", 2.4, "mIU/L", 0.4, 4.5, 1),
  lab("LDL cholesterol", 108, "mg/dL", 0, 130),
  lab("HDL cholesterol", 58, "mg/dL", 40, 60),
  lab("Triglycerides", 122, "mg/dL", 0, 150),
  lab("CRP", 1.8, "mg/L", 0, 3.0, 1),
];

export const flaggedLabs = labs.filter((l) => l.status !== "in");
export const inRangeCount = labs.length - flaggedLabs.length;

export const carePlan = [
  {
    title: "Sunshine, bottled",
    text: "Take the vitamin D supplement Dr. Rao has prescribed, each morning with breakfast. Your level was 18 ng/mL — we will bring it back into range together.",
  },
  {
    title: "One sweeter swap",
    text: "Trade one sweetened drink a day for water or unsweetened tea. Your HbA1c, at 5.9%, sits just above range — a small, early nudge is all it needs.",
  },
  {
    title: "A morning walk",
    text: "Twenty-five minutes in the morning light, five days a week. Sunlight and movement help both flagged results at once.",
  },
];

export const doctorNote =
  "Anaya, this is a good report. Six of your eight results sit comfortably in range, your blood pressure is steady, and there is nothing here that needs worry — only tending. Two results ask for a little care: your vitamin D is low at 18 ng/mL, which is common after a long season indoors, and your HbA1c is just above range at 5.9%. Both respond beautifully to small, early changes, and the plan below is built for exactly that. We will recheck both in February and watch them bloom back into range.";

export const disclaimer = "Sample data — not medical advice. All names and results in this template are fictional.";
