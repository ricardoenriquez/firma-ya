package com.firmaya;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;
import com.gse.signature.Sign;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "ToastModule";
    }

    @ReactMethod
    public void showToast(String message) {
        Sign sign = new Sign();
        Toast.makeText(getReactApplicationContext(), sign.Hello(message), Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void signPDF(
            String user,
            String password,
            Promise promise) {
        try {

            WritableMap map = Arguments.createMap();

            map.putString("response","Bienvenido Sr "+user+",  contraseña "+password );

            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }

}
