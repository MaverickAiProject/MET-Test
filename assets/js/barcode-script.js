document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("text");
  const formatSelect = document.getElementById("format");
  const widthInput = document.getElementById("width");
  const heightInput = document.getElementById("height");
  const barcodeElement = document.getElementById("barcode");
  const downloadSvgBtn = document.getElementById("download-svg");
  const downloadPngBtn = document.getElementById("download-png");

  function generateBarcode() {
    try {
      JsBarcode("#barcode", textInput.value, {
        format: formatSelect.value,
        width: Number(widthInput.value),
        height: Number(heightInput.value),
        displayValue: true,
        font: "Inter",
        fontSize: 16,
        margin: 10,
      });
    } catch (e) {
      console.error("Invalid barcode value");
    }
  }

  function downloadSvg() {
    const svgData = new XMLSerializer().serializeToString(barcodeElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(svgBlob);
    link.download = "barcode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadPng() {
    const svgData = new XMLSerializer().serializeToString(barcodeElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "barcode.png";
      link.href = pngFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  }

  // Generate initial barcode
  generateBarcode();

  // Add event listeners
  textInput.addEventListener("input", generateBarcode);
  formatSelect.addEventListener("change", generateBarcode);
  widthInput.addEventListener("input", generateBarcode);
  heightInput.addEventListener("input", generateBarcode);
  downloadSvgBtn.addEventListener("click", downloadSvg);
  downloadPngBtn.addEventListener("click", downloadPng);
});
