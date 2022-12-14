window.onload = function () {
    markedBestItems()
    // parseMagnetUrls()
    // parseMagnetUrl("http://d.pianbar.net/btshow/519914")
}

function markedBestItems() {
    let tbody = document.getElementsByTagName("tbody")
    let trList = tbody[0].getElementsByTagName("tr")
    for (let i = 0; i < trList.length; i++) {
        let tr = trList[i]
        let tdList = tr.getElementsByTagName("td")

        let magnetName = ""
        let magnetNameTd = tdList[0]
        if (magnetNameTd !== undefined) {
            let aNode = magnetNameTd.getElementsByTagName("a")
            if (aNode !== null) {
                magnetName = aNode[0].text
            }
            if (magnetName.includes("1080")) {
                magnetNameTd.setAttribute("style", "background: aquamarine")
            }
        }

        let magnetSizeTd = tdList[1]
        if (magnetSizeTd !== undefined) {
            let magnetSize = magnetSizeTd.textContent
            if (magnetSize.includes("GB")) {
                let size = parseFloat(magnetSize.replaceAll("GB", "").trim())
                if (size >= 2.5 && size <= 10.0) {
                    magnetSizeTd.setAttribute("style", "background: aquamarine")
                }
            }
        }
    }
}

function parseMagnetUrls() {
    let tbody = document.getElementsByTagName("tbody")
    let trList = tbody[0].getElementsByTagName("tr")
    for (let i = 0; i < trList.length; i++) {
        let tr = trList[i]
        let tdList = tr.getElementsByTagName("td")

        let detailPageUrl = ""
        let magnetNameTd = tdList[0]
        if (magnetNameTd !== undefined) {
            let aNode = magnetNameTd.getElementsByTagName("a")
            if (aNode !== null) {
                detailPageUrl = aNode[0].getAttribute("href")
            }
        }

        console.log("detailPageUrl: " + detailPageUrl)
    }
}

function parseMagnetUrl(pageUrl) {
    let http = new XMLHttpRequest()
    http.open("GET", pageUrl)
    http.send()
    http.onreadystatechange = function () {
        if (this.readyState === 200) {
            console.log(http.responseText)
        }
    }
}