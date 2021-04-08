import React, { useState } from 'react';
import './App.css';
import { parse } from './parser/parser'
import { AstError } from './parser/errors'
import { Button, Grid, TextField } from '@material-ui/core';
import { DraggableBox } from './components/items';

export const ModeContext = React.createContext({});

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

  const [modes, setModes] = useState({
    ...offMode, isFreeMode: true
  })

  function handleUserInput(userInput, fun) {
    try {
      const parsed = parse(userInput)
      console.log(parsed)
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

  function toggleMode(mode, setMode) {
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
                <Button variant="contained" style={{ margin: '4px' }} color={modes.isFreeMode ? "primary" : "secondary"} onClick={() => setModes({ ...modes, isFreeMode: !modes.isFreeMode })} >
                  Allow Generate: {modes.isFreeMode ? "On" : "Off"}
                </Button>
                <Button variant="contained" style={{ margin: '4px' }} onClick={() => drawInsertion(insertionInput)} >
                  Insertion
                </Button>
                <Button variant="contained" color={modes.isEraseMode ? "secondary" : "default"} onClick={() => setModes({ ...offMode, isEraseMode: !modes.isEraseMode })} style={{ margin: '4px' }} >
                  Toggle Erase
                </Button>
                <Button variant="contained" style={{ margin: '4px' }} >
                  Toggle Insert Double Cut
                </Button>
                <Button variant="contained" style={{ margin: '4px' }} >
                  Toggle Delete Double Cut
                </Button>
                <Button variant="contained" style={{ margin: '4px' }}  >
                  Iteration
                </Button>
                <Button variant="contained" style={{ margin: '4px' }} >
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
      </ModeContext.Provider>
    </div >
  );
}

export default App;
