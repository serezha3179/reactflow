import React, { useCallback, useState, useRef } from "react";
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges,ReactFlowProvider, addEdge,getIncomers,getOutgoers,getConnectedEdges,Position } from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = []
const initialEdges = []

let id = 0

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges)

    // const incomers = getOutgoers(
    //     { id: 'd0', },
    //     nodes,
    //     edges,
    //   );
    //   window.addEventListener('click', (e) => {
    //     // console.log(connectedEdges) 
    //     console.log(incomers)
        
    //   })
    //   const yPos = useRef(0);
      const addStart = useCallback(() => {
        // yPos.current += 50;
        setNodes((nodes) => {
          return [
            ...nodes,
            {
              id: "start" + id++,
              position: { x: 50, y: 50 },
              data: { label: 'Start' },
              type: 'input',
              style: {background: "#F5E5FF"}
            }
          ];
        });
      }, []);

      const addClient = useCallback(() => {
        // yPos.current += 50;
        setNodes((nodes) => {
          return [
            ...nodes,
            {
              id: "client" + id++,
              position: { x: 50, y: 100 },
              data: { label: 'Client' },
              style: {background: "#E8F7FF"}
            }
          ];
        });
      }, []);

      const addOperator = useCallback(() => {
        // yPos.current += 50;
        setNodes((nodes) => {
          return [
            ...nodes,
            {
              id: "client" + id++,
              position: { x: 50, y: 150 },
              data: { label: 'Operator' },
              style: {background: "#E6FFE4"}
            }
          ];
        });
      }, []);

      const addForbidden = useCallback(() => {
        // yPos.current += 50;
        setNodes((nodes) => {
          return [
            ...nodes,
            {
              id: "client" + id++,
              position: { x: 50, y: 200 },
              type: "output",
              data: { label: 'Forbidden' },
              style: {background: "#FFE0E0"}
            }
          ];
        });
      }, []);

      const addFinish = useCallback(() => {
        // yPos.current += 50;
        setNodes((nodes) => {
          return [
            ...nodes,
            {
              id: "client" + id++,
              position: { x: 50, y: 250 },
              data: { label: 'Finish' },
              type: 'output',
              style: {background: "#F5E5FF"}
            }
          ];
        });
      }, []);
    
      // const addEdge = useCallback(({ source, target }) => {
      //   setEls((els) => {
      //     console.log(source, target);
      //     return [
      //       ...els,
      //       {
      //         id: "z" + Math.random(),
      //         source,
      //         target
      //       }
      //     ];
      //   });
      // }, []);
      const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
      );
       const onNodesChange = useCallback(
            (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
            []
          );
          const onEdgesChange = useCallback(
            (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
            []
          );
    
          // удаление узла без потери связей
          const onNodesDelete = useCallback(
            (deleted) => {
              setEdges(
                deleted.reduce((acc, nod) => {
                  const incomers = getIncomers(nod, nodes, edges);
                  const outgoers = getOutgoers(nod, nodes, edges);
                  const connectedEdges = getConnectedEdges([nod], edges);
        
                  const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
        
                  const createdEdges = incomers.flatMap(({ id: source }) =>
                    outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
                  );
        
                  return [...remainingEdges, ...createdEdges];
                }, edges)
              );
            },
            [nodes, edges]
          );  

    return ( 
        <div className="Flow">
        <div className="Flowinner" style={{ height: "100%" }}>
          <ReactFlow 
          nodes={nodes} 
          // onConnect={addEdge} 
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
        //   nodeTypes={nodeTypes}
          >
          <Controls />
          </ReactFlow>
        </div>
        <div className="button-wrapper">
            <button className="flow-button" onClick={addStart}>Start</button>
            <button className="flow-button" onClick={addClient}>Client</button>
            <button className="flow-button" onClick={addOperator}>Operator</button>
            <button className="flow-button" onClick={addForbidden}>Forbidden</button>
            <button className="flow-button" onClick={addFinish}>Finish</button>
        </div>
      </div>
     );
}

export default Flow;