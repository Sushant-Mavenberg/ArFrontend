package com.arproject1;

import android.os.Parcel;
import android.os.Parcelable;

public class ARData implements Parcelable {
    private String jpegUrl;
    private String glbUrl;

    public ARData(String jpegUrl, String glbUrl) {
        this.jpegUrl = jpegUrl;
        this.glbUrl = glbUrl;
    }

    protected ARData(Parcel in) {
        jpegUrl = in.readString();
        glbUrl = in.readString();
    }

    public static final Creator<ARData> CREATOR = new Creator<ARData>() {
        @Override
        public ARData createFromParcel(Parcel in) {
            return new ARData(in);
        }

        @Override
        public ARData[] newArray(int size) {
            return new ARData[size];
        }
    };

    public String getJpegUrl() {
        return jpegUrl;
    }

    public String getGlbUrl() {
        return glbUrl;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(jpegUrl);
        dest.writeString(glbUrl);
    }

    @Override
    public int describeContents() {
        return 0;
    }
}
