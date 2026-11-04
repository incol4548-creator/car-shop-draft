// 시안 전용 데이터. 품목과 사례 제목은 업체 블로그 캡처 기준 초안이며,
// 실제 서비스에서는 관리자 페이지에서 입력한 값으로 대체된다.
const CATEGORIES = [
  {
    id: "tinting",
    name: "썬팅",
    desc: "넥스가드 메딕·CBR 등 열차단 필름 시공과 재시공을 합니다.",
    items: [
      { id: "tint", name: "썬팅 시공", work: "넥스가드 메딕·CBR 등 열차단 필름 시공", cases: "아반떼 CN7, 더뉴모하비" },
      { id: "retint", name: "썬팅 재시공", work: "기존 필름을 제거하고 새 필름으로 시공", cases: "아반떼 MD, 더뉴모하비" },
      { id: "tintremove", name: "기존 필름 제거", work: "뒷유리 열선 손상에 유의해 기존 필름 제거", cases: "YF쏘나타 뒷유리, 아반떼 CN7" }
    ]
  },
  {
    id: "blackbox",
    name: "블랙박스",
    desc: "승용차부터 화물차까지 블랙박스 설치와 교체를 합니다.",
    items: [
      { id: "bb2ch", name: "2채널 블랙박스", work: "지넷시스템, 아이나비 등 전후방 블랙박스 설치", cases: "지넷시스템 Z8, 올뉴모닝" },
      { id: "bb4ch", name: "4채널 블랙박스", work: "전후방과 측면까지 녹화하는 다채널 설치", cases: "BMW X4, 화물차" },
      { id: "bbswap", name: "블랙박스 교체", work: "기존 블랙박스 탈거 후 새 제품으로 교체", cases: "올뉴모닝" }
    ]
  },
  {
    id: "av",
    name: "순정 AV · 올인원",
    desc: "순정 AV 수리와 안드로이드 올인원 교체를 합니다.",
    items: [
      { id: "allinone", name: "안드로이드 올인원", work: "순정 화면을 안드로이드 올인원으로 교체", cases: "투싼 IX, 카니발" },
      { id: "avrepair", name: "순정 AV 수리", work: "화면 꺼짐 등 순정 AV 고장 점검과 수리", cases: "코란도C, 대우 프리마" }
    ]
  },
  {
    id: "rearcam",
    name: "후방카메라",
    desc: "승용차 순정 카메라 교체부터 화물차 모니터 설치까지 합니다.",
    items: [
      { id: "camswap", name: "후방카메라 교체", work: "고장 난 후방카메라 점검과 교체", cases: "현대 포터2" },
      { id: "camir", name: "적외선 후방카메라", work: "어두운 곳에서도 잘 보이는 적외선 카메라 설치", cases: "마이티, 대우 프리마" },
      { id: "camtruck", name: "화물차 카메라 · 모니터", work: "화물차 후방카메라와 7인치 거치형 모니터 설치", cases: "포터, 마이티" }
    ]
  },
  {
    id: "remote",
    name: "원격시동 · 스마트키",
    desc: "스마트폰 원격시동과 순정형 원격시동을 설치합니다.",
    items: [
      { id: "remotephone", name: "스마트폰 원격시동", work: "스마트폰 앱으로 시동을 거는 장치 설치", cases: "포터2 LPG" },
      { id: "remoteoem", name: "순정형 원격시동", work: "마이키프리미엄 등 순정 키 연동 원격시동 설치", cases: "올뉴카니발, 올뉴모닝" },
      { id: "smartkey", name: "스마트키", work: "차종에 맞는 스마트키 장치 설치", cases: "PV5" }
    ]
  },
  {
    id: "extra",
    name: "전조등 · 기타 용품",
    desc: "LED 전조등 튜닝과 사이드스텝 등 용품을 설치합니다.",
    items: [
      { id: "led", name: "LED 전조등 튜닝", work: "브라보 등 차종 전용 LED 전조등 장착", cases: "QM6 (H7)" },
      { id: "sidestep", name: "사이드스텝", work: "차체에 맞는 사이드스텝 장착", cases: "차종별 상담" }
    ]
  }
];

const ALL_ITEMS = CATEGORIES.flatMap((c) => c.items.map((i) => ({ ...i, category: c.name, categoryId: c.id })));
const itemById = (id) => ALL_ITEMS.find((i) => i.id === id);

const HOTSPOTS = [
  { id: "tint", x: 37.8, y: 42, part: "측면 유리" },
  { id: "bb2ch", x: 63, y: 39, part: "전면 유리 상단" },
  { id: "allinone", x: 71.5, y: 57, part: "대시보드" },
  { id: "led", x: 89, y: 64, part: "전조등" },
  { id: "remotephone", x: 60, y: 69, part: "시동 · 키" },
  { id: "sidestep", x: 39, y: 76, part: "도어 하단" },
  { id: "camswap", x: 8.5, y: 68, part: "트렁크 · 뒷범퍼" }
];

const CASES = [
  ["retint", "더뉴모하비 썬팅 재시공"],
  ["bbswap", "올뉴모닝 블랙박스 교체"],
  ["camir", "마이티 적외선 후방카메라"],
  ["allinone", "투싼 IX 안드로이드 올인원"],
  ["remotephone", "포터2 LPG 원격시동"],
  ["led", "QM6 LED 전조등 튜닝"],
  ["tintremove", "아반떼 CN7 썬팅 전체 제거"],
  ["avrepair", "코란도C 순정 AV 수리"],
  ["bb4ch", "BMW X4 4채널 블랙박스"]
];

