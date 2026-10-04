export const HEADLINE = "WELCOME ITZFIZZ";

export type Stat = {
  value: number;
  label: string;
  /** Tailwind classes for the card surface + text colour. */
  tone: string;
};

export const STATS: Stat[] = [
  { value: 58, label: "Increase in pick-up point use", tone: "bg-lime text-ink" },
  { value: 23, label: "Decrease in customer phone calls", tone: "bg-sky text-ink" },
  { value: 27, label: "Faster average delivery time", tone: "bg-ink text-paper" },
  { value: 40, label: "Fewer failed delivery attempts", tone: "bg-ember text-ink" },
];
