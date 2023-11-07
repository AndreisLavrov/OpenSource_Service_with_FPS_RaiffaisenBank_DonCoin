const buttonColorPicker = document.getElementById("button-color-picker");
const myButton = document.getElementById("myButton");

buttonColorPicker.addEventListener("input", function() {
  myButton.style.backgroundColor = buttonColorPicker.value;
});

const demoHeader = document.querySelector('#demo-box-header-text');
const demoDescription = document.querySelector('#demo-box-description-text');

const headerInput = document.querySelector('#header-widget');
const descriptionInput = document.querySelector('#description-widget');

headerInput.addEventListener('input', () => {
  demoHeader.textContent = headerInput.value;
  updateUrl();
});

descriptionInput.addEventListener('input', () => {
  demoDescription.textContent = descriptionInput.value;
  updateUrl();
});

function getData() {
  const header = document.querySelector('#header-widget').value;
  const description = document.querySelector('#description-widget').value;
  const buttonColor = document.querySelector('#button-color-picker').value;

  const data = {
    header,
    description,
    buttonColor
  };

  sessionStorage.setItem('widget_data', JSON.stringify(data));

  return data;
}

function updateUrl() {
  const data = getData();
  const base64Data = btoa(JSON.stringify(data));
  
  let currentUrl = window.location.href;
  let url = new URL(currentUrl);
  let searchParams = url.searchParams;

  searchParams.set("header", data.header);
  searchParams.set("description", data.description);
  searchParams.set("button_color", data.buttonColor);
  searchParams.set("public_key", base64Data);
  url.search = searchParams.toString();
  const newUrl = url.toString();
  window.history.pushState({ path: newUrl }, '', newUrl);

  updateIframeSrc();
}

function updateIframeSrc() {
  const storedData = JSON.parse(sessionStorage.getItem('widget_data'));
  const header = encodeURIComponent(storedData.header);
  const description = encodeURIComponent(storedData.description);
  const buttonColor = encodeURIComponent(storedData.buttonColor);

  const iframeSrc = `https://donwidgetsmall.doncoin.site/?header=${header}&description=${description}&button_color=${buttonColor}`;

  const iframe = document.querySelector('.widget-iframe-img');
  iframe.src = iframeSrc;
  
  const urlElement = document.getElementById("my-url");
  urlElement.textContent = `"${iframeSrc}"`;
}

buttonColorPicker.addEventListener('input', updateUrl);

updateIframeSrc();

/* Copy code of widget new button */

function CopyToClipboard(containerid) {
	console.log(document.selection)
	console.log(window.getSelection)
	
  if (document.selection) { 
	  var range = document.body.createTextRange();
	  range.moveToElementText(document.getElementById(containerid));
	  range.select().createTextRange();
	  document.execCommand("copy"); 
  
  } else if (window.getSelection) {
	  var range = document.createRange();
	   range.selectNode(document.getElementById(containerid));
	   window.getSelection().addRange(range);
	   document.execCommand("copy");
	   alert("Code copied") 
  }}