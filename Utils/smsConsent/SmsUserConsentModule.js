// SmsUserConsentModule.js

import { NativeEventEmitter, NativeModules } from 'react-native';

const { SmsUserConsentModule } = NativeModules;
const smsUserConsentEvents = new NativeEventEmitter(SmsUserConsentModule);

const SmsUserConsent = {
  startSmsUserConsent: () => {
    SmsUserConsentModule.startSmsUserConsent();
  },

  addSmsListener: (callback) => {
    smsUserConsentEvents.addListener('onSmsReceived', callback);
  },

  removeSmsListener: (callback) => {
    smsUserConsentEvents.removeListener('onSmsReceived', callback);
  },
};

export default SmsUserConsent;
