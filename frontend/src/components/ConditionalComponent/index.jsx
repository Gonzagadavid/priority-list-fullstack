function ConditionalComponent({ children, condition }) {
  if (!condition) return null;
  return [children];
}

export default ConditionalComponent;
