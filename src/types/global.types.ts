export {};

declare global {
  interface Window {
    dataLayer?: any[];
    env: {
      expertsEngine: {
        GOOGLE_TAG_MANAGER_ID: string;
      };
    };
  }
}
