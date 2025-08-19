export default class Analytics {
  static sendTrackEvent(eventName: string, eventParams: object): void {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    } else {
      console.warn("dataLayer is not defined, cannot send analytics event");
    }
  }
}
