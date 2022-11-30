import java.io.IOException;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.net.MalformedURLException;
import org.json.JSONObject;



public class Sub_QR_Generator {
    public static void main (String [] args) {

        String urlAddress = "https://pay-test.raif.ru/api/sbp/v1/subscriptions";
        URL url;
        HttpURLConnection httpURLConnection;
        OutputStream OS = null;
        InputStreamReader IsR = null;
        BufferedReader BfR = null;
        StringBuilder stringBuilder = new StringBuilder();


        try {
            JSONObject json = new JSONObject();

            // ID подписки на стороне партнёра
            json.put("id", "0a3509c9-1ff6-4a47-839e-a68964daa2b6");

            // Описание подписки которое увидит клиент в приложении банка
            json.put("subscriptionPurpose", "Тестовая подписка");

            // Ссылка, куда которой клиента вернет после оплаты
            json.put("redirectUrl", "https://doncoin.netlify.app");
            json.put("sbpMerchantId", "MA999438");

            byte [] out = json.toString().getBytes();

            url = new URL(urlAddress);
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
