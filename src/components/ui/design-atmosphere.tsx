/** Centre panel atmosphere — adapted from SprintIQ design system. */
export function DesignAtmosphere() {
  return (
    <div className="design-atmosphere design-atmosphere--panel" aria-hidden>
      <div className="design-atmosphere__fade design-atmosphere__fade--teal-left" />
      <div className="design-atmosphere__fade design-atmosphere__fade--purple-right" />
      <div className="design-atmosphere__fade design-atmosphere__fade--magenta-mid" />
      <div className="design-atmosphere__fade design-atmosphere__fade--cyan-accent" />
    </div>
  );
}
