import React, { useState } from 'react';
import './App.css';
import { parse } from './parser/parser'
import { AstError } from './parser/errors'
import { Button, Grid, TextField } from '@material-ui/core';
import { BinaryOp, Id, Root, UnaryOp } from './parser/nodes';

export const ModeContext = React.createContext({});
export const AstTreeMapping = React.createContext({});
export const InsertionAstTree = React.createContext({});
export const RegenerateGraph = React.createContext({});

const offMode = {
  isFreeMode: false,
  isEraseMode: false,
  isInsertDoubleCutMode: false,
  isDeleteDoubleCutMode: false,
  isIterationMode: false,
  isDeiterationMode: false,
}

function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState()
  const [astTree, setAstTree] = useState({})
  const [astMapping, setAstMapping] = useState({})

  const [insertionInput, setInsertionInput] = useState("")
  const [insertionOutput, setInsertionOutput] = useState()
  const [insertionAstTree, setInsertionAstTree] = useState()


  const [modes, setModes] = useState({
    ...offMode, isFreeMode: true
  })

  function dfs(node, parent, setMapping) {
    if (!node) return setMapping;
    setMapping[node.myKey] = node;
    if (node instanceof Root) {
      node.parent = parent
      return dfs(node.child, node, setMapping)
    } else if (node instanceof Id) {
      node.parent = parent;
      return setMapping;
    } else if (node instanceof UnaryOp) {
      node.parent = parent;
      return dfs(node.expr, node, setMapping);
    } else if (node instanceof BinaryOp) {
      node.parent = parent;
      var temp = dfs(node.left, node, setMapping);
      return dfs(node.right, node, temp);
    }
  }

  function drawGraph(userInput) {
    try {
      const parsed = parse(userInput)
      const root = new Root(parsed)
      var newMapping = dfs(root, 0, {})
      console.log(root)
      setAstMapping(newMapping)
      setAstTree(root)
      setOutput(root.render(0))
    } catch (error) {
      if (error instanceof AstError) {
        return error.toString()
      } else {
        throw error
      }
    }
  }

  function regenGraph() {
    var newMapping = dfs(astTree, 0, {})
    setAstMapping(newMapping)
    setOutput(astTree.render(0))
    setInsertionOutput()
    setInsertionAstTree()
  }

  function drawInsertion(userInput) {
    try {
      const parsed = parse(userInput)
      dfs(parsed, 0, {})
      setInsertionAstTree(parsed)
      setInsertionOutput(parsed.render(0))
    } catch (error) {
      if (error instanceof AstError) {
        return error.toString()
      } else {
        throw error
      }
    }
  }

  return (
    <div style={{
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
      minWidth: "800px",
      maxWidth: "1600px",
    }}>
      <header>
        <div
          style={{
            margin: 'auto',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            minWidth: "800px",
            maxWidth: "1600px",
          }}>
          <h1>Peirce's Alpha System by Gabriel Yeo</h1>
        </div>
      </header>
      <RegenerateGraph.Provider value={regenGraph}>
        <ModeContext.Provider value={modes}>
          <AstTreeMapping.Provider value={astMapping}>
            <InsertionAstTree.Provider value={insertionAstTree}>
              <div
                style={{
                  margin: 'auto',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  minWidth: "800px",
                  maxWidth: "1600px",
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={11}>
                    <TextField fullWidth id="outlined-basic" label="Input" variant="outlined" value={input} onChange={e => setInput(e.target.value)} />
                  </Grid>
                  <Grid item xs={1} >
                    <Button variant="contained" disabled={!modes.isFreeMode} color={"primary"} onClick={() => { modes.isFreeMode && drawGraph(input) }} >
                      Generate
            </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'nowrap',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                    }}>
                      <Button variant="contained" style={{ margin: '4px' }} color={modes.isFreeMode ? "primary" : "secondary"} onClick={() => setModes({ ...offMode, isFreeMode: !modes.isFreeMode })} >
                        Allow Generate: {modes.isFreeMode ? "On" : "Off"}
                      </Button>

                      <Button variant="contained" color={modes.isEraseMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isEraseMode: !modes.isEraseMode })} style={{ margin: '4px' }} >
                        Erase
                </Button>
                      <Button variant="contained" color={modes.isInsertDoubleCutMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isInsertDoubleCutMode: !modes.isInsertDoubleCutMode })} style={{ margin: '4px' }} >
                        Insert Double Cut
                </Button>
                      <Button variant="contained" color={modes.isDeleteDoubleCutMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isDeleteDoubleCutMode: !modes.isDeleteDoubleCutMode })} style={{ margin: '4px' }} >
                        Delete Double Cut
                </Button>
                      <Button variant="contained" color={modes.isIterationMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isIterationMode: !modes.isIterationMode })} style={{ margin: '4px' }} >
                        Iteration
                </Button>
                      <Button variant="contained" color={modes.isDeiterationMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isDeiterationMode: !modes.isDeiterationMode })} style={{ margin: '4px' }} >
                        Deiteration
                </Button>
                    </div>
                  </Grid>
                  <Grid item xs={4} style={{ minHeight: "300px" }}>
                    <div style={{
                      display: 'flex',
                      height: "100%",
                      minHeight: "300px",
                      width: "100%",
                      flexDirection: 'column',
                      flexWrap: 'nowrap',
                      border: "solid",
                    }}>
                      <div style={{ textAlign: "center" }}>Insertion Pane</div>
                      <TextField fullWidth id="outlined-basic" label="Input" variant="outlined" value={insertionInput} onChange={e => setInsertionInput(e.target.value)} />
                      <Button variant="contained" style={{ margin: '4px' }} onClick={() => drawInsertion(insertionInput)} >
                        Create
                   </Button>
                      {insertionOutput}
                      <Button variant="contained" color={modes.isInsertionMode ? "secondary" : "default"} style={{ margin: '4px' }} onClick={() => setModes({ ...offMode, isInsertionMode: !modes.isInsertionMode })} >
                        Insert
                   </Button>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                    }}>
                      {output}
                    </div>
                  </Grid>
                </Grid>
              </div >
            </InsertionAstTree.Provider>
          </AstTreeMapping.Provider>
        </ModeContext.Provider>
      </RegenerateGraph.Provider>
    </div >
  );
}

export default App;
