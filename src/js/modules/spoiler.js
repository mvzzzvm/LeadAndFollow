const spoilerOpenClassName = "_spoiler--open"
const spoilerIsSlidingClassName = "_spoiler--is-sliding"
const spoilerIsInitClassName = "_spoiler--init"
const DEFAULT_DURATION = 500

const spoilers = Array.prototype.reduce.call(
   document.querySelectorAll("[data-spoilers]"),
   (map, spoiler) => {
      map.set(spoiler, spoiler.dataset.spoilers)
      return map
   },
   new Map()
)
const mediaQueries = new Map()
function initMediaQueries() {
   spoilers.forEach((data, s) => {
      let [value, type] = data.split(",")
      value = value.trim()
      type = type ? type.trim().toLowerCase() : "max"
      if (!["min", "max"].includes(type)) throw new RangeError('Unknown media type: "' + type + '"')
      const mediaQuery = value ? `(${type}-width: ${value}px)` : null
      mediaQueries.set(s, mediaQuery)
   })
}
export function initSpoilers() {
   initMediaQueries()
   mediaQueries.forEach((mq, el) => {
      initSpoiler(mq, el)
   })
}
function initSpoiler(mq, el) {
   if (mq) {
      const matchMedia = window.matchMedia(mq)
      const matchResult = matchMedia.matches
      toggleInitClass(el, matchResult)
      if (matchResult) el.addEventListener("click", setSpoilerAction)
      else el.removeEventListener("click", setSpoilerAction)
      initSpoilerBody(el, matchResult)
      matchMedia.addEventListener("change", (e) => {
         // console.log(matchMedia.matches)
         toggleInitClass(el, matchMedia.matches)
         initSpoilerBody(el, matchMedia.matches)
         const action = matchMedia.matches ? "add" : "remove"
         el[action + "EventListener"]("click", setSpoilerAction)
      })
   } else {
      toggleInitClass(el, true)
      initSpoilerBody(el, true)
      el.addEventListener("click", setSpoilerAction)
   }
}

function toggleInitClass(el, matchResult) {
   const fn = matchResult ? "add" : "remove"
   el.classList[fn](spoilerIsInitClassName)
}
function initSpoilerBody(spoiler, hide) {
   const titles = spoiler.querySelectorAll("[data-spoiler]")
   titles.forEach((title) => {
      if (hide) {
         //   console.log("hiding", spoiler);
         title.removeAttribute("tabindex")
         if (!title.classList.contains(spoilerOpenClassName)) {
            if (title.nextElementSibling) {
               title.nextElementSibling.hidden = true
               // title.nextElementSibling.style.display = "none"
            }
         }
      } else {
         // console.log("showing", spoiler)
         title.setAttribute("tabindex", "-1")
         if (title.nextElementSibling) {
            title.nextElementSibling.hidden = false
            // title.nextElementSibling.style.display = ""
         }
      }
   })
}
function setSpoilerAction(e) {
   //   debugger;
   const el = e.target
   const title = el.closest("[data-spoiler]")
   if (title) {
      const spoiler = title.closest("[data-spoilers]")
      const accordeon = spoiler.hasAttribute("data-accordeon")
      // debugger;
      if (!spoiler.querySelectorAll(spoilerIsSlidingClassName).length) {
         if (accordeon && !title.classList.contains(spoilerOpenClassName)) {
            hideSpoilerBody(spoiler)
         }
         title.classList.toggle(spoilerOpenClassName)
         slideToggle(title.nextElementSibling)
      }
      e.preventDefault()
   }
}
function hideSpoilerBody(el) {
   if (!el) return
   const title = el.querySelector("[data-spoiler]." + spoilerOpenClassName)
   if (title) {
      title.classList.remove(spoilerOpenClassName)
      slideUp(title.nextElementSibling)
   }
}
function slideUp(el, duration = DEFAULT_DURATION) {
   if (!el) return
   if (el.classList.contains(spoilerIsSlidingClassName)) return
   el.style.transitionProperty = "height, margin, padding" /* [1.1] */
   el.style.transitionDuration = duration + "ms" /* [1.2] */
   el.style.boxSizing = "border-box" /* [2] */
   el.style.height = el.offsetHeight + "px" /* [3] */
   el.offsetHeight // !!!
   el.style.height = 0 /* [4] */
   el.style.paddingTop = 0 /* [5.1] */
   el.style.paddingBottom = 0 /* [5.2] */
   el.style.marginTop = 0 /* [6.1] */
   el.style.marginBottom = 0 /* [7.2] */
   el.style.overflow = "hidden" /* [7] */
   window.setTimeout(() => {
      // el.style.display = "none"; /* [8] */
      el.hidden = true
      el.style.removeProperty("height") /* [9] */
      el.style.removeProperty("padding-top") /* [10.1] */
      el.style.removeProperty("padding-bottom") /* [10.2] */
      el.style.removeProperty("margin-top") /* [11.1] */
      el.style.removeProperty("margin-bottom") /* [11.2] */
      el.style.removeProperty("overflow") /* [12] */
      el.style.removeProperty("transition-duration") /* [13.1] */
      el.style.removeProperty("transition-property") /* [13.2] */
      el.classList.remove(spoilerIsSlidingClassName)
   }, duration)
}
function slideDown(el, duration = DEFAULT_DURATION) {
   if (!el) return
   if (el.classList.contains(spoilerIsSlidingClassName)) return
   el.classList.add(spoilerIsSlidingClassName)
   el.hidden = false
   const height = el.offsetHeight
   el.style.transitionDuration = duration + "ms"
   el.style.transitionProperty = "height, margin, padding"
   el.style.height = 0 + "px"
   el.style.marginTop = el.style.marginBottom = el.style.paddingTop = el.style.paddingBottom = 0
   el.offsetHeight
   el.style.height = height + "px"
   el.style.overflow = "hidden"
   el.style.removeProperty("margin-top")
   el.style.removeProperty("margin-bottom")
   el.style.removeProperty("padding-top")
   el.style.removeProperty("padding-bottom")
   setTimeout(() => {
      // for (const prop in props) {
      //     el.style.removeProperty(prop);
      // }
      el.style.removeProperty("transition-duration")
      el.style.removeProperty("transition-property")
      el.style.removeProperty("height")
      el.style.removeProperty("overflow")
      el.classList.remove(spoilerIsSlidingClassName)
   }, duration)
}
function slideToggle(el, duration = DEFAULT_DURATION) {
   if (!el) return
   if (el.hidden) {
      slideDown(el, duration)
   } else {
      slideUp(el, duration)
   }
}
// document.addEventListener("DOMContentLoaded", initSpoilers)
