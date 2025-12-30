
// 1. MODEL - variabilele globale
let canvas, context;
let imagine = null;

let selectie = null;
let esteMouseDownSelectie = false;
let xStart = 0, yStart = 0;
let esteMutare = false;
let xMutare = 0, yMutare = 0;

// 2. AFISARE - functii pentru desenare si afisare date
// Calculeaza distributia frecventelor de luminanta pentru zona selectata
function calculeazaHistograma() {
  if (!selectie) return;

  const imgData = context.getImageData(selectie.x, selectie.y, selectie.w, selectie.h);
  const data = imgData.data;
  const histogram = new Uint32Array(256);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const luminanta = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    histogram[luminanta]++;
  }

  afiseazaHistograma(histogram);
}
// Deseneaza histograma pe canvas-ul dedicat cu coloane colorate
function afiseazaHistograma(histogram) {
  const histogramCanvas = document.querySelector("#histogramCanvas");
  const histogramCtx = histogramCanvas.getContext("2d");

  histogramCtx.fillStyle = "white";
  histogramCtx.fillRect(0, 0, histogramCanvas.width, histogramCanvas.height);

  const maxVal = Math.max(...histogram);
  const barWidth = histogramCanvas.width / 256;

  histogramCtx.fillStyle = "#0078d4";
  for (let i = 0; i < 256; i++) {
    const barHeight = (histogram[i] / maxVal) * histogramCanvas.height;
    histogramCtx.fillRect(i * barWidth, histogramCanvas.height - barHeight, barWidth, barHeight);
  }

  histogramCtx.strokeStyle = "#666";
  histogramCtx.strokeRect(0, 0, histogramCanvas.width, histogramCanvas.height);
}
// Reda imaginea pe canvas si afiseaza selectia cu indicatori de redimensionare
function desenare() {
  if (!imagine) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imagine, 0, 0);
  if (selectie && selectie.w > 0 && selectie.h > 0) {
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.setLineDash([6, 4]);
    context.strokeRect(selectie.x, selectie.y, selectie.w, selectie.h);
    context.setLineDash([]);

    const s = 6;
    context.fillStyle = "red";
    context.fillRect(selectie.x - s / 2, selectie.y - s / 2, s, s);
    context.fillRect(selectie.x + selectie.w - s / 2, selectie.y - s / 2, s, s);
    context.fillRect(selectie.x - s / 2, selectie.y + selectie.h - s / 2, s, s);
    context.fillRect(selectie.x + selectie.w - s / 2, selectie.y + selectie.h - s / 2, s, s);
  }

  calculeazaHistograma();
}
// Incarca imaginea din fisier si o afiseaza pe canvas cu selectie initiala
function incarcareImagine(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", e => {
    imagine = document.createElement("img");
    imagine.src = e.target.result;

    imagine.addEventListener("load", () => {
      canvas.width = imagine.naturalWidth;
      canvas.height = imagine.naturalHeight;

      selectie = {
        x: 0,
        y: 0,
        w: canvas.width,
        h: canvas.height
      };

      document.querySelector("#histogramContainer").style.display = "block";
      document.querySelector("#info").textContent = `Imagine: ${canvas.width}x${canvas.height}px`;

      desenare();
    });
  });
}

