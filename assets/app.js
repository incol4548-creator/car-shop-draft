// 시안 전용 예시 데이터. 실제 서비스에서는 관리자 페이지에서 입력한 값으로 대체된다.
const CATEGORIES = [
  {
    id: "exterior",
    name: "외장 · 보호",
    desc: "차량 외관을 보호하고 관리하는 작업입니다.",
    items: [
      { id: "tint", name: "틴팅", work: "전면·측후면 유리에 필름 시공", range: "전 차종, 전면·측후면 부분 시공 가능" },
      { id: "ppf", name: "PPF", work: "도장면에 투명 보호 필름 시공", range: "후드, 범퍼, 도어컵 부분 시공부터 전체 시공까지" },
      { id: "coating", name: "유리막 코팅", work: "세정·폴리싱 후 코팅제 도포", range: "신차, 출고 후 차량 모두 가능" },
      { id: "wrap", name: "랩핑", work: "색상·질감 변경용 필름 시공", range: "루프, 사이드미러 부분 시공부터 전체 시공까지" }
    ]
  },
  {
    id: "electronics",
    name: "전자 장비",
    desc: "주행과 안전을 돕는 장비를 설치합니다.",
    items: [
      { id: "blackbox", name: "블랙박스", work: "전후방 카메라 장착, 배선 매립", range: "2채널 기준, 상시 녹화 전원 연결 가능" },
      { id: "navi", name: "내비게이션", work: "순정 화면 연동 또는 매립 설치", range: "차종별 호환 여부 상담 후 진행" },
      { id: "hipass", name: "하이패스", work: "룸미러형·단말기형 설치", range: "전 차종 가능" },
      { id: "rearcam", name: "후방카메라", work: "카메라 장착 및 화면 연동", range: "순정 화면 연동은 차종별 확인" },
      { id: "audio", name: "오디오", work: "스피커, 앰프 교체 및 튜닝", range: "도어 스피커 교체부터 시스템 구성까지" }
    ]
  },
  {
    id: "interior",
    name: "실내 · 편의",
    desc: "실내 환경과 사용 편의를 높이는 작업입니다.",
    items: [
      { id: "soundproof", name: "방음", work: "도어, 바닥, 휠하우스 방음재 시공", range: "부위별 선택 시공 가능" },
      { id: "seat", name: "가죽 시트", work: "시트 커버 교체", range: "차종별 패턴 확인 후 진행" },
      { id: "trunk", name: "전동 트렁크", work: "전동 개폐 장치 장착", range: "지원 차종 상담 후 진행" },
      { id: "ambient", name: "앰비언트 라이트", work: "실내 조명 배선 및 장착", range: "도어, 대시보드 라인 시공" }
    ]
  }
];

const ALL_ITEMS = CATEGORIES.flatMap((c) => c.items.map((i) => ({ ...i, category: c.name, categoryId: c.id })));
const itemById = (id) => ALL_ITEMS.find((i) => i.id === id);

const HOTSPOTS = [
  { id: "tint", x: 37.8, y: 42, part: "측면 유리" },
  { id: "blackbox", x: 63, y: 39, part: "전면 유리 상단" },
  { id: "navi", x: 71.5, y: 57, part: "대시보드" },
  { id: "ppf", x: 87, y: 66, part: "후드 · 앞범퍼" },
  { id: "coating", x: 38, y: 67, part: "도장면 전체" },
  { id: "soundproof", x: 60, y: 69, part: "도어 · 바닥" },
  { id: "rearcam", x: 8.5, y: 68, part: "트렁크 · 뒷범퍼" }
];

const BRAND = "[상호명]";
const TEL = "000-0000-0000";

