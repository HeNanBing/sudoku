const Controls = ({ handleCheck, handleReset, handleNewPuzzle, handleUndo, canUndo }) => {
  return <div className="controls">
    <button onClick={handleCheck} style={{ marginRight: '8px' }}>Check</button>
    <button onClick={handleUndo} style={{ marginRight: '8px' }} disabled={!canUndo}>Undo</button>
    <button onClick={handleReset} style={{ marginRight: '8px' }}>Reset</button>
    <button onClick={handleNewPuzzle}>New Puzzle</button>
  </div>;
}

export default Controls;