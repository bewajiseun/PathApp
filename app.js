/**
 * Pathfinder - Career Discovery Web Application for Students 13-17
 * Pure Vanilla JavaScript Application Logic
 *
 * Implements refined UX hierarchy:
 * 1. Where am I? (Clean header, page title)
 * 2. What should I do today? (Spotlight Task + Start Task CTA)
 * 3. What can I explore next? (Filtered Career Tracks & Task Grid)
 * 4. What progress have I made? (Badges & Progress Dashboard)
 */

// ==================== APP STATE & CAREER DATASET ====================

const STORAGE_KEY = 'pathfinder_user_state_v1';

const APP_STATE = {
  userXP: 750,
  userStreak: 4,
  currentCategoryId: 'all',
  activeTaskId: null,
  activeCompletedTaskId: null,
  completedTaskIds: new Set(['task-3']), // Task 3 completed for realistic initial showcase
  unlockedBadges: new Set(['badge-cyber']),
  acquiredSkills: new Set(['Network Security', 'Threat Detection', 'Digital Forensics']),
  completedTaskData: {
    'task-3': {
      selectedOptionId: 'opt-1',
      completedAt: '2026-10-01T12:00:00.000Z'
    }
  },
  activitySelectedOption: null
};

function saveStateToStorage() {
  try {
    const data = {
      userXP: APP_STATE.userXP,
      userStreak: APP_STATE.userStreak,
      completedTaskIds: Array.from(APP_STATE.completedTaskIds),
      unlockedBadges: Array.from(APP_STATE.unlockedBadges),
      acquiredSkills: Array.from(APP_STATE.acquiredSkills),
      completedTaskData: APP_STATE.completedTaskData || {}
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Could not save to localStorage:', err);
  }
}

function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (typeof data.userXP === 'number' && !isNaN(data.userXP)) {
        APP_STATE.userXP = data.userXP;
      }
      if (typeof data.userStreak === 'number' && !isNaN(data.userStreak)) {
        APP_STATE.userStreak = data.userStreak;
      }
      if (Array.isArray(data.completedTaskIds)) {
        APP_STATE.completedTaskIds = new Set(data.completedTaskIds);
      }
      if (Array.isArray(data.unlockedBadges)) {
        APP_STATE.unlockedBadges = new Set(data.unlockedBadges);
      }
      if (Array.isArray(data.acquiredSkills)) {
        APP_STATE.acquiredSkills = new Set(data.acquiredSkills);
      } else {
        APP_STATE.acquiredSkills = new Set();
        CAREER_TASKS.forEach(t => {
          if (APP_STATE.completedTaskIds.has(t.id)) {
            t.skills.forEach(s => APP_STATE.acquiredSkills.add(s));
          }
        });
      }
      if (data.completedTaskData && typeof data.completedTaskData === 'object') {
        APP_STATE.completedTaskData = data.completedTaskData;
      }
      return true;
    }
  } catch (err) {
    console.warn('Could not load from localStorage:', err);
  }
  // Initialize and persist initial defaults
  saveStateToStorage();
  return false;
}

