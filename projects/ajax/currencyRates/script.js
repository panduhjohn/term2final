window.onload = function () {
    init()
}

function init() {
    let httpRequest;

    function makeRequest() {
        httpRequest = new XMLHttpRequest()

        if (!httpRequest) alert('Giving up! Cannot create an XMLHTTP instance')

        httpRequest.onreadystatechange = processContents
        httpRequest.open('GET', "http://data.fixer.io/api/latest?access_key=fef9e813c954f5567e519e2dd29e19c2&&symbols=USD,GBP,CAD")
        httpRequest.send()
    }

    function processContents() {
        if (httpRequest.readyState === httpRequest.DONE) {
            if (httpRequest.status === 200) {
                let data = httpRequest.responseText

                if (data) {
                    data = JSON.parse(data)

                    if (data.rates) createCards(data.rates)
                }
            } else {
                alert('There was a problem with request')
            }
        }
    }

    function createCards(items) {
        console.log(`items: `, items);
        
        let cardDeck = document.querySelector('.container > .card-deck')
        let cards = ``

        for (let key in items) {
            if(items.hasOwnProperty(key)) {
                cards += `<div class="card mb-4 shadow-sm">
                            <div class="card-header">
                                <h4 class="my-0 font-weight-normal">${key}</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title">${ items[key] }</h1>
                            </div>
                        </div>`
            }
        }

        cardDeck.innerHTML = cards
    }

    makeRequest()
}