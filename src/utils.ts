export function getSwimlaneWidth(width: number, length: number): number {
  return width * length;
}

export function getItemWidth(itemsDisplayed: number): number {
  const { innerWidth } = window;

  return +(innerWidth / itemsDisplayed).toFixed(3);
}

export function getMaxScroll(
  swimlaneWidth: number,
  itemWidth: number,
  itemsDisplayed: number,
): number {
  return -(swimlaneWidth - (itemWidth * itemsDisplayed));
}

export default {
  getSwimlaneWidth,
  getItemWidth,
  getMaxScroll,
};
