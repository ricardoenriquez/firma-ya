package com.firmaya;

import android.net.Uri;
import android.os.Environment;
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

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

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

            promise.resolve(" - "+result);
        } catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }

    @ReactMethod
    public void signPades (String pdfUri, String user, String password,
                           Boolean isLtv, String razon, String ubicacion, Boolean isStamp,
                           Boolean isFirmaVisible, String stampUri, String usuario, String clave,
                           Promise promise) {
        try {
            Uri pdf = Uri.parse(pdfUri);
            Uri image = Uri.parse(stampUri);

            InputStream pdfStream =   getReactApplicationContext().getContentResolver().openInputStream(pdf);
            byte[] inputPdf = getBytes(pdfStream);

            InputStream imageStream =   getReactApplicationContext().getContentResolver().openInputStream(image);
            byte[] inputImage = getBytes(imageStream);

            //new File(pdf.getPath());

            Signature signature = new Signature();
            ImageSign imageSign = new ImageSign(100, 100, 100, 100, inputImage, 1);
            SignatureResult result = signature.Pades(inputPdf, user, password, "gse", "123456789",
                    isLtv, isStamp, usuario,clave , "https://tsa.gse.com.co",isFirmaVisible, imageSign, razon,
                    ubicacion);

            if(result.isSuccess()){
                createFile(result.getFirmado());
                /*
                FileOutputStream fileOutputStream = new FileOutputStream(
                        new File(getReactApplicationContext().getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS),"FirmadoQQQQQQQQ.pdf"));
                        fileOutputStream.write(result.getFirmado());
                        fileOutputStream.flush();
                        fileOutputStream.close();*/
            }

            //promise.resolve(result);
            String res = "mensaje "+result.getMessage()+" respeusta "+result.isSuccess()+" -- image "+imageSign;
            promise.resolve(res);
        } catch (Exception e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }
    private void createFile(byte[] fileData) {
        try {
            //Create directory..
            File root = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS );
            File dir = new File(root + File.separator);
            if (!dir.exists()) dir.mkdir();

            //Create file..
            File file = new File(root + File.separator + "FIRMADO.pdf");
            file.createNewFile();

            FileOutputStream out = new FileOutputStream(file);
            out.write(fileData);
            out.close();

        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    public byte[] getBytes(InputStream inputStream) throws IOException {
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
        int bufferSize = 1024;
        byte[] buffer = new byte[bufferSize];

        int len = 0;
        while ((len = inputStream.read(buffer)) != -1) {
            byteBuffer.write(buffer, 0, len);
        }
        return byteBuffer.toByteArray();
    }

}
