// 확정 시안은 C. 이전 시안 A/B는 주소에 ?v=a, ?v=b를 붙이면 볼 수 있다.
(function () {
  const v = new URLSearchParams(location.search).get("v");
  const theme = ["a", "b", "c"].includes(v) ? v : "c";
  document.documentElement.dataset.theme = theme;

  const addCss = (href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.append(link);
  };
  if (theme === "b") addCss("https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;700&display=swap");
  if (theme === "c") addCss("https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap");
  addCss("assets/themes.css");
})();
