import * as d3 from 'd3'
import { sankey, sankeyCenter, sankeyLinkHorizontal } from 'd3-sankey'
import { useEffect, useRef } from 'react'

type SankeyGraphProps = {
    data: { nodes: Array<any>, links: Array<any> }
    width?: number,
    height?: number,
}

const SankeyGraph = ({ data, height = 900, width = 2000 }: SankeyGraphProps) => {
    const svgRef = useRef(null)


    // Create a lookup object for node indices
    const nodeLookup = data.nodes.reduce((acc: Record<string, any>, node, index) => {
        acc[node.node] = index;
        return acc;
    }, {});

    // Map the source and target properties in the links array to indices
    data.links = data.links.map(link => ({
        source: nodeLookup[link.source],
        target: nodeLookup[link.target],
        value: link.value
    }));


    useEffect(() => {
        const svg = d3.select(svgRef.current)

        svg.selectAll('*').remove()

        const { nodes, links } = sankey().nodeAlign(sankeyCenter).nodeWidth(15).nodePadding(5).extent([[1, 1], [width - 1, height - 5]])
            ({
                nodes: data.nodes.map((d) => Object.assign({}, d)),
                links: data.links.map((d) => Object.assign({}, d)),
            })
        const colors = d3.schemeTableau10
        svg.append('g')
            .selectAll('rect')
            .data(nodes)
            .enter()
            .append('rect')
            .attr('x', (d: any) => d.x0)
            .attr('y', (d: any) => d.y0)
            .attr('height', (d: any) => d.y1 - d.y0)
            .attr('width', (d: any) => d.x1 - d.x0)
            // .attr('fill', 'steelblue')
            .attr('fill', (d: any, i: number) => colors[i % colors.length])
            .attr('stroke', '#000');

        // Define gradients
        const defs = svg.append('defs');

        links.forEach((link: any, i) => {
            const gradientID = `gradient${i}`;

            const gradient = defs.append('linearGradient')
                .attr('id', gradientID)
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', link.source.x1)
                .attr('y1', (link.source.y0 + link.source.y1) / 2)
                .attr('x2', link.target.x0)
                .attr('y2', (link.target.y0 + link.target.y1) / 2);

            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', colors[link.source.index % colors.length]);

            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', colors[link.target.index % colors.length]);
        });

        // Add links
        svg.append('g')
            .attr('fill', 'none')
            .attr('stroke', '#000')
            .attr('stroke-opacity', 0.5)
            .selectAll('path')
            .data(links)
            .enter().append('path')
            .attr('d', sankeyLinkHorizontal())
            .attr('stroke-width', (d: any) => Math.max(1, d.width))
            .attr('stroke', (d: any, i: number) => `url(#gradient${i})`);


        // Add node labels
        svg.append('g')
            .style('font', '14px sans-serif')
            .selectAll('text')
            .data(nodes)
            .enter().append('text')
            .attr('x', (d: any) => d.x0 - 6)
            .attr('y', (d: any) => (d.y1 + d.y0) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            // .style('fill', 'white') // Set text color to white
            .text((d: any) => d.name)
            .filter((d: any) => d.x0 < width / 2)
            .attr('x', (d: any) => d.x1 + 6)
            .attr('text-anchor', 'start');

    }, [data])

    return (
        <svg ref={svgRef} width={width} height={height} />
    )
}

export default SankeyGraph