// Lucide icon mapping for careers and tracks
const CAREER_TASKS = [
  {
    id: 'task-1',
    title: 'Craft a Homework Assistant System Prompt',
    career: 'AI Prompt Engineer',
    category: 'tech',
    categoryName: 'Tech & AI',
    iconName: 'lucide:cpu',
    catColorClass: 'cat-tech',
    duration: '5 min',
    difficulty: 'Beginner',
    xp: 150,
    salary: '$115,000 / yr',
    demand: 'High Demand',
    description: 'Learn how to instruct AI models to give step-by-step math hints without giving away the final answers.',
    skills: ['Prompt Engineering', 'AI Ethics', 'Logical Constraints'],
    badgeId: 'badge-ai',
    badgeName: 'AI Prompt Pioneer',
    badgeIconName: 'lucide:cpu',
    scenarioPrompt: 'You are configuring an AI study helper for high school geometry. The student asks: "What is the area of a circle with radius 5?" How should you prompt the AI model?',
    options: [
      {
        id: 'opt-1',
        text: 'A) "Provide the formula A = πr², show the step-by-step substitution (π × 5²), and guide them to calculate 25π."',
        correct: true,
        feedback: 'Spot on! Outstanding prompt design. Guiding students with formulas and step-by-step substitution builds problem-solving skills without doing the work for them.'
      },
      {
        id: 'opt-2',
        text: 'B) "Just reply with 78.54 instantly so the student can copy it into their assignment quickly."',
        correct: false,
        feedback: 'Direct answers prevent learning. High-quality educational prompts encourage step-by-step discovery.'
      },
      {
        id: 'opt-3',
        text: 'C) "Tell the student math is too hard and suggest asking their teacher tomorrow."',
        correct: false,
        feedback: 'AI study assistants should empower and support learning, not turn users away.'
      }
    ],
    recommendedCareers: ['AI Ethicist', 'LLM Developer', 'Cognitive Systems Architect']
  },
  {
    id: 'task-2',
    title: 'Balance a Sci-Fi Boss Fight Level',
    career: 'Game Level Designer',
    category: 'creative',
    categoryName: 'Design & Gaming',
    iconName: 'lucide:gamepad-2',
    catColorClass: 'cat-creative',
    duration: '6 min',
    difficulty: 'Intermediate',
    xp: 180,
    salary: '$92,000 / yr',
    demand: 'Growing Field',
    description: 'Test player difficulty curves, boss attack cooldowns, and health pick-up locations in an action RPG.',
    skills: ['Game Mechanics', 'Player Psychology', 'Level Pacing'],
    badgeId: 'badge-game',
    badgeName: 'World Architect',
    badgeIconName: 'lucide:gamepad-2',
    scenarioPrompt: 'Playtesters report that 90% of players fail at Stage 3 of your boss battle because the boss spam attacks relentlessly. What design tweak balances the encounter best?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Double the boss HP and remove all health potions from the arena to test hardcore gamers.',
        correct: false,
        feedback: 'Making an already overwhelming fight even harder frustrates the vast majority of players.'
      },
      {
        id: 'opt-2',
        text: 'B) Add a 2.5-second telegraph animation before heavy attacks and spawn 2 cover pillars in the arena.',
        correct: true,
        feedback: 'Perfect Game Design! Visual telegraphing gives players a fair chance to dodge, creating a rewarding challenge.'
      },
      {
        id: 'opt-3',
        text: 'C) Reduce boss health to 1 hit point so anyone can beat it instantly with one button.',
        correct: false,
        feedback: 'Removing all challenge makes victory feel hollow and unrewarding.'
      }
    ],
    recommendedCareers: ['Environment Artist', 'Game Producer', 'UX Combat Specialist']
  },
  {
    id: 'task-3',
    title: 'Detect Phishing Attack Signals',
    career: 'Cybersecurity Analyst',
    category: 'tech',
    categoryName: 'Tech & AI',
    iconName: 'lucide:shield',
    catColorClass: 'cat-tech',
    duration: '4 min',
    difficulty: 'Beginner',
    xp: 120,
    salary: '$105,000 / yr',
    demand: 'Critical Demand',
    description: 'Analyze email headers, suspicious domain URLs, and social engineering tricks to protect organizations.',
    skills: ['Network Security', 'Threat Detection', 'Digital Forensics'],
    badgeId: 'badge-cyber',
    badgeName: 'Shield Operator',
    badgeIconName: 'lucide:shield',
    scenarioPrompt: 'An urgent security email arrives: "Your account is locked! Click http://paypa1-security-verify.net/login immediately". What is the red flag?',
    options: [
      {
        id: 'opt-1',
        text: 'A) The spoofed domain spelling ("paypa1") and non-official URL address.',
        correct: true,
        feedback: 'Excellent catch! Cyber analysts look closely at domain typos and deceptive URLs used in spoofing attacks.'
      },
      {
        id: 'opt-2',
        text: 'B) The email contains letters in the alphabet.',
        correct: false,
        feedback: 'Look closer at the URL domain address and suspicious spelling.'
      }
    ],
    recommendedCareers: ['Ethical Hacker', 'Security Operations Lead', 'Cryptographer']
  },
  {
    id: 'task-4',
    title: 'Optimize Smart Microgrid Solar Energy',
    career: 'Climate Tech Scientist',
    category: 'eco',
    categoryName: 'Science & Climate',
    iconName: 'lucide:leaf',
    catColorClass: 'cat-eco',
    duration: '5 min',
    difficulty: 'Intermediate',
    xp: 160,
    salary: '$98,000 / yr',
    demand: 'Rapidly Growing',
    description: 'Calculate battery storage distribution to power a sustainable high school campus during peak grid hours.',
    skills: ['Clean Energy Tech', 'Data Modeling', 'Sustainability'],
    badgeId: 'badge-eco',
    badgeName: 'Eco Innovator',
    badgeIconName: 'lucide:leaf',
    scenarioPrompt: 'Solar panels generate surplus 450 kWh energy at 1:00 PM when sunlight peaks, but school energy demand peaks at 6:00 PM. How do we prevent energy waste?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Route surplus afternoon energy into lithium-iron battery storage for discharge during 6 PM peak hours.',
        correct: true,
        feedback: 'Genius! Grid storage balancing is the core foundation of renewable climate engineering.'
      },
      {
        id: 'opt-2',
        text: 'B) Turn off all solar panels during sunny afternoon hours to stop power output.',
        correct: false,
        feedback: 'Turning off clean generation wastes free, zero-emission renewable energy.'
      }
    ],
    recommendedCareers: ['Renewable Energy Engineer', 'Grid Systems Analyst', 'Sustainability Consultant']
  },
  {
    id: 'task-5',
    title: 'Design Teen Financial Onboarding UI',
    career: 'Product UI/UX Designer',
    category: 'creative',
    categoryName: 'Design & Gaming',
    iconName: 'lucide:palette',
    catColorClass: 'cat-creative',
    duration: '5 min',
    difficulty: 'Beginner',
    xp: 140,
    salary: '$100,000 / yr',
    demand: 'High Demand',
    description: 'Create an accessible, intuitive savings goal wizard for high school students opening their first account.',
    skills: ['User Experience', 'Wireframing', 'Visual Accessibility'],
    badgeId: 'badge-ux',
    badgeName: 'UX Visionary',
    badgeIconName: 'lucide:palette',
    scenarioPrompt: 'Teen users abandon financial apps when overwhelmed by wall-of-text terms. How do you improve the goal setup screen?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Break goal setting into 3 visual steps (Goal Name → Target Amount → Saver Mascot) with progress indicators.',
        correct: true,
        feedback: 'Superb UX thinking! Progressive disclosure reduces cognitive load and keeps users engaged.'
      },
      {
        id: 'opt-2',
        text: 'B) Put 40 text input fields on a single scrolling screen with 9pt font size.',
        correct: false,
        feedback: 'Dense text causes user fatigue and high drop-off rates.'
      }
    ],
    recommendedCareers: ['Product Designer', 'Interaction Architect', 'Design Systems Lead']
  },
  {
    id: 'task-6',
    title: 'Pivot a Student Marketplace Startup',
    career: 'FinTech Founder',
    category: 'business',
    categoryName: 'Future Business',
    iconName: 'lucide:rocket',
    catColorClass: 'cat-business',
    duration: '7 min',
    difficulty: 'Advanced',
    xp: 200,
    salary: '$130,000 / yr',
    demand: 'High Demand',
    description: 'Analyze student buyer trends to refine a peer-to-peer textbook and study notes exchange app.',
    skills: ['Market Research', 'Value Proposition', 'Financial Strategy'],
    badgeId: 'badge-biz',
    badgeName: 'Venture Pioneer',
    badgeIconName: 'lucide:rocket',
    scenarioPrompt: 'Your peer-to-peer book marketplace app has high downloads but low transactions because shipping takes 5 days. What is your strategic pivot?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Launch instant digital PDF note scanning & local campus lockers for same-day physical pickup.',
        correct: true,
        feedback: 'Brilliant Venture Pivot! Solving transaction friction drives real user retention and growth.'
      },
      {
        id: 'opt-2',
        text: 'B) Increase price subscription fees by 300% without fixing shipping delays.',
        correct: false,
        feedback: 'Raising prices while service is slow causes immediate customer loss.'
      }
    ],
    recommendedCareers: ['Venture Capital Analyst', 'Product Manager', 'Growth Strategist']
  }
];

