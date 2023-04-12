export const getDimensionsText = (
  txt: string,
  fontFamily: string,
  fontSize: string
): { width: number; height: number } => {
  const span = document.createElement("span");
  document.body.appendChild(span);
  span.style.fontSize = fontSize;
  span.style.fontFamily = fontFamily;
  span.innerText = txt;
  const dimensions = { width: span.offsetWidth, height: span.offsetHeight };
  span.remove();
  return dimensions;
};
