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

export type CarouselState = {
  isTransitioning: boolean,
  axis: number,
}

export type CarouselAction =
  | { type: 'forward', axis: number  }
  | { type: 'back', axis: number }
  | { type: 'finished'};
