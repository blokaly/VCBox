import {SET_OVERLAY_SUCCESS} from './types';

export function setOverlay(overlay) {
  return {
    type: SET_OVERLAY_SUCCESS,
    overlay: overlay
  }
}

