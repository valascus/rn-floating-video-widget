import { NativeModules, DeviceEventEmitter } from "react-native";

const Widget = NativeModules.FloatingVideoWidget;

const listener = [];
/**
 * Opens the floating video player and starts
 * playing the video.
 * @param {object} data The data object.
 * @param {object} data.video The video object should atleast have a property named "".
 * @param data.video.url The url of video to be played
 * @param {Array} data.videos List of video objects structured similar to data.video.
 * @param {number}  data.seek Seek value of video.
 * @param {number} data.index Index of the video in data.videos array.
 * @param {number} data.skipSize
 */

export function open(data) {
  if (!data || typeof data !== "object")
    throw new Error(
      "data must be an object with atleast one key as video object"
    );
  if (!data.video || typeof data.video !== "object" || !data.video.url)
    throw new Error(
      "video must be an object with atleast one key 'uri: url to video"
    );
  if (!data.hasOwnProperty("videos") || data.videos.length == 0) {
    let videos = [];
    videos.push(data.video);
    data.videos = videos;
  }
  if (!data.hasOwnProperty("seek") || !data.seek) {
    data.seek = 0;
  }

  if (!data.hasOwnProperty("index") || !data.seek) {
    data.index = 0;
  }

  if (!data.hasOwnProperty("skipSize") || !data.seek) {
    data.skipSize = 10;
  }

  Widget.open(data);
}

/**
 * Close the floating video player
 *
 */

export function close() {
  Widget.close();
}

/**
 * Request for draw_over_other_apps permission for android 6.0 and above.
 * @return {Promise}
 */

export async function requestOverlayPermission() {
  return await Widget.requestOverlayPermission();
}

/**
 * Play the video
 *
 */

export function play() {
  Widget.play();
}

/**
 * Pause the video
 *
 */
export function pause() {
  Widget.pause();
}

/**
 * Play previous video
 *
 */
export function prev() {
  Widget.prev();
}

/**
 * Play next video
 *
 */
export function next() {
  Widget.next();
}

/**
 * @event onError Called when an error occurs
 * @type {function}
 */

export function onError(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onError", callback);
  listener.push(() => DeviceEventEmitter.removeListener("onError", callback));
}

/**
 * @event onError Called when video is played.
 * @type {function}
 */
export function onPlay(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onPlay", callback);
  listener.push(() => DeviceEventEmitter.removeListener("onPlay", callback));
}

/**
 * @event onPause Called when video is paused
 * @type {function}
 */
export function onPause(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onPause", callback);
  listener.push(() => DeviceEventEmitter.removeListener("onPause", callback));
}

/**
 * @event onNext Called when a you play the next video
 * @type {function}
 */
export function onNext(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onNext", callback);
  listener.push(() => DeviceEventEmitter.removeListener("onNext", callback));
}

/**
 * @event onProgress Called when destroy
 * @type {function}
 */
export function onProgress(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onProgress", callback);
  listener.push(() =>
    DeviceEventEmitter.removeListener("onProgress", callback)
  );
}

/**
 * @event onPrev Called when you play the previous video
 * @type {function}
 */
export function onPrev(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onPrev", callback);
  listener.push(() => DeviceEventEmitter.removeListener("onPrev", callback));
}

/**
 * @event onClose Called when the floating video has closed.
 * @type {function}
 */
export function onClose(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onClose", callback);
  listener.push(() => DeviceEventEmitter.removeListener("onClose", callback));
}

// /**
//  * @event backToApp Called when the floating video has closed.
//  * @type {function}
//  */
export function backToApp(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("backToApp", callback);
  listener.push(() => DeviceEventEmitter.removeListener("backToApp", callback));
}

/**
 * @event onOpen  Called when a new video is played from react-native side or when the floating player is opened
 * @type {function}
 */
export function onOpen(callback) {
  if (!callback) throw new Error("Callback cannot be undefined");
  DeviceEventEmitter.addListener("onOpen", callback);
  listener.push(() => DeviceEventEmitter.removeListener("onOpen", callback));
}

/**
 * Removes all listeners
 * Use this in your ComponenWillUnmount() function
 */

export function removeAllListeners() {
  // DeviceEventEmitter.removeAllListeners();
  while (listener.length > 0) listener.shift()();
}
