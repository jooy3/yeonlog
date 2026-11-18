// Fallback default images
const DEFAULT_DIARY_ILLUSTRATION = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80";
const DEFAULT_TRIP_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

// Global TOAST UI Editor Instance
let toastEditorInstance = null;

// Initial State
const INITIAL_STATE = {
  homeContent: {
    markdown: `![Main Visual](https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80)

# 생각하고, 만들고, 떠나고, 기록하는 공간
### YeonLog에 오신 것을 진심으로 환영합니다.

---

YeonLog는 일상과 개발, 그리고 여행의 순간들을 자유롭게 기록하는 개인 아카이브입니다.
- **Work**: 프로젝트 개발 과정, 트러블슈팅, 기술적 아키텍처 기록
- **Trip**: 낯선 여행지의 풍경과 맛있는 기억들
- **Diary**: 스쳐 지나가기 아쉬운 일상의 소중한 단편과 에세이

> *"기록하지 않은 것은 기억되지 않는다."*

하단의 **작성** 버튼을 눌러 Toast UI Editor에서 원하는 이미지, 제목, 글, 표, 서식 등을 자유롭게 편집하고 저장해보세요!`
  },
  // Submenus: Work, Trip, Diary
  submenus: {
    work: [
      { id: "sub-w1", name: "Frontend", filter: "Frontend" },
      { id: "sub-w2", name: "Backend & Infra", filter: "Backend" },
      { id: "sub-w3", name: "UI/UX Project", filter: "Project" }
    ],
    trip: [
      { id: "sub-t-cat1", name: "맛집 탐방", filter: "맛집 탐방" },
      { id: "sub-t-cat2", name: "바다 & 올레길", filter: "바다 & 올레길" },
      { id: "sub-t-cat3", name: "사찰 & 골목", filter: "사찰 & 골목" },
      { id: "sub-t-cat4", name: "카페 투어", filter: "카페 투어" }
    ],
    diary: [
      { id: "sub-d1", name: "생각과 회고", filter: "회고" },
      { id: "sub-d2", name: "일상 이야기", filter: "일상" },
      { id: "sub-d3", name: "문화 생활", filter: "문화" }
    ]
  },
  // Trip Destinations
  tripDestinations: [
    {
      id: "dest-jeju",
      name: "제주도",
      image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dest-kyoto",
      name: "교토",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dest-paris",
      name: "파리",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
    }
  ],
  // Work posts
  workPosts: [
    {
      id: "w-1",
      title: "대규모 트래픽을 고려한 마이크로서비스 캐싱 전략 설계",
      category: "Backend",
      createdAt: "2026-11-10",
      updatedAt: "2026-11-12",
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
      ],
      content: `최근 서비스 동시 접속자가 급증하면서 DB 부하를 완화하기 위한 캐시 아키텍처 개편을 진행했습니다.

### 주요 해결 과제
1. **Cache Stampede 현상**: 캐시 만료 시 다수의 쿼리가 일시에 DB로 인입되는 문제
2. **Hot Key 집중**: 특정 Redis 인스턴스에만 트래픽이 쏠리는 병목 현상

### 해결 방안 및 아키텍처
- 분산 락(Redlock)을 이용한 캐시 갱신 단일화
- 확률적 조기 만료(Probabilistic Early Expiration) 알고리즘 도입

결과적으로 P99 응답 속도가 **350ms에서 45ms**로 대폭 단축되었습니다.`
    },
    {
      id: "w-2",
      title: "사용자 중심의 인터랙티브 대시보드 UI/UX 리뉴얼 회고",
      category: "Frontend",
      createdAt: "2026-10-28",
      updatedAt: "2026-10-28",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      ],
      content: `복잡한 데이터 지표를 한눈에 파악할 수 있도록 대시보드 컴포넌트 시스템을 전면 재설계했습니다.

- 시각적 계층 구조의 명확화
- 불필요한 차트 요소 제거 및 핵심 KPI 카드 상단 배치
- 다크 모드 및 반응형 모바일 뷰 완벽 지원`
    }
  ],
  // Trip posts
  tripPosts: [
    {
      id: "t-1",
      destId: "dest-jeju",
      category: "바다 & 올레길",
      title: "에메랄드빛 바다를 따라 걷는 협재와 금능 해변 산책",
      createdAt: "2026-10-02",
      updatedAt: "2026-10-03",
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
      ],
      content: `가을의 문턱에서 마주한 제주의 바다는 유난히 투명하고 청량했습니다.

협재 해수욕장에서 시작해 금능으로 이어지는 길은 썰물 때 드러나는 하얀 모래사장과 비양도의 실루엣이 어우러져 그림 같은 풍경을 선사했습니다.`
    },
    {
      id: "t-2",
      destId: "dest-jeju",
      category: "맛집 탐방",
      title: "돌담 너머 만난 제주 흑돼지와 멜젓의 황홀한 조화",
      createdAt: "2026-10-04",
      updatedAt: "2026-10-04",
      coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
      ],
      content: `현지 주민분이 강력 추천해주신 한적한 마을의 흑돼지 전문점을 방문했습니다.`
    },
    {
      id: "t-3",
      destId: "dest-kyoto",
      category: "사찰 & 골목",
      title: "비 내리는 아침, 료안지 석정(石庭)에서 찾은 고요함",
      createdAt: "2026-09-15",
      updatedAt: "2026-09-16",
      coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
      ],
      content: `이른 아침 비가 촉촉이 내리는 료안지를 찾았습니다.`
    },
    {
      id: "t-4",
      destId: "dest-paris",
      category: "맛집 탐방",
      title: "오르세 미술관에서 모네의 수련과 인상주의 화폭을 마주하다",
      createdAt: "2026-08-20",
      updatedAt: "2026-08-21",
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
      ],
      content: `옛 기차역을 개조해 만든 오르세 미술관의 아치형 유리 천장 아래로 쏟아지는 자연광 속에서 모네, 르누아르, 반 고흐의 걸작들을 마주했습니다.`
    }
  ],
  // Diary posts
  diaryPosts: [
    {
      id: "d-1",
      category: "일상 이야기",
      title: "비 내리는 주말, 좋아하는 원두를 내려 마시며 읽은 책",
      createdAt: "2026-11-16",
      updatedAt: "2026-11-16",
      coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
      ],
      content: `창밖으로 빗방울이 유리창을 토닥이는 일요일 오후.

예가체프 원두를 조심스레 갈아 핸드드립으로 추출했다. 퍼져나가는 꽃향기와 산미 속에서 몇 주 전 사두고 아껴둔 에세이집을 펼쳤다.`
    },
    {
      id: "d-2",
      category: "생각과 회고",
      title: "올해를 돌아보며: 속도보다 방향을 다시 점검하는 밤",
      createdAt: "2026-11-05",
      updatedAt: "2026-11-06",
      coverImage: "",
      images: [],
      content: `연말이 다가오며 지난 수개월간의 기록들을 되짚어보았다.`
    }
  ]
};