const ALL_BADGES = [
  { id: 'badge-ai', name: 'AI Prompt Pioneer', iconName: 'lucide:cpu' },
  { id: 'badge-game', name: 'World Architect', iconName: 'lucide:gamepad-2' },
  { id: 'badge-cyber', name: 'Shield Operator', iconName: 'lucide:shield' },
  { id: 'badge-eco', name: 'Eco Innovator', iconName: 'lucide:leaf' },
  { id: 'badge-ux', name: 'UX Visionary', iconName: 'lucide:palette' },
  { id: 'badge-biz', name: 'Venture Pioneer', iconName: 'lucide:rocket' }
];

// ==================== INITIALIZATION & DOM REFERENCES ====================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  loadStateFromStorage();
  bindNavigationEvents();
  bindFilterEvents();
  renderHeaderStats();
  renderTodayScreen();
}

// ==================== SCREEN NAVIGATION LOGIC ====================

function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => {
    s.classList.remove('active');
  });

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update Header Navigation Active Tabs
  const navToday = document.getElementById('nav-today');
  const navProgress = document.getElementById('nav-progress');

  if (navToday && navProgress) {
    if (screenId === 'screen-today' || screenId === 'screen-details') {
      navToday.classList.add('active');
      navProgress.classList.remove('active');
    } else if (screenId === 'screen-progress' || screenId === 'screen-completed-details') {
      navProgress.classList.add('active');
      navToday.classList.remove('active');
    } else {
      navToday.classList.remove('active');
      navProgress.classList.remove('active');
    }
  }
}

function bindNavigationEvents() {
  // Brand Click -> Today Screen
  const brandBtn = document.getElementById('brand-home');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
    });
  }

  // Header Nav Tabs
  const navToday = document.getElementById('nav-today');
  if (navToday) {
    navToday.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
    });
  }

  const navProgress = document.getElementById('nav-progress');
  if (navProgress) {
    navProgress.addEventListener('click', () => {
      renderProgressScreen();
      showScreen('screen-progress');
    });
  }

  // Avatar Click -> My Progress Screen
  const userAvatar = document.getElementById('user-avatar');
  if (userAvatar) {
    userAvatar.addEventListener('click', () => {
      renderProgressScreen();
      showScreen('screen-progress');
    });
  }

  // Hero primary action button -> Scroll / open today's spotlight task
  const btnHeroExplore = document.getElementById('btn-hero-explore-today');
  if (btnHeroExplore) {
    btnHeroExplore.addEventListener('click', () => {
      const spotlightEl = document.getElementById('spotlight-task-section');
      if (spotlightEl) {
        spotlightEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Back Button from Details -> Today Screen
  const btnBack = document.getElementById('btn-back-to-today');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
    });
  }

  // Task Complete Screen Buttons
  const btnFinishReturn = document.getElementById('btn-finish-return');
  if (btnFinishReturn) {
    btnFinishReturn.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
    });
  }

  const btnViewProgress = document.getElementById('btn-view-progress');
  if (btnViewProgress) {
    btnViewProgress.addEventListener('click', () => {
      renderProgressScreen();
      showScreen('screen-progress');
    });
  }

  const btnTryNext = document.getElementById('btn-try-next');
  if (btnTryNext) {
    btnTryNext.addEventListener('click', () => {
      // Find next incomplete task
      const nextTask = CAREER_TASKS.find(t => !APP_STATE.completedTaskIds.has(t.id)) || CAREER_TASKS[0];
      openTaskDetails(nextTask.id);
    });
  }

  // My Progress Screen Buttons
  const btnProgressBack = document.getElementById('btn-progress-back-to-today');
  if (btnProgressBack) {
    btnProgressBack.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
    });
  }

  const btnEmptyStart = document.getElementById('btn-empty-start');
  if (btnEmptyStart) {
    btnEmptyStart.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
    });
  }

  // Completed Task Details Buttons
  const btnCompletedBack = document.getElementById('btn-completed-back-to-progress');
  if (btnCompletedBack) {
    btnCompletedBack.addEventListener('click', () => {
      renderProgressScreen();
      showScreen('screen-progress');
    });
  }

  const btnReturnProgressBottom = document.getElementById('btn-return-progress-bottom');
  if (btnReturnProgressBottom) {
    btnReturnProgressBottom.addEventListener('click', () => {
      renderProgressScreen();
      showScreen('screen-progress');
    });
  }

  const btnExploreMore = document.getElementById('btn-explore-more');
  if (btnExploreMore) {
    btnExploreMore.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
    });
  }
}

// ==================== SCREEN 1: TODAY'S TASK LOGIC ====================

