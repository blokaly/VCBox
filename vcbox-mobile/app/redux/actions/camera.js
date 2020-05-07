import {CAMERA_OFF, CAMERA_ON} from './types';

export function setCamera(on) {
  if (on) {
    return {
      type: CAMERA_ON,
    }
  } else {
    return {
      type: CAMERA_OFF,
    }
  }
}
