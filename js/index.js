const width = 1000;
const barWidth = 500;
const height = 500;
const margin = 30;

const yearLable = d3.select('#year');
const countryName = d3.select('#country-name');

const barChart = d3.select('#bar-chart')
            .attr('width', barWidth)
            .attr('height', height);

const scatterPlot = d3.select('#scatter-plot')
            .attr('width', width)
            .attr('height', height);

const lineChart = d3.select('#line-chart')
            .attr('width', width)
            .attr('height', height);

let xParam = 'fertility-rate';
let yParam = 'child-mortality';
let rParam = 'gdp';
let year = '2000';
let param = 'child-mortality';
let lineParam = 'gdp';
let highlighted = "";
let selected = "";

const colorScale = d3.scaleOrdinal().range(['#DD4949', '#39CDA1', '#FD710C', '#A14BE5']);

loadData().then(data => {

    colorScale.domain(d3.set(data.map(d=>d.region)).values());

    d3.select('#range').on('input', function(){ 
        year = d3.select(this).property('value');
        yearLable.html(year);
        drawScatter(data);
        drawBar(data);
    });

    d3.select('#radius').on('change', function(){ 
        rParam = d3.select(this).property('value');
        drawScatter(data);
    });

    d3.select('#x').on('change', function(){ 
        xParam = d3.select(this).property('value');
        drawScatter(data);
    });

    d3.select('#y').on('change', function(){ 
        yParam = d3.select(this).property('value');
        drawScatter(data);
    });

    d3.select('#param').on('change', function(){ 
        param = d3.select(this).property('value');
        drawScatter(data);
        drawBar(data);
    });

    d3.select('#p').on('change', function(){ 
        lineParam = d3.select(this).property('value');
        drawLine(data)
    });

    drawBar(data);
    drawScatter(data);
});


async function loadData() {
    const data = { 
        'population': await d3.csv('data/population.csv'),
        'gdp': await d3.csv('data/gdp.csv'),
        'child-mortality': await d3.csv('data/cmu5.csv'),
        'life-expectancy': await d3.csv('data/life_expectancy.csv'),
        'fertility-rate': await d3.csv('data/fertility-rate.csv')
    };
    
    return data.population.map(d=>{
        const index = data.gdp.findIndex(item => item.geo == d.geo);
        return  {
            country: d.country,
            geo: d.geo,
            region: d.region,
            population: d,
            'gdp': data['gdp'][index],
            'child-mortality': data['child-mortality'][index],
            'life-expectancy': data['life-expectancy'][index],
            'fertility-rate': data['fertility-rate'][index]
        }
    })
}