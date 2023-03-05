export const PilotStats = ["body", "mind", "spirit", "talent"] as const;
type PilotStat = (typeof PilotStats)[number];
export default PilotStat;
