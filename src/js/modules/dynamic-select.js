function createCustomSelect(selector) {
   const el = document.querySelector(selector)
   if (el) {
      createCustomSelectEl(el)
   }
}
export function createCustomSelectEl(el) {
   const ALLOW_SELECTING_EMPTY = true
   const TARGET_SELECT_SELECTOR = "select"
   const WRAPPER_CLASSNAME = "select-shadow-wrapper"
   const SELECTED_OPTION_CLASSNAME = "selected-option"
   const OPTIONS_CLASSNAME = "options"
   const OPTION_CLASSNAME = "option"
   const select = el.querySelector(TARGET_SELECT_SELECTOR)
   const selectShadowWrapper = document.createElement("div")
   copyAttributes(select, selectShadowWrapper)
   selectShadowWrapper.classList.add(WRAPPER_CLASSNAME)
   // selectShadowWrapper.classList.add(...select.classList)
   select.classList = []
   // const selectedOption = copyWithAttributes(select.firstElementChild)
   const selectedOption = document.createElement("div")

   selectedOption.id = select.id
   select.removeAttribute("id")
   const label = document.querySelector(`label[for="${selectedOption.id}"]`)
   if (label) {
      label.addEventListener("click", () => selectedOption.click())
   }

   selectedOption.classList = select.firstElementChild.classList
   const preSelectedOption = Array.prototype.find.call(select.children, (el) => el.selected)
   if (preSelectedOption) {
      selectedOption.value = preSelectedOption.value
      selectedOption.setAttribute("value", preSelectedOption.value)
      selectedOption.textContent = preSelectedOption.textContent
      selectShadowWrapper.value = preSelectedOption.value
      selectShadowWrapper.setAttribute("value", preSelectedOption.value)
   } else {
      selectedOption.textContent = select.firstElementChild.textContent
   }
   selectedOption.classList.add(SELECTED_OPTION_CLASSNAME, OPTION_CLASSNAME)
   selectedOption.addEventListener("click", toggleOptions)
   const options = document.createElement("div")
   options.classList.add(OPTIONS_CLASSNAME)
   options.addEventListener("click", changeValue)
   for (let i = 0; i < select.children.length; i++) {
      const child = copyWithAttributes(select.children[i])
      child.classList.add(OPTION_CLASSNAME)
      options.append(child)
   }
   selectShadowWrapper.append(selectedOption)
   selectShadowWrapper.append(options)
   select.parentElement.prepend(selectShadowWrapper)
   const maxWidth = getMaxWidth()
   // const maxWidth = 300
   // selectShadowWrapper.style.width = `${maxWidth}px`
   select.style.display = "none"

   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
         closeOptions()
      }
   })
   document.addEventListener("click", (e) => {
      if (!e.target.closest(".dynamic-select")) {
         const label = e.target.closest("label")
         if (label?.getAttribute("for")) {
            const labelFor = document.getElementById(label.getAttribute("for"))
            if (labelFor?.closest(".dynamic-select")) {
               return
            }
         }
         closeOptions()
      }
   })
   function copyAttributes(from, to) {
      for (const attr of from.attributes) {
         // console.log(attr.nodeName, attr.nodeValue)
         if (attr.nodeName === "value") {
            to.value = attr.nodeValue
         } else {
            to.setAttribute(attr.nodeName, attr.nodeValue)
         }
      }
   }
   function copyWithAttributes(el) {
      const child = document.createElement("div")
      copyAttributes(el, child)
      // child.classList = el.classList
      // child.dataset.value = el.value
      child.textContent = el.textContent
      if (select.value === el.value) {
         child.dataset.selected = true
      }
      return child
   }

   function changeValue(e) {
      const option = e.target.closest(`.${OPTION_CLASSNAME}`)
      const wrapper = e.target.closest(`.${WRAPPER_CLASSNAME}`)
      function doChangeValue() {
         for (const child of option.closest(`.${OPTIONS_CLASSNAME}`).children) {
            child.removeAttribute("data-selected")
         }
         const value = option.value
         select.value = value
         selectShadowWrapper.value = value
         selectShadowWrapper.setAttribute("value", value)
         option.dataset.selected = true
         selectedOption.textContent = option.textContent
         selectedOption.value = value
         selectedOption.setAttribute("value", value)
         selectShadowWrapper.dispatchEvent(new Event("change"))
      }
      if (option) {
         if (!option.value) {
            if (ALLOW_SELECTING_EMPTY) doChangeValue()
         } else {
            doChangeValue()
         }
      } else if (e.target.closest(".options")) {
         resetValue()
      }
      closeOptions()
      wrapper
         .querySelector(`.${SELECTED_OPTION_CLASSNAME}`)
         .classList.remove(`${SELECTED_OPTION_CLASSNAME}--open`)
   }
   function resetValue() {
      options.querySelectorAll(".option").forEach((el) => el.removeAttribute("data-selected"))
      const emptyOption = options.querySelector('.option[data-value=""]')
      if (emptyOption) {
         emptyOption.dataset.selected = true
         selectedOption.textContent = emptyOption.textContent
      }
   }
   function toggleOptions(e) {
      closeOtherOptionsInForm(e)
      const wrapper = e.target.closest(`.${WRAPPER_CLASSNAME}`)
      options.classList.toggle(`${OPTIONS_CLASSNAME}--open`)
      wrapper
         .querySelector(`.${SELECTED_OPTION_CLASSNAME}`)
         .classList.toggle(`${SELECTED_OPTION_CLASSNAME}--open`)
   }
   function getMaxWidth() {
      let maxWidth = 0
      for (const option of options.children) {
         maxWidth = maxWidth < option.offsetWidth ? option.offsetWidth : maxWidth
      }
      return maxWidth
   }
   function closeOptions() {
      if (options.classList.contains(`${OPTIONS_CLASSNAME}--open`)) {
         options.classList.remove(`${OPTIONS_CLASSNAME}--open`)
      }
      if (selectedOption.classList.contains(`${SELECTED_OPTION_CLASSNAME}--open`)) {
         selectedOption.classList.remove(`${SELECTED_OPTION_CLASSNAME}--open`)
      }
   }
   function closeAllOptions() {
      const dynamicSelects = document.querySelectorAll(".dynamic-select")
      dynamicSelects.forEach((el) => {
         const openOptions = el.querySelector(`.${OPTIONS_CLASSNAME}--open`)
         if (openOptions) openOptions.classList.remove(`${OPTIONS_CLASSNAME}--open`)
         const openSelectedOption = el.querySelector(`.${SELECTED_OPTION_CLASSNAME}--open`)
         if (openSelectedOption)
            openSelectedOption.classList.remove(`${SELECTED_OPTION_CLASSNAME}--open`)
      })
   }
   function closeOtherOptionsInForm(e) {
      const form = e.target.closest("form")
      const targetSelect = e.target.closest(".dynamic-select")
      if (!form) return
      const dynamicSelects = form.querySelectorAll(".dynamic-select")
      dynamicSelects.forEach((el) => {
         if (el === targetSelect) return
         const openOptions = el.querySelector(`.${OPTIONS_CLASSNAME}--open`)
         if (openOptions) openOptions.classList.remove(`${OPTIONS_CLASSNAME}--open`)
         const openSelectedOption = el.querySelector(`.${SELECTED_OPTION_CLASSNAME}--open`)
         if (openSelectedOption)
            openSelectedOption.classList.remove(`${SELECTED_OPTION_CLASSNAME}--open`)
      })
   }
}
