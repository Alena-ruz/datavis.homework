function drawBar(data){
    barChart.selectAll("g, rect").remove()

    regions = d3.set(data.map(d=>d.region)).values()
    data_regions = []

    regions.forEach(reg => { 
        data_regions.push({
            'region': reg,
            'mean': d3.mean(data, function(d){ 
                if (reg == d.region) return d[param][year]
            })
        });
    });

    const {xRange, yRange} = getBarAxes(data_regions)

    barChart.selectAll(".bar")
        .data(data_regions)
        .enter()
        .append("rect")
            .attr("id", function(d) { return 'bar_' + d.region; } )
            .attr("x", function(d) { return xRange(d.region); } )
            .attr("y", function(d) { return yRange(d.mean) - 30; } ) 
            .style("fill", function (d) { return colorScale(d.region); } )
            .attr("width", xRange.bandwidth())
            .attr("height", function(d) { return height - yRange(d.mean); } )
            .style("opacity", "1")
            .on('click', function(){ barOnClick(this.id); });
}

function getBarAxes(data_regions){
    var xRange = d3.scaleBand()
        .range([margin*2, barWidth-margin])
        .domain(data_regions.map(function(d) { return d.region; }));

    var yRange = d3.scaleLinear()
        .range([height-margin, margin])
        .domain([0, d3.max(data_regions, function(d) { return d.mean; })]);

    barChart.append('g')
        .attr('transform', `translate(0, ${height-margin})`)
        .call(d3.axisBottom(xRange))

    barChart.append('g')
        .attr('transform', `translate(${margin*2}, 0)`)
        .call(d3.axisLeft(yRange))

    return {
        'xRange': xRange, 
        'yRange': yRange
    };
}

function barOnClick(this_id){
    if (highlighted == "" || highlighted != this_id){
        highlighted = this_id
        d3.selectAll('rect').style("opacity", "0.3")
        d3.selectAll('circle').style("display", "none")

        data_regions.map(function(d) { return 'bar_' + d.region; }).forEach(id => {
            if ( id == this_id ){
                d3.select('#' + id) .style("opacity", "1")
                d3.selectAll("circle[region='" + id.replace("bar_", "") + "']")
                    .style("display", "")
            }
        })
        return
    }
    if (highlighted == this_id){
        highlighted = ""
        d3.selectAll('rect').style("opacity", "1")
        d3.selectAll('circle').style("display", "")
    }
}