@@ -56,20 +56,20 @@ function barOnClick(this_id){
    if (highlighted == "" || highlighted != this_id){
        highlighted = this_id
        d3.selectAll('rect').style("opacity", "0.3")
        d3.selectAll('circle').style("opacity", "0")
        d3.selectAll('circle').style("display", "none")

        data_regions.map(function(d) { return 'bar_' + d.region; }).forEach(id => {
            if ( id == this_id ){
                d3.select('#' + id) .style("opacity", "1")
                d3.selectAll("circle[region='" + id.replace("bar_", "") + "']")
                    .style("opacity", "0.7")
                    .style("display", "")
            }
        })
        return
    }
    if (highlighted == this_id){
        highlighted = ""
        d3.selectAll('rect').style("opacity", "1")
        d3.selectAll('circle').style("opacity", "0.7")
        d3.selectAll('circle').style("display", "")
    }
} 
