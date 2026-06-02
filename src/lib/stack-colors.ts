/** Binmile-style progressive blue stack — brightest at top, deepest navy at bottom. */
export type StackLayerColors = {
  top: string;
  front: string;
  side: string;
  label: string;
};

export const STACK_LAYER_COLORS: StackLayerColors[] = [
  { top: "#0095FF", front: "#007ACC", side: "#0066B3", label: "#FFFFFF" },
  { top: "#0088EE", front: "#006FC7", side: "#005BA3", label: "#FFFFFF" },
  { top: "#0077D4", front: "#0060AD", side: "#004D8A", label: "#FFFFFF" },
  { top: "#1E5A9E", front: "#184A82", side: "#123966", label: "#F0F6FF" },
  { top: "#1A3A6E", front: "#152F58", side: "#0F2444", label: "#E8EEF8" },
];

export function getStackLayerColors(index: number): StackLayerColors {
  return STACK_LAYER_COLORS[index] ?? STACK_LAYER_COLORS[STACK_LAYER_COLORS.length - 1];
}
