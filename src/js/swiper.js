import Swiper, { Navigation, Pagination, Controller, Thumbs, Autoplay } from "swiper"

function buildSliders(enableZoom = false) {
    document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)').forEach((slider) => {
        slider.parentElement.classList.add("swiper")
        slider.classList.add("swiper-wrapper")
        Array.prototype.forEach.call(slider.children, (el) => el.classList.add("swiper-slide"))
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
            slideCountEl = document.querySelector(".main-block__pagination-last-page-num")
            changePageIndex(this)
        },
        slideChange: function () {
            changePageIndex(this)
            document
                .querySelectorAll(".swiper-pagination-bullet")
                .forEach((el) => el.classList.remove("swiper-pagination-bullet-active"))
            const activeSlide = document.querySelector(
                ".swiper-pagination-bullet:nth-of-type(" + (this.realIndex + 1) + ")"
            )
            if (activeSlide) activeSlide.classList.add("swiper-pagination-bullet-active")
        },
    },
    loop: true,
}

export function initSliders() {
    const mainSlider = document.querySelector(".first-screen__slider")
    const thumbsSlider = document.querySelector(".first-screen__thumbs-slider")
    if (mainSlider && thumbsSlider) {
        const thumbsOptions = {
            modules: [Controller],
            allowTouchMove: true,
            slidesPerView: 4,
            slidesPerGroup: 1,
            breakpoints: {
                769: {
                    direction: "vertical",
                    spaceBetween: 18,
                },
                601: {
                    direction: "vertical",
                    spaceBetween: 10,
                },
                500: {
                    direction: "horizontal",
                    spaceBetween: 10,
                },
                320: {
                    direction: "horizontal",
                    spaceBetween: 7,
                },
            },
            observer: true,
            observeParents: true,
            loop: true,
            loopedSlides: 6,
        }
        let thumbs = new Swiper(thumbsSlider, thumbsOptions)
        const mainOptions = {
            modules: [Thumbs, Controller, Autoplay],
            // allowTouchMove: true,
            // autoplay: true,
            observer: true,
            observeParents: true,
            resizeObserver: true,
            updateOnWindowResize: true,
            loop: true,
            slidesPerView: 1,
            loopedSlides: 6,
            thumbs: {
                swiper: thumbs,
            },
        }
        let main = new Swiper(mainSlider, mainOptions)
        main.controller.control = thumbs
        //   thumbs.controller.control = main

        let prevWidth = window.innerWidth
        function reinit() {
            console.log("reinit! ", prevWidth, window.innerWidth)
            // main.destroy()
            // thumbs.destroy()
            thumbs = new Swiper(thumbsSlider, thumbsOptions)
            main = new Swiper(mainSlider, mainOptions)
            main.controller.control = thumbs
        }
        window.addEventListener("resize", (e) => {
            if (window.innerWidth <= 600 && prevWidth > 600) {
                reinit()
            } else if (window.innerWidth > 600 && prevWidth <= 600) {
                reinit()
            }
            prevWidth = window.innerWidth
        })
    }
}
