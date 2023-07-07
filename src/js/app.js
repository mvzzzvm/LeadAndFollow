import { isWebpSupported } from "./modules/functions.js"
isWebpSupported()

import { burger } from "./modules/burger.js"
burger()

import { DynamicAdapt } from "./modules/dynamic-adapt.js"
const da = new DynamicAdapt("max")
da.init()

import { servisesResizer } from "./modules/resizer.js"
servisesResizer()

// import { initSpoilers } from "./modules/spoiler.js"
// document.addEventListener("DOMContentLoaded", initSpoilers)

// import { createCustomSelectEl } from "./modules/dynamic-select.js"
// document.querySelectorAll(".dynamic-select").forEach((el) => createCustomSelectEl(el))

// import { markRequiredFields, togglePlaceholderOnFocus } from "./modules/inputs.js"
// togglePlaceholderOnFocus()
// markRequiredFields()

import { validateSeparateFields, validateWholeForm } from "./modules/form-validation.js"
const formSelector = ".start-block__form"
validateWholeForm(formSelector)
validateSeparateFields(formSelector)
