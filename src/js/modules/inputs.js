function togglePlaceholder(el) {
   let placeholder
   el.addEventListener("focus", (e) => {
      placeholder = e.target.placeholder
      e.target.placeholder = ""
   })
   el.addEventListener("blur", (e) => {
      e.target.placeholder = placeholder
   })
}
export function togglePlaceholderOnFocus() {
   document.querySelectorAll("input").forEach((el) => togglePlaceholder(el))
   document.querySelectorAll("textarea").forEach((el) => togglePlaceholder(el))
}
export function markRequiredFields() {
   const mark = " *"
   function markDynamicSelects() {
      for (const field of document.querySelectorAll("[class*=__input]")) {
         if (field.required || field.getAttribute("aria-required")) {
            if (field.matches(".select-shadow-wrapper")) {
               const selected = field.querySelector(".selected-option")
               if (selected.value === "") selected.textContent += mark
            }
         }
      }
   }
   function doMark() {
      for (const field of document.querySelectorAll("[class*=__input]")) {
         if (field.required || field.getAttribute("aria-required")) {
            if (field.placeholder) field.placeholder += mark
            else if (field.matches(".select-shadow-wrapper")) {
               const selected = field.querySelector(".selected-option")
               if (selected.value === "") selected.textContent += mark
            }
         }
      }
   }
   document.addEventListener("DOMContentLoaded", doMark)
   document.querySelectorAll(".select-shadow-wrapper").forEach((el) => {
      el.addEventListener("change", markDynamicSelects)
   })
}
