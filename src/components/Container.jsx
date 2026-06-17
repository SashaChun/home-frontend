export default function Container({ children, style, ...rest }) {
  return (
    <div className="container" style={style} {...rest}>
      {children}
    </div>
  );
}
