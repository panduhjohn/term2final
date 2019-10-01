window.onload = function () {
    init()
}

function init() {
    let httpRequest;

    function makeRequest() {
        httpRequest = new XMLHttpRequest()

        if (!httpRequest) alert('Giving up! Cannot create an XMLHTTP instance')

        httpRequest.onreadystatechange = processContents
        httpRequest.open('GET', "data.json")
        httpRequest.send()
    }

    function processContents() {
        if (httpRequest.readyState === httpRequest.DONE) {
            if (httpRequest.status === 200) {
                let data = httpRequest.responseText

                if (data) {
                    data = JSON.parse(data)

                    if (data.items) createCards(data.items)
                }
            } else {
                alert('There was a problem with request')
            }
        }
    }

    function createCards(items) {
        
        let cardDeck = document.querySelector('.container > .card-deck')
        let cards = ``

        for (let key in items) {
            if(items.hasOwnProperty(key)) {
                cards += `<div class="card mb-4 shadow-sm">
                            <div class="card-header">
                                <h4 class="my-0 font-weight-normal">${items[key].title}</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title">${ items[key].price }</h1>
                                <small class="text-muted">/ mo</small></h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                <li>${ items[key].users } users included</li>
                                <li>${ items[key].storage } of storage</li>
                                <li>Email support</li>
                                <li>Help center access</li>
                                </ul>
                                <button type="button" class="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
                            </div>
                        </div>`
            }
        }

        cardDeck.innerHTML = cards
    }

    makeRequest()
}