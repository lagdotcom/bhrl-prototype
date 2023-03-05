export const PilotClasses = ["Duelist", "Seer", "Smuggler"] as const;
type PilotClass = (typeof PilotClasses)[number];
export default PilotClass;
