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
import com.gse.signature.Signature;
import com.gse.signature.dto.ImageSign;
import com.gse.signature.dto.SignatureResult;

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
    //    Sign sign = new Sign();
    //    Toast.makeText(getReactApplicationContext(), sign.Hello(message), Toast.LENGTH_SHORT).show();
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

    @ReactMethod
    public void signCades (
            String user,
            String password,
            Promise promise) {
        try {


            Signature signature = new Signature();
            String dataToSign = "hello world";
            SignatureResult result = signature.Cades(dataToSign.getBytes(), "1194543041105", "SA45E0FG31", "gse", "123456789");

            promise.resolve(" - "+result.isSuccess());
        } catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }

    @ReactMethod
    public void signPades (
            byte[] stampBytes,
            byte[] pdfBytes,
            String user,
            String password,
            Promise promise) {
        try {

            String ubicacion = "Tunja";
            String razon = "Tunja";
            String passStamp = "234";
            String userStamp = "234";
            Boolean isLtv=false;
            Boolean isStamp=false;
            Boolean isFirmaVisible=false;

            Signature signature = new Signature();
            ImageSign imageSign = new ImageSign(100, 100, 100, 100, stampBytes, 1);
            SignatureResult result = signature.Pades(pdfBytes, user, password, "gse", "123456789",
                    isLtv, isStamp, userStamp,passStamp , "https://tsa.gse.com.co",isFirmaVisible, imageSign, razon,
                    ubicacion);

            WritableMap map = Arguments.createMap();

            map.putString("response","Bienvenido Sr "+user+",  contraseña "+password );

            promise.resolve(result);
        } catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }

}
