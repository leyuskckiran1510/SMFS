const allowed = [
    "duckduckgo.com",
    "google.com",
    "openai",
    "stackoverflow.com",
    "github.com",
    "ycombinator.com",
    "reddit.com/r/programming",
    "codecademy.com",
    "freecodecamp.org",
    "coursera.org",
    "edx.org",
    "udemy.com/",
    "khanacademy.org",
    "about:blank"]
let defaults = allowed.map((x) => {
    dic = {
        domain_name: x,
        status: true,
        default: true
    }
    return dic
})
let allowed_words = []
let complete = 0

//loading fix datas to storage in the begining
chrome.runtime.onInstalled.addListener(async() => {
    chrome.storage.sync.set({
        "domains": JSON.stringify(defaults)
    })
    console.log(defaults)
    change()
    background(1)
})

let change = () => {
    chrome.storage.sync.get((res) => {
        //allowed_words = allowed.map((x) => x) //creating copy not pointer
        if (Object.keys(res).length == 0) return
        if (Object.keys(res).includes('domains')) {
            allowed_words = JSON.parse(res.domains).map((x) => x.status ? x.domain_name : '=0-=0==0-0')
                //console.log(allowed_words, "from storage")
        }
        if (Object.keys(res).includes('done')) {
            complete = res.done
        }
    })
}


let background = (run) => {
    chrome.webNavigation.onBeforeNavigate.addListener((details) => {
        if (complete) return
        if (details.url == "chrome://newtab/") {
            return
        }
        if (check(details.url) && details.frameType == "outermost_frame") {
            chrome.tabs.update(details.tabId, {
                url: "challange.html"
            })
        }
    })
}


chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
        allowed_words = JSON.parse(changes.domains.newValue).map((x) => x.status ? x.domain_name : '=0-=0==0-0')
    }
})


let check = (url) => {
    for (let i = 0; i < allowed_words.length; i++) {
        if (url.includes(allowed_words[i])) return false
    }
    return true
}