const BRAND = "준카오디오 안산점";
const TEL = "000-0000-0000";
const LOGO = `<svg class="brand-logo" viewBox="0 0 297 44" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="9" stroke-linejoin="miter" stroke-miterlimit="2"><path d="M36 3.5V28Q36 36 28 36H12Q4 36 4 28"/><path d="M54 3.5V28Q54 36 62 36H78Q86 36 86 28V3.5"/><path d="M104 40.5V8L136 36V3.5"/><path d="M190 8H164Q156 8 156 16V28Q156 36 164 36H190"/><path d="M208 40.5V16Q208 8 216 8H232Q240 8 240 16V40.5M208 26H240"/><path d="M258 40.5V8H284Q292 8 292 16V18Q292 26 284 26H258M276 26L292 40.5"/></g></svg>`;

function renderChrome() {
  const page = document.body.dataset.page;
  const bar = document.createElement("div");
  bar.className = "draft-bar";
  bar.textContent = "기본 틀 확인용 시안입니다. 품목은 블로그 기준 초안이고, 사진, 연락처, 접수 내역은 예시입니다.";
  document.body.prepend(bar);

  // 주소에 시안을 지정해 열었으면 페이지를 옮겨도 유지한다.
  const pinned = new URLSearchParams(location.search).get("v");
  if (pinned) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || !a.getAttribute("href").includes(".html")) return;
      const url = new URL(a.href);
      url.searchParams.set("v", pinned);
      a.href = url.href;
    });
  }

  const head = document.querySelector("[data-head]");
  if (head) {
    const links = [
      ["services.html", "작업 · 시공 범위", "services"],
      ["cases.html", "시공 사례", "cases"],
      ["quote.html", "견적 신청", "quote"]
    ];
    head.className = "site-head";
    head.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html" aria-label="${BRAND} 홈">${LOGO}<span class="brand-name">${BRAND}</span></a>
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
      <div><strong>${BRAND}</strong><br>[주소 입력 필요]<br>영업시간 [입력 필요]</div>
      <div>전화 ${TEL}<br>이메일 [입력 필요]<br><a href="admin.html">관리자 화면 시안 보기</a></div>
    </div>`;
  }

  const adminBrand = document.querySelector("[data-admin-brand]");
  if (adminBrand) adminBrand.innerHTML = `${LOGO}<span class="brand-name">관리</span>`;
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
        <div><dt>작업 사례</dt><dd>${item.cases}</dd></div>
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
  root.innerHTML = ["tint", "bb2ch", "allinone", "camswap", "remotephone", "led"]
    .map((id) => `<a href="quote.html?item=${id}">${itemById(id).category.split(" · ")[0]}</a>`)
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
        <thead><tr><th scope="col">품목</th><th scope="col">작업 내용</th><th scope="col">작업 사례</th><th scope="col"><span hidden>신청</span></th></tr></thead>
        <tbody>${c.items
          .map(
            (it) => `<tr><th scope="row">${it.name}</th><td>${it.work}</td><td>${it.cases}</td>
            <td><a class="btn btn-sm" href="quote.html?item=${it.id}">견적 신청</a></td></tr>`
          )
          .join("")}</tbody>
      </table>
    </div></section>`
  ).join("");
}

function caseCard([id, title]) {
  const item = itemById(id);
  return `<article class="case" data-cat="${item.categoryId}">
    <div class="pair"><div class="ph">시공 전<br>사진 자리</div><div class="ph">시공 후<br>사진 자리</div></div>
    <div class="case-body"><span class="mono">${item.category}</span><h3>${title}</h3><p>블로그 사진과 설명이 들어갈 자리입니다.</p></div>
  </article>`;
}

function initCases() {
  const root = document.querySelector("[data-cases]");
  if (!root) return;
  const limit = Number(root.dataset.cases) || CASES.length;
  root.innerHTML = CASES.slice(0, limit).map(caseCard).join("");

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
    ["11.04 14:20", "김OO", "010-****-1234", "현대 아반떼 / 2024", "썬팅 시공, 2채널 블랙박스", "11.08", "new"],
    ["11.04 09:02", "이OO", "010-****-5678", "현대 포터2 / 2021", "화물차 카메라 · 모니터", "11.12", "new"],
    ["11.03 18:44", "박OO", "010-****-9012", "기아 카니발 / 2019", "상담 후 결정", "미정", "new"],
    ["11.03 11:15", "최OO", "010-****-3456", "쌍용 코란도C / 2015", "순정 AV 수리", "11.06", "talk"],
    ["11.01 16:30", "정OO", "010-****-7890", "기아 모닝 / 2020", "순정형 원격시동", "11.03", "done"]
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
    `<button type="button" class="upload-box">+ 시공 사례 올리기</button>` + CASES.slice(0, 3).map(caseCard).join("");
  root.querySelector("#s-name").value = BRAND;
}

renderChrome();
initCarMap();
initQuick();
initScope();
initServices();
initCases();
initQuote();
initAdmin();
