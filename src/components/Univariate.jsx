import React from "react"
import Plot from "react-plotly.js"

// component displaying a univariate distribution of a data (histogram for numerical and pie for categorical)

const pieColors = {
    'Yes': '#537dc1',
    'No': '#ed6868',
    'Male': '#537dc1',
    'Female': '#ed6868'
}

const Univariate = ({ data, name }) => {
    let yesNo = false
    if (data.counts){
        const vals = Object.keys(data.counts)
        if (vals.length === 2 && vals.includes("Yes") && vals.includes("No"))
            yesNo = true
    }
    const dataProps = data.type == 'numerical' ? {
        type: 'histogram',
        x: data.data
    } : {
        type: 'pie',
        values: Object.values(data.counts),
        labels: Object.keys(data.counts),
        marker: {
            colors: Object.keys(data.counts).map(val => pieColors[val])
        }

    }
    return (
        <Plot
            data={[dataProps]}
            layout={{
                xaxis: {
                    title: {
                        text: name,
                        font: {
                            size: 12,
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: 'count',
                        font: {
                            size: 12,
                        },
                    },
                },
                autosize: true,
                margin: {
                    l: 45,
                    r: 0,
                    b: 35,
                    t: 20,
                }
            }}
            
            useResizeHandler={true}
            style={{width: "100%", height: "100%"}}
        />
    )
}

export default Univariate