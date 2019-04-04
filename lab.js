var grade=d3.json("classData.json");
var w=500;
var h=500;
var margin={
  left:20,
  right:40,
  top:20,
  bottom:20
}
grade.then(function(data){
  var xScale=d3.scaleLinear()
               .domain([0,40])
               .range([margin.left+margin.right-10,h+margin.left]);
  var yScale=d3.scaleLinear()
               .domain([0,10])
               .range([h+margin.top,margin.top]);
  var svg=d3.select("#line")
            .attr("width",w+margin.left+margin.right+200)
            .attr("height",h+margin.top+margin.bottom);
  var line=d3.line()
             .x(function(d){return xScale(d.day);})
             .y(function(d){return yScale(d.grade);});
  var area=d3.area()
             .x(function(d){return xScale(d.day);})
             .y0(function(d){return h+20})
             .y1(function(d){return yScale(d.grade);});
  svg.append("path")
     .datum(data[22].quizes)
     .classed("line",true)
     .attr("d",line);
  var xAxis=d3.axisBottom(xScale);
  var yAxis=d3.axisLeft(yScale);
  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate("+(margin.left-10)+","+(margin.top+h)+")");
  svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margin.left+margin.right)+",0)");

        svg.append("g")
          .attr("class","legend")
          .append("rect")
          .attr("x",w+20)
          .attr("y",20)
          .attr("width",20)
          .attr("height",20)
          .attr("fill","#ecbd8b")
          .on("click",function(){
            var e=svg.select("path").classed("line")
            if (e){
              svg.select("path")
               .classed("line",false)
               .datum(data[22].quizes)
               .attr("d",area)
               .attr("fill","#ecbd8b");}
            else
              {
                svg.select("path")
                   .classed("line",true)
                   .datum(data[22].quizes)
                   .attr("d",line)
                   .attr("fill","none");
              }
            })
        svg.append("text")
           .text("Area")
           .attr("x",w+50)
           .attr("y",35)

},function(err){console.log(err);})
