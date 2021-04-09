import { styled } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import React, { useContext, useRef, useState } from 'react';
import Draggable from './Draggable'
import { AstTreeMapping, InsertionAstTree, ModeContext, RegenerateGraph } from '../App'

const StyledDiv = styled(Box)({
  display: 'flex',
  flexWrap: 'nowrap',
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
});

export const AndBox = props => {
  const [enclosing,] = useState(props.enclosing)

  const Modes = useContext(ModeContext)
  const Mapping = useContext(AstTreeMapping)
  const AstTreeToInsert = useContext(InsertionAstTree)
  const Reload = useContext(RegenerateGraph)

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (Modes.isEraseMode) {
      if (enclosing % 2 === 0) {
        Mapping[props.ident].deleteSelf()
        Reload()
      }
    }
    if (Modes.isDeleteDoubleCutMode) {
      alert("Not a cut!")
    }
    if (Modes.isInsertionMode && Mapping.hasOwnProperty(props.ident)) {
      if (enclosing % 2 === 1) {
        Mapping[props.ident].insert(AstTreeToInsert)
        Reload()
      } else {
        alert("Cannot insert to even enclosed spaces!")
      }
    }
    if (Modes.isInsertDoubleCutMode) {
      Mapping[props.ident].insertDoubleCut()
      Reload()
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
  const AstTreeToInsert = useContext(InsertionAstTree)
  const Reload = useContext(RegenerateGraph)

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (Modes.isEraseMode) {
      if (enclosing % 2 === 0) {
        Mapping[props.ident].deleteSelf()
        Reload()
      }
    }
    if (Modes.isDeleteDoubleCutMode) {
      alert("Not a cut! Select a cut directly inside another cut to delete double cut.")
    }
    if (Modes.isInsertionMode && Mapping.hasOwnProperty(props.ident)) {
      if (enclosing % 2 === 1) {
        Mapping[props.ident].insert(AstTreeToInsert)
        Reload()
      } else {
        alert("Cannot insert to even enclosed spaces!")
      }
    }
    if (Modes.isInsertDoubleCutMode) {
      Mapping[props.ident].insertDoubleCut()
      Reload()
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
  const AstTreeToInsert = useContext(InsertionAstTree)
  const Reload = useContext(RegenerateGraph)

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
      if (enclosing % 2 === 0) {
        Mapping[props.ident].deleteSelf()
        Reload()
      }
    }
    if (Modes.isDeleteDoubleCutMode) {
      if (props.parentIsCut) {
        Mapping[props.ident].deleteDoubleCut()
        Reload()
      } else {
        alert("This cut is not the direct child of another cut! Select a cut directly inside another cut to delete double cut.")
      }
    }
    if (Modes.isInsertionMode && Mapping.hasOwnProperty(props.ident)) {
      if (enclosing % 2 === 1) {
        Mapping[props.ident].insert(AstTreeToInsert)
        Reload()
      } else {
        alert("Cannot insert to even enclosed spaces!")
      }
    }
    if (Modes.isInsertDoubleCutMode) {
      Mapping[props.ident].insertDoubleCut()
      Reload()
    }
  }

  return (
    <StyledNegativeBox onClick={myClickHandler}>{childrenWithProps}</StyledNegativeBox>
  )
}

export const DraggableBox = props => {
  const ref = useRef(null);
  Draggable(ref);
  return (
    <StyledDiv ref={ref} className="draggableBox">{props.children}</StyledDiv>
  )
}
