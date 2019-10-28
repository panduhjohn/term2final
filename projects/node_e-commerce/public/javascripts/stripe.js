$(() => {
    $('#payment-form').submit((event) => {
        event.preventDefault()

        let cardNumber = $('#card-number').val()
        let cvcCode    = $('#card-cvc').val()
        let expMonth   = $('#card-expiry-month-year').val().slice(0, 2)
        let expYear    = $('#card-expiry-month-year').val().slice(2, 4)

        $('#cardSubmit').prop('disabled', true)

        console.log('got submit event')
    })
})