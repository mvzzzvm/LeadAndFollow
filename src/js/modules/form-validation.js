const rules = {
    text: function (node) {
        const isRequired = node.getAttribute("aria-required") === "true" || node.required
        const inputText = node.value ? node.value.trim() : ""
        if (isRequired && inputText.length === 0) {
            return ["The obligatory field is empty"]
        }
        const minLength = node.dataset.minLength
        const maxLength = node.dataset.maxLength
        if (minLength && inputText.length < minLength) {
            return [`Field too short, it must be at least ${minLength} symbols length`]
        }
        if (maxLength && inputText.length > maxLength) {
            return [`Field too long, it must be a most ${maxLength} symbold`]
        }
        return []
    },
    email: function (node) {
        const prelimResult = rules.text(node)
        if (prelimResult.length > 0) return prelimResult
        if (node.value.trim() === "") return []

        const inputText = node.value.trim(),
            inputRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        const result = inputRegex.test(inputText)
        if (!result) return ["Wrong email format"]
        return []
    },
    tel: function (node) {
        const prelimResult = rules.text(node)
        if (prelimResult.length > 0) return prelimResult
        if (node.value.trim() === "") return []

        const allowedSymbols = ["\\s", "\\(", "\\)", "\\-", "\\+"]
        const regex = new RegExp([`[${allowedSymbols.join("")}]`], "g")
        const tel = node.value.replaceAll(regex, "")
        if (/^\d+$/.test(tel)) return []
        return ["Wrong phone format"]
    },
}
import Swal from "sweetalert2"

export function validateWholeForm(formSelector) {
    const form = document.querySelector(formSelector)
    if (!form) return
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let errorCount = validateForm(e.target)
        if (errorCount === 0) {
            const alert = Swal.mixin({
                customClass: {
                    confirmButton: "_dark-button",
                    title: "_section-title",
                },
                buttonsStyling: false,
            })
            alert.fire(
                `Thank you for signing up, ${e.target.name.value}!`,
                "We will contact you shortly!",
                "success"
            )
        }
    })
}
export function validateSeparateFields(selector) {
    const form = document.querySelector(selector)
    if (!form) return
    const fields = form.querySelectorAll("[class*=__input]:not([type=hidden])")
    fields.forEach((field) => {
        // field.addEventListener('focusin', () => validateField(field))
        field.addEventListener("focusout", () => validateField(field))
    })
}

const errorListClassName = "_error-list"
/*async*/ function validateForm(form) {
    let errorCount = 0
    const fields = form.querySelectorAll("[class*=__input]:not([type=hidden])")
    // await new Promise((resolve) => setTimeout(resolve, 300))
    for (const field of fields) {
        const messages = validateField(field)
        errorCount += messages.length
    }
    return errorCount
}
function validateField(field) {
    const errorList = field.parentElement.querySelector(`.${errorListClassName}`)
    if (!errorList) {
        throw new Error('Validation script needs <ul class="_error-list"></ul> near the input')
    }
    const messages = getErrorMessages(field)
    clearErrorList(errorList, field)
    if (messages.length > 0) {
        field.setAttribute("aria-invalid", true)
        errorList.classList.add(`${errorListClassName}--visible`)
        for (const message of messages) {
            const li = document.createElement("li")
            li.setAttribute("role", "alert")
            li.textContent = message
            errorList.append(li)
        }
    }
    return messages
}
function clearErrorList(errorList, field) {
    errorList.classList.remove(`${errorListClassName}--visible`)
    Array.prototype.forEach.call(errorList.children, (child) => child.remove())
    field.setAttribute("aria-invalid", false)
}
function getErrorMessages(field) {
    const rule = findRule(field)
    return rules[rule](field)
}
function findRule(field) {
    let rule
    if (field.dataset.rule) {
        rule = field.dataset.rule
    } else if (field.getAttribute("type")) {
        if (field.getAttribute("type") === "tel") {
            rule = "tel"
        } else if (field.getAttribute("type") === "email") {
            rule = "email"
        } else {
            rule = "text"
        }
    } else {
        rule = "text"
    }
    return rule
}
