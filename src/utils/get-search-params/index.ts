export const getSearchParams = () => {
  const paramsString = window.location.search.replace("?", "");
  const searchParams = new URLSearchParams(paramsString);

  return searchParams;
};
