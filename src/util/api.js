// simple fetch wrapper to handle error in the format they're sent by flask (doesn't manually trigger catch)

export const apiFetch = (url, args) =>
    fetch(url,args)
    .then(res => {
        if (!res.ok){
            res.text().then(msg =>{ throw new Error(msg) })
        }
        else {
            return res
        }
    })