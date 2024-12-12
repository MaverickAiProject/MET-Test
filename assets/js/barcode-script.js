"use strict";

let wrapper = document.getElementById("barcode-wrapper");
let canvas = document.getElementById("hidden-barcode");
let productDataString = document.getElementById("dataString");
let productPrice = document.getElementById("productPrice");
let productCount = document.getElementById("totallevels");
let submitbButton = document.getElementById("submitData");

//Dynamicly created DOM elements
let span = document.createElement("span");
span.setAttribute("class", "barcodePrice");
let img = document.createElement("img");
img.setAttribute("class", "barcode");
let priceImgWrapper = document.createElement("div");
priceImgWrapper.setAttribute("class", "priceImgWrapper");


//Dynamic DOM element selectors
let genButton = document.getElementById("gen");
let generated = false;

//Function to generate a barcode barcode DOM tree virtually
const generateBarcodes = () => {
generated = true;
let barcodeSet = [];
wrapper.innerHTML = "";
let price = Number(productPrice.value);
span.innerHTML = "Rs." + price.toFixed(2);
JsBarcode(img, productDataString.value,
  { font: "sans-serif", margin: 20,textMargin: 10,fontOptions: "bold",
    textAlign: "center",fontSize:35
  });

//Create the barcode DOM structure
priceImgWrapper.appendChild(span);
priceImgWrapper.appendChild(img);

let rowCount = 0;
let maxRows = 40;

//Loop append the barcodeDOM the right amount of times to the array
for (let i = 0; i < productCount.value; i++) {
if (rowCount == maxRows) {
  let pageSplit = document.createElement("div");
  pageSplit.setAttribute("class", "html2pdf__page-break");
  wrapper.appendChild(pageSplit);
  rowCount = 0;
}

let newBarcode = priceImgWrapper.cloneNode(true);
newBarcode.setAttribute("id", "barcode_" + [i]);
barcodeSet.push(newBarcode);

//Append barcode to DOM
wrapper.appendChild(newBarcode);
rowCount++;
console.log(rowCount);
}

return barcodeSet;
};

//Function to create PDF File

const generatePDF = (elementToPdf, position) => {
let theMargin;
switch (position) {
  case "left":
    theMargin = [15, 15, 15, 15];
    break;
  case "center":
    theMargin = [15, 70, 15, 70];
    break;
  case "right":
    theMargin = [15, 125, 15, 15];
    break;
}
var element = document.getElementById(elementToPdf);
html2pdf(element, {
  margin: theMargin,
  filename: "barcodes.pdf",
  jsPDF: { unit: "pt", orientation: "portrait", format: "a4" }
});
};

//Function to generate Barcode
submitbButton.addEventListener("click", () => {
let fields = ["Product Code", "Product Price", "Sticker Quantity"];
let i,
l = fields.length;
let fieldname;
let x = document.forms["inputForm"]["Product Price"].value;
let y = document.forms["inputForm"]["Sticker Quantity"].value;

let errorField = document.getElementById("error-message");
let nanError = document.getElementById("nan-error");

for (i = 0; i < l; i++) {
fieldname = fields[i];
if (document.forms["inputForm"][fieldname].value === "") {
  errorField.innerHTML = fieldname + " can not be empty";
  errorField.style.display = "block";

  setTimeout(() => {
    errorField.style.display = "none";
  }, 3000);

  return false;
}
}
if (isNaN(x)) {
errorField.innerHTML = "Product Price must be a number";
errorField.style.display = "block";
setTimeout(() => {
  errorField.style.display = "none";
}, 3000);
return false;
}
if (isNaN(y)) {
errorField.innerHTML = "Sticker Quantity must be a number";
errorField.style.display = "block";
setTimeout(() => {
  errorField.style.display = "none";
}, 3000);
return false;
}
if (document.forms["inputForm"]["Sticker Quantity"].value > 100) {
nanError.style.display = "block";

setTimeout(() => {
  nanError.style.display = "none";
}, 6000);
} else {
let barcodes = generateBarcodes();
console.log(barcodes);
}

createPDF.addEventListener("click", () => { 
if(generated==true) {
generatePDF("barcode-wrapper", "center");

}
else {
errorField.innerHTML = "Generate Sticker to create PDF";
errorField.style.display = "block";

setTimeout(() => {
  errorField.style.display = "none";
}, 6000);

return false;
}
wrapper.innerHTML = "";
generated = false;
});

resetBarcodes.addEventListener("click", () => {
wrapper.innerHTML = "";
document.getElementById("codeForm").reset();
});
});

