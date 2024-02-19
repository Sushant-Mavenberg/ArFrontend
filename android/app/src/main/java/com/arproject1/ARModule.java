package com.arproject1;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;

public class ARModule extends ReactContextBaseJavaModule {

    public ARModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ARModule";
    }

    @ReactMethod
    public void startAR(ReadableArray imageData) {
        // Convert ReadableArray to ArrayList<ARData>
        ArrayList<ARData> arDataList = new ArrayList<>();
        for (int i = 0; i < imageData.size(); i++) {
            ReadableMap imageMap = imageData.getMap(i);
            if (imageMap != null) {

                String jpegUrl = imageMap.getString("jpegUrl");
                String glbUrl = imageMap.getString("glbUrl");
                ARData arData = new ARData(jpegUrl, glbUrl);
                arDataList.add(arData);

                // Log the URLs
                Log.d("ARModule", "Received JPEG URL: " + jpegUrl);
                Log.d("ARModule", "Received GLB URL: " + glbUrl);
            }
        }

        // Start AR activity
        Intent intent = new Intent(getCurrentActivity(), ArScreen.class);
        intent.putParcelableArrayListExtra("arDataList", arDataList);
        getCurrentActivity().startActivity(intent);
    }
}
