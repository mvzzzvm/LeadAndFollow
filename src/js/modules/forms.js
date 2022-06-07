// not needed
export function clearPlaceholder(){
    const forms = document.querySelectorAll('form')
    let placeholder
    forms.forEach(form => form.addEventListener('focusin', e => {
        if(e.target.matches('input')) {
            placeholder = e.target.getAttribute('placeholder')
        e.target.removeAttribute('placeholder')

        }
    }))
    forms.forEach(form => form.addEventListener('focusout', e => {
        if(e.target.matches('input')) {
            if(placeholder){
                e.target.setAttribute('placeholder', placeholder)
                placeholder = null
                }
        }
    })
    )
}