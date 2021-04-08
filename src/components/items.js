import { styled } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import React, { FunctionComponent, useContext, useRef, useState } from 'react';
import Draggable from './Draggable'
import { AstTreeMapping, ModeContext } from '../App'

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
  const [deleted, setDeleted] = useState({});
  const Modes = useContext(ModeContext)

  const deleteChild = (id) => {
    setDeleted({ [id]: id, ...deleted })
  }

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { deleteChild });
    }
    return child;
  })

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (props.deleteChild && (enclosing % 2 === 0) && Modes.isEraseMode) {
      props.deleteChild(props.ident)
    }
  }

  const me = useRef(null);

  return (
    <StyledDiv ref={me} onClick={myClickHandler}>{childrenWithProps.filter(ch => !(deleted.hasOwnProperty(ch.props.ident)))}</StyledDiv>
  )
}

export const LiteralBox = props => {
  const [enclosing,] = useState(props.enclosing)
  const Modes = useContext(ModeContext)

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (props.deleteChild && (enclosing % 2 === 0) && Modes.isEraseMode) {
      props.deleteChild(props.ident)
    }
  }

  return (
    <StyledLiteralBox onClick={myClickHandler}>{props.children}</StyledLiteralBox>
  )
}

export const NegativeBox = props => {
  const [enclosing,] = useState(props.enclosing)
  const [deleted, setDeleted] = useState({});
  const [invisible, setInvisible] = useState(false);

  const Modes = useContext(ModeContext)
  const Mapping = useContext(AstTreeMapping)

  const deleteChild = (id) => {
    setDeleted({ [id]: id, ...deleted })
  }

  const deleteDoubleCut = () => {
    console.log(Mapping[props.ident])
  }

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { deleteChild, deleteDoubleCut });
    }
    return child;
  })

  const childrenWithoutParent = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { deleteChild });
    }
    return child;
  })

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (props.deleteChild && (enclosing % 2 === 0) && Modes.isEraseMode) {
      props.deleteChild(props.ident)
    }
    if (props.deleteDoubleCut && Modes.isDeleteDoubleCutMode) {
      deleteDoubleCut()
    }
  }

  return (
    invisible ?
      childrenWithoutParent.filter(ch => !(deleted.hasOwnProperty(ch.props.ident))) :
      (<StyledNegativeBox onClick={myClickHandler}> {childrenWithProps.filter(ch => !(deleted.hasOwnProperty(ch.props.ident)))}</StyledNegativeBox>)
  )
}

export const DraggableBox = props => {
  const ref = useRef(null);
  Draggable(ref);
  return (
    <StyledDiv ref={ref} className="draggableBox">{props.children}</StyledDiv>
  )
}
