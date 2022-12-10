window.onload = function () {
    let tbody = document.getElementsByTagName("tbody")
    let trList = tbody[0].getElementsByTagName("tr")
    for (let trListKey in trList) {
        let tr = trList[trListKey]
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