const textElement = document.getElementById("text");
const textToType = "I'm Azhar Andrian";
let index = 0;

function typeText() {
  textElement.textContent += textToType.charAt(index);
  index++;

  if (index < textToType.length) {
    setTimeout(typeText, 100); // Waktu jeda antara setiap karakter
  }
  else {
    setTimeout(eraseText, 1000); // Waktu jeda setelah teks selesai diketik
  }
}

function eraseText() {
    const currentText = textElement.textContent;
    if (currentText.length > 0) {
      textElement.textContent = currentText.slice(0, -1);
      setTimeout(eraseText, 100); // Waktu jeda antara penghapusan karakter
    } else {
      index = 0;
      setTimeout(typeText, 800); // Waktu jeda sebelum animasi mengetik dimulai lagi
    }
  }

typeText(); // Mulai animasi saat halaman dimuat


/*let number = document.getElementById("number");
let counter = 0;
setInterval(() => {
  if(counter == 79) {
      clearInterval();
  }
  else  {
    counter += 1;
    number.innerHTML = counter + "%";
  }
}, 20);*/

//navbar fixed
window.onscroll =function () {  
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  
  if (window.pageYOffset > fixedNav) {
      header.classList.add("navbar-fixed");
  } else {
      header.classList.remove("navbar-fixed");
  }
  };
  
  //hamburger
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");
  
  hamburger.addEventListener("click", function () {
   hamburger.classList.toggle("hamburger-active");
   navMenu.classList.toggle("hidden");
  });



// foto
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 100 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth,);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);