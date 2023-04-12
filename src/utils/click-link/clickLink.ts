export const clickLink = (
  linkUrl: string,
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename"
) => {
  const a = document.createElement("a");
  a.target = target ?? "_blank";
  a.href = linkUrl;
  a.click();
  a.remove();
};
