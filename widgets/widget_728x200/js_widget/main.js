async function getQR(amount) {

  const order = crypto.randomUUID();
  const url = 'https://pay-test.raif.ru/api/sbp/v2/qrs';

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify ({
    order,
    amount: amount,
    qrType: 'QRDynamic',
    sbpMerchantId: 'MA999438',
  }),
});
const data = await response.json();
const qrImg = document.getElementById('widget');
qrImg.src = data.qrUrl;

sessionStorage.removeItem("qrId");
sessionStorage.setItem("qrId", data.qrId);

let intervalID;
intervalID = setInterval(() => {
  getStatus();
  if (sessionStorage.qrStatus === "PAID") {
    clearInterval(intervalID);
  } 
}, 1000);
}

document.getElementById('make-donation1').addEventListener('click', () => getQR(100));
document.getElementById('make-donation2').addEventListener('click', () => getQR(300));





let orders = [];

function addAmount(ev) {
  ev.preventDefault(); // to stop the form submitting
  let total = {
    order: crypto.randomUUID(),
    amount: document.getElementById("input").value,
    id: crypto.randomUUID(),
  };
  orders.push(total);
  document.forms[0].reset(); // to clear the form for the next entries

  // Clear local storage before adding new order
  sessionStorage.removeItem("MyOrders");

  sessionStorage.setItem("MyOrders", JSON.stringify(orders));

  // location.reload();
  
}

document.getElementById("input").addEventListener("change", addAmount);
// document.getElementById("input").onblur = addAmount;

async function postData(url = "https://pay-test.raif.ru/api/sbp/v2/qrs") {
  // Retrieve orders from local storage
  let orders = JSON.parse(sessionStorage.getItem("MyOrders")) || [];

  // Iterate over each order
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];

    // Post the order to the API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors", // no-cors, cors, same-origin
      cache: "no-cache", // default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, omit
      redirect: "follow", // manual, follow, error
      referrerPolicy: "no-referrer", // no-referrer, client
      body: JSON.stringify({
        'order': order.order,
        'amount': order.amount,
        'subscription': {
          'stringId': order.id,
          'subscriptionPurpose': 'на помощь котикам',
        },
        'qrType': 'QRDynamic',
        'sbpMerchantId': 'MA999438',
      }), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    const qrImg = document.getElementById("widget");
    qrImg.src = data.qrUrl;

    sessionStorage.removeItem("qrId");
    sessionStorage.setItem("qrId", data.qrId);

    }
    let intervalID;
    intervalID = setInterval(() => {
      getStatus();
      if (sessionStorage.qrStatus === "PAID") {
        clearInterval(intervalID);
      } 
    }, 1000);
}

postData();


async function getStatus(url = "https://pay-test.raif.ru/api/sbp/v2/qrs") { 
  // Retrieve qrId from local storage 
  let qrId = sessionStorage.getItem("qrId"); 

  // Check if qrId is defined
  if (qrId) {
    // Get the QR code status from the API 
    const response = await fetch(`${url}/${qrId}`, { 
      method: "GET", 
      headers: { 
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNQTk5OTQzOCIsImp0aSI6IjdmNjUyYTMzLWFlNzEtNDdlYS05ZTEzLTdlNWJkMzE4OTM2MSJ9.RU_RvmsXjc9PzH8073lcifmIrl4w3xShzWq4AkKEU_g", 
      }, 
      mode: "cors", // no-cors, cors, same-origin 
      cache: "no-cache", // default, no-cache, reload, force-cache, only-if-cached 
      credentials: "same-origin", // include, same-origin, omit 
      redirect: "follow", // manual, follow, error 
      referrerPolicy: "no-referrer", // no-referrer, 
    }); 
       
    const data = await response.json(); 
   
    const qrStatus = data.qrStatus;

    sessionStorage.setItem("qrStatus", qrStatus);

    let notificationShown = sessionStorage.getItem("notificationShown");

    if (qrStatus === "PAID" && !notificationShown) {
      // Show a notification that the QR code has been paid
      Swal.fire({
        text: 'The payment was processed successfully.',
        icon: 'success',
        position: 'top-left',
        showConfirmButton: false,
        timer: '5000',
        timerProgressBar: 'true',
        customClass: {
          container: 'swal2-no-padding-top swal2-no-padding-left',
          popup: 'swal2-height-200 swal2-width-728',
          actions: 'swal2-actions-custom',
          icon: 'swal2-alert=icon',
          confirmButton: 'swal2-confirm-button-custom',
          success: 'swal2-success-custom',
          footer: 'swal2-footer-custom'
        }
      });
      sessionStorage.setItem("notificationShown", true);

      const qrImg = document.getElementById("widget");
      qrImg.src = "./img/charity_2.png";
    }
}
}

sessionStorage.clear();