function renderHeaderStats(animate = false) {
  const xpEl = document.getElementById('user-xp');
  const streakEl = document.getElementById('user-streak');
  if (xpEl) xpEl.textContent = APP_STATE.userXP;
  if (streakEl) streakEl.textContent = APP_STATE.userStreak;

  if (animate) {
    const xpPill = document.getElementById('header-xp-pill');
    const streakPill = document.getElementById('header-streak-pill');
    if (xpPill) {
      xpPill.classList.remove('pill-updated');
      void xpPill.offsetWidth; // trigger reflow
      xpPill.classList.add('pill-updated');
    }
    if (streakPill) {
      streakPill.classList.remove('pill-updated');
      void streakPill.offsetWidth;
      streakPill.classList.add('pill-updated');
    }
  }
}

function setCategoryFilter(categoryId) {
  APP_STATE.currentCategoryId = categoryId;
  renderFilterChips();
  renderTaskGrid();
}

function renderFilterChips() {
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    const isCurrent = chip.getAttribute('data-category') === APP_STATE.currentCategoryId;
    if (isCurrent) {
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
    } else {
      chip.classList.remove('active');
      chip.setAttribute('aria-selected', 'false');
    }
  });
}

function bindFilterEvents() {
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const category = chip.getAttribute('data-category');
      setCategoryFilter(category);
    });

    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const category = chip.getAttribute('data-category');
        setCategoryFilter(category);
      }
    });
  });
}

function renderTodayScreen() {
  renderHeaderStats();
  renderSpotlightTask();
  renderFilterChips();
  renderTaskGrid();
  renderBadgesSection();
}

function renderSpotlightTask() {
  const spotlightContainer = document.getElementById('featured-task-card');
  if (!spotlightContainer) return;

  const featured = CAREER_TASKS[0]; // Task 1 is today's featured spotlight
  const isCompleted = APP_STATE.completedTaskIds.has(featured.id);

  spotlightContainer.innerHTML = `
    <div class="spot-info">
      <div class="spot-icon-wrapper" aria-hidden="true">
        <iconify-icon icon="${featured.iconName}" width="26" height="26"></iconify-icon>
      </div>
      <div class="spot-details">
        <div class="spot-tag-row">
          <span class="category-tag">${featured.categoryName}</span>
          <span class="meta-info">
            <iconify-icon icon="lucide:clock" width="13" height="13" style="vertical-align: -2px;"></iconify-icon>
            ${featured.duration} · ${featured.difficulty} · ${featured.career}
          </span>
          ${isCompleted ? `
            <span class="card-status status-done" style="margin-left: 6px;">
              <iconify-icon icon="lucide:check" width="11" height="11"></iconify-icon>
              <span>Completed</span>
            </span>
          ` : ''}
        </div>
        <h3 class="spot-title">${featured.title}</h3>
        <p class="spot-desc">${featured.description}</p>
      </div>
    </div>
    <div class="spot-action">
      <div class="reward-tag">
        <iconify-icon icon="lucide:sparkles" width="14" height="14" class="stat-icon-sparkle"></iconify-icon>
        <span>+${featured.xp} XP</span>
      </div>
      <button class="btn-primary" id="btn-start-spotlight" onclick="openTaskDetails('${featured.id}')">
        <span>${isCompleted ? 'Review Task' : 'Start Task'}</span>
        <iconify-icon icon="${isCompleted ? 'lucide:check' : 'lucide:arrow-right'}" width="16" height="16"></iconify-icon>
      </button>
    </div>
  `;
}

function renderTaskGrid() {
  const taskGrid = document.getElementById('task-grid');
  if (!taskGrid) return;

  const filteredTasks = CAREER_TASKS.filter(task => {
    if (APP_STATE.currentCategoryId === 'all') return true;
    return task.category === APP_STATE.currentCategoryId;
  });

  taskGrid.innerHTML = '';

  filteredTasks.forEach(task => {
    const isDone = APP_STATE.completedTaskIds.has(task.id);
    const cardEl = document.createElement('div');
    cardEl.className = `task-card ${isDone ? 'completed' : ''}`;
    cardEl.tabIndex = 0;
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('aria-label', `${task.title} - ${task.career}`);

    cardEl.innerHTML = `
      <div class="card-top">
        <div class="card-icon-box ${task.catColorClass}">
          <iconify-icon icon="${task.iconName}" width="20" height="20"></iconify-icon>
        </div>
        <span class="card-status ${isDone ? 'status-done' : 'status-new'}">
          <iconify-icon icon="${isDone ? 'lucide:check' : 'lucide:circle-dot'}" width="11" height="11"></iconify-icon>
          <span>${isDone ? 'Completed' : 'Daily Task'}</span>
        </span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${task.title}</h3>
        <p class="card-desc">${task.description}</p>
      </div>
      <div class="card-footer">
        <div class="card-meta">
          <iconify-icon icon="lucide:clock" width="13" height="13"></iconify-icon>
          <span>${task.duration}</span>
          <span>·</span>
          <span>${task.career}</span>
        </div>
        <span class="card-xp">
          <iconify-icon icon="lucide:sparkles" width="13" height="13"></iconify-icon>
          +${task.xp} XP
        </span>
      </div>
    `;

    cardEl.addEventListener('click', () => openTaskDetails(task.id));
    cardEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTaskDetails(task.id);
      }
    });

    taskGrid.appendChild(cardEl);
  });
}

