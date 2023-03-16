const buttonColorPicker = document.getElementById("button-color-picker");
const textColorPicker = document.getElementById("text-color-picker");
const myButton = document.getElementById("myButton");

buttonColorPicker.addEventListener("input", function() {
  myButton.style.backgroundColor = buttonColorPicker.value;
});

textColorPicker.addEventListener("input", function() {
  myButton.style.color = textColorPicker.value;
});

const demoLogo = document.querySelector('.demo-box-logo img');
const demoHeader = document.querySelector('#demo-box-header-text');
const demoDescription = document.querySelector('#demo-box-description-text');

const headerInput = document.querySelector('#header-widget');
const descriptionInput = document.querySelector('#description-widget');
const logoInput = document.querySelector('#logo-widget');


headerInput.addEventListener('input', () => {
  demoHeader.textContent = headerInput.value;
});

descriptionInput.addEventListener('input', () => {
  demoDescription.textContent = descriptionInput.value;
});

logoInput.addEventListener('change', () => {
  const file = logoInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    demoLogo.src = reader.result;
  };
  reader.readAsDataURL(file);
});



function updateUrl() {
  const data = {
    header: headerInput.value,
    description: descriptionInput.value,
    logo: logoInput.value,
    color_of_button: buttonColorPicker.value,
    color_of_text: textColorPicker.value,
    sbpMerchant: sbpMerchantInput.value
  };
  const base64Data = btoa(JSON.stringify(data));
  
  let currentUrl = window.location.href;
  let url = new URL(currentUrl);
  let searchParams = url.searchParams;

  searchParams.set("public_key", base64Data);
  url.search = searchParams.toString();
  const newUrl = url.toString();
  window.history.pushState({ path: newUrl }, '', newUrl);
}

headerInput.addEventListener('input', updateUrl);
descriptionInput.addEventListener('input', updateUrl);
logoInput.addEventListener('change', updateUrl);
buttonColorPicker.addEventListener('input', updateUrl);
textColorPicker.addEventListener('input', updateUrl);
const sbpMerchantInput = document.getElementById("sbpMerchantId");
sbpMerchantInput.addEventListener("input", updateUrl);