// 3. TRATARE EVENIMENTE - event listeners si functii de handling
// Initializeaza o noua selectie sau activeaza mutarea selectiei curente
function mouseDown(e) {
  if (!imagine) return;

  const r = canvas.getBoundingClientRect();
  const x = Math.round(e.clientX - r.left);
  const y = Math.round(e.clientY - r.top);
  if (e.shiftKey && selectie &&
    x >= selectie.x && x <= selectie.x + selectie.w &&
    y >= selectie.y && y <= selectie.y + selectie.h) {
    esteMutare = true;
    xMutare = x;
    yMutare = y;
    return;
  }

  xStart = x;
  yStart = y;
  selectie = { x: xStart, y: yStart, w: 0, h: 0 };
  esteMouseDownSelectie = true;
}
// Actualizeaza dimensiunile selectiei sau muta selectia in timp real
function mouseMove(e) {
  if (!imagine) return;

  const r = canvas.getBoundingClientRect();
  const x = Math.round(e.clientX - r.left);
  const y = Math.round(e.clientY - r.top);
  if (esteMutare) {
    const dx = x - xMutare;
    const dy = y - yMutare;

    selectie.x += dx;
    selectie.y += dy;

    if (selectie.x < 0) selectie.x = 0;
    if (selectie.y < 0) selectie.y = 0;
    if (selectie.x + selectie.w > canvas.width) selectie.x = canvas.width - selectie.w;
    if (selectie.y + selectie.h > canvas.height) selectie.y = canvas.height - selectie.h;

    xMutare = x;
    yMutare = y;

    desenare();
    return;
  }

  if (!esteMouseDownSelectie) return;

  selectie.w = Math.round(x - xStart);
  selectie.h = Math.round(y - yStart);

  desenare();
}
// Finalizeaza selectia si corecteaza dimensiunile daca sunt negative
function mouseUp() {
  esteMutare = false;
  esteMouseDownSelectie = false;

  if (!selectie) return;
  if (selectie.w < 0) {
    selectie.x += selectie.w;
    selectie.w *= -1;
  }
  if (selectie.h < 0) {
    selectie.y += selectie.h;
    selectie.h *= -1;
  }

  desenare();
}
// Decupeaza zona selectata si o face noua imagine editabila
function crop() {
  if (!selectie || !imagine) return;

  const imgData = context.getImageData(selectie.x, selectie.y, selectie.w, selectie.h);

  canvas.width = selectie.w;
  canvas.height = selectie.h;

  context.putImageData(imgData, 0, 0);

  imagine = document.createElement("img");
  imagine.src = canvas.toDataURL();

  selectie = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height
  };

  document.querySelector("#info").textContent = `Imagine decupata: ${canvas.width}x${canvas.height}px`;
}
// Umple zona selectata cu culoare alba si o elimina din imagine
function stergeSelectie() {
  if (!selectie) return;

  context.fillStyle = "white";
  context.fillRect(selectie.x, selectie.y, selectie.w, selectie.h);

  imagine = document.createElement("img");
  imagine.src = canvas.toDataURL();
  imagine.addEventListener("load", () => {
    desenare();
  });
}
// Aplica efectul selectat (greyscale, sepia, invert, blur) pe selectie
function aplicaEfect() {
  if (!selectie || selectie.w <= 0 || selectie.h <= 0) {
    alert("Selecteaza o zona pe imagine!");
    return;
  }

  const efectTipul = document.querySelector("#efectSelect").value;
  let img = context.getImageData(selectie.x, selectie.y, selectie.w, selectie.h);
  let v = img.data;
  if (efectTipul === "greyscale") {
    for (let i = 0; i < v.length; i += 4) {

      let g = v[i] * 0.299 + v[i + 1] * 0.587 + v[i + 2] * 0.114;
      v[i] = v[i + 1] = v[i + 2] = g;
    }
  }
  else if (efectTipul === "sepia") {
    for (let i = 0; i < v.length; i += 4) {
      let r = v[i], g = v[i + 1], b = v[i + 2];
      v[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      v[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      v[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
  }
  else if (efectTipul === "invert") {
    for (let i = 0; i < v.length; i += 4) {
      v[i] = 255 - v[i];
      v[i + 1] = 255 - v[i + 1];
      v[i + 2] = 255 - v[i + 2];
    }
  }
  else if (efectTipul === "blur") {
    aplicaBlur(img);
  }

  context.putImageData(img, selectie.x, selectie.y);

  imagine = document.createElement("img");
  imagine.src = canvas.toDataURL();
  imagine.addEventListener("load", () => {
    desenare();
  });
}
// Aplica efect de blur gaussian cu kernel 5x5 pe datele pixelilor
function aplicaBlur(imgData) {
  const data = imgData.data;
  const w = selectie.w;
  const h = selectie.h;

  const temp = new Uint8ClampedArray(data);

  const radius = 2;
  const kernel = [];
  let sum = 0;

  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      const val = Math.exp(-(x * x + y * y) / (2 * radius * radius));
      kernel.push(val);
      sum += val;
    }
  }

  for (let i = 0; i < kernel.length; i++) {
    kernel[i] /= sum;
  }

  for (let y = radius; y < h - radius; y++) {
    for (let x = radius; x < w - radius; x++) {
      let r = 0, g = 0, b = 0;
      let idx = 0;

      for (let ky = -radius; ky <= radius; ky++) {
        for (let kx = -radius; kx <= radius; kx++) {
          const pos = ((y + ky) * w + (x + kx)) * 4;
          r += temp[pos] * kernel[idx];
          g += temp[pos + 1] * kernel[idx];
          b += temp[pos + 2] * kernel[idx];
          idx++;
        }
      }

      const pos = (y * w + x) * 4;
      data[pos] = r;
      data[pos + 1] = g;
      data[pos + 2] = b;
    }
  }
}
// Scaleaza imaginea mentinand proportiile pe baza latimii sau inaltimii
function scalareImagine() {
  if (!imagine) return;

  const latimeNoua = parseInt(document.querySelector("#inputLatime").value) || null;
  const inaltimeNoua = parseInt(document.querySelector("#inputInaltime").value) || null;
  if (!latimeNoua && !inaltimeNoua) {
    alert("Introduceti latimea sau inaltimea!");
    return;
  }

  let w = canvas.width;
  let h = canvas.height;
  let raport = w / h;
  if (latimeNoua) {
    w = latimeNoua;
    h = Math.round(w / raport);
  } else if (inaltimeNoua) {
    h = inaltimeNoua;
    w = Math.round(h * raport);
  }

  const canvasTemp = document.createElement("canvas");
  canvasTemp.width = w;
  canvasTemp.height = h;
  const ctxTemp = canvasTemp.getContext("2d");

  ctxTemp.drawImage(imagine, 0, 0, w, h);

  canvas.width = w;
  canvas.height = h;
  context.drawImage(canvasTemp, 0, 0);

  imagine = document.createElement("img");
  imagine.src = canvas.toDataURL();
  imagine.addEventListener("load", () => {
    selectie = { x: 0, y: 0, w: canvas.width, h: canvas.height };
    document.querySelector("#info").textContent = `Imagine scalata: ${canvas.width}x${canvas.height}px`;
    desenare();
  });

  document.querySelector("#inputLatime").value = "";
  document.querySelector("#inputInaltime").value = "";
}
// Adauga text personalizat in zona selectata cu validare si clipping
function adaugaText() {
  if (!selectie) return;

  const text = document.querySelector("#textInput").value;
  const size = document.querySelector("#textSize").value;
  const culoare = document.querySelector("#textColor").value;
  if (!text) {
    alert("Introduceti textul!");
    return;
  }

  context.font = `${size}px Tahoma`;
  const textMetrics = context.measureText(text);
  const textWidth = textMetrics.width;
  const textHeight = parseInt(size);
  if (textWidth > selectie.w - 10) {
    alert(`Textul este prea mare pentru zona selectata! (${Math.round(textWidth)}px > ${selectie.w - 10}px)`);
    return;
  }
  if (textHeight > selectie.h - 10) {
    alert(`Textul este prea inalt pentru zona selectata! (${textHeight}px > ${selectie.h - 10}px)`);
    return;
  }

  context.save();
  context.beginPath();
  context.rect(selectie.x, selectie.y, selectie.w, selectie.h);
  context.clip();

  context.fillStyle = culoare;
  context.textBaseline = "top";
  context.fillText(text, selectie.x + 5, selectie.y + 5);

  context.restore();

  imagine = document.createElement("img");
  imagine.src = canvas.toDataURL();
  imagine.addEventListener("load", () => {
    desenare();
  });

  document.querySelector("#textInput").value = "";
}
// Descarca imaginea editata ca fisier PNG pe computerul utilizatorului
function salveazaImagine() {
  if (!imagine) {
    alert("Nicio imagine de salvat!");
    return;
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "imagine_editata.png";
  link.click();

  document.querySelector("#info").textContent = "Imagine salvata cu succes!";
}

// 4. INITIALIZARE - configurare aplicatie
// Initializeaza canvas-ul si configureaza toti event listeners-ii pentru aplicatie
function aplicatie() {
  canvas = document.querySelector("#canvas");
  context = canvas.getContext("2d");

  document.querySelector("#fileInput").addEventListener("change", e => {
    if (e.target.files[0]) {
      incarcareImagine(e.target.files[0]);
    }
  });

  canvas.addEventListener("dragover", e => {
    e.preventDefault();
    canvas.style.opacity = "0.7";
  });

  canvas.addEventListener("dragleave", () => {
    canvas.style.opacity = "1";
  });

  canvas.addEventListener("drop", e => {
    e.preventDefault();
    canvas.style.opacity = "1";
    if (e.dataTransfer.files[0]) {
      incarcareImagine(e.dataTransfer.files[0]);
    }
  });

  canvas.addEventListener("mousedown", mouseDown);
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mouseup", mouseUp);
  canvas.addEventListener("mouseleave", mouseUp);

  document.querySelector("#btnCrop").addEventListener("click", crop);
  document.querySelector("#btnSterge").addEventListener("click", stergeSelectie);
  document.querySelector("#btnEfect").addEventListener("click", aplicaEfect);
  document.querySelector("#btnScalare").addEventListener("click", scalareImagine);
  document.querySelector("#btnText").addEventListener("click", adaugaText);
  document.querySelector("#btnSalvare").addEventListener("click", salveazaImagine);
}

document.addEventListener("DOMContentLoaded", aplicatie);
