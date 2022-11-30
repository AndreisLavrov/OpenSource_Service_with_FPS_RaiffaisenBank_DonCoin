import java.io.IOException;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.net.MalformedURLException;
import org.json.JSONObject;



public class Sub_Payment {
    public static void main (String [] args) {

        // вот эти буковки непонятные - ID подписки
        String urlAddress = "https://pay-test.raif.ru/api/sbp/v1/subscriptions/271c35aae60449fc945433ab34be33ce/orders";
        URL url;
        HttpURLConnection httpURLConnection;
        OutputStream OS = null;
        InputStreamReader IsR = null;
        BufferedReader BfR = null;
        StringBuilder stringBuilder = new StringBuilder();


        try {
            JSONObject json = new JSONObject();

            json.put("additionalInfo", "test: add. info");
            json.put("amount", 12399);
            json.put("currency", "RUB");

            byte [] out = json.toString().getBytes();

            url = new URL(urlAddress);
            httpURLConnection = (HttpURLConnection)url.openConnection();
            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);

            httpURLConnection.setRequestProperty("Content-Type", "application/json; utf-8");
            httpURLConnection.setRequestProperty("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNQTk5OTQzOCIsImp0aSI6ImY5ZjZjZDdhLTViZjEtNGZmNi1iMDM0LWJjZmE2MDJhMTJlZiJ9.r63U-YW2EpyCPWLF8N7wCI9JhBGBXQO5xQsg4U7s2tQ");
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