function renderChrome() {
  const page = document.body.dataset.page;
  const bar = document.createElement("div");
  bar.className = "draft-bar";
  const theme = document.documentElement.dataset.theme;
  const themeUrl = (v) => {
    const url = new URL(location.href);
    url.searchParams.set("v", v);
    return url.href;
  };
  const themes = [["a", "A 작업 도면"], ["b", "B 쇼룸"], ["c", "C 전문점"]];
  bar.innerHTML = `<span>디자인 시안입니다. 상호, 연락처, 품목, 사례, 접수 내역은 모두 예시입니다.</span>
    <span class="switcher">${themes
      .map(([v, label]) => `<a href="${themeUrl(v)}" data-keep${v === theme ? ' aria-current="true"' : ""}>${label}</a>`)
      .join("")}</span>`;
  document.body.prepend(bar);

  // 페이지를 옮겨도 고른 시안을 유지한다.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || a.hasAttribute("data-keep") || !a.getAttribute("href").includes(".html")) return;
    const url = new URL(a.href);
    url.searchParams.set("v", theme);
    a.href = url.href;
  });

  const head = document.querySelector("[data-head]");
  if (head) {
    const links = [
      ["services.html", "작업 · 시공 범위", "services"],
      ["cases.html", "시공 사례", "cases"],
      ["quote.html", "견적 신청", "quote"]
    ];
    head.className = "site-head";
    head.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true"></span>${BRAND}</a>
      <nav class="nav" aria-label="주요 메뉴">${links
        .map(([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ""}>${label}</a>`)
        .join("")}</nav>
      <span class="head-tel">${TEL}</span>
    </div>`;
  }

  const foot = document.querySelector("[data-foot]");
  if (foot) {
    foot.className = "site-foot";
    foot.innerHTML = `<div class="wrap">
      <div><strong>${BRAND}</strong><br>[주소를 입력해 주세요]<br>영업시간 [입력 필요]</div>
      <div>전화 ${TEL}<br>이메일 [입력 필요]<br><a href="admin.html">관리자 화면 시안 보기</a></div>
    </div>`;
  }
}

function initCarMap() {
  const frame = document.querySelector("[data-car-frame]");
  if (!frame) return;
  const panel = document.querySelector("[data-map-panel]");

  const select = (id) => {
    const spot = HOTSPOTS.find((h) => h.id === id);
    const item = itemById(id);
    frame.querySelectorAll(".hotspot").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === id)));
    panel.innerHTML = `
      <span class="num">${spot.part}</span>
      <h2>${item.name}</h2>
      <p>${item.category}</p>
      <dl>
        <div><dt>작업 내용</dt><dd>${item.work}</dd></div>
        <div><dt>시공 범위</dt><dd>${item.range}</dd></div>
      </dl>
      <a class="btn btn-accent" href="quote.html?item=${item.id}">${item.name} 견적 신청</a>`;
  };

  HOTSPOTS.forEach((h, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "hotspot";
    b.dataset.id = h.id;
    b.style.left = `${h.x}%`;
    b.style.top = `${h.y}%`;
    b.textContent = i + 1;
    b.setAttribute("aria-label", `${h.part}: ${itemById(h.id).name}`);
    b.addEventListener("click", () => select(h.id));
    frame.append(b);
  });
  select("tint");
}

function initQuick() {
  const root = document.querySelector("[data-quick]");
  if (!root) return;
  root.innerHTML = ["blackbox", "tint", "ppf", "coating", "navi", "soundproof"]
    .map((id) => `<a href="quote.html?item=${id}">${itemById(id).name}</a>`)
    .join("");
}

function initScope() {
  const root = document.querySelector("[data-scope]");
  if (!root) return;
  root.innerHTML = CATEGORIES.map(
    (c, i) => `<div class="scope-row">
      <span class="idx">0${i + 1}</span>
      <h3>${c.name}</h3>
      <div class="tags">${c.items.map((it) => `<span class="tag">${it.name}</span>`).join("")}</div>
      <a class="link-more" href="services.html#${c.id}">자세히</a>
    </div>`
  ).join("");
}

function initServices() {
  const root = document.querySelector("[data-services]");
  if (!root) return;
  root.innerHTML = CATEGORIES.map(
    (c) => `<section class="svc-block" id="${c.id}"><div class="wrap svc-grid">
      <div class="side"><div><h2>${c.name}</h2><p>${c.desc}</p></div></div>
      <table class="svc-table">
        <thead><tr><th scope="col">품목</th><th scope="col">작업 내용</th><th scope="col">시공 가능 범위</th><th scope="col"><span hidden>신청</span></th></tr></thead>
        <tbody>${c.items
          .map(
            (it) => `<tr><th scope="row">${it.name}</th><td>${it.work}</td><td>${it.range}</td>
            <td><a class="btn btn-sm" href="quote.html?item=${it.id}">견적 신청</a></td></tr>`
          )
          .join("")}</tbody>
      </table>
    </div></section>`
  ).join("");
}

