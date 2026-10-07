export const dimensions = {
  contentMaxWidth: 680,
  compactWidth: 360,
  tabletWidth: 600,
  horizontalGutter: 20,
} as const;

export function getHorizontalGutter(width: number) {
  return width < dimensions.compactWidth ? 16 : dimensions.horizontalGutter;
}

export function getGridColumnCount(width: number) {
  if (width >= dimensions.tabletWidth) return 3;
  return 2;
}
