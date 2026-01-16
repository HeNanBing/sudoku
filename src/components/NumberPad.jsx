const NumberPad = ({ onNumberSelect }) => {
  return (
    <div className="number-pad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button key={num} onClick={() => onNumberSelect(num)} className="number-btn">
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
