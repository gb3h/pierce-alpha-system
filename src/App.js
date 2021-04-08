import React, { useState } from 'react';
import './App.css';
import { parse } from './parser/parser'
import { AstError } from './parser/errors'
import { Button, Grid, TextField } from '@material-ui/core';
import { DraggableBox } from './components/items';
import { BinaryOp, Id, UnaryOp } from './parser/nodes';

export const ModeContext = React.createContext({});
export const AstTreeMapping = React.createContext({});

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
  const [insertionInput, setInsertionInput] = useState("")
  const [output, setOutput] = useState()
  const [insertionOutput, setInsertionOutput] = useState("")

  const [astMapping, setAstMapping] = useState({})

  const [modes, setModes] = useState({
    ...offMode, isFreeMode: true
  })

  function dfs(node, parent, setMapping) {
    setMapping({ ...astMapping, [node.myKey]: node });
    if (node instanceof Id) {
      node.parent = parent;
    } else if (node instanceof UnaryOp) {
      node.parent = parent;
      dfs(node.expr, node, setMapping);
    } else if (node instanceof BinaryOp) {
      node.parent = parent;
      dfs(node.left, node, setMapping);
      dfs(node.right, node, setMapping);
    }
  }

  function handleUserInput(userInput, fun) {
    try {
      const parsed = parse(userInput)
      setAstMapping({})
      dfs(parsed, 0, setAstMapping)
      fun(parsed.render(0))
    } catch (error) {
      if (error instanceof AstError) {
        return error.toString()
      } else {
        throw error
      }
    }
  }

  function drawInsertion(userInput) {
    try {
      setInsertionOutput(<div></div>)
      const parsed = parse(userInput)
      console.log(parsed)
      setInsertionOutput(
        <DraggableBox>
          {parsed.render(0)}
        </DraggableBox>
      )
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
          <h1>Pierce's Alpha System by Gabriel Yeo</h1>
        </div>
      </header>
      <ModeContext.Provider value={modes}>
        <AstTreeMapping.Provider value={astMapping}>
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
                <Button variant="contained" color={modes.isFreeMode ? "primary" : "secondary"} onClick={() => { modes.isFreeMode && handleUserInput(input, setOutput) }} >
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
                  <Button variant="contained" style={{ margin: '4px' }} onClick={() => drawInsertion(insertionInput)} >
                    Insert
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
              <Grid item xs={2} style={{ minHeight: "300px" }}>
                <div style={{
                  display: 'flex',
                  height: "100%",
                  minHeight: "300px",
                  width: "100%",
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  backgroundColor: '#f1f1f1',
                  border: "solid",
                }}>
                  <div style={{ textAlign: "center" }}>Insertion Pane</div>
                  <TextField fullWidth id="outlined-basic" label="Input" variant="outlined" value={insertionInput} onChange={e => setInsertionInput(e.target.value)} />
                  {insertionOutput}
                </div>
              </Grid>
              <Grid item xs={8}>
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
        </AstTreeMapping.Provider>
      </ModeContext.Provider>
    </div >
  );
}

export default App;
