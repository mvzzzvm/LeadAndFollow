function toggle(e) {
    const iconMenu = e.target.closest(".icon-menu")
    if (iconMenu) {
        document.body.classList.toggle("menu--open")
    }
}
function closeMenu() {
    document.body.classList.remove("menu--open")
}
export function burger() {
    document.addEventListener("click", toggle)
    window.addEventListener("resize", function (e) {
        if (window.innerWidth >= 768) {
            document.body.classList.remove("menu--open")
        }
    })
}