// Global App State
let appState = {};

function loadState() {
  const saved = localStorage.getItem("yeonlog_blog_state_v6");
  if (saved) {
    try {
      appState = JSON.parse(saved);
      if (!appState.homeContent) appState.homeContent = INITIAL_STATE.homeContent;
      if (!appState.submenus) appState.submenus = INITIAL_STATE.submenus;
      if (!appState.tripDestinations) appState.tripDestinations = INITIAL_STATE.tripDestinations;
      if (!appState.workPosts) appState.workPosts = INITIAL_STATE.workPosts;
      if (!appState.tripPosts) appState.tripPosts = INITIAL_STATE.tripPosts;
      if (!appState.diaryPosts) appState.diaryPosts = INITIAL_STATE.diaryPosts;
    } catch (e) {
      console.error("State parse error, loading default", e);
      appState = JSON.parse(JSON.stringify(INITIAL_STATE));
    }
  } else {
    appState = JSON.parse(JSON.stringify(INITIAL_STATE));
    saveState();
  }
}

function saveState() {
  localStorage.setItem("yeonlog_blog_state_v6", JSON.stringify(appState));
}

// Router State
let currentRoute = {
  menu: "home",          // "home" | "work" | "trip" | "diary"
  filterSubmenu: null,   // filter category
  tripDestId: null,      // selected trip destination id
  postId: null           // selected post id
};

// State for active Post Editor
let editorTempState = {
  images: [],
  selectedCover: ""
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initToastEditor();
  navigateTo("home");
});

function initToastEditor() {
  const editorEl = document.getElementById('tui-editor-container');
  if (!editorEl) return;

  if (window.toastui && window.toastui.Editor) {
    toastEditorInstance = new toastui.Editor({
      el: editorEl,
      height: '420px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      usageStatistics: false,
      placeholder: '내용을 작성해주세요... (마크다운 및 툴바 서식 지원)',
      hooks: {
        addImageBlobHook: (blob, callback) => {
          const reader = new FileReader();
          reader.onload = function(e) {
            const dataUrl = e.target.result;
            callback(dataUrl, 'image');
            if (!editorTempState.images.includes(dataUrl)) {
              editorTempState.images.push(dataUrl);
              if (!editorTempState.selectedCover) {
                editorTempState.selectedCover = dataUrl;
              }
              renderEditorGalleryThumbnails();
            }
          };
          reader.readAsDataURL(blob);
          return false;
        }
      }
    });
  }
}