function renderBadgesSection() {
  const container = document.getElementById('badges-container');
  const countText = document.getElementById('badge-count-text');
  if (!container) return;

  const unlockedCount = APP_STATE.unlockedBadges.size;
  if (countText) {
    countText.textContent = `${unlockedCount} of ${ALL_BADGES.length} Unlocked`;
  }

  container.innerHTML = '';
  ALL_BADGES.forEach(badge => {
    const isUnlocked = APP_STATE.unlockedBadges.has(badge.id);
    const badgeEl = document.createElement('div');
    badgeEl.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
    badgeEl.innerHTML = `
      <div class="badge-icon-box">
        <iconify-icon icon="${badge.iconName}" width="20" height="20"></iconify-icon>
      </div>
      <div class="badge-name">${badge.name}</div>
      <span class="badge-status-tag ${isUnlocked ? 'bs-unlocked' : 'bs-locked'}">
        <iconify-icon icon="${isUnlocked ? 'lucide:award' : 'lucide:lock'}" width="11" height="11"></iconify-icon>
        <span>${isUnlocked ? 'Unlocked' : 'Locked'}</span>
      </span>
    `;
    container.appendChild(badgeEl);
  });
}

// ==================== SCREEN 2: TASK DETAILS LOGIC ====================

function openTaskDetails(taskId) {
  APP_STATE.activeTaskId = taskId;
  APP_STATE.activitySelectedOption = null;

  const task = CAREER_TASKS.find(t => t.id === taskId);
  if (!task) return;

  const isAlreadyCompleted = APP_STATE.completedTaskIds.has(task.id);

  // Update Category Pill
  const categoryPill = document.getElementById('detail-category-pill');
  if (categoryPill) categoryPill.textContent = task.categoryName;

  // Header Card
  const headerCard = document.getElementById('detail-header-card');
  if (headerCard) {
    headerCard.innerHTML = `
      <div class="detail-icon-box">
        <iconify-icon icon="${task.iconName}" width="28" height="28"></iconify-icon>
      </div>
      <div class="detail-header-info">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
          <span class="category-tag">${task.categoryName}</span>
          <span class="meta-info">${task.duration} · ${task.difficulty}</span>
          ${isAlreadyCompleted ? `
            <span class="card-status status-done" style="margin-left: 6px;">
              <iconify-icon icon="lucide:check" width="11" height="11"></iconify-icon>
              <span>Completed</span>
            </span>
          ` : ''}
        </div>
        <h1 class="detail-title">${task.career}: ${task.title}</h1>
        <p class="detail-subtitle">${task.description}</p>
      </div>
    `;
  }

  // Quick Stats Row
  const statsRow = document.getElementById('detail-stats-row');
  if (statsRow) {
    statsRow.innerHTML = `
      <div class="career-stat-card">
        <div class="csc-icon-box">
          <iconify-icon icon="lucide:dollar-sign" width="18" height="18"></iconify-icon>
        </div>
        <div class="csc-data">
          <span class="csc-label">Avg Entry Salary</span>
          <span class="csc-val">${task.salary}</span>
        </div>
      </div>
      <div class="career-stat-card">
        <div class="csc-icon-box">
          <iconify-icon icon="lucide:trending-up" width="18" height="18"></iconify-icon>
        </div>
        <div class="csc-data">
          <span class="csc-label">Job Market Demand</span>
          <span class="csc-val">${task.demand}</span>
        </div>
      </div>
      <div class="career-stat-card">
        <div class="csc-icon-box">
          <iconify-icon icon="lucide:sparkles" width="18" height="18" class="stat-icon-sparkle"></iconify-icon>
        </div>
        <div class="csc-data">
          <span class="csc-label">${isAlreadyCompleted ? 'XP Claimed' : 'Completion Reward'}</span>
          <span class="csc-val text-yellow">+${task.xp} XP</span>
        </div>
      </div>
    `;
  }

  // Mission Overview Title & Reward
  const missionTitle = document.getElementById('detail-mission-title');
  const rewardXp = document.getElementById('detail-reward-xp');
  if (missionTitle) missionTitle.textContent = `Mission: ${task.title}`;
  if (rewardXp) rewardXp.textContent = `+${task.xp} XP`;

  // Render Activity Body (Scenario & Options)
  renderActivityModule(task);

  // Reset Submit Button & Feedback
  const submitBtn = document.getElementById('btn-submit-task');
  const feedbackBox = document.getElementById('feedback-box');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>${isAlreadyCompleted ? 'Complete Task & View Rewards' : 'Complete Task & Claim XP'}</span>
      <iconify-icon icon="lucide:check" width="16" height="16"></iconify-icon>
    `;
    submitBtn.onclick = () => submitTaskCompletion(task);
  }
  if (feedbackBox) {
    feedbackBox.style.display = 'none';
    feedbackBox.className = 'feedback-box';
  }

  // Switch to Details Screen
  showScreen('screen-details');
}

function renderActivityModule(task) {
  const activityBody = document.getElementById('activity-body');
  if (!activityBody) return;

  const optionsHtml = task.options.map(opt => `
    <div class="option-chip" data-opt-id="${opt.id}" role="radio" aria-checked="false" tabindex="0">
      <div class="option-radio"></div>
      <span class="option-label">${opt.text}</span>
    </div>
  `).join('');

  activityBody.innerHTML = `
    <p class="activity-prompt-text">
      Analyze the real-world scenario below. Choose the most effective strategy that a professional <strong>${task.career}</strong> would execute:
    </p>
    <div class="activity-scenario-card">
      <strong style="color: #8B7CF6; display: block; margin-bottom: 4px;">Real-World Scenario:</strong>
      ${task.scenarioPrompt}
    </div>
    <div class="options-group" id="options-group" role="radiogroup" aria-label="Scenario options">
      ${optionsHtml}
    </div>
  `;

  // Bind option selection
  const optionChips = activityBody.querySelectorAll('.option-chip');
  optionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const optId = chip.getAttribute('data-opt-id');
      selectActivityOption(task, optId);
    });

    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const optId = chip.getAttribute('data-opt-id');
        selectActivityOption(task, optId);
      }
    });
  });
}

function selectActivityOption(task, optId) {
  APP_STATE.activitySelectedOption = optId;
  const selectedOpt = task.options.find(o => o.id === optId);

  // Update UI selection
  const chips = document.querySelectorAll('.option-chip');
  chips.forEach(c => {
    const isCurrent = c.getAttribute('data-opt-id') === optId;
    c.setAttribute('aria-checked', isCurrent ? 'true' : 'false');
    if (isCurrent) {
      c.classList.add('selected');
      if (selectedOpt && selectedOpt.correct) {
        c.classList.add('correct-select');
      } else {
        c.classList.remove('correct-select');
      }
    } else {
      c.classList.remove('selected', 'correct-select');
    }
  });

  // Display Feedback Box with corresponding status styles
  const feedbackBox = document.getElementById('feedback-box');
  const feedbackText = document.getElementById('feedback-text');
  const feedbackIcon = document.getElementById('feedback-icon');
  const submitBtn = document.getElementById('btn-submit-task');

  if (feedbackBox && selectedOpt) {
    feedbackBox.style.display = 'flex';
    feedbackText.textContent = selectedOpt.feedback;
    if (selectedOpt.correct) {
      feedbackBox.className = 'feedback-box feedback-correct';
    } else {
      feedbackBox.className = 'feedback-box feedback-incorrect';
    }
    if (feedbackIcon) {
      feedbackIcon.innerHTML = `<iconify-icon icon="${selectedOpt.correct ? 'lucide:check-circle' : 'lucide:alert-circle'}" width="18" height="18" class="${selectedOpt.correct ? 'text-mint' : 'text-coral'}"></iconify-icon>`;
    }
  }

  // Enable Submit Button only if correct option selected
  if (submitBtn) {
    const isCorrect = Boolean(selectedOpt && selectedOpt.correct);
    submitBtn.disabled = !isCorrect;
  }
}

// ==================== TASK SUBMISSION & SCREEN 3: TASK COMPLETE LOGIC ====================

function submitTaskCompletion(task) {
  const isFirstTime = !APP_STATE.completedTaskIds.has(task.id);
  const wasBadgeUnlocked = APP_STATE.unlockedBadges.has(task.badgeId);

  if (isFirstTime) {
    // 1. Mark task as completed
    APP_STATE.completedTaskIds.add(task.id);

    // 2. Add task's XP to user's total XP
    APP_STATE.userXP += task.xp;

    // 3. Update the streak
    APP_STATE.userStreak += 1;

    // 4. Add the task's associated skills
    if (!APP_STATE.acquiredSkills) APP_STATE.acquiredSkills = new Set();
    task.skills.forEach(s => APP_STATE.acquiredSkills.add(s));

    // 5. Unlock the associated badge if its requirement is met
    APP_STATE.unlockedBadges.add(task.badgeId);

    // Record completed task metadata for history review
    if (!APP_STATE.completedTaskData) APP_STATE.completedTaskData = {};
    APP_STATE.completedTaskData[task.id] = {
      selectedOptionId: APP_STATE.activitySelectedOption,
      completedAt: new Date().toISOString()
    };

    // 6. Persist to Web Storage (localStorage)
    saveStateToStorage();
  }

  // Update header stats with animated feedback
  renderHeaderStats(true);

  // Setup Mission Accomplished Screen with updated reward information
  setupCompleteScreen(task, isFirstTime, !wasBadgeUnlocked);

  // Show screen and trigger celebratory confetti
  showScreen('screen-complete');
  triggerConfetti();
}

function setupCompleteScreen(task, isFirstTime, isNewBadge = true) {
  // XP & Streak displays
  const gainedXpEl = document.getElementById('gained-xp');
  const gainedStreakEl = document.getElementById('gained-streak');
  const completeIcon = document.getElementById('complete-icon');

  if (gainedXpEl) {
    gainedXpEl.textContent = `+${task.xp} XP`;
  }
  if (gainedStreakEl) {
    gainedStreakEl.textContent = isFirstTime ? `+1 Day` : `Active Streak`;
  }
  if (completeIcon) {
    completeIcon.innerHTML = `<iconify-icon icon="lucide:trophy" width="36" height="36"></iconify-icon>`;
  }

  // Render Skill Tags
  const skillsRow = document.getElementById('complete-skills-tags');
  if (skillsRow) {
    skillsRow.innerHTML = task.skills.map(s => `
      <span class="skill-tag">
        <iconify-icon icon="lucide:check" width="12" height="12"></iconify-icon>
        <span>${s}</span>
      </span>
    `).join('');
  }

  // Unlocked Badge Display
  const badgeBox = document.getElementById('new-badge-unlocked-box');
  const badgeIcon = document.getElementById('complete-badge-icon');
  const badgeTitle = document.getElementById('complete-badge-title');
  const badgeTag = badgeBox ? badgeBox.querySelector('.nb-tag') : null;

  if (badgeBox) {
    if (badgeIcon) {
      badgeIcon.innerHTML = `<iconify-icon icon="${task.badgeIconName}" width="28" height="28"></iconify-icon>`;
    }
    if (badgeTitle) badgeTitle.textContent = task.badgeName;
    if (badgeTag) {
      badgeTag.textContent = isNewBadge ? 'BADGE UNLOCKED' : 'BADGE MASTERED';
    }
    badgeBox.style.display = 'flex';
  }

  // Recommended Related Careers
  const recChipsRow = document.getElementById('complete-rec-chips');
  if (recChipsRow) {
    recChipsRow.innerHTML = task.recommendedCareers.map(c => `
      <span class="rec-chip">${c}</span>
    `).join('');
  }
}

// ==================== CANVAS CONFETTI (Refined, Subtle Palette) ====================

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  // Restrained palette: Purple, Mint, Blue, Yellow
  const colors = ['#8B7CF6', '#A7E8D0', '#A8C7FA', '#F6D98B', '#C4B5FD'];

  for (let i = 0; i < 60; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2
    });
  }

  let animationFrame;
  let startTime = Date.now();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (Date.now() - startTime < 2600) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  animate();
}

// ==================== SCREEN 4: MY PROGRESS LOGIC ====================

function renderProgressScreen() {
  renderHeaderStats();

  const totalXP = APP_STATE.userXP;
  const streak = APP_STATE.userStreak;
  const completedCount = APP_STATE.completedTaskIds.size;
  const totalTasks = CAREER_TASKS.length;
  const badgesCount = APP_STATE.unlockedBadges.size;
  const totalBadges = ALL_BADGES.length;
  const completionPercentage = Math.round((completedCount / totalTasks) * 100);

  // Stats display
  const xpEl = document.getElementById('progress-total-xp');
  const streakEl = document.getElementById('progress-streak');
  const completedCountEl = document.getElementById('progress-completed-count');
  const badgeCountEl = document.getElementById('progress-badge-count');
  const percentageEl = document.getElementById('progress-percentage');
  const barFillEl = document.getElementById('progress-bar-fill');
  const completedBadgeCount = document.getElementById('completed-count-badge');

  if (xpEl) xpEl.textContent = totalXP;
  if (streakEl) streakEl.textContent = `${streak} Days`;
  if (completedCountEl) completedCountEl.textContent = `${completedCount} of ${totalTasks}`;
  if (badgeCountEl) badgeCountEl.textContent = `${badgesCount} of ${totalBadges}`;
  if (percentageEl) percentageEl.textContent = `${completionPercentage}% Complete`;
  if (barFillEl) barFillEl.style.width = `${completionPercentage}%`;
  if (completedBadgeCount) {
    completedBadgeCount.innerHTML = `
      <iconify-icon icon="lucide:check" width="13" height="13"></iconify-icon>
      <span>${completedCount} Task${completedCount === 1 ? '' : 's'} Done</span>
    `;
  }

  // Render Completed Tasks Grid
  renderCompletedTasksGrid();

  // Render Acquired Skills
  renderAcquiredSkills();

  // Render Unlocked Badges Showcase
  renderProgressBadgesShowcase();
}

function renderCompletedTasksGrid() {
  const completedGrid = document.getElementById('completed-task-grid');
  const emptyState = document.getElementById('completed-empty-state');
  if (!completedGrid) return;

  const completedTasks = CAREER_TASKS.filter(task => APP_STATE.completedTaskIds.has(task.id));

  if (completedTasks.length === 0) {
    completedGrid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  completedGrid.style.display = 'grid';
  completedGrid.innerHTML = '';

  completedTasks.forEach(task => {
    const cardEl = document.createElement('div');
    cardEl.className = 'task-card completed';
    cardEl.tabIndex = 0;
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('aria-label', `Review completed task: ${task.title}`);

    cardEl.innerHTML = `
      <div class="card-top">
        <div class="card-icon-box ${task.catColorClass}">
          <iconify-icon icon="${task.iconName}" width="20" height="20"></iconify-icon>
        </div>
        <span class="card-status status-done">
          <iconify-icon icon="lucide:check" width="11" height="11"></iconify-icon>
          <span>Completed</span>
        </span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${task.title}</h3>
        <p class="card-desc">${task.description}</p>
      </div>
      <div class="card-footer">
        <div class="card-meta">
          <iconify-icon icon="lucide:clock" width="13" height="13"></iconify-icon>
          <span>${task.duration}</span>
          <span>·</span>
          <span>${task.career}</span>
        </div>
        <span class="card-xp">
          <iconify-icon icon="lucide:sparkles" width="13" height="13"></iconify-icon>
          +${task.xp} XP
        </span>
      </div>
    `;

    cardEl.addEventListener('click', () => openCompletedTaskDetails(task.id));
    cardEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCompletedTaskDetails(task.id);
      }
    });

    completedGrid.appendChild(cardEl);
  });
}

function renderAcquiredSkills() {
  const skillsContainer = document.getElementById('progress-acquired-skills');
  const countText = document.getElementById('skills-count-text');
  if (!skillsContainer) return;

  const acquiredSkillsSet = new Set();
  CAREER_TASKS.forEach(task => {
    if (APP_STATE.completedTaskIds.has(task.id)) {
      task.skills.forEach(skill => acquiredSkillsSet.add(skill));
    }
  });

  if (APP_STATE.acquiredSkills) {
    APP_STATE.acquiredSkills.forEach(s => acquiredSkillsSet.add(s));
  }

  const skillsList = Array.from(acquiredSkillsSet);
  if (countText) {
    countText.textContent = `${skillsList.length} Skill${skillsList.length === 1 ? '' : 's'} Mastered`;
  }

  if (skillsList.length === 0) {
    skillsContainer.innerHTML = '<span class="meta-info">Complete tasks to earn career skills!</span>';
    return;
  }

  skillsContainer.innerHTML = skillsList.map(skill => `
    <span class="skill-tag">
      <iconify-icon icon="lucide:check" width="12" height="12"></iconify-icon>
      <span>${skill}</span>
    </span>
  `).join('');
}

function renderProgressBadgesShowcase() {
  const container = document.getElementById('progress-badges-container');
  const countText = document.getElementById('progress-badge-summary');
  if (!container) return;

  const unlockedCount = APP_STATE.unlockedBadges.size;
  if (countText) {
    countText.textContent = `${unlockedCount} of ${ALL_BADGES.length} Unlocked`;
  }

  container.innerHTML = '';
  ALL_BADGES.forEach(badge => {
    const isUnlocked = APP_STATE.unlockedBadges.has(badge.id);
    const badgeEl = document.createElement('div');
    badgeEl.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
    badgeEl.innerHTML = `
      <div class="badge-icon-box">
        <iconify-icon icon="${badge.iconName}" width="20" height="20"></iconify-icon>
      </div>
      <div class="badge-name">${badge.name}</div>
      <span class="badge-status-tag ${isUnlocked ? 'bs-unlocked' : 'bs-locked'}">
        <iconify-icon icon="${isUnlocked ? 'lucide:award' : 'lucide:lock'}" width="11" height="11"></iconify-icon>
        <span>${isUnlocked ? 'Unlocked' : 'Locked'}</span>
      </span>
    `;
    container.appendChild(badgeEl);
  });
}

// ==================== SCREEN 5: COMPLETED TASK DETAILS LOGIC ====================

function openCompletedTaskDetails(taskId) {
  APP_STATE.activeCompletedTaskId = taskId;

  const task = CAREER_TASKS.find(t => t.id === taskId);
  if (!task) return;

  // Category Pill
  const categoryPill = document.getElementById('completed-detail-category-pill');
  if (categoryPill) categoryPill.textContent = task.categoryName;

  // Header Card
  const headerCard = document.getElementById('completed-detail-header-card');
  if (headerCard) {
    headerCard.innerHTML = `
      <div class="detail-icon-box">
        <iconify-icon icon="${task.iconName}" width="28" height="28"></iconify-icon>
      </div>
      <div class="detail-header-info">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="card-status status-done">
            <iconify-icon icon="lucide:check" width="11" height="11"></iconify-icon>
            <span>Completed</span>
          </span>
          <span class="meta-info">${task.duration} · ${task.difficulty}</span>
        </div>
        <h1 class="detail-title">${task.career}: ${task.title}</h1>
        <p class="detail-subtitle">${task.description}</p>
      </div>
    `;
  }

  // Quick Stats Row
  const statsRow = document.getElementById('completed-detail-stats-row');
  if (statsRow) {
    statsRow.innerHTML = `
      <div class="career-stat-card">
        <div class="csc-icon-box">
          <iconify-icon icon="lucide:dollar-sign" width="18" height="18"></iconify-icon>
        </div>
        <div class="csc-data">
          <span class="csc-label">Avg Entry Salary</span>
          <span class="csc-val">${task.salary}</span>
        </div>
      </div>
      <div class="career-stat-card">
        <div class="csc-icon-box">
          <iconify-icon icon="lucide:trending-up" width="18" height="18"></iconify-icon>
        </div>
        <div class="csc-data">
          <span class="csc-label">Job Market Demand</span>
          <span class="csc-val">${task.demand}</span>
        </div>
      </div>
      <div class="career-stat-card">
        <div class="csc-icon-box">
          <iconify-icon icon="lucide:sparkles" width="18" height="18" class="stat-icon-sparkle"></iconify-icon>
        </div>
        <div class="csc-data">
          <span class="csc-label">XP Claimed</span>
          <span class="csc-val text-yellow">+${task.xp} XP</span>
        </div>
      </div>
    `;
  }

  // Scenario
  const scenarioEl = document.getElementById('completed-detail-scenario');
  if (scenarioEl) scenarioEl.textContent = task.scenarioPrompt;

  // Completion Status Date
  const dateEl = document.getElementById('completed-detail-date');
  const taskRecord = APP_STATE.completedTaskData && APP_STATE.completedTaskData[taskId];
  if (dateEl) {
    if (taskRecord && taskRecord.completedAt) {
      try {
        const d = new Date(taskRecord.completedAt);
        const dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        dateEl.textContent = `Mastered · ${dateStr}`;
      } catch (e) {
        dateEl.textContent = 'Mastered';
      }
    } else {
      dateEl.textContent = 'Mastered';
    }
  }

  // Find correct option and strategy feedback
  const chosenOpt = taskRecord && taskRecord.selectedOptionId 
    ? task.options.find(o => o.id === taskRecord.selectedOptionId) 
    : null;
  const correctOption = chosenOpt || task.options.find(o => o.correct) || task.options[0];
  const choiceEl = document.getElementById('completed-detail-choice');
  const feedbackEl = document.getElementById('completed-detail-feedback');

  if (choiceEl) choiceEl.textContent = correctOption.text;
  if (feedbackEl) feedbackEl.textContent = correctOption.feedback;

  // Skills
  const skillsRow = document.getElementById('completed-detail-skills');
  if (skillsRow) {
    skillsRow.innerHTML = task.skills.map(s => `
      <span class="skill-tag">
        <iconify-icon icon="lucide:check" width="12" height="12"></iconify-icon>
        <span>${s}</span>
      </span>
    `).join('');
  }

  // Badge
  const badgeBox = document.getElementById('completed-detail-badge-box');
  const badgeIcon = document.getElementById('completed-detail-badge-icon');
  const badgeName = document.getElementById('completed-detail-badge-name');
  if (badgeBox && badgeIcon && badgeName) {
    badgeIcon.innerHTML = `<iconify-icon icon="${task.badgeIconName}" width="28" height="28"></iconify-icon>`;
    badgeName.textContent = task.badgeName;
    badgeBox.style.display = 'flex';
  }

  // Recommended Careers
  const recsRow = document.getElementById('completed-detail-recs');
  if (recsRow) {
    recsRow.innerHTML = task.recommendedCareers.map(c => `
      <span class="rec-chip">${c}</span>
    `).join('');
  }

  // Switch Screen
  showScreen('screen-completed-details');
}

// Global window exposure for reliable inline onclick handlers and accessibility
window.openTaskDetails = openTaskDetails;
window.openCompletedTaskDetails = openCompletedTaskDetails;
window.submitTaskCompletion = submitTaskCompletion;
window.setCategoryFilter = setCategoryFilter;
window.resetPathfinderProgress = function() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
};
