import { styled } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import React, { useContext, useState } from 'react';
import { AstTreeMapping, GraphFunction, ModeContext } from '../App'

const StyledDiv = styled(Box)({
  display: 'flex',
  flexWrap: 'nowrap',
  backgroundColor: '#f1f1f1',
  margin: 'auto',
})

const StyledRoot = styled(Box)({
  display: 'flex',
  flexWrap: 'noWrap',
  width: '100%',
  height: '100%',
  minHeight: '100px',
  minWidth: '300px',
  margin: '8px',
  backgroundColor: '#f1f1f1',
})

const StyledLiteralBox = styled(Box)({
  backgroundColor: '#f1f1f1',
  minWidth: '32px',
  minHeight: '40px',
  padding: '0px 10px',
  textAlign: 'center',
  lineHeight: '32px',
  fontSize: '30px',
});

const StyledNegativeBox = styled(Box)({
  backgroundColor: '#f1f1f1',
  padding: '4px',
  minWidth: '20px',
  minHeight: '20px',
  textAlign: 'center',
  lineHeight: '32px',
  fontSize: '30px',
  borderStyle: 'solid',
  margin: 'auto',
});

export const AndBox = props => {
  const [enclosing,] = useState(props.enclosing)

  const Modes = useContext(ModeContext)
  const Mapping = useContext(AstTreeMapping)
  const GraphFunctions = useContext(GraphFunction)

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (Modes.isEraseMode) {
      if (Modes.isFreeMode || enclosing % 2 === 0) {
        Mapping[props.ident].deleteSelf()
        GraphFunctions.softReload()
      }
    }
    if (Modes.isDeleteDoubleCutMode) {
      alert("Not a cut!")
    }
    if (Modes.isInsertionMode && Mapping.hasOwnProperty(props.ident)) {
      if (Modes.isFreeMode || enclosing % 2 === 1) {
        GraphFunctions.insert(props.ident)
        GraphFunctions.hardReload()
      } else {
        alert("Cannot iterate to even enclosed spaces!")
      }
    }
    if (Modes.isInsertDoubleCutMode) {
      Mapping[props.ident].insertDoubleCut()
      GraphFunctions.hardReload()
    }
    if (Modes.isIterationMode && !Modes.iteratorSelected) {
      GraphFunctions.loadIterationPane(Mapping[props.ident])
      GraphFunctions.setModes({ ...Modes, iteratorSelected: true })
      alert("Now select where to iterate")
    }
    if (Modes.isIterationMode && Modes.iteratorSelected) {
      GraphFunctions.iterate(props.ident)
    }
    if (Modes.isDeiterationMode && !Modes.iteratorSelected) {
      GraphFunctions.loadIterationPane(Mapping[props.ident])
      GraphFunctions.setModes({ ...Modes, iteratorSelected: true })
      alert("Now select sub-graph to deiterate")
    }
    if (Modes.isDeiterationMode && Modes.iteratorSelected) {
      GraphFunctions.deiterate(props.ident)
    }
  }

  return (
    <StyledDiv onClick={myClickHandler}>{props.children}</StyledDiv>
  )
}

export const LiteralBox = props => {
  const [enclosing,] = useState(props.enclosing)

  const Modes = useContext(ModeContext)
  const Mapping = useContext(AstTreeMapping)
  const GraphFunctions = useContext(GraphFunction)

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (Modes.isEraseMode) {
      if (Modes.isFreeMode || enclosing % 2 === 0) {
        Mapping[props.ident].deleteSelf()
        GraphFunctions.softReload()
      }
    }
    if (Modes.isDeleteDoubleCutMode) {
      alert("Not a cut! Select a cut directly inside another cut to delete double cut.")
    }
    if (Modes.isInsertionMode && Mapping.hasOwnProperty(props.ident)) {
      if (Modes.isFreeMode || enclosing % 2 === 1) {
        GraphFunctions.insert(props.ident)
        GraphFunctions.hardReload()
      } else {
        alert("Cannot iterate to even enclosed spaces!")
      }
    }
    if (Modes.isInsertDoubleCutMode) {
      Mapping[props.ident].insertDoubleCut()
      GraphFunctions.hardReload()
    }
    if (Modes.isIterationMode && !Modes.iteratorSelected) {
      GraphFunctions.loadIterationPane(Mapping[props.ident])
      GraphFunctions.setModes({ ...Modes, iteratorSelected: true })
      alert("Now select where to iterate")
    }
    if (Modes.isIterationMode && Modes.iteratorSelected) {
      GraphFunctions.iterate(props.ident)
    }
    if (Modes.isDeiterationMode && !Modes.iteratorSelected) {
      GraphFunctions.loadIterationPane(Mapping[props.ident])
      GraphFunctions.setModes({ ...Modes, iteratorSelected: true })
      alert("Now select sub-graph to deiterate")
    }
    if (Modes.isDeiterationMode && Modes.iteratorSelected) {
      GraphFunctions.deiterate(props.ident)
    }
  }

  return (
    <StyledLiteralBox onClick={myClickHandler}>{props.children}</StyledLiteralBox>
  )
}

