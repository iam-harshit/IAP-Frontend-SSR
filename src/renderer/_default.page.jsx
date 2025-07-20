export { Layout };

function Layout({ children }) {
  return (
    <div>
      <div id="react-root">{children}</div>
    </div>
  );
}
