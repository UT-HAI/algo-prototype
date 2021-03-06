import React from "react"
import Plot from "react-plotly.js"

// visualize a bivariate distribution where each variable is either categorical or numerical

const Bivariate = ({x, y}) => {
    const { data: xdata, type: xtype, label: xlabel } = x
    const { data: ydata, type: ytype, label: ylabel } = y
    
    // useMemo here!

    let dataProps = {}
    let layoutProps = {}
    let data = undefined
    let overrideYlabel = undefined

    // https://plotly.com/javascript/line-and-scatter/
    if (xtype === 'numerical' && ytype === 'numerical'){
        dataProps = { type: 'scatter', mode: 'markers'}
    }
    // boxplot
    else if (xtype === 'numerical' && ytype === 'categorical'){
        dataProps = {
            type: 'box',
            transforms: [{
                type: 'groupby',
                groups: ydata,
            }],
            orientation: 'h',
        }
    }
    else if (xtype === 'categorical' && ytype === 'numerical'){
        dataProps = {
            type: 'box',
            transforms: [{
                type: 'groupby',
                groups: xdata,
            }],
        }
    }
    // https://plotly.com/javascript/bar-charts/#stacked-bar-chart
    else if (xtype === 'categorical' && ytype === 'categorical'){
        const xvals = [...new Set(xdata)]
        // data = [...new Set(ydata)].map(y =>)
        const dataMap = {}
        ydata.forEach((y,i) => {
            const x = xdata[i]
            if (!dataMap[y]){
                dataMap[y] = []
            }
            if (!dataMap[y][x]){
                dataMap[y][x] = 0
            }
            dataMap[y][x] += 1
        })
        data = Object.entries(dataMap).map(([name,xvalues]) => (
            {
                x: xvals,
                y: xvals.map(x => xvalues[x] ?? 0),
                name,
                type: 'bar'
            }
        ))
        layoutProps.barmode = 'stack'
        layoutProps.legend = {title: { text: ylabel }}
        overrideYlabel = 'count'
    }
    layoutProps.margin = {
        l: xtype == 'numerical' && ytype == 'categorical' ? 120 : 50,
        r: 0,
        b: xtype == 'categorical' ? 100 : 30,
        t: 0,
    }


    return (
        <Plot
            data={ data ?? [
                {
                    x: xdata,
                    y: ydata,
                    ...dataProps
                }
            ]}
            layout={{
                xaxis: {
                    title: {
                        text: xlabel,
                        font: {
                            size: 12,
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: overrideYlabel ?? ylabel,
                        font: {
                            size: 12,
                        },
                    },
                },
                autosize: true,
                ...layoutProps
            }}
            
            useResizeHandler
            style={{width: "100%", height: "100%"}}
        />
    )
}

export default Bivariate