export const NegativeBox = props => {
  const [enclosing,] = useState(props.enclosing)

  const Modes = useContext(ModeContext)
  const Mapping = useContext(AstTreeMapping)
  const GraphFunctions = useContext(GraphFunction)

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { parentIsCut: true });
    }
    return child;
  })

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (Modes.isEraseMode) {
      if (Modes.isFreeMode || enclosing % 2 === 0) {
        Mapping[props.ident].deleteSelf()
        GraphFunctions.softReload()
      }
    }
    if (Modes.isDeleteDoubleCutMode) {
      if (props.parentIsCut) {
        Mapping[props.ident].deleteDoubleCut()
        GraphFunctions.hardReload()
      } else {
        alert("This cut is not the direct child of another cut! Select a cut directly inside another cut to delete double cut.")
      }
    }
    if (Modes.isInsertionMode && Mapping.hasOwnProperty(props.ident)) {
      if (Modes.isFreeMode || enclosing % 2 === 0) {
        GraphFunctions.insert(props.ident)
        GraphFunctions.hardReload()
      } else {
        alert("Cannot iterate to even enclosed spaces!")
      }
    }
    if (Modes.isInsertDoubleCutMode) {
      Mapping[props.ident].insertDoubleCut()
      GraphFunctions.hardReload()
    }
    if (Modes.isIterationMode && !Modes.iteratorSelected) {
      GraphFunctions.loadIterationPane(Mapping[props.ident])
      GraphFunctions.setModes({ ...Modes, iteratorSelected: true })
      alert("Now select where to iterate")
    }
    if (Modes.isIterationMode && Modes.iteratorSelected) {
      GraphFunctions.iterate(props.ident)
    }
    if (Modes.isDeiterationMode && !Modes.iteratorSelected) {
      GraphFunctions.loadIterationPane(Mapping[props.ident])
      GraphFunctions.setModes({ ...Modes, iteratorSelected: true })
      alert("Now select sub-graph to deiterate")
    }
    if (Modes.isDeiterationMode && Modes.iteratorSelected) {
      GraphFunctions.deiterate(props.ident)
    }
  }

  return (
    <StyledNegativeBox onClick={myClickHandler}>{childrenWithProps}</StyledNegativeBox>
  )
}

export const RootBox = props => {
  const [enclosing,] = useState(props.enclosing)

  const Modes = useContext(ModeContext)
  const Mapping = useContext(AstTreeMapping)
  const GraphFunctions = useContext(GraphFunction)

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (Modes.isInsertionMode && Mapping.hasOwnProperty(props.ident)) {
      if (Modes.isFreeMode || enclosing % 2 === 1) {
        GraphFunctions.insert(props.ident)
        GraphFunctions.hardReload()
      } else {
        alert("Cannot iterate to even enclosed spaces!")
      }
    }
    if (Modes.isInsertDoubleCutMode) {
      Mapping[props.ident].insertDoubleCut()
      GraphFunctions.hardReload()
    }
    if (Modes.isIterationMode && Modes.iteratorSelected) {
      GraphFunctions.iterate(props.ident)
    }
  }

  return (
    <StyledRoot onClick={myClickHandler}>{props.children}</StyledRoot>
  )
}
