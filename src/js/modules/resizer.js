export function servisesResizer() {
    let prevWidth = Number.MAX_SAFE_INTEGER
    const breakpoint = 480
    function resizeServices() {
        const services = document.querySelectorAll(".service")
        for (const service of services) {
            if (window.innerWidth <= breakpoint && prevWidth > breakpoint) {
                const title = service.querySelector(".service__title")
                const image = service.querySelector(".service__image")
                title.insertAdjacentElement("afterend", image)
            } else if (window.innerWidth > breakpoint && prevWidth <= breakpoint) {
                const image = service.querySelector(".service__image")
                service.insertAdjacentElement("afterbegin", image)
            }
        }
        prevWidth = window.innerWidth
    }
    document.addEventListener("DOMContentLoaded", resizeServices)
    window.addEventListener("resize", resizeServices)
}
