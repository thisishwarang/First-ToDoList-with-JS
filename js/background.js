const images = [
    "01.jpg",
    "02.jpg",
    "03.jpg"
];
const BG = "background"

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.className = BG;
bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);