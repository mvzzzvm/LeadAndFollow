import $ from "jquery"
import "jquery-ui/ui/widgets/datepicker.js"
import "jquery-ui/ui/i18n/datepicker-ru.js"
import "jquery-ui/themes/base/core.css"
import "jquery-ui/themes/base/theme.css"
import "jquery-ui/themes/base/datepicker.css"

const dateFormat = "дд.мм.гггг"
const now = new Date()
let tommorrow = new Date(now)
tommorrow.setDate(tommorrow.getDate() + 1)
const options = {
   minDate: now,
   dateFormat: "dd.mm.yy",
   beforeShowDay: function (date) {
      function generateClassName() {
         if (startDate && endDate) {
            if (date.getTime() > startDate.getTime() && date.getTime() < endDate.getTime())
               return "date-range-selected"
            if (date.getTime() === startDate.getTime()) {
               return "date-range-selected-start-end date-range-selected-start"
            }
            if (date.getTime() == endDate.getTime()) {
               return "date-range-selected-start-end date-range-selected-end "
            }
         }

         return ""
      }
      return [true, generateClassName(date)]
   },
}
let startDate
let endDate
const startEl = document.querySelector(".order-form__start-date")
const toEl = document.querySelector(".order-form__end-date")
let toElValue = toEl.value
$.datepicker.setDefaults($.datepicker.regional["ru"])
const from = $(startEl)
   .datepicker(options)
   .on("focus", onFocus)
   .on("blur", onBlur)
   .on("change", function (e) {
      startDate = getDate(this)
      console.log("startDate", startDate)
      to.datepicker("hide")
      setTimeout(() => to.datepicker("option", "minDate", startDate), 300)
   })

const to = $(toEl)
   .datepicker({ ...options, ...{ minDate: tommorrow } })
   .on("focus", onFocus)
   .on("blur", onBlur)
   .on("change", function (e) {
      endDate = getDate(this)
      console.log("endDate", endDate)
      if (endDate === null) {
         toEl.value = toElValue
      }
      setTimeout(() => from.datepicker("option", "maxDate", endDate), 300)
   })

function onFocus(e) {
   if (e.target.value === "") {
      e.target.value = dateFormat
      toElValue = ""
      e.target.select()
   }
}
let over = false
document.querySelectorAll(".ui-datepicker").forEach((el) =>
   el.addEventListener("mouseenter", (e) => {
      if (e.target.closest(".ui-datepicker")) {
         // console.log("over datepicker")
         over = true
      }
   })
)
document.querySelectorAll(".ui-datepicker").forEach((el) =>
   el.addEventListener("mouseleave", (e) => {
      if (e.target.closest(".ui-datepicker")) {
         // console.log("out of datepicker")
         over = false
      }
   })
)

function onBlur(e) {
   if (!over) e.target.value = toElValue
}

function getDate(el) {
   let result = null
   if (!el.value) return result
   try {
      result = $.datepicker.parseDate(options.dateFormat, el.value)
   } catch (error) {
      console.error(error)
   }
   return result
}
