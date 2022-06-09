import Swiper, { Navigation, Pagination, Controller, Thumbs, Autoplay } from "swiper"
// import "swiper/css"

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
    const teachersSliderEl = document.querySelector(".teachers__slider")
    if (teachersSliderEl) {
        const teachersSliderOptions = {
            modules: [Pagination, Navigation],
            allowTouchMove: true,
            spaceBetween: 130,
            loop: true,
            loopedSlides: 2,
            speed: 500,
            autoHeight: true,
            slidesPerView: 1,
            navigation: {
                nextEl: ".teachers__slider .swiper-button-next",
                prevEl: ".teachers__slider .swiper-button-prev",
            },
            pagination: {
                el: ".teachers__container .swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            breakpoints: {
                480: {
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                320: {
                    pagination: {
                        dynamicBullets: true,
                    },
                },
            },
        }
        const teachersSlider = new Swiper(teachersSliderEl, teachersSliderOptions)

        const slides = teachersSliderEl.querySelectorAll(".swiper-slide")
        window.addEventListener("resize", resize)
        let prevWidth = Number.MAX_SAFE_INTEGER
        resize()
        function resize() {
            if (window.innerWidth <= 700 && prevWidth > 700) {
                slides.forEach((slide) => {
                    const name = slide.querySelector(".teacher__name")
                    const image = slide.querySelector(".teacher__image")
                    image.append(name)
                })
            } else if (window.innerWidth > 700 && prevWidth <= 700) {
                slides.forEach((slide) => {
                    const name = slide.querySelector(".teacher__name")
                    const image = slide.querySelector(".teacher__image")
                    const description = slide.querySelector(".teacher__text")
                    description.prepend(name)
                })
            }
            prevWidth = window.innerWidth
        }
    }
    const awardsSliderEl = document.querySelector(".awards__slider")
    if (awardsSliderEl) {
        const awardsSliderOptions = {
            modules: [Pagination, Navigation],
            allowTouchMove: true,
            spaceBetween: 130,
            loop: true,
            loopedSlides: 2,
            speed: 500,
            autoHeight: true,
            slidesPerView: 1,
            navigation: {
                nextEl: ".awards__slider .swiper-button-next",
                prevEl: ".awards__slider .swiper-button-prev",
            },
            pagination: {
                el: ".awards__container .swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            breakpoints: {
                481: {
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                320: {
                    pagination: {
                        dynamicBullets: true,
                    },
                },
            },
        }
        const awardsSlider = new Swiper(awardsSliderEl, awardsSliderOptions)
    }
    // singeNewsSlider()
    singlePageSlider()
}

// deprecated
function singeNewsSlider() {
    const prefix = "._single-page"
    const mainSlider = document.querySelector(prefix + "__main-slider")
    const thumbsSlider = document.querySelector(prefix + "__thumbs-slider")
    if (mainSlider && thumbsSlider) {
        let thumbs = new Swiper(thumbsSlider, thumbsOptions)

        const mainOptions = {
            modules: [Thumbs, Controller, Autoplay, Navigation],
            allowTouchMove: true,
            // autoplay: true,
            observer: true,
            observeParents: true,
            resizeObserver: true,
            updateOnWindowResize: true,
            loop: true,
            slidesPerView: 1,
            loopedSlides: 6,
            spaceBetween: 200,
            breakpoints: {
                1321: {
                    spaceBetween: 150,
                },
            },
            navigation: {
                prevEl: prefix + "__main-slider .swiper-button-prev",
                nextEl: prefix + "__main-slider .swiper-button-next",
            },
            thumbs: {
                swiper: thumbs,
            },
        }
        let main = new Swiper(mainSlider, mainOptions)
        main.controller.control = thumbs
        //   thumbs.controller.control = main
    }
}

function singlePageSlider() {
    const loopedSlides = 6
    const commonOptions = {
        observer: true,
        observeParents: true,
        // allowTouchMove: true,
        loopedSlides: loopedSlides,
    }
    const commonMainOptions = {
        ...commonOptions,
        ...{
            resizeObserver: true,
            updateOnWindowResize: true,
            loop: true,
            slidesPerView: 1,
            loopedSlides: loopedSlides,
            spaceBetween: 200,
            breakpoints: {
                1321: {
                    spaceBetween: 150,
                },
            },
        },
    }
    const thumbsOptions = {
        ...commonOptions,
        ...{
            modules: [Controller],
            slidesPerGroup: 1,
            loop: true,
            slidesPerView: 4,
            spaceBetween: 8,
            breakpoints: {
                769: {
                    spaceBetween: 24,
                    slidesPerView: 5,
                },
                481: {
                    spaceBetween: 12,
                    slidesPerView: 7,
                    centeredSlides: true,
                },
                320: {
                    // slidesPerView: 4,
                    // spaceBetween: 8,
                    centeredSlides: false,
                },
            },
        },
    }
    const prefix = "._single-page"
    const mainSlider = document.querySelector(prefix + "__main-slider")
    const thumbsSlider = document.querySelector(prefix + "__thumbs-slider")
    let thumbs
    let main
    if (thumbsSlider) {
        thumbs = new Swiper(thumbsSlider, thumbsOptions)
    }
    if (mainSlider) {
        const mainOptions = {
            ...commonMainOptions,
            ...{
                modules: [Navigation],
                navigation: {
                    prevEl: prefix + "__main-slider .swiper-button-prev",
                    nextEl: prefix + "__main-slider .swiper-button-next",
                },
            },
        }
        if (thumbsSlider) {
            Object.assign(mainOptions, {
                modules: [Thumbs, Controller, Autoplay, Navigation],
                thumbs: {
                    swiper: thumbs,
                },
            })
        }
        main = new Swiper(mainSlider, mainOptions)
        if (thumbsSlider) {
            main.controller.control = thumbs
        }
    }
}
