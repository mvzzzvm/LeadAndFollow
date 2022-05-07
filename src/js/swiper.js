import Swiper, { Navigation, Pagination, Controller, Thumbs } from "swiper"

function buildSliders(enableZoom = false) {
   document
      .querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)')
      .forEach((slider) => {
         slider.parentElement.classList.add("swiper")
         slider.classList.add("swiper-wrapper")
         Array.prototype.forEach.call(slider.children, (el) =>
            el.classList.add("swiper-slide")
         )
      })
}

const mainSwiperOptions = {
   pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      // type: "custom",
      // renderCustom: renderCustom,
      //
   },
   // parallax: true,
   // width: defaultSliderWidth,
   spaceBetween: 30,
   on: {
      init: function () {
         slideCountEl = document.querySelector(
            ".main-block__pagination-last-page-num"
         )
         changePageIndex(this)
      },
      slideChange: function () {
         changePageIndex(this)
         document
            .querySelectorAll(".swiper-pagination-bullet")
            .forEach((el) =>
               el.classList.remove("swiper-pagination-bullet-active")
            )
         const activeSlide = document.querySelector(
            ".swiper-pagination-bullet:nth-of-type(" +
               (this.realIndex + 1) +
               ")"
         )
         if (activeSlide)
            activeSlide.classList.add("swiper-pagination-bullet-active")
      },
   },
   loop: true,
}

export function initSliders() {
   //   buildSliders();
   document.querySelectorAll(".suit__slider").forEach(
      (slide) =>
         new Swiper(slide, {
            modules: [Navigation, Pagination, Controller],
            allowTouchMove: true,
            navigation: {
               nextEl: ".suit__slider .swiper-button-next",
               prevEl: ".suit__slider .swiper-button-prev",
            },
            observer: true,
            observeParents: true,
         })
   )

   const mainSlider = document.querySelector(".main-slider")
   const thumbsSlider = document.querySelector(".thumbs-slider")
   if (mainSlider && thumbsSlider) {
      const thumbs = new Swiper(thumbsSlider, {
         modules: [Navigation, Pagination, Controller],
         allowTouchMove: true,
         slidesPerView: 2,
         slidesPerGroup: 1,
         spaceBetween: 30,
         direction: "horizontal",
         breakpoints: {
            320: {
               direction: "horizontal",
               spaceBetween: 15,
            },
            840: {
               direction: "vertical",
               spaceBetween: 20,
            },
            1200: {
               direction: "horizontal",
            },
         },
         observer: true,
         observeParents: true,
      })
      const mainOptions = {
         modules: [Thumbs, Navigation, Pagination, Controller],
         // allowTouchMove: true,
         observer: true,
         observeParents: true,
         resizeObserver: true,
         updateOnWindowResize: true,
         loop: true,
         slidesPerView: "auto",
         spaceBetween: 20,
         navigation: {
            nextEl: ".gallery .swiper-button-next",
            prevEl: ".gallery .swiper-button-prev",
         },
         pagination: {
            type: "fraction",
            el: ".gallery .swiper-pagination",
         },
         thumbs: {
            swiper: thumbs,
         },
         breakpoints: {
            870: {
               //  slidesPerView: 1,
            },
         },
      }
      let main = new Swiper(mainSlider, mainOptions)
   }
   const test = document.querySelector(".test-slider")
   if (test) {
      const ts = new Swiper(test, {
         spaceBetween: 30,
      })
   }

   const header = document.querySelector(".gallery__header")
   const mainSwiper = document.querySelector(".main-slider")
   const thumbsSwiper = document.querySelector(".thumbs-slider")
   const navigation = document.querySelector(".swiper-navigation")
   const controls = document.querySelector(".swiper-controls")
   const pagination = document.querySelector(".swiper-pagination")
   //  let position =
   // controls.closest(".thumbs-slider") === null ? "main" : "thumbs"
   let position
   function moveControls() {
      if (document.documentElement.offsetWidth <= 870) {
         if (position !== "header") {
            console.log("to header")
            header.insertAdjacentElement("beforeend", pagination)
            position = "header"
         }
      } else if (document.documentElement.offsetWidth <= 1200) {
         if (position !== "main") {
            console.log("thumbs to navigation")
            navigation
               .querySelector(".swiper-button-prev")
               .insertAdjacentElement("afterend", pagination)
            position = "main"
         }
      } else {
         if (position !== "thumbs") {
            console.log("main to thumbs")
            controls.insertAdjacentElement("afterbegin", pagination)
            position = "thumbs"
         }
      }
   }
   moveControls()
   window.addEventListener("resize", moveControls)
}
// document.addEventListener("DOMContentLoaded", function () {
//   initSliders();
// });
