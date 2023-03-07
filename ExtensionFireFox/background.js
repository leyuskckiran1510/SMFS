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
    "about:blank",
    "moz-extension"]
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
browser.runtime.onInstalled.addListener(async() => {
    browser.storage.sync.set({
        "domains": JSON.stringify(defaults)
    })
    console.log(defaults)
    change()
    background(1)
})

let change = () => {
    browser.storage.sync.get((res) => {
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
    browser.webNavigation.onBeforeNavigate.addListener((details) => {
        if (complete) return
        if (details.url == "browser://newtab/") {
            return
        }
        if (check(details.url)) {
            browser.tabs.update(details.tabId, {
                url: "challange.html"
            })
        }
    })
}


browser.storage.onChanged.addListener((changes, area) => {
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