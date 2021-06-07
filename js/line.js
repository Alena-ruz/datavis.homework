function drawLine(data){

    countryName.text("")
    lineChart.selectAll("g, path").remove()
    d3.select('#line-selector').style("display", "none")

    if (selected == "") return

    d3.select('#line-selector').style("display", "")
    d3.select('#p').property('value', lineParam)
    countryName.text(selected)

    const country_obj = data.find(obj => { return obj.country == selected; })
    const years = Object.keys(country_obj[lineParam])

    let data_line = []
    years.forEach(key => {
        if (/\d/.test(key))
            data_line.push({
                'date': d3.timeParse("%Y-%m-%d")(key + "-01-01"),
                'value': country_obj[lineParam][key]
            })
    });

    const {xRange, yRange} = getLineAxes(
        d3.extent(data_line, function(d){ return d.date; }),
        [0, d3.max(data_line, function(d) { return +d.value; })]
    )

    lineChart.append('path')
        .datum(data_line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xRange(d.date) })
            .y(function(d) { return yRange(d.value) })
            )
}

function getLineAxes(xDomain, yDomain){
    xRange = d3.scaleTime()
        .range([margin*2, width-margin])
        .domain(xDomain);

    yRange = d3.scaleLinear()
        .range([height-margin, margin])
        .domain(yDomain);

    lineChart.append('g')
        .attr('transform', `translate(0, ${height-margin})`)
        .call(d3.axisBottom(xRange));

    lineChart.append('g')
        .attr('transform', `translate(${margin*2}, 0)`)
        .call(d3.axisLeft(yRange))

    return {
        'xRange': xRange,
        'yRange': yRange
    }
}