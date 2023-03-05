export const PilotClasses = [
  "Berserker",
  "Chopter",
  "Duelist",
  "Engineer",
  "Fighter",
  "Negotiator",
  "Psychic",
  "Smuggler",
] as const;
type PilotClass = (typeof PilotClasses)[number];
export default PilotClass;
