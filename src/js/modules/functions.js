export function isWebpSupported() {
   if(!document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0)
   document.documentElement.classList.remove("webp")
}
export function getPropertyValue(el, prop) {
   return parseInt(getComputedStyle(el)[prop])
}
const spoilerIsOpenClassName = "_spoiler--open"
const spoilerIsSlidingClassName = "_spoiler--is-sliding"
const spoilerIsSlidingUpClassName = `${spoilerIsSlidingClassName}-up`
const spoilerIsSlidingDownClassName = `${spoilerIsSlidingClassName}-down`
const spoilerIsInitClassName = "_spoiler--init"
const DEFAULT_DURATION = 500
export function slideUp(el, duration = DEFAULT_DURATION) {
   if (!el) return
   if (el.classList.contains(spoilerIsSlidingClassName)) return
   el.classList.remove(spoilerIsOpenClassName)
   el.classList.add(spoilerIsSlidingClassName)
   el.classList.add(spoilerIsSlidingUpClassName)
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
      el.classList.remove(spoilerIsSlidingUpClassName)
   }, duration)
}
export function slideDown(el, duration = DEFAULT_DURATION) {
   if (!el) return
   if (el.classList.contains(spoilerIsSlidingClassName)) return
   el.classList.add(spoilerIsSlidingClassName)
   el.classList.add(spoilerIsSlidingDownClassName)
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
      el.classList.remove(spoilerIsSlidingDownClassName)
      el.classList.add(spoilerIsOpenClassName)
   }, duration)
}
export function slideToggle(el, duration = DEFAULT_DURATION) {
   if (!el) return
   if (el.hidden) {
      slideDown(el, duration)
   } else {
      slideUp(el, duration)
   }
}

function rgba2rgb(background, color) {
    const alpha = color[3]

  return [Math.floor((1 - alpha) * background[0] + alpha * color[0] + 0.5),
        Math.floor((1 - alpha) * background[1] + alpha * color[1] + 0.5),
        Math.floor((1 - alpha) * background[2] + alpha * color[2] + 0.5)]
}
// console.log(rgba2rgb([255, 255, 255], [78, 156, 219, .066])) // [ 255, 128, 128 ]
