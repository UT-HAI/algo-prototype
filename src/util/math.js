// export const round = (num,n) => {
//     var m = Number((Math.abs(num) * Math.pow(10,n)).toPrecision(30));
//     return Math.round(m) / Math.pow(10,n) * Math.sign(num);
// }

export const round = (num,n) => +num.toFixed(n)

export const toHistogramData = (data, bins) => {
    if (data.every(datum => datum === 0 || datum === 1)){
        const histo = {'0': 0, '1': 0}
        data.forEach(datum => {
            if (datum === 0)
                histo['0']++
            else
                histo['1']++
        })
        return histo
    }
    const histo = {}
    const min = Math.min(...data)
    const max = Math.max(...data)
    const binSize = (max - min) / bins
    let lower = min
    let upper = min + binSize
    // let bin = `[${round(lower,2)},${round(upper,2)})`
    let bin = `[${round(lower,2)},${round(upper,2)})`
    histo[bin] = 0
    const sorted = [...data]
    sorted.sort(function(a, b){return a-b});
    sorted.forEach(n => {
        while (n > upper){
            lower = upper
            upper += binSize
            bin = `[${round(lower,2)},${round(upper,2)})`
            histo[bin] = 0
        }
        histo[bin]++
    })
    return histo
}

export const confusion = (listOfActual, mapOfPreds, idxsAndIds, total) => {
    const matrix = { fp: 0, tp: 0, fn: 0, tn: 0 }
    idxsAndIds.forEach(({id, idx}) => {
        const pred = mapOfPreds[String(id)] >= 0.5
        const actual = listOfActual[idx]
        if (pred){
            if (actual) matrix.tp +=1
            else matrix.fp +=1
        }
        else {
            if (actual) matrix.fn +=1
            else matrix.tn +=1
        }
    })
    return Object.fromEntries(Object.entries(matrix).map(([name,val]) => [name,val/total]))
}