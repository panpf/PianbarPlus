window.onload = function () {
    let newNode = document.createElement("a")
    let btnPrimaryNode = document.getElementsByClassName("btn-primary")
    let btnSuccessNode = document.getElementsByClassName("btn-success")
    let tdownNode = document.getElementsByClassName("tdown")
    tdownNode[0].insertBefore(newNode, btnSuccessNode[0])

    let magnetUrl = btnPrimaryNode[0].attributes["href"].value
    newNode.addEventListener("click", function () {
        saveMagnetUrl(newNode, magnetUrl)
    })

    setButtonName(newNode, magnetUrl)
}

function saveMagnetUrl(buttonNode, magnetUrl) {
    let storage = chrome.storage.local
    storage.get(["magnetUrls"], function (cacheResult) {
        console.log(cacheResult)
        let magnetUrlArray = cacheResult.magnetUrls
        let index = indexOf(magnetUrlArray, magnetUrl);
        if (index === -1) {
            if (magnetUrlArray === undefined) {
                magnetUrlArray = []
            }
            magnetUrlArray.push(magnetUrl)  // todo 加入池子时 加入名字和链接 已经网页链接地址，查看的时候用得到
        } else {
            magnetUrlArray.splice(index, 1)
        }
        storage.set({magnetUrls: magnetUrlArray})
        setButtonName(buttonNode, magnetUrl)
    })
}

function setButtonName(buttonNode, magnetUrl) {
    let storage = chrome.storage.local
    storage.get(["magnetUrls"], function (cacheResult) {
        let index = indexOf(cacheResult.magnetUrls, magnetUrl);
        let newContent;
        if (index !== -1) {
            newContent = "点击从磁力池中删除"
        } else {
            newContent = "点击加入磁力池中"
        }
        console.log(buttonNode)
        buttonNode.innerText = newContent
    })
}

function indexOf(magnetUrls, magnetUrl) {
    let index = -1;
    if (magnetUrls !== undefined) {
        index = magnetUrls.indexOf(magnetUrl)
    }
    return index
}