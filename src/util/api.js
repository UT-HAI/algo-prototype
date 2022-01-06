// simple fetch wrapper to handle error in the format they're sent by flask (original format won't trigger a catch on error)
export const apiFetch = (url, args) =>
    fetch(url,args)
    .then(res => {
        if (!res.ok){
            return res.text().then(msg =>{ throw new Error(msg) })
        }
        else {
            return res
        }
    })