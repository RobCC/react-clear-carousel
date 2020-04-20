export type CarouselProps = {
  items: any[],
  itemsDisplayed: number,
  arrows?: boolean,
  paging?: boolean,
  transitionTime?: number,
  easing?: string,
};

export type CarouselRef = {
  goBack(): void,
  goForward(): void,
};
