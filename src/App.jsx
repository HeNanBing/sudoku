import { useEffect, useState } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import NumberPad from './components/NumberPad';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import { fetchPuzzle } from './fetch-puzzle';


const App = () => {

  const [board, setBoard] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  // [row, col]
  const [selected, setSelected] = useState(null);
  const [greenCount, setGreenCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('sudoku-theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sudoku-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addToHistory = (row, col, newValue) => {
    setHistory(prev => [...prev, {
      row, col,
      previousValue: board[row][col],
      newValue
    }]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastMove = history[history.length - 1];
    setBoard(prev => prev.map((rowArr, r) => 
      rowArr.map((cell, c) => 
        (r === lastMove.row && c === lastMove.col) 
          ? lastMove.previousValue 
          : cell
      )
    ));
    setHistory(prev => prev.slice(0, -1));
  };

  const handleNumberSelect = (number) => {
    if (!selected) return;
    const [row, col] = selected;
    if (puzzle[row][col] !== null) return;
    addToHistory(row, col, number);
    handleInput(row, col, number.toString());
  };

  useEffect(() => {
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
    })
  }, [])

  const handleCheck = () => {
    const flatBoard = board.flat();
    const flatSolution = solution.flat();
    if (flatBoard.every((val, idx) => val === flatSolution[idx])) {
      setStatus('Correct!');
      let count = 0;
      const totalCells = 81;
      const interval = setInterval(() => {
        count++;
        setGreenCount(count);
        if (count === totalCells) {
          clearInterval(interval);
        }
      }, 30);
    } else {
      setStatus("Incrorrect, try again.");
      setGreenCount(0);
    }
  }
  const handleReset = () => {
    setBoard(puzzle.map(row => [...row]));
    setStatus('');
    setSelected(null);
    setGreenCount(0);
    setHistory([]);
  }
  const handleNewPuzzle = () => {
    setGreenCount(0);
    setHistory([]);
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
    })
  }

  const handleInput = (rowIndex, cellIndex, value) => {
    if (value === '' || (/^[1-9]$/).test(value)) {
      setBoard(prev => 
        prev.map((row, rIdx) => 
          row.map((cell, cIdx) => 
            (rIdx === rowIndex && cIdx === cellIndex) ? (value === '' ? null : parseInt(value)) : cell
          )
        )
      )
    }
  }

  if (error) {
    return <main style={{ textAlign: 'center' }}>
      <header className="app-header">
        <h1>Sudoku</h1>
      </header>
      <div className='error'>{error}</div>
      <button onClick={handleNewPuzzle} style={{ marginTop: '16px' }}>Try Again</button>
    </main>;
  }

  if (!board) {
    return <main style={{ textAlign: 'center' }}>
      <header className="app-header">
        <h1>Sudoku</h1>
      </header>
      <div>Loading...</div>
    </main>;
  }

  return <main style={{ textAlign: 'center' }}>
    <header className="app-header">
      <h1>Sudoku</h1>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
    <div className="app-layout">
      <Grid board={board} puzzle={puzzle} selected={selected} setSelected={setSelected} handleInput={handleInput} greenCount={greenCount} />
      <div className="side-panel">
        <NumberPad onNumberSelect={handleNumberSelect} />
        <Controls handleCheck={handleCheck} handleReset={handleReset} handleNewPuzzle={handleNewPuzzle} handleUndo={handleUndo} canUndo={history.length > 0} />
      </div>
    </div>
    {status && <div className='status'>{status}</div>}
  </main>;
}

export default App;