function caseCard(item, n) {
  return `<article class="case" data-cat="${item.categoryId}">
    <div class="pair"><div class="ph">시공 전<br>사진 자리</div><div class="ph">시공 후<br>사진 자리</div></div>
    <div class="case-body"><span class="mono">${item.category}</span><h3>${item.name} 시공 사례 ${n}</h3><p>차종과 작업 설명이 들어갑니다.</p></div>
  </article>`;
}

function initCases() {
  const root = document.querySelector("[data-cases]");
  if (!root) return;
  const limit = Number(root.dataset.cases) || ALL_ITEMS.length;
  const picks = ["tint", "ppf", "blackbox", "soundproof", "coating", "audio", "seat", "navi", "ambient"].slice(0, limit);
  root.innerHTML = picks.map((id, i) => caseCard(itemById(id), i + 1)).join("");

  const chips = document.querySelector("[data-case-filter]");
  if (!chips) return;
  chips.innerHTML =
    `<button type="button" class="chip" aria-pressed="true" data-cat="all">전체</button>` +
    CATEGORIES.map((c) => `<button type="button" class="chip" aria-pressed="false" data-cat="${c.id}">${c.name}</button>`).join("");
  chips.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === btn)));
    root.querySelectorAll(".case").forEach((card) => {
      card.hidden = btn.dataset.cat !== "all" && card.dataset.cat !== btn.dataset.cat;
    });
  });
}

function initQuote() {
  const form = document.querySelector("[data-quote-form]");
  if (!form) return;

  form.querySelector("[data-picks]").innerHTML = CATEGORIES.map(
    (c) => `<div class="item-group"><h3>${c.name}</h3><div class="pick">${c.items
      .map((it) => `<label><input type="checkbox" name="items" value="${it.id}"><span>${it.name}</span></label>`)
      .join("")}</div></div>`
  ).join("");

  const yearSel = form.querySelector("#year");
  for (let y = 2026; y >= 2010; y--) yearSel.add(new Option(`${y}년`, y));
  yearSel.add(new Option("2009년 이전", "old"));

  const undecided = form.querySelector("#undecided");
  const itemBoxes = [...form.querySelectorAll('input[name="items"]')];
  const list = document.querySelector("[data-ticket-list]");

  const refresh = () => {
    const picked = itemBoxes.filter((b) => b.checked).map((b) => itemById(b.value).name);
    const rows = undecided.checked ? ["상담 후 결정"] : picked;
    list.replaceChildren(
      ...(rows.length ? rows : ["아직 선택한 상품이 없습니다"]).map((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        if (!rows.length) li.className = "empty";
        return li;
      })
    );
    form.querySelector("[data-items-err]").classList.toggle("invalid", false);
  };

  itemBoxes.forEach((b) =>
    b.addEventListener("change", () => {
      if (b.checked) undecided.checked = false;
      refresh();
    })
  );
  undecided.addEventListener("change", () => {
    if (undecided.checked) itemBoxes.forEach((b) => (b.checked = false));
    refresh();
  });

  const preset = new URLSearchParams(location.search).get("item");
  const presetBox = itemBoxes.find((b) => b.value === preset);
  if (presetBox) presetBox.checked = true;
  refresh();

  const today = new Date().toISOString().slice(0, 10);
  form.querySelector("#date").min = today;

  const fileInput = form.querySelector("#photo");
  fileInput.addEventListener("change", () => {
    form.querySelector("[data-file-note]").textContent = fileInput.files.length ? `${fileInput.files.length}개 파일 선택됨` : "차량 상태나 원하는 시공 예시 사진을 올릴 수 있어요.";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstBad = null;
    const mark = (el, wrap, ok) => {
      wrap.classList.toggle("invalid", !ok);
      if (!ok && !firstBad) firstBad = el;
    };
    form.querySelectorAll("[data-required]").forEach((el) => {
      const pattern = el.dataset.pattern ? new RegExp(el.dataset.pattern) : null;
      const v = el.value.trim();
      mark(el, el.closest(".field"), v !== "" && (!pattern || pattern.test(v)));
    });
    const itemsOk = undecided.checked || itemBoxes.some((b) => b.checked);
    mark(itemBoxes[0], form.querySelector("[data-items-err]"), itemsOk);
    const consent = form.querySelector("#consent");
    mark(consent, form.querySelector("[data-consent]"), consent.checked);
    if (firstBad) {
      firstBad.focus();
      return;
    }
    form.hidden = true;
    document.querySelector("[data-submit]").hidden = true;
    const done = document.querySelector("[data-done]");
    done.style.display = "block";
    done.querySelector("[data-done-name]").textContent = form.querySelector("#name").value.trim();
    done.focus();
    window.scrollTo({ top: done.offsetTop - 100 });
  });
}

