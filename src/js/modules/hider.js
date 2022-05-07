import { addElements } from "./flexbox-empty-elements-inserter.js"
import { getPropertyValue, slideUp, slideDown } from "./functions.js"

let hidden = null
const mainContainer = document.querySelector(".cctv-suits__suits")
const additionalContainer = document.querySelector(".cctv-suits__additional-suits")
const columnGap = getPropertyValue(mainContainer, "column-gap")
const showMoreButton = mainContainer.parentElement.querySelector(".cctv-suits__show-more")
const activeButtonClassName = "cctv-suits__show-more--active"
const maxSuits = 9
const maxRows = 2
const timeout = 1500
const map = {
   1: "red",
   2: "blue",
   3: "green",
}
// not working
export function elementsToShow() {
   let els = 0
   const arr = []
   const containerWidth =
      mainContainer.offsetWidth -
      getPropertyValue(mainContainer, "padding-left") -
      getPropertyValue(mainContainer, "padding-right")
   let width = containerWidth
   for (let i = 0, currentRow = 1; i < mainContainer.children, currentRow <= maxRows; i++) {
      console.log("row " + currentRow + " starting width", width, mainContainer.offsetWidth)
      const child = mainContainer.children[i]
      if (child === undefined) break
      if (child.offsetWidth === undefined) {
         els += 1
         arr.push(child)
         continue
      }
      width -= child.offsetWidth
      // console.log(child, width, child.offsetWidth)
      if (width >= 0) {
         els += 1
         arr.push(child)
         child.style.outline = "1px solid " + map[currentRow]
         width -= columnGap
      } else {
         i -= 1
         currentRow++
         width = containerWidth
         console.log("row break on ", child)
      }
   }
   console.log("elementsToShow", els, arr)
   return els
}
function fromMainToAdditional() {
   // console.log("fromMainToAdditional", mainContainer.children.length)
   const arr = []
   for (let i = maxSuits + 1; i < mainContainer.children.length; i++) {
      arr.push(mainContainer.children[i])
   }
   arr.forEach((el) => additionalContainer.append(el))
}
function fromAdditionalToMain() {
   // console.log("fromAdditionalToMain!")
   const arr = []
   for (const suit of additionalContainer.children) {
      arr.push(suit)
   }
   arr.forEach((el) => mainContainer.append(el))
}
function hideButton() {
   showMoreButton.classList.remove(activeButtonClassName)
}
function showButton() {
   if (!showMoreButton.classList.contains(activeButtonClassName)) {
      showMoreButton.classList.add(activeButtonClassName)
   }
}

function hideAndToggle() {
   if (hidden === true) {
      slideDown(additionalContainer, timeout)
      setTimeout(fromAdditionalToMain, timeout)
      showMoreButton.textContent = "Свернуть"
      hidden = false
   } else {
      fromMainToAdditional()
      slideUp(additionalContainer, timeout)
      showMoreButton.textContent = "Смотреть еще"
      hidden = true
   }
}
export function hideToggle() {
   if (document.documentElement.offsetWidth > 600) {
      if (hidden === null || hidden === true) {
         slideDown(additionalContainer, timeout)
         setTimeout(fromAdditionalToMain, timeout)
         showMoreButton.textContent = "Свернуть"
         hideButton()
         hidden = false
      }
   } else {
      if (hidden === null || hidden === false) {
         fromMainToAdditional()
         slideUp(additionalContainer, timeout)
         showMoreButton.textContent = "Смотреть еще"
         showButton()
         hidden = true
      }
   }
}

showMoreButton.addEventListener("click", hideAndToggle)
