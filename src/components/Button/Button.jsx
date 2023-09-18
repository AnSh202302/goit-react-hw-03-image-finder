export const Button = ({ children, onClick }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      {children}
    </button>
  );
};
