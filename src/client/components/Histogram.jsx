import React from "react"
import Plot from "react-plotly.js"

const Histogram = ({ data, name }) => {
    return (
        <Plot
            data={[{
                type: 'histogram',
                x: data.valuesForHistogram,
                // orientation: 'v',
            }]}
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
                    l: 35,
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

export default Histogram