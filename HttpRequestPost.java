import java.io.IOException;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.net.MalformedURLException;
import org.json.JSONObject;



public class HttpRequestPost {
    public static void main (String [] args) {

        String urlAdress = "https://pay-test.raif.ru/api/sbp/v2/qrs";
        URL url;
        HttpURLConnection httpURLConnection;
        OutputStream OS = null;
        InputStreamReader IsR = null;
        BufferedReader BfR = null;
        StringBuilder stringBuilder = new StringBuilder();


        try {
            JSONObject json = new JSONObject();

            json.put("qrType", "QRStatic");
            json.put("amount", 100);
            json.put("order", "a9384868-6e4d-11ed-a1eb-0242ac120002");
            json.put("sbpMerchantId", "MA999438");

            byte [] out = json.toString().getBytes();

            url = new URL(urlAdress);
            httpURLConnection = (HttpURLConnection)url.openConnection();
            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);

            httpURLConnection.setRequestProperty("Content-Type", "application/json; utf-8");
            httpURLConnection.setRequestProperty("Accept", "application/json");

            try {
                OS = httpURLConnection.getOutputStream();
                OS.write(out);
            } catch (Exception e) {
                System.err.print(e.getMessage());
            }
            if (HttpURLConnection.HTTP_OK == httpURLConnection.getResponseCode()) {
                IsR = new InputStreamReader(httpURLConnection.getInputStream());
                BfR = new BufferedReader(IsR);
                String line;
                while ((line = BfR.readLine()) != null) {
                    stringBuilder.append(line);
                }
            }

            System.out.println(stringBuilder);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            System.err.println(e.getMessage());
        } finally {
            try {
                IsR.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                BfR.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                OS.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
