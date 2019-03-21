export const enumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
export const getUserMedia = constrains => navigator.mediaDevices.getUserMedia(constrains);