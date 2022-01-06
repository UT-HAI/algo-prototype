// export const round = (num,n) => {
//     var m = Number((Math.abs(num) * Math.pow(10,n)).toPrecision(30));
//     return Math.round(m) / Math.pow(10,n) * Math.sign(num);
// }

export const round = (num,n) => +num.toFixed(n)


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