function getDisplayDate(item) {
  if (item.updatedAt && item.updatedAt.trim() !== "") {
    return item.updatedAt.trim().slice(0, 10);
  }
  if (item.createdAt && item.createdAt.trim() !== "") {
    return item.createdAt.trim().slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

function parseMarkdownToHtml(md) {
  if (!md) return "";
  let html = md;
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-2xl max-w-full my-4 shadow-sm border border-slate-100">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 underline font-medium">$1</a>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-800 mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-3 pb-2 border-b border-slate-100">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-slate-900 mt-8 mb-4">$1</h1>');
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1.5 my-3 bg-slate-50 text-slate-600 italic rounded-r-lg">$1</blockquote>');
  html = html.replace(/^---$/gim, '<hr class="my-6 border-slate-200">');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>');
  html = html.replace(/\n\n+/g, '</p><p class="my-3 text-slate-700 leading-relaxed">');
  html = '<p class="my-3 text-slate-700 leading-relaxed">' + html + '</p>';
  return html;
}

function getActionButtonHtml(onclickAction) {
  return `
    <button onclick="${onclickAction}" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all active:scale-95">
      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
      <span>작성</span>
    </button>
  `;
}

// 5, 6. [요청사항 준수]
// - 버튼 명칭 통일: '리스트로 돌아가기'
// - 버튼 색상: 밝은 색상 (화이트/아이보리 계열 bg-white hover:bg-slate-100)
// - 텍스트 및 테두리: 버튼보다 어두운 색상 (border-2 border-slate-700 text-slate-800)으로 강한 대비를 주어 가독성 극대화
function getBackToListButtonHtml(onclickAction) {
  return `
    <button onclick="${onclickAction}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border-2 border-slate-700 shadow-sm transition-all active:scale-95">
      <i data-lucide="list" class="w-4 h-4 text-slate-800 stroke-[2.5]"></i>
      <span>리스트로 돌아가기</span>
    </button>
  `;
}

// ==================== 라우팅 & 네비게이션 ====================
function navigateTo(menu, options = {}) {
  currentRoute.menu = menu;
  currentRoute.filterSubmenu = options.filterSubmenu || null;
  currentRoute.tripDestId = options.tripDestId || null;
  currentRoute.postId = options.postId || null;

  const navItems = ["home", "work", "trip", "diary"];
  navItems.forEach(item => {
    const btn = document.getElementById(`nav-btn-${item}`);
    if (btn) {
      if (item === menu) {
        btn.className = "nav-item-btn px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 text-indigo-600 bg-indigo-50 shadow-xs";
      } else {
        btn.className = "nav-item-btn px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-all flex items-center gap-1.5";
      }
    }
  });

  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentView() {
  const container = document.getElementById("content-container");
  if (!container) return;

  switch (currentRoute.menu) {
    case "home":
      renderHomeView(container);
      break;
    case "work":
      if (currentRoute.postId) {
        renderWorkDetailView(container, currentRoute.postId);
      } else {
        renderWorkListView(container);
      }
      break;
    case "trip":
      if (currentRoute.postId) {
        renderTripDetailView(container, currentRoute.postId);
      } else if (currentRoute.tripDestId) {
        renderTripPostListView(container, currentRoute.tripDestId);
      } else {
        renderTripDestinationsView(container);
      }
      break;
    case "diary":
      if (currentRoute.postId) {
        renderDiaryDetailView(container, currentRoute.postId);
      } else {
        renderDiarySquareGridView(container);
      }
      break;
    default:
      renderHomeView(container);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==================== 1. HOME 화면 ====================
function renderHomeView(container) {
  const home = appState.homeContent || INITIAL_STATE.homeContent;
  const renderedContent = parseMarkdownToHtml(home.markdown || "");

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6 relative">
      <article class="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs blog-post-content leading-relaxed">
        ${renderedContent}

        <div class="mt-10 pt-6 border-t border-slate-100 flex items-center justify-end">
          ${getActionButtonHtml("openPostEditorModal('edit', 'home')")}
        </div>
      </article>
    </div>
  `;
}

// ==================== 2. WORK 화면 ====================
function renderWorkListView(container) {
  let posts = appState.workPosts || [];
  
  if (currentRoute.filterSubmenu) {
    posts = posts.filter(p => p.category.toLowerCase().includes(currentRoute.filterSubmenu.toLowerCase()));
  }

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">Work</span>
          ${currentRoute.filterSubmenu ? `<span class="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded-full font-medium">필터: ${currentRoute.filterSubmenu}</span>` : ''}
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">업무 및 프로젝트</h2>
      </div>

      <div class="flex items-center gap-2">
        ${getActionButtonHtml("openPostEditorModal('create', 'work')")}
      </div>
    </div>

    <!-- 하위 메뉴 필터: 1. [요청사항 준수] 순서 변경 반영 -->
    <div class="flex flex-wrap items-center gap-2 mb-6">
      <button onclick="navigateTo('work')" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${!currentRoute.filterSubmenu ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'} transition-colors">
        전체보기 (${(appState.workPosts || []).length})
      </button>
      ${(appState.submenus.work || []).map(sub => `
        <button onclick="navigateTo('work', { filterSubmenu: '${sub.name}' })" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${currentRoute.filterSubmenu === sub.name ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'} transition-colors">
          ${sub.name}
        </button>
      `).join('')}
    </div>

    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
      ${posts.length === 0 ? `
        <div class="py-16 text-center text-slate-400">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto mb-2 stroke-1"></i>
          <p class="text-sm">해당 분류의 게시글이 없습니다.</p>
        </div>
      ` : posts.map(post => {
        const displayDate = getDisplayDate(post);
        return `
          <div onclick="navigateTo('work', { postId: '${post.id}' })" class="p-5 sm:p-6 cursor-pointer hover:bg-slate-50 transition-colors group">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">${post.category}</span>
                <h3 class="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  ${escapeHtml(post.title)}
                </h3>
              </div>
              
              <div class="flex items-center gap-2 text-xs text-slate-400 shrink-0">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                <span>${displayDate}</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all ml-1"></i>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderWorkDetailView(container, postId) {
  const post = (appState.workPosts || []).find(p => p.id === postId);
  if (!post) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">게시글을 찾을 수 없습니다. <button onclick="navigateTo('work')" class="text-indigo-600 font-bold ml-2 underline">목록으로</button></div>`;
    return;
  }

  const renderedContent = parseMarkdownToHtml(post.content || "");
  const displayDate = getDisplayDate(post);

  container.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <button onclick="navigateTo('work')" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        <span>게시글 리스트로 돌아가기</span>
      </button>

      <article class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-8">
        
        <header class="border-b border-slate-100 pb-6 mb-8">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">${post.category}</span>
          </div>
          
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            ${escapeHtml(post.title)}
          </h1>

          <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i>
            <span>${displayDate}</span>
          </div>
        </header>

        ${post.coverImage ? `
          <div class="rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-xs max-h-[460px]">
            <img src="${post.coverImage}" alt="${escapeHtml(post.title)}" class="w-full h-full object-cover">
          </div>
        ` : ''}

        <div class="blog-post-content text-slate-700 leading-relaxed text-sm sm:text-base">
          ${renderedContent}
        </div>

        <!-- 5, 6. [요청사항 준수] '리스트로 돌아가기' 밝은 배경 + 어두운 텍스트/테두리 대비 버튼 -->
        <div class="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          ${getBackToListButtonHtml("navigateTo('work')")}

          <div class="flex items-center gap-2">
            ${getActionButtonHtml(`openPostEditorModal('edit', 'work', '', '${post.id}')`)}
            <button onclick="deletePost('work', '${post.id}')" class="px-3 py-2 rounded-xl text-xs text-rose-500 hover:text-rose-700 font-semibold hover:bg-rose-50 transition-colors">
              삭제
            </button>
          </div>
        </div>

      </article>
    </div>
  `;
}

// ==================== 3. TRIP 화면 ====================
// 2. [요청사항 준수] 변경된 여행지 순서를 반영하여 Trip 첫번째 페이지에 표시
function renderTripDestinationsView(container) {
  const dests = appState.tripDestinations || [];

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-md bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">Trip</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">여행 아카이브</h2>
      </div>
    </div>

    <!-- 순서 변경이 반영된 여행지 정사각형 카드 리스트 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      ${dests.length === 0 ? `
        <div class="col-span-full py-16 text-center text-slate-400">
          <p class="text-sm">등록된 여행지가 없습니다. 우측 상단 '블로그 설정 - 여행지 관리'에서 여행지를 등록해보세요.</p>
        </div>
      ` : dests.map(dest => {
        const postCount = (appState.tripPosts || []).filter(p => p.destId === dest.id).length;
        const displayImage = dest.image && dest.image.trim() !== "" ? dest.image : DEFAULT_TRIP_IMAGE;

        return `
          <div onclick="navigateTo('trip', { tripDestId: '${dest.id}' })" class="group cursor-pointer">
            <div class="aspect-square w-full rounded-3xl overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1.5 border border-slate-200/80 bg-slate-900">
              <img src="${displayImage}" alt="${escapeHtml(dest.name)}" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
              
              <div class="absolute bottom-5 left-5 right-5 text-white">
                <div class="flex items-end justify-between">
                  <div>
                    <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-title">
                      ${escapeHtml(dest.name)}
                    </h3>
                    <p class="text-xs text-slate-300 font-light mt-1">게시글 ${postCount}편</p>
                  </div>
                  <div class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-indigo-600 transition-all border border-white/20">
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </div>
                </div>
              </div>

            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderTripPostListView(container, destId) {
  const dest = (appState.tripDestinations || []).find(d => d.id === destId);
  const destName = dest ? dest.name : "여행";
  const displayImage = dest && dest.image ? dest.image : DEFAULT_TRIP_IMAGE;
  const posts = (appState.tripPosts || []).filter(p => p.destId === destId);

  container.innerHTML = `
    <div class="mb-6">
      <button onclick="navigateTo('trip')" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        <span>전체 여행 목록으로 돌아가기</span>
      </button>

      <div class="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-900 min-h-[170px] flex items-end p-6 sm:p-8">
        <img src="${displayImage}" alt="${destName}" class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        
        <div class="relative z-10 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-serif-title">${destName} 여행 이야기</h2>
            <p class="text-xs text-slate-300 mt-1">총 ${posts.length}편의 기록</p>
          </div>

          <div class="flex items-center gap-2">
            ${getActionButtonHtml(`openPostEditorModal('create', 'trip', '${destId}')`)}
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
      ${posts.length === 0 ? `
        <div class="py-16 text-center text-slate-400">
          <i data-lucide="map" class="w-10 h-10 mx-auto mb-2 stroke-1"></i>
          <p class="text-sm">아직 등록된 ${destName} 여행기가 없습니다.</p>
          <div class="mt-3">
            ${getActionButtonHtml(`openPostEditorModal('create', 'trip', '${destId}')`)}
          </div>
        </div>
      ` : posts.map(post => {
        const displayDate = getDisplayDate(post);
        return `
          <div onclick="navigateTo('trip', { tripDestId: '${destId}', postId: '${post.id}' })" class="p-6 cursor-pointer hover:bg-slate-50 transition-colors group flex flex-col sm:flex-row gap-5 items-start">
            ${post.coverImage ? `
              <div class="w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                <img src="${post.coverImage}" alt="${escapeHtml(post.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
              </div>
            ` : ''}
            <div class="flex-1">
              <div class="flex items-center justify-between gap-4 mb-2">
                <span class="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">${post.category || '여행'}</span>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                  <span>${displayDate}</span>
                </div>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                ${escapeHtml(post.title)}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 mb-2">
                ${escapeHtml(post.content)}
              </p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderTripDetailView(container, postId) {
  const foundPost = (appState.tripPosts || []).find(item => item.id === postId);
  if (!foundPost) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">게시글을 찾을 수 없습니다. <button onclick="navigateTo('trip')" class="text-indigo-600 font-bold ml-2 underline">목록으로</button></div>`;
    return;
  }

  const dest = (appState.tripDestinations || []).find(d => d.id === foundPost.destId);
  const destName = dest ? dest.name : "여행";
  const renderedContent = parseMarkdownToHtml(foundPost.content || "");
  const displayDate = getDisplayDate(foundPost);

  container.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <button onclick="navigateTo('trip', { tripDestId: '${foundPost.destId}' })" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        <span>${destName} 게시글 리스트로 돌아가기</span>
      </button>

      <article class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-8">
        
        <header class="border-b border-slate-100 pb-6 mb-8">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">${foundPost.category || '여행'}</span>
            <span class="text-xs text-slate-400">(${destName})</span>
          </div>
          
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            ${escapeHtml(foundPost.title)}
          </h1>

          <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i>
            <span>${displayDate}</span>
          </div>
        </header>

        ${foundPost.coverImage ? `
          <div class="rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-xs max-h-[460px]">
            <img src="${foundPost.coverImage}" alt="${escapeHtml(foundPost.title)}" class="w-full h-full object-cover">
          </div>
        ` : ''}

        <div class="blog-post-content text-slate-700 leading-relaxed text-sm sm:text-base">
          ${renderedContent}
        </div>

        <!-- 5, 6. [요청사항 준수] '리스트로 돌아가기' 밝은 배경 + 어두운 텍스트/테두리 대비 버튼 -->
        <div class="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          ${getBackToListButtonHtml(`navigateTo('trip', { tripDestId: '${foundPost.destId}' })`)}

          <div class="flex items-center gap-2">
            ${getActionButtonHtml(`openPostEditorModal('edit', 'trip', '${foundPost.destId}', '${foundPost.id}')`)}
            <button onclick="deleteTripPost('${foundPost.id}')" class="px-3 py-2 rounded-xl text-xs text-rose-500 hover:text-rose-700 font-semibold hover:bg-rose-50 transition-colors">
              삭제
            </button>
          </div>
        </div>

      </article>
    </div>
  `;
}

// ==================== 4. DIARY 화면 ====================
function renderDiarySquareGridView(container) {
  let diaries = appState.diaryPosts || [];

  if (currentRoute.filterSubmenu) {
    diaries = diaries.filter(d => d.category.toLowerCase().includes(currentRoute.filterSubmenu.toLowerCase()));
  }

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-md bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider">Diary</span>
          ${currentRoute.filterSubmenu ? `<span class="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded-full font-medium">필터: ${currentRoute.filterSubmenu}</span>` : ''}
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">일상 다이어리</h2>
      </div>

      <div class="flex items-center gap-2">
        ${getActionButtonHtml("openPostEditorModal('create', 'diary')")}
      </div>
    </div>

    <!-- 하위 메뉴 필터: 1. 순서 변경 반영 -->
    <div class="flex flex-wrap items-center gap-2 mb-8">
      <button onclick="navigateTo('diary')" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${!currentRoute.filterSubmenu ? 'bg-violet-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'} transition-colors">
        전체보기 (${(appState.diaryPosts || []).length})
      </button>
      ${(appState.submenus.diary || []).map(sub => `
        <button onclick="navigateTo('diary', { filterSubmenu: '${sub.name}' })" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${currentRoute.filterSubmenu === sub.name ? 'bg-violet-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'} transition-colors">
          ${sub.name}
        </button>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      ${diaries.length === 0 ? `
        <div class="col-span-full py-16 text-center text-slate-400">
          <i data-lucide="book" class="w-10 h-10 mx-auto mb-2 stroke-1"></i>
          <p class="text-sm">등록된 일기가 없습니다.</p>
        </div>
      ` : diaries.map(item => {
        const hasCover = item.coverImage && item.coverImage.trim() !== "";
        const displayImg = hasCover ? item.coverImage : DEFAULT_DIARY_ILLUSTRATION;
        const displayDate = getDisplayDate(item);

        return `
          <div onclick="navigateTo('diary', { postId: '${item.id}' })" class="group cursor-pointer">
            <div class="aspect-square w-full rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1.5 border border-slate-200/80 bg-slate-900">
              <img src="${displayImg}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out">
              
              ${!hasCover ? `
                <div class="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/10">
                  <i data-lucide="palette" class="w-3 h-3"></i> 기본 일러스트
                </div>
              ` : ''}

              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-0.5 rounded-full bg-violet-600/90 text-white text-[11px] font-bold backdrop-blur-xs">
                  ${item.category}
                </span>
              </div>

              <div class="absolute bottom-4 left-4 right-4 text-white">
                <p class="text-[11px] text-slate-300 flex items-center gap-1 mb-1">
                  <i data-lucide="calendar" class="w-3 h-3"></i> ${displayDate}
                </p>
                <h4 class="font-bold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-violet-200 transition-colors">
                  ${escapeHtml(item.title)}
                </h4>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderDiaryDetailView(container, postId) {
  const post = (appState.diaryPosts || []).find(p => p.id === postId);
  if (!post) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">게시글을 찾을 수 없습니다. <button onclick="navigateTo('diary')" class="text-violet-600 font-bold ml-2 underline">목록으로</button></div>`;
    return;
  }

  const hasCover = post.coverImage && post.coverImage.trim() !== "";
  const displayImg = hasCover ? post.coverImage : DEFAULT_DIARY_ILLUSTRATION;
  const renderedContent = parseMarkdownToHtml(post.content || "");
  const displayDate = getDisplayDate(post);

  container.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <button onclick="navigateTo('diary')" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-violet-600 mb-6 transition-colors">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        <span>게시글 리스트로 돌아가기</span>
      </button>

      <article class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-8">
        
        <header class="border-b border-slate-100 pb-6 mb-8">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">분류: ${post.category}</span>
          </div>
          
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            ${escapeHtml(post.title)}
          </h1>

          <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i>
            <span>${displayDate}</span>
          </div>
        </header>

        <div class="rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-xs max-h-[460px] relative bg-slate-100">
          <img src="${displayImg}" alt="${escapeHtml(post.title)}" class="w-full h-full object-cover">
          ${!hasCover ? `
            <div class="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <i data-lucide="palette" class="w-3.5 h-3.5 text-amber-300"></i> 기본 일러스트 적용
            </div>
          ` : ''}
        </div>

        <div class="blog-post-content text-slate-700 leading-relaxed text-sm sm:text-base">
          ${renderedContent}
        </div>

        <!-- 5, 6. [요청사항 준수] '리스트로 돌아가기' 밝은 배경 + 어두운 텍스트/테두리 대비 버튼 -->
        <div class="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          ${getBackToListButtonHtml("navigateTo('diary')")}

          <div class="flex items-center gap-2">
            ${getActionButtonHtml(`openPostEditorModal('edit', 'diary', '', '${post.id}')`)}
            <button onclick="deletePost('diary', '${post.id}')" class="px-3 py-2 rounded-xl text-xs text-rose-500 hover:text-rose-700 font-semibold hover:bg-rose-50 transition-colors">
              삭제
            </button>
          </div>
        </div>

      </article>
    </div>
  `;
}

// ==================== TOAST UI EDITOR 기반 모달 ====================
function openPostEditorModal(mode, menu, destId = "", postId = "") {
  document.getElementById("editor-post-target-menu").value = menu;
  document.getElementById("editor-post-target-dest-id").value = destId;
  document.getElementById("editor-post-edit-id").value = postId;

  const headingEl = document.getElementById("post-modal-heading");
  const submitBtn = document.getElementById("editor-submit-btn");
  const catWrapper = document.getElementById("editor-category-field-wrapper");
  const titleWrapper = document.getElementById("editor-title-field-wrapper");
  const coverWrapper = document.getElementById("editor-cover-field-wrapper");
  const catSelect = document.getElementById("editor-category-select");

  submitBtn.textContent = "저장";

  editorTempState = {
    images: [],
    selectedCover: ""
  };

  if (menu === "home") {
    headingEl.textContent = "Home 메인 화면 작성";
    catWrapper.classList.add("hidden");
    titleWrapper.classList.add("hidden");
    coverWrapper.classList.add("hidden");

    const homeMarkdown = (appState.homeContent && appState.homeContent.markdown) || INITIAL_STATE.homeContent.markdown;
    if (toastEditorInstance) {
      toastEditorInstance.setMarkdown(homeMarkdown);
    }
  } else {
    catWrapper.classList.remove("hidden");
    titleWrapper.classList.remove("hidden");
    coverWrapper.classList.remove("hidden");
    headingEl.textContent = (mode === 'edit' ? "게시글 수정" : "새 게시글 작성");

    const subList = appState.submenus[menu] || [];
    if (subList.length > 0) {
      catSelect.innerHTML = subList.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
    } else {
      catSelect.innerHTML = `<option value="일반">일반</option>`;
    }

    if (mode === 'edit') {
      let post = null;
      if (menu === "work") {
        post = (appState.workPosts || []).find(p => p.id === postId);
      } else if (menu === "trip") {
        post = (appState.tripPosts || []).find(p => p.id === postId);
      } else if (menu === "diary") {
        post = (appState.diaryPosts || []).find(p => p.id === postId);
      }

      if (post) {
        document.getElementById("editor-title-input").value = post.title || "";
        catSelect.value = post.category || catSelect.options[0].value;
        if (toastEditorInstance) toastEditorInstance.setMarkdown(post.content || "");

        editorTempState.images = post.images ? [...post.images] : [];
        if (post.coverImage && !editorTempState.images.includes(post.coverImage)) {
          editorTempState.images.unshift(post.coverImage);
        }
        editorTempState.selectedCover = post.coverImage || (editorTempState.images[0] || "");
      }
    } else {
      document.getElementById("editor-title-input").value = "";
      if (toastEditorInstance) toastEditorInstance.setMarkdown("");
    }
  }

  renderEditorGalleryThumbnails();
  document.getElementById("post-editor-modal").classList.remove("hidden");
  
  setTimeout(() => {
    if (toastEditorInstance) {
      toastEditorInstance.scrollTop = 0;
    }
  }, 50);

  if (window.lucide) lucide.createIcons();
}

function closePostEditorModal() {
  document.getElementById("post-editor-modal").classList.add("hidden");
}

function addImageToEditorGallery() {
  const urlInput = document.getElementById("editor-new-image-url");
  const url = urlInput.value.trim();

  if (!url) {
    alert("이미지 URL을 입력해주세요.");
    return;
  }
  if (editorTempState.images.includes(url)) {
    alert("이미 추가된 이미지입니다.");
    return;
  }

  editorTempState.images.push(url);
  if (!editorTempState.selectedCover) {
    editorTempState.selectedCover = url;
  }

  if (toastEditorInstance) {
    toastEditorInstance.insertText(`\n![Image](${url})\n`);
  }

  urlInput.value = "";
  renderEditorGalleryThumbnails();
}

function addPresetImageToEditorGallery() {
  const presets = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  ];
  const rand = presets[Math.floor(Math.random() * presets.length)];
  if (!editorTempState.images.includes(rand)) {
    editorTempState.images.push(rand);
    if (!editorTempState.selectedCover) {
      editorTempState.selectedCover = rand;
    }
    if (toastEditorInstance) {
      toastEditorInstance.insertText(`\n![Image](${rand})\n`);
    }
    renderEditorGalleryThumbnails();
  }
}

function selectCoverImage(imgUrl) {
  editorTempState.selectedCover = imgUrl;
  renderEditorGalleryThumbnails();
}

function removeImageFromEditorGallery(idx, e) {
  e.stopPropagation();
  const removed = editorTempState.images.splice(idx, 1)[0];
  if (editorTempState.selectedCover === removed) {
    editorTempState.selectedCover = editorTempState.images.length > 0 ? editorTempState.images[0] : "";
  }
  renderEditorGalleryThumbnails();
}

function renderEditorGalleryThumbnails() {
  const container = document.getElementById("editor-gallery-thumbnails");
  const infoEl = document.getElementById("editor-selected-cover-info");
  if (!container) return;

  if (editorTempState.images.length === 0) {
    container.innerHTML = `
      <div class="w-full py-2.5 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
        추가된 이미지가 없습니다. URL을 입력하여 추가하면 대표 이미지로 지정할 수 있습니다.
      </div>
    `;
    if (infoEl) infoEl.textContent = "";
    return;
  }

  container.innerHTML = editorTempState.images.map((img, idx) => {
    const isCover = editorTempState.selectedCover === img;
    return `
      <div onclick="selectCoverImage('${img}')" class="relative group cursor-pointer w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${isCover ? 'border-indigo-600 ring-2 ring-indigo-300 scale-105 shadow-md' : 'border-slate-200 hover:border-indigo-400 opacity-80 hover:opacity-100'}">
        <img src="${img}" alt="Thumb" class="w-full h-full object-cover">
        ${isCover ? `
          <div class="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
            <span class="bg-indigo-600 text-white text-[9px] font-bold px-1 py-0.5 rounded shadow-xs">대표</span>
          </div>
        ` : `
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="text-white text-[8px] font-medium">클릭시 대표</span>
          </div>
        `}
        <button onclick="removeImageFromEditorGallery(${idx}, event)" class="absolute top-1 right-1 w-3.5 h-3.5 bg-black/60 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-[8px]">
          ×
        </button>
      </div>
    `;
  }).join('');

  if (infoEl) {
    if (editorTempState.selectedCover) {
      infoEl.textContent = `✓ 선택된 대표 이미지가 목록 카드 썸네일로 적용됩니다.`;
    } else {
      infoEl.textContent = "";
    }
  }
}

function submitPostEditor() {
  const targetMenu = document.getElementById("editor-post-target-menu").value;
  const destId = document.getElementById("editor-post-target-dest-id").value;
  const editId = document.getElementById("editor-post-edit-id").value;

  const contentMarkdown = toastEditorInstance ? toastEditorInstance.getMarkdown().trim() : "";
  const today = new Date().toISOString().slice(0, 10);

  // Home 저장
  if (targetMenu === "home") {
    if (!contentMarkdown) {
      alert("Home 메인 화면 내용을 입력해주세요.");
      return;
    }
    appState.homeContent = {
      markdown: contentMarkdown
    };
    saveState();
    closePostEditorModal();
    renderCurrentView();
    return;
  }

  const category = document.getElementById("editor-category-select").value;
  const title = document.getElementById("editor-title-input").value.trim();
  const coverImage = editorTempState.selectedCover;
  const images = [...editorTempState.images];

  if (!title) {
    alert("게시글 제목을 입력해주세요.");
    return;
  }
  if (!contentMarkdown) {
    alert("에디터 본문 내용을 입력해주세요.");
    return;
  }

  if (targetMenu === "work") {
    if (editId) {
      const p = (appState.workPosts || []).find(item => item.id === editId);
      if (p) {
        p.title = title;
        p.category = category;
        p.content = contentMarkdown;
        p.updatedAt = today;
        p.coverImage = coverImage;
        p.images = images;
      }
      saveState();
      closePostEditorModal();
      navigateTo("work", { postId: editId });
    } else {
      const newId = `w-${Date.now()}`;
      appState.workPosts.unshift({
        id: newId,
        title: title,
        category: category,
        createdAt: today,
        updatedAt: today,
        coverImage: coverImage,
        images: images,
        content: contentMarkdown
      });
      saveState();
      closePostEditorModal();
      navigateTo("work", { postId: newId });
    }
  } else if (targetMenu === "trip") {
    if (!appState.tripPosts) appState.tripPosts = [];

    if (editId) {
      const p = appState.tripPosts.find(item => item.id === editId);
      if (p) {
        p.title = title;
        p.category = category;
        p.content = contentMarkdown;
        p.updatedAt = today;
        p.coverImage = coverImage;
        p.images = images;
      }
      saveState();
      closePostEditorModal();
      navigateTo("trip", { tripDestId: destId, postId: editId });
    } else {
      const newId = `t-${Date.now()}`;
      appState.tripPosts.unshift({
        id: newId,
        destId: destId,
        title: title,
        category: category,
        createdAt: today,
        updatedAt: today,
        coverImage: coverImage,
        images: images,
        content: contentMarkdown
      });
      saveState();
      closePostEditorModal();
      navigateTo("trip", { tripDestId: destId, postId: newId });
    }
  } else if (targetMenu === "diary") {
    if (editId) {
      const p = (appState.diaryPosts || []).find(item => item.id === editId);
      if (p) {
        p.title = title;
        p.category = category;
        p.content = contentMarkdown;
        p.updatedAt = today;
        p.coverImage = coverImage;
        p.images = images;
      }
      saveState();
      closePostEditorModal();
      navigateTo("diary", { postId: editId });
    } else {
      const newId = `d-${Date.now()}`;
      appState.diaryPosts.unshift({
        id: newId,
        title: title,
        category: category,
        createdAt: today,
        updatedAt: today,
        coverImage: coverImage,
        images: images,
        content: contentMarkdown
      });
      saveState();
      closePostEditorModal();
      navigateTo("diary", { postId: newId });
    }
  }
}

function deletePost(menu, id) {
  if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

  if (menu === "work") {
    appState.workPosts = (appState.workPosts || []).filter(p => p.id !== id);
    saveState();
    navigateTo("work");
  } else if (menu === "diary") {
    appState.diaryPosts = (appState.diaryPosts || []).filter(p => p.id !== id);
    saveState();
    navigateTo("diary");
  }
}

function deleteTripPost(postId) {
  if (!confirm("정말로 이 여행기를 삭제하시겠습니까?")) return;
  const p = (appState.tripPosts || []).find(item => item.id === postId);
  const destId = p ? p.destId : null;
  appState.tripPosts = (appState.tripPosts || []).filter(item => item.id !== postId);
  saveState();
  if (destId) {
    navigateTo("trip", { tripDestId: destId });
  } else {
    navigateTo("trip");
  }
}

// ==================== 블로그 설정 모달 ====================
function openCustomizerModal(defaultTab = 'menu-manage') {
  renderSubmenuManagementList();
  renderTripDestImagesList();
  switchModalTab(defaultTab);
  document.getElementById("customizer-modal").classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeCustomizerModal() {
  document.getElementById("customizer-modal").classList.add("hidden");
}

function saveAndCloseCustomizerModal() {
  saveState();
  closeCustomizerModal();
  renderCurrentView();
}

function switchModalTab(tabId) {
  const tabs = ['menu-manage', 'trip-cat-manage'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    if (t === tabId) {
      btn.className = "pb-3 border-b-2 border-indigo-600 text-indigo-600 font-semibold flex items-center gap-2 transition-all";
      content.classList.remove("hidden");
    } else {
      btn.className = "pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 flex items-center gap-2 transition-all";
      content.classList.add("hidden");
    }
  });
  if (window.lucide) lucide.createIcons();
}

// 1. [요청사항 준수] Work, Trip, Diary 순서 고정 & 각 메뉴 내에서 하위 메뉴끼리 순서 변경(위/아래 이동) 지원
function renderSubmenuManagementList() {
  const container = document.getElementById("submenu-management-list");
  if (!container) return;

  const menus = [
    { key: 'work', label: 'Work(업무)' },
    { key: 'trip', label: 'Trip(여행)' },
    { key: 'diary', label: 'Diary(일상)' }
  ];

  let html = "";
  menus.forEach(m => {
    const list = appState.submenus[m.key] || [];
    html += `
      <div class="p-3 bg-slate-50/70 flex items-center justify-between font-bold text-xs text-slate-700">
        <span>${m.label} (${list.length})</span>
      </div>
    `;

    if (list.length === 0) {
      html += `<div class="p-3 text-xs text-slate-400 pl-6">등록된 하위 메뉴가 없습니다.</div>`;
    } else {
      list.forEach((sub, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === list.length - 1;
        html += `
          <div class="p-2.5 pl-4 sm:pl-6 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-2">
              <!-- 순서 변경 버튼 (위/아래) -->
              <div class="flex flex-col gap-0.5">
                <button onclick="moveSubmenuOrder('${m.key}', ${idx}, -1)" ${isFirst ? 'disabled class="opacity-20 cursor-not-allowed"' : 'class="hover:text-indigo-600 text-slate-400"'} title="위로 이동">
                  <i data-lucide="chevron-up" class="w-3.5 h-3.5"></i>
                </button>
                <button onclick="moveSubmenuOrder('${m.key}', ${idx}, 1)" ${isLast ? 'disabled class="opacity-20 cursor-not-allowed"' : 'class="hover:text-indigo-600 text-slate-400"'} title="아래로 이동">
                  <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
                </button>
              </div>
              <span class="w-1.5 h-1.5 rounded-full ${m.key === 'trip' ? 'bg-sky-500' : (m.key === 'work' ? 'bg-indigo-500' : 'bg-violet-500')}"></span>
              <span class="font-medium text-slate-800">${escapeHtml(sub.name)}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="editSubmenuPrompt('${m.key}', '${sub.id}')" class="px-2 py-1 rounded text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 text-[11px] font-semibold">수정</button>
              <button onclick="deleteSubmenu('${m.key}', '${sub.id}')" class="px-2 py-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 text-[11px] font-semibold">삭제</button>
            </div>
          </div>
        `;
      });
    }
  });

  container.innerHTML = html;
  if (window.lucide) lucide.createIcons();
}

// 1. [요청사항 준수] 하위 메뉴 순서 변경 핸들러
function moveSubmenuOrder(menuKey, index, direction) {
  const list = appState.submenus[menuKey];
  if (!list) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= list.length) return;

  const temp = list[index];
  list[index] = list[targetIndex];
  list[targetIndex] = temp;

  saveState();
  renderSubmenuManagementList();
  renderCurrentView();
}

function addSubmenuItem() {
  const parent = document.getElementById("new-submenu-parent").value;
  const nameInput = document.getElementById("new-submenu-name");
  const name = nameInput.value.trim();

  if (!name) {
    alert("하위 메뉴 이름을 입력해주세요.");
    return;
  }

  const newId = `sub-${parent}-${Date.now()}`;
  if (!appState.submenus[parent]) appState.submenus[parent] = [];

  appState.submenus[parent].push({
    id: newId,
    name: name,
    filter: name
  });

  nameInput.value = "";
  saveState();
  renderSubmenuManagementList();
  renderCurrentView();
}

function editSubmenuPrompt(menuKey, subId) {
  const item = (appState.submenus[menuKey] || []).find(s => s.id === subId);
  if (!item) return;

  const newName = prompt("새로운 이름을 입력하세요:", item.name);
  if (newName && newName.trim() !== "") {
    item.name = newName.trim();
    item.filter = newName.trim();
    saveState();
    renderSubmenuManagementList();
    renderCurrentView();
  }
}

function deleteSubmenu(menuKey, subId) {
  if (!confirm("이 항목을 삭제하시겠습니까?")) return;
  appState.submenus[menuKey] = (appState.submenus[menuKey] || []).filter(s => s.id !== subId);
  saveState();
  renderSubmenuManagementList();
  renderCurrentView();
}

// 2, 3. [요청사항 준수] 여행지 관리: 순서 변경(위/아래 버튼) 및 각 카드 우측 하단에 '삭제' 버튼 배치
function renderTripDestImagesList() {
  const container = document.getElementById("trip-dest-images-list");
  if (!container) return;

  const destList = appState.tripDestinations || [];
  if (destList.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
        등록된 여행지가 없습니다. 위에서 새 여행지를 추가해보세요.
      </div>
    `;
    return;
  }

  container.innerHTML = destList.map((dest, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === destList.length - 1;
    const img = dest.image && dest.image.trim() !== "" ? dest.image : DEFAULT_TRIP_IMAGE;

    return `
      <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-center relative">
        
        <!-- 2. 여행지 순서 변경 버튼 -->
        <div class="flex sm:flex-col gap-1 items-center shrink-0">
          <button onclick="moveTripDestOrder(${idx}, -1)" ${isFirst ? 'disabled class="opacity-20 cursor-not-allowed"' : 'class="p-1 hover:text-indigo-600 text-slate-500 rounded hover:bg-slate-200"'} title="위로 이동">
            <i data-lucide="chevron-up" class="w-4 h-4"></i>
          </button>
          <button onclick="moveTripDestOrder(${idx}, 1)" ${isLast ? 'disabled class="opacity-20 cursor-not-allowed"' : 'class="p-1 hover:text-indigo-600 text-slate-500 rounded hover:bg-slate-200"'} title="아래로 이동">
            <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200 border border-slate-200 shadow-xs relative">
          <img src="${img}" alt="${escapeHtml(dest.name)}" class="w-full h-full object-cover">
          ${(!dest.image || dest.image.trim() === "") ? `
            <span class="absolute bottom-1 left-1 bg-black/60 text-amber-300 text-[8px] px-1 rounded">기본</span>
          ` : ''}
        </div>

        <div class="flex-1 w-full space-y-2">
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-bold text-slate-800">${escapeHtml(dest.name)}</h5>
          </div>

          <div class="flex gap-2">
            <input type="text" id="dest-img-input-${dest.id}" value="${dest.image || ''}" placeholder="대표 이미지 URL (비워두면 기본 이미지)" class="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white">
            <button onclick="saveTripDestinationImage('${dest.id}')" class="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shrink-0">
              저장
            </button>
            <button onclick="setSampleTripImage('${dest.id}')" class="px-2.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold shrink-0">
              샘플
            </button>
          </div>

          <!-- 3. [요청사항 준수] 삭제 버튼의 이름을 '삭제'로 변경하고, 각 카드의 우측 하단으로 위치 변경 -->
          <div class="flex justify-end pt-1">
            <button onclick="deleteTripDestination('${dest.id}')" class="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-[11px] font-bold transition-colors">
              삭제
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// 2. [요청사항 준수] 여행지 순서 변경 핸들러
function moveTripDestOrder(index, direction) {
  const list = appState.tripDestinations;
  if (!list) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= list.length) return;

  const temp = list[index];
  list[index] = list[targetIndex];
  list[targetIndex] = temp;

  saveState();
  renderTripDestImagesList();
  // 변경된 순서를 즉시 반영하여 Trip 메인에도 적용
  if (currentRoute.menu === 'trip') renderCurrentView();
}

function addNewTripDestination() {
  const nameInput = document.getElementById("new-dest-name-input");
  const imgInput = document.getElementById("new-dest-image-input");

  const name = nameInput.value.trim();
  const image = imgInput.value.trim();

  if (!name) {
    alert("여행지 이름을 입력해주세요.");
    return;
  }

  if (!appState.tripDestinations) appState.tripDestinations = [];

  const newId = `dest-${Date.now()}`;
  appState.tripDestinations.push({
    id: newId,
    name: name,
    image: image
  });

  nameInput.value = "";
  imgInput.value = "";
  saveState();
  renderTripDestImagesList();
  if (currentRoute.menu === 'trip') renderCurrentView();
  alert(`[${name}] 여행지가 성공적으로 등록되었습니다.`);
}

function saveTripDestinationImage(destId) {
  const input = document.getElementById(`dest-img-input-${destId}`);
  if (!input) return;
  const val = input.value.trim();

  const dest = (appState.tripDestinations || []).find(d => d.id === destId);
  if (dest) {
    dest.image = val;
    saveState();
    renderTripDestImagesList();
    if (currentRoute.menu === 'trip') renderCurrentView();
    alert(`[${dest.name}] 대표 이미지가 저장되었습니다.`);
  }
}

function setSampleTripImage(destId) {
  const samples = [
    "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80"
  ];
  const rand = samples[Math.floor(Math.random() * samples.length)];
  const input = document.getElementById(`dest-img-input-${destId}`);
  if (input) {
    input.value = rand;
    saveTripDestinationImage(destId);
  }
}

function deleteTripDestination(destId) {
  if (!confirm("이 여행지를 삭제하시겠습니까?")) return;
  appState.tripDestinations = (appState.tripDestinations || []).filter(d => d.id !== destId);
  saveState();
  renderTripDestImagesList();
  if (currentRoute.menu === 'trip') renderCurrentView();
}

function resetToSampleData() {
  if (!confirm("모든 데이터를 기본 샘플 상태로 되돌리시겠습니까?")) return;
  localStorage.removeItem("yeonlog_blog_state_v6");
  loadState();
  closeCustomizerModal();
  navigateTo("home");
  alert("초기화되었습니다.");
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