function initAdmin() {
  const root = document.querySelector("[data-admin]");
  if (!root) return;
  const tabs = [...root.querySelectorAll(".admin-tab")];
  const panes = [...root.querySelectorAll("[data-pane]")];
  tabs.forEach((t) =>
    t.addEventListener("click", () => {
      tabs.forEach((x) => x.setAttribute("aria-selected", String(x === t)));
      panes.forEach((p) => (p.hidden = p.dataset.pane !== t.dataset.tab));
    })
  );

  const rows = [
    ["11.04 14:20", "김OO", "010-****-1234", "현대 아반떼 / 2024", "틴팅, 블랙박스", "11.08", "new"],
    ["11.04 09:02", "이OO", "010-****-5678", "기아 쏘렌토 / 2025", "PPF, 유리막 코팅", "11.12", "new"],
    ["11.03 18:44", "박OO", "010-****-9012", "제네시스 G80 / 2023", "상담 후 결정", "미정", "new"],
    ["11.03 11:15", "최OO", "010-****-3456", "BMW 320i / 2022", "방음, 오디오", "11.06", "talk"],
    ["11.01 16:30", "정OO", "010-****-7890", "테슬라 모델Y / 2025", "틴팅", "11.03", "done"]
  ];
  const labels = { new: "신규", talk: "상담중", done: "완료" };
  const body = root.querySelector("[data-rows]");
  body.innerHTML = rows
    .map(
      (r) => `<tr class="${r[6] === "new" ? "is-new" : ""}">
      <td class="mono">${r[0]}</td><td class="who">${r[1]}</td><td class="mono">${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td>
      <td><select aria-label="${r[1]} 진행 상태">${Object.entries(labels)
        .map(([k, v]) => `<option value="${k}"${k === r[6] ? " selected" : ""}>${v}</option>`)
        .join("")}</select></td></tr>`
    )
    .join("");

  const sync = () => {
    const vals = [...body.querySelectorAll("select")].map((s) => s.value);
    const count = (k) => vals.filter((v) => v === k).length;
    root.querySelector("[data-stat-new]").textContent = count("new");
    root.querySelector("[data-stat-talk]").textContent = count("talk");
    root.querySelector("[data-stat-done]").textContent = count("done");
    const badge = root.querySelector("[data-badge]");
    badge.textContent = count("new");
    badge.hidden = count("new") === 0;
    body.querySelectorAll("tr").forEach((tr) => tr.classList.toggle("is-new", tr.querySelector("select").value === "new"));
  };
  body.addEventListener("change", sync);
  sync();

  root.querySelector("[data-catalog]").innerHTML = ALL_ITEMS.map(
    (it) => `<tr><td>${it.category}</td><td><b>${it.name}</b></td><td>${it.work}</td><td><button type="button" class="btn btn-sm">수정</button></td></tr>`
  ).join("");
  root.querySelector("[data-admin-cases]").innerHTML =
    `<button type="button" class="upload-box">+ 시공 사례 올리기</button>` +
    ["tint", "ppf", "blackbox"].map((id, i) => caseCard(itemById(id), i + 1)).join("");
}

renderChrome();
initCarMap();
initQuick();
initScope();
initServices();
initCases();
initQuote();
initAdmin();
