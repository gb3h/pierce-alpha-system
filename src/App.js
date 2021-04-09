import React, { useState } from 'react';
import './App.css';
import { parse } from './parser/parser'
import { AstError } from './parser/errors'
import { Button, Grid, TextField } from '@material-ui/core';
import { BinaryOp, Id, Root, UnaryOp } from './parser/nodes';

export const ModeContext = React.createContext({});
export const AstTreeMapping = React.createContext({});
export const InsertionAstTree = React.createContext({});
export const GraphFunction = React.createContext({});

const offMode = {
  isFreeMode: false,
  isEraseMode: false,
  isInsertDoubleCutMode: false,
  isDeleteDoubleCutMode: false,
  isIterationMode: false,
  isDeiterationMode: false,
  iteratorSelected: false,
}

const DEFAULT_ROOT = new Root(undefined)
const DEFAULT_MAPPING = { [DEFAULT_ROOT.myKey]: DEFAULT_ROOT }

function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState(DEFAULT_ROOT.render(0))
  const [astTree, setAstTree] = useState(DEFAULT_ROOT)
  const [astMapping, setAstMapping] = useState(DEFAULT_MAPPING)

  const [insertionInput, setInsertionInput] = useState("")
  const [insertionOutput, setInsertionOutput] = useState()
  const [insertionAstTree, setInsertionAstTree] = useState()

  const [iterationAstTree, setIterationAstTree] = useState()
  const [iterationOutput, setIterationOutput] = useState()

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
      console.log(newMapping)
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

  function hardReload() {
    var newMapping = dfs(astTree, 0, {})
    setAstMapping(newMapping)
    setOutput(astTree.render(0))
    setModes({ ...offMode, isFreeMode: modes.isFreeMode })
  }

  function softReload() {
    var newMapping = dfs(astTree, 0, {})
    setAstMapping(newMapping)
    setOutput(astTree.render(0))
  }

  function loadIterationPane(tree) {
    setIterationAstTree(tree)
    setIterationOutput(tree.render(0))
  }

  function insert(id) {
    astMapping[id].insert(insertionAstTree)
    setInsertionAstTree()
    setInsertionOutput()
    hardReload()
  }

  function iterate(id) {
    const parentKey = iterationAstTree.myKey;
    if (astMapping[parentKey].isChild(id)) {
      astMapping[id].insert(iterationAstTree)
      setIterationAstTree()
      setIterationOutput()
      hardReload()
    } else {
      alert("Selected area is not a valid area based on the chosen iterator.")
    }
  }

  function deiterate(id) {
    const parentKey = iterationAstTree.myKey;
    if (astMapping[parentKey].isSameType(astMapping[id])) {
      astMapping[id].deleteSelf()
      setIterationAstTree()
      setIterationOutput()
      hardReload()
    } else {
      alert("Selected sub-graph is not valid based on the chosen deiterator.")
    }
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
      <GraphFunction.Provider value={{ hardReload, loadIterationPane, setModes, insert, iterate, softReload, deiterate }}>
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
                        Mode: {modes.isFreeMode ? "Free Edit" : "Rule Based"}
                      </Button>
                      <Button variant="contained" color={modes.isEraseMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isFreeMode: modes.isFreeMode, isEraseMode: !modes.isEraseMode })} style={{ margin: '4px' }} >
                        Erase
                      </Button>
                      <Button variant="contained" disabled={modes.isFreeMode} color={modes.isInsertDoubleCutMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isInsertDoubleCutMode: !modes.isInsertDoubleCutMode })} style={{ margin: '4px' }} >
                        Insert Double Cut
                      </Button>
                      <Button variant="contained" disabled={modes.isFreeMode} color={modes.isDeleteDoubleCutMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isDeleteDoubleCutMode: !modes.isDeleteDoubleCutMode })} style={{ margin: '4px' }} >
                        Delete Double Cut
                      </Button>
                      <Button variant="contained" color={modes.isIterationMode ? modes.iteratorSelected ? "primary" : "secondary" : "default"} onClick={() => {
                        !modes.isIterationMode && alert("First, click the sub-graph you wish to iterate.")
                        setModes({ ...offMode, isIterationMode: !modes.isIterationMode })
                      }
                      }
                        disabled={modes.isFreeMode}
                        style={{ margin: '4px' }} >
                        Iterate
                      </Button>
                      <Button variant="contained" color={modes.isDeiterationMode ? modes.iteratorSelected ? "primary" : "secondary" : "default"} onClick={() => {
                        !modes.isIterationMode && alert("First, click the parent of the sub-graph you wish to deiterate.")
                        setModes({ ...offMode, isDeiterationMode: !modes.isDeiterationMode })
                      }
                      }
                        disabled={modes.isFreeMode}
                        style={{ margin: '4px' }} >
                        Deiterate
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
                      <Button variant="contained" disabled={!insertionOutput} color={modes.isInsertionMode ? "secondary" : "default"} style={{ margin: '4px' }} onClick={() => setModes({ ...offMode, isFreeMode: modes.isFreeMode, isInsertionMode: !modes.isInsertionMode })} >
                        Insert
                        </Button>
                      {insertionOutput}
                    </div>
                    <div style={{
                      marginTop: '8px',
                      display: 'flex',
                      height: "100%",
                      minHeight: "150px",
                      width: "100%",
                      flexDirection: 'column',
                      flexWrap: 'nowrap',
                      border: "solid",
                    }}>
                      <div style={{ textAlign: "center" }}>De/iteration Pane</div>
                      <Button variant="contained" disabled={modes.isFreeMode} style={{ margin: '4px' }} onClick={() => { setIterationAstTree(); setIterationOutput(); setModes({ ...modes, iteratorSelected: false }) }} >
                        Clear Pane
                        </Button>
                      {iterationOutput}
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
      </GraphFunction.Provider>
    </div >
  );
}

export default App;
