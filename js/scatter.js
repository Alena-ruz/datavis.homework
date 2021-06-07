function drawScatter(data){
    scatterPlot.selectAll("g").remove();

    const {xRange, yRange} = getScatterAxes(
        [d3.min(data, function(d) { return +d[xParam][year]; }), d3.max(data, function(d) { return +d[xParam][year]; })],
        [d3.min(data, function(d) { return +d[yParam][year]; }), d3.max(data, function(d) { return +d[yParam][year]; })]
    );

    var radiusScale = d3.scaleSqrt()
        .range([10, 30])
        .domain([
            d3.min(data, function(d) { return +d[rParam][year]; }),
            d3.max(data, function(d) { return +d[rParam][year]; })
        ]);

    scatterPlot.append('g')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xRange(d[xParam][year]); } )
            .attr("cy", function(d) { return yRange(d[yParam][year]); } )
            .attr("r", function (d) { return radiusScale(d[rParam][year]); } )
            .style("fill", function (d) { return colorScale(d.region); } )
            .attr("id", function(d){ return d.geo } )
            .attr("country", function(d){ return d.country } )
            .attr("region", function(d) { return d.region })
            .style("opacity", "0.7")
            .attr("stroke-width", "1")
            .on("click", function(){circleOnClick(this, data); })
}

function circleOnClick(that, data){
    d3.selectAll("circle").attr("stroke-width", "1")
    if (selected == "" || selected != that.attributes.country.nodeValue){
        selected = that.attributes.country.nodeValue
        d3.select("#" + that.id).style("display", "none")
        that.parentNode.appendChild(that);
        d3.select("#" + that.id)
            .style("display", "")
            .attr("stroke-width", "6")
        drawLine(data)
        return
    }
    if (selected == that.attributes.country.nodeValue) {
        selected = ""
        drawLine(data)
    }
}

function getScatterAxes(xDomain, yDomain){

    var xRange = d3.scaleLinear()
        .range([margin*2, width-margin])
        .domain(xDomain);

    var yRange = d3.scaleLinear()
        .range([height-margin, margin])
        .domain(yDomain);

    scatterPlot.append('g')
        .attr('transform', `translate(0, ${height-margin})`)
        .call(d3.axisBottom(xRange));

    scatterPlot.append('g')
        .attr('transform', `translate(${margin*2}, 0)`)
        .call(d3.axisLeft(yRange))

    return {
        'xRange': xRange,
        'yRange': yRange
    }
}