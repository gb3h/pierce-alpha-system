import React from 'react';
import './App.css';
import { parse } from './parser/parser'
import { AstError } from './parser/errors'
import Terminal from 'terminal-in-react';

function App() {
  function handleUserInput(userInput) {
    try {
      const parsed = parse(userInput)
      console.log(parsed)
    } catch (error) {
      if (error instanceof AstError) {
        return error.toString()
      } else {
        throw error
      }
    }

  }

  const InputTerminal = () => {
    return (<Terminal
      backgroundColor='black'
      barColor='gray'
      prompt='white'
      color='#89f238'
      outputColor='#89f238'
      style={{ fontWeight: "bold", fontSize: "0.7em" }}
      commands={{
        'ocaml-help': () => {
          window.open('https://ocaml.org/learn/taste.html', "_blank")
          window.focus()
        },
        'baby-camels': () => {
          window.open('https://www.youtube.com/watch?v=o3x_b95KspA', "_blank")
          window.focus()
        }
      }}
      descriptions={{
        'ocaml-help': 'open ocaml examples page',
        'baby-camels': 'easter egg :P'
      }}
      commandPassThrough={cmd => {
        const inputString = cmd.join(" ")
        return handleUserInput(inputString)
      }}
      msg='Input any expression in OCaml below. For help with OCaml, try `ocaml-help`. E.g. `fun a -> fun b -> fun c -> (a c (b c))`'
    />)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            width: "75%"
          }}
        >
          <h1>OCaml Type Checker</h1>
          <p>Hello there! Welcome to our OCaml type checker based on {' '}
            <a
              href="https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#ff8080" }}>
              Hindley-Milner Type Inference (Algorithm W)
            </a>.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw"
          }}
        >
          <InputTerminal />
        </div>
      </header>
    </div>
  );
}

export default App;
