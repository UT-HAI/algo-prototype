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