document.getElementById("search").addEventListener("click", function () {
    let text = document.getElementById("textarea").value;
    let names = text.split("\n");
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let encodeName = encodeURI(name.trim())
        if (encodeName.length > 0) {
            window.open("http://so.pianbar.net/search.aspx?q=" + encodeName, "_blank");
        }
    }
})

// document.getElementById("magnetList").addEventListener("click", function () {
//     let storage = chrome.storage.local
//     storage.get(["magnetUrls"], function (cacheResult) {
//         alert(cacheResult.magnetUrls)
//     })
// })

document.getElementById("copyMagnetUrls").addEventListener("click", function () {
    let storage = chrome.storage.local
    storage.get(["magnetUrls"], function (cacheResult) {
        let magnetUrls = cacheResult.magnetUrls
        let magnetUrlsString = ''
        for (let i = 0; i < magnetUrls.length; i++) {
            let magnetUrl = magnetUrls[i]
            if (magnetUrlsString.length > 0) {
                magnetUrlsString += '\n'
                magnetUrlsString += '\n'
            }
            magnetUrlsString += magnetUrl
        }
        console.log(magnetUrlsString)
        if (magnetUrlsString.length > 0) {
            copyToClip(magnetUrlsString)
        } else {
            alert("池中没有磁力链接可以拷贝")
        }
    })
})

document.getElementById("clearMagnetUrls").addEventListener("click", function () {
    let msg = "确定要清除已存储的磁力链接？"
    if (confirm(msg) === true) {
        let storage = chrome.storage.local
        storage.set({magnetUrls: []})
        setCount()
    }
})

window.onload = function () {
    setCount()
}

function setCount() {
    let storage = chrome.storage.local
    storage.get(["magnetUrls"], function (cacheResult) {
        let magnetUrlsCount;
        if (cacheResult.magnetUrls === undefined) {
            magnetUrlsCount = 0
        } else {
            magnetUrlsCount = cacheResult.magnetUrls.length
        }
        document.getElementById("magnetUrlsCount").innerText = magnetUrlsCount
    })
}

/**
 * 复制单行内容到粘贴板
 * content : 需要复制的内容
 * message : 复制完后的提示，不传则默认提示"复制成功"
 */
function copyToClip(content, message) {
    navigator.clipboard.writeText(content)
        .then(() => {
            if (message == null) {
                alert("拷贝成功");
            } else {
                alert(message);
            }
        })
        .catch(() => {
            alert("拷贝失败");
        })
}