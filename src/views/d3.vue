<template>
  <div>
    <div class="micro-topo-container" ref="container"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
import data from "./d3";
function lengthName(name, plus = 50) {
  if (!name) {
    return 0;
  }
  let l = name.length;
  let res = name.match(/[0-9a-zA-Z]/g);
  let l1 = res ? res.length : 0;
  let l2 = l - l1;
  return l2 * 15 + l1 * 8 + plus;
}
export default {
  name: "d3",
  data() {
    return {
      svg: null,
      width: 1000,
      height: 600,
      data,
      force: null
    };
  },
  methods: {
    init() {
      this.draw();
      // this.drag(d3.forceSimulation);
    },
    draw() {
      const links = data.links.map(d => Object.create(d));
      const nodes = data.nodes.map(d => Object.create(d));

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(links)
            .id(d => d.id)
            .distance(200)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.width / 2, this.height / 2));

      //   const svg = d3
      //     .create("svg")
      //     .attr("viewBox", [0, 0, this.width, this.height]);
      const svg = d3
        .select(this.$refs.container)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
      const graph = svg.append("g").attr("class", "graph");
      const defs = graph.append("defs");
      // 箭头
      const arrowMarkerRed = defs
        .append("marker")
        .attr("id", "arrowred")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", "12")
        .attr("markerHeight", "12")
        .attr("viewBox", "0 0 12 12")
        .attr("refX", "15")
        .attr("refY", "6")
        .attr("orient", "auto");
      const arrow_path = "M2,2 L10,6 L2,10 L5,6 L2,2";
      arrowMarkerRed
        .append("path")
        .attr("d", arrow_path)
        .attr("fill", "red");

      // 画线
      // const glink =  graph.append('g').selectAll('.link');
      // const linker = glink.data(this.datas.calls).enter().append('g');

      const link = graph
        .append("g")
        .selectAll(".micro-link")
        .data(links)
        .enter()
        .append("g")
        .append("path")
        .attr("class", "micro-link")
        .attr("stroke-dasharray", () => "30 3")
        .attr("stroke", () => "rgba(183, 28, 28, 0.9)")
        .attr("marker-end", () => "url(#arrowred)");
      //   const link = svg
      //     .append("g")
      //     .attr("stroke", "red")
      //     .attr("stroke-dasharray", () => "30 3")
      //     .attr("stroke-opacity", 0.6)

      //     .selectAll("line")
      //     .data(links)
      //     .join("line")
      //     .attr("stroke-width", d => Math.sqrt(d.value))

      //     .attr("marker-end", () => {
      //       return "url(#arrowred)"; //引用箭头
      //     });
      // 画圈
      const diagonal = d3
        .linkHorizontal()
        .source(d => {
          d.sx = d.source.x;
          d.sy = d.source.y;
          //右边开始画
          d.sx = d.source.x + lengthName(d.source.name);
          return [d.source.x + lengthName(d.source.name), d.source.y];
        })
        .target(d => {
          d.tx = d.target.x;
          d.ty = d.target.y;
          if (Math.abs(d.source.x - d.target.x) < 40) {
            return [d.target.x, d.target.y];
          }
          if (
            Math.abs(
              d.source.x +
                lengthName(d.source.name) -
                d.target.x -
                lengthName(d.target.name)
            ) < 40
          ) {
            d.tx = d.target.x + lengthName(d.target.name);
            return [d.target.x + lengthName(d.target.name), d.target.y];
          }
          if (d.source.x < d.target.x) {
            return [d.target.x, d.target.y];
          }
          d.tx = d.target.x + lengthName(d.target.name);
          return [d.target.x + lengthName(d.target.name), d.target.y];
        });
      const diagonalvertical = d3
        .linkVertical()
        .source(d => {
          d.sx = d.source.x;
          d.sy = d.source.y;
          //从右边开始画
          d.sx = d.source.x + lengthName(d.source.name);
          return [d.source.x + lengthName(d.source.name), d.source.y];
        })
        .target(d => {
          d.tx = d.target.x;
          d.ty = d.target.y;
          if (Math.abs(d.source.x - d.target.x) < 40) {
            return [d.target.x, d.target.y];
          }
          if (
            Math.abs(
              d.source.x +
                lengthName(d.source.name) -
                d.target.x -
                lengthName(d.target.name)
            ) < 40
          ) {
            d.tx = d.target.x + lengthName(d.target.name);
            return [d.target.x + lengthName(d.target.name), d.target.y];
          }
          if (d.source.x < d.target.x) {
            return [d.target.x, d.target.y];
          }
          d.tx = d.target.x + lengthName(d.target.name);
          return [d.target.x + lengthName(d.target.name), d.target.y];
        });
      // this.node(graph, nodes);
      const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)

        .selectAll("circle")
        .data(nodes) // 载入数据
        .join("circle")
        .attr("r", 5)
        .attr("fill", this.color())
        .call(this.drag(simulation));

      node.append("title").text(d => d.id);

      simulation.on("tick", () => {
        link.attr("stroke-width", 1).attr("d", d => {
          let r = Math.abs(d.sx - d.tx) - Math.abs(d.sy - d.ty);
          if (r > 0) return diagonal(d);
          if (r < 0) return diagonalvertical(d);
          return diagonal(d);
        });
        // link
        //   .attr("class", "link")
        //   .attr("x1", d => {
        //     // console.log(d);
        //     return d.source.x;
        //   })
        //   .attr("y1", d => d.source.y)
        //   .attr("x2", d => d.target.x)
        //   .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x).attr("cy", d => d.y);
        // linkText;
      });

      // invalidation.then(() => simulation.stop());

      return svg.node();
    },
    color() {
      const scale = d3.scaleOrdinal(d3.schemeCategory10);
      return d => scale(d.group);
    },

    drag(simulation) {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.01).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
    node(graph, nodes) {
      const gnode = graph.append("g").selectAll(".node");

      const node = gnode
        .data(nodes)
        .enter()
        .append("g");
      // .call(drag()
      //     .on('start', this.dragstart)
      //     .on('drag', this.dragged)
      //     .on('end', this.dragended)
      // )
      // .on('click', function(d, i) {
      //   event.stopPropagation();
      //   that.node.attr('class', '');
      //   d3.select(this).attr('class', 'node-active');
      //   const copyD = JSON.parse(JSON.stringify(d));
      //   delete copyD.x;
      //   delete copyD.y;
      //   delete copyD.vx;
      //   delete copyD.vy;
      //   delete copyD.fx;
      //   delete copyD.fy;
      //   delete copyD.index;
      //   that.$emit('setCurrentApp', copyD);
      //   that.toggleNode(that.node, d, true);
      //   that.toggleLine(that.line, d, true);
      //   // this.toggleMarker(marker, currNode, true);
      //   that.toggleLineText(that.linkText, d, true);
      // });
      node
        .append("rect")
        .attr("class", d => {
          if (d.sla) {
            if (d.sla < 100) {
              return "node-error";
            } else if (d.sla > 100 && d.sla < 10000) {
              return "node-error";
            }
          }
          return "node";
        })
        .attr("x", d => d.x + 100)
        .attr("y", d => d.y + 100)
        .attr("rx", 17)
        .attr("ry", 17)
        .attr("width", function() {
          return 50;
        })
        .attr("height", 34);

      //   node
      //     .append("text")
      //     .attr("font-size", 10)
      //     .attr("text-anchor", "middle")
      //     // .attr("x", d => {
      //     //   console.log(d);
      //     //   return d.x + 48;
      //     // })
      //     // .attr("y", 21)
      //     .attr("cx", d => d.x)
      //     .attr("cy", d => d.y)
      //     .attr("font-weight", 600)
      //     .text(d => {
      //       if (!d.sla) return;
      //       const temp = d.sla > 100 ? d.sla / 100 : d.sla;
      //       if (temp === 100) return;
      //       const rate = 100 - temp;
      //       return rate.toFixed(1) + "%";
      //     })
      //     .attr("fill", "rgb(240, 84, 20)");
      //   node
      //     .append("text")
      //     .attr("class", "node-name ellipsis")
      //     .attr("x", 38)
      //     .attr("font-size", 13)
      //     .attr("y", 21)
      //     .attr("title", d => d.name | "hello")
      //     .text(d => d.name || "hello")
      //     .attr("fill", "#fafafa");
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less">
.micro-topo-container {
  text-align: center;
  border-radius: 2px;
  overflow: hidden;
}
.micro-link {
  stroke-linecap: round;
  fill: rgba(255, 255, 255, 0);
  border: #35a5e5 1px solid;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  animation: dash 6s linear infinite;
}
@keyframes dash {
  from {
    stroke-dashoffset: 220;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.linkText {
  display: inline-block;
  padding: 6px;
  font-family: SimSun;
  fill: #eee;
}
</style>