const titles = document.querySelectorAll(".title");
const root = document.querySelector(":root");
const middleCircle = document.getElementById("middle");
const innerCircle = document.getElementById("inner");
const nextButton = document.getElementById("nextButton");

const images = [
  {
    url:
      "https://imagizer.imageshack.com/img923/8792/SpcGJc.jpg",
    name: "E ai bonita"
  },
  {
    url:
      "https://imagizer.imageshack.com/img922/5325/FdHjNk.jpg",
    name: "Fiz isso aqui"
  },
  {
    url: "https://imagizer.imageshack.com/img924/5707/sy0d5N.jpg",
    name: "Pra dizer"
  },
  {
    url: "https://imagizer.imageshack.com/img923/8876/3VxYJS.jpg",
    name: "Que sinto sua falta"
  },
  {
    url: "https://imagizer.imageshack.com/img923/3237/8zHLtO.jpg",
    name: "Bj te amor"
  }
];
let currentIndex = 0;

function changeElements(isFirstRender = false) {
  if (!isFirstRender) currentIndex++;
  const curImage = images[currentIndex % images.length];
  const nextImage = images[(currentIndex + 1) % images.length];
  nextButton.setAttribute("disabled", true);

  const changeTitles = () => {
    titles[0].textContent = curImage.name;
    titles[1].textContent = nextImage.name;
  };

  const changeImages = () => {
    root.style.setProperty("--image-1", `url(${curImage.url})`);
    root.style.setProperty("--image-2", `url(${nextImage.url})`);
  };

  if (!isFirstRender) {
    runTextAnimations(changeTitles);
    runSpinAnimations(changeImages);
  } else {
    nextButton.removeAttribute("disabled");
    changeImages();
    changeTitles();
  }
  recalculateImagePosition();
}

function runTextAnimations(endCallback) {
  const animationTimeInMs = 550;
  titles[0].classList.add("active");
  titles[1].classList.add("active");

  setTimeout(() => {
    endCallback();
    titles[0].classList.remove("active");
    titles[1].classList.remove("active");
  }, animationTimeInMs);
}

function runSpinAnimations(middleCallback) {
  const animationTimeInMs = 2000;
  const firstCircleSpin = 1300;
  outer.classList.add("active");
  root.style.setProperty("--after-opacity", "0");
  root.style.setProperty("--before-opacity", "1");

  setTimeout(() => {
    middleCallback();
    root.style.setProperty("--after-opacity", "1");
    root.style.setProperty("--before-opacity", "0");
  }, firstCircleSpin / 2);

  setTimeout(() => {
    outer.classList.remove("active");
    nextButton.removeAttribute("disabled");
  }, animationTimeInMs);
}

function recalculateImagePosition() {
  const middleBounds = middle.getBoundingClientRect();
  root.style.setProperty(
    "--middle-position",
    `-${middleBounds.left}px -${middleBounds.top}px`
  );
  const innerBounds = inner.getBoundingClientRect();
  root.style.setProperty(
    "--inner-position",
    `-${innerBounds.left}px -${innerBounds.top}px`
  );
}

window.addEventListener("resize", recalculateImagePosition);

nextButton.addEventListener("click", () => changeElements());

changeElements(true);
