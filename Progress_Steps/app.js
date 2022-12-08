// Get elements
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const boxes = document.querySelectorAll(".prog .box");
const dataProg = document.querySelector(".data-prog");

let count = 1;

nextBtn.addEventListener("click", () => {
  count++;

  if (count > boxes.length) {
    count = boxes.length;
  }

  progress();
});

prevBtn.addEventListener("click", () => {
  count--;

  if (count < 1) {
    count = 1;
  }

  progress();
});

const progress = () => {
  boxes.forEach((box, i) => {
    if (i < count) {
      box.classList.add("active");
    } else {
      box.classList.remove("active");
    }
  });

  actives = document.querySelectorAll(".active");
  dataProg.style.width = `${
    ((actives.length - 1) / (boxes.length - 1)) * 100
  }%`;

  if (count == 1) {
    prevBtn.disabled = true;
  } else if (count === boxes.length) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }
};
