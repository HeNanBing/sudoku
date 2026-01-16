const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      aria-label={`切换到${theme === 'dark' ? '明亮' : '黑暗'}模式`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
