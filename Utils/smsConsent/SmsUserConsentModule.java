// SmsUserConsentModule.java

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SmsUserConsentModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "SmsUserConsentModule";
    private static final String SMS_RETRIEVED_ACTION = "com.google.android.gms.auth.api.phone.SMS_RETRIEVED";

    public SmsUserConsentModule(ReactApplicationContext reactContext) {
        super(reactContext);

        // Register broadcast receiver for SMS retrieval
        IntentFilter intentFilter = new IntentFilter(SMS_RETRIEVED_ACTION);
        reactContext.registerReceiver(new SmsVerificationReceiver(), intentFilter);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void startSmsUserConsent() {
        // Start SMS User Consent using SmsRetrieverClient
        // You should implement this part based on the Google documentation
    }

    private class SmsVerificationReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            // Handle the SMS_RETRIEVED_ACTION intent
            // Extract SMS content and send it to React Native
            String smsMessage = intent.getStringExtra("message");
            getReactApplicationContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("onSmsReceived", smsMessage);
        }
    }
}
