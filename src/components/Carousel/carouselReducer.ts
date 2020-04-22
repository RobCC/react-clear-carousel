import { CarouselState, CarouselAction } from '#/types';

export const initialState: CarouselState = {
  isTransitioning: false,
  axis: 0,
};

export function reducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch(action.type) {
    case 'forward':
      return {
        ...state,
        isTransitioning: true,
        axis: action.axis,
      };
    case 'back':
      return {
        ...state,
        isTransitioning: true,
        axis: action.axis,
      };
    case 'finished':
      return {
        ...state,
        isTransitioning: false,
      };
    default:
      return state;
  }
}

export default {
  initialState,
  reducer
};
