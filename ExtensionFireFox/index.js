let domains = []
let nameToggl = 0
let statToggl = 0
let actionToggl = 0

let tableSt = ['table-success', 'table-light', 'thead-light'];

browser.storage.sync.get("domains", (obj) => {
    domains = JSON.parse(obj["domains"])
    console.log(domains, obj)
})

let refresh = (d = domains) => {
    browser.storage.sync.set({
        "domains": JSON.stringify(d)
    })
}

let update = () => {
        document.querySelector("#tbody").innerHTML = ''
        let index = 0
        domains.forEach((x) => {
                    let tableClass = x.hasOwnProperty('default') ? tableSt[2] : '  '
                    tableClass = `${tableClass} ${x.status ? tableSt[0] : tableSt[1]}`
                    document.querySelector("#tbody").innerHTML += ` <tr class="${tableClass}">
                        <td id="${index}">${index}</td>
                        <td class="status" id="name">
                        ${x.domain_name}
                        </td>
                        <td id="status">
                        ${x.status}</td>
                        ${x.hasOwnProperty('default') ? `<td><button class = "btn btn-success changeAllow" id="${index}">
                                Allow
                            </button>
                        </td>
                    </tr>` : ` <td>
            <button class = "btn btn-danger deletes" id="${index}">
            Delete </button> <button class = "btn btn-success changeAllow" id="${index}" >
            Allow </button> </td> </tr>`}`
        index++
    })

    document.querySelectorAll(".changeAllow").forEach((x) => {
        x.addEventListener('click', () => {
            let i = Number(x.id)
            domains[i].status = domains[i].status ? false : true
            refresh()
            update()
        })
    })
    document.querySelectorAll(".deletes").forEach((x) => {
        x.addEventListener('click', () => {
            let i = Number(x.id)
            domains[i].hasOwnProperty('default') ? 1 : domains.splice(i, 1)
            refresh()
            update()
        })
    })
    refresh()

}

document.querySelector("#saveDomain").addEventListener('click', () => {
    console.log("clicked")
    yourDomain = document.querySelector('#yourDomain').value
    domains.push({
        domain_name: yourDomain,
        status: false
    });
    localStorage.setItem("domains", JSON.stringify(domains));
    update()

}
)
document.querySelector("#sortIndx").addEventListener('click', ()=>{
    domains.reverse()
    update()
}
)

document.querySelector("#sortName").addEventListener('click', ()=>{
    nameToggl = (nameToggl+1)%2
    let tmp = [1,-1]
    domains.sort((x,y)=>x.domain_name>y.domain_name?tmp[nameToggl%2]:tmp[(nameToggl%2)+1])
    update()
}
)


document.querySelector("#sortAction").addEventListener('click', ()=>{
    statToggl= (statToggl+1)%2
    let tmp = [1,-1]
    domains.sort((x,y)=>{
        d = x.hasOwnProperty('default') && y.hasOwnProperty('default')
        ?1
        :x.hasOwnProperty('default')?tmp[statToggl%2]:tmp[(statToggl%2)+1]
        
        return typeof d != 'undefine'?d:-1

    })
    update()
}
)

document.querySelector("#sortStatus").addEventListener('click', ()=>{
    statToggl= (statToggl+1)%2
    let tmp = [1,-1]
    domains.sort((x,y)=>x.status>y.status?tmp[statToggl%2]:tmp[(statToggl%2)+1])
    update()
}
)

update()
document.body.addEventListener('onload',()=>{
    alert("TF is happening")
})