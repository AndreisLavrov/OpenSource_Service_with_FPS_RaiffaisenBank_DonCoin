// let orders = [];

// function addAmount(ev) {
//   ev.preventDefault(); // to stop the form submitting
//   let total = {
//     order: crypto.randomUUID(),
//     amount: document.getElementById("input").value,
//   };
//   orders.push(total);
//   document.forms[0].reset(); // to clear the form for the next entries

//   // Clear local storage before adding new order
//   localStorage.removeItem("MyOrders");

//   localStorage.setItem("MyOrders", JSON.stringify(orders));

//   location.reload();
// }

// document.getElementById("input").onblur = addAmount;

// async function postData(url = "https://pay-test.raif.ru/api/sbp/v2/qrs") {
//   // Retrieve orders from local storage
//   let orders = JSON.parse(localStorage.getItem("MyOrders")) || [];

//   // Iterate over each order
//   for (let i = 0; i < orders.length; i++) {
//     let order = orders[i];

//     // Post the order to the API
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       mode: "cors", // no-cors, cors, same-origin
//       cache: "no-cache", // default, no-cache, reload, force-cache, only-if-cached
//       credentials: "same-origin", // include, same-origin, omit
//       redirect: "follow", // manual, follow, error
//       referrerPolicy: "no-referrer", // no-referrer, client
//       body: JSON.stringify({
//         'order': order.order,
//         'amount': order.amount,
//         'qrType': 'QRDynamic',
//         'sbpMerchantId': 'MA999438',
//       }), // body data type must match "Content-Type" header
//     });
//     const data = await response.json();
//     console.log(data.qrUrl);
//     const qrImg = document.getElementById("widget");
//     qrImg.src = data.qrUrl;
//     console.log(data.qrId);
//   }
// }

// postData();

// /* ========================================== */


let orders = [];

function addAmount(ev) {
  ev.preventDefault(); // to stop the form submitting
  let total = {
    order: crypto.randomUUID(),
    amount: document.getElementById("input").value,
    id: crypto.randomUUID(),
  };
  // console.log("User entered amount: ", total.amount);
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
      Swal.fire({
        text: 'The payment was processed successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: '5000',
        timerProgressBar: 'true',
        showConfirmButton: false,
        position: 'top-left',
        customClass: {
          container: 'swal2-no-padding-top swal2-no-padding-left',
          popup: 'swal2-height-300'
        }
      });    
      sessionStorage.setItem("notificationShown", true);

      const qrImg = document.getElementById("widget");
      qrImg.src = "./img/charity_2.png";
  } 
}
}

localStorage.clear();
sessionStorage.clear();


// Get the current URL
const currentUrl = new URL(window.location.href);

// Get the search params from the URL
const searchParams = new URLSearchParams(currentUrl.search);

// Get the values of the 'header', 'description', and 'button_color' parameters
const header = searchParams.get('header');
const description = searchParams.get('description');
const buttonColor = searchParams.get('button_color');

if (header || description || buttonColor) {
  const data = {
    header,
    description,
    buttonColor
  };
  sessionStorage.setItem('widget_data', JSON.stringify(data));
}

const storedData = JSON.parse(sessionStorage.getItem('widget_data'));
if (storedData) {
  if (storedData.header) {
    const demoHeader = document.querySelector('#widget-title');
    demoHeader.textContent = storedData.header;
  }

  if (storedData.description) {
    const demoDescription = document.querySelector('#widget-description');
    demoDescription.textContent = storedData.description;
  }

  if (storedData.buttonColor) {
    const myButton = document.getElementById("input");
    myButton.style.backgroundColor = storedData.buttonColor;
  }
}