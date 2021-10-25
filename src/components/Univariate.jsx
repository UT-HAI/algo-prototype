import React from "react"
import Plot from "react-plotly.js"

const Univariate = ({ data, name }) => {
    const dataProps = data.type == 'numerical' ? {
        type: 'histogram',
        x: data.data
    } : {
        type: 'pie',
        values: Object.values(data.counts),
        labels: Object.keys(data.counts),
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