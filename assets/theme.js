// 시안 A/B/C 전환. 주소의 ?v= 값으로 정하고, 잘못된 값이면 A로 표시한다.
(function () {
  const v = new URLSearchParams(location.search).get("v");
  const theme = ["a", "b", "c"].includes(v) ? v : "a";
  document.documentElement.dataset.theme = theme;

  const addCss = (href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.append(link);
  };
  if (theme === "b") addCss("https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;700&display=swap");
  addCss("assets/themes.css");
})();
