/**
 * Pathfinder - Career Discovery Web Application for Students 13-17
 * Pure Vanilla JavaScript Application Logic
 */

// ==================== APP STATE & CAREER DATASET ====================

const APP_STATE = {
  userXP: 750,
  userStreak: 4,
  currentCategoryId: 'all',
  activeTaskId: null,
  completedTaskIds: new Set(['task-3']), // Task 3 completed for initial demo realism
  unlockedBadges: new Set(['badge-cyber']),
  activitySelectedOption: null
};

const CAREER_TASKS = [
  {
    id: 'task-1',
    title: 'Craft a Homework Assistant System Prompt',
    career: 'AI Prompt Engineer',
    category: 'tech',
    categoryName: 'Tech & AI',
    icon: '🤖',
    bgClass: 'bg-tech',
    duration: '5 mins',
    difficulty: 'Beginner',
    xp: 150,
    salary: '$115,000 / yr',
    demand: '🔥 Extremely High',
    description: 'Learn how to instruct AI models to give step-by-step math hints without giving away the final answers.',
    skills: ['Prompt Engineering', 'AI Ethics', 'Logical Constraints'],
    badgeId: 'badge-ai',
    badgeName: 'AI Prompt Pioneer',
    badgeIcon: '🤖',
    scenarioPrompt: 'You are configuring an AI study helper for high school geometry. The student asks: "What is the area of a circle with radius 5?" How should you prompt the AI model?',
    options: [
      {
        id: 'opt-1',
        text: 'A) "Give the formula A = πr², show the step-by-step substitution (π × 5²), and guide them to calculate 25π."',
        correct: true,
        feedback: '✨ Spot on! Outstanding prompt design. Guiding students with formulas and step-by-step substitution builds problem-solving skills without doing the work for them.'
      },
      {
        id: 'opt-2',
        text: 'B) "Just reply with 78.54 instantly so the student can copy it into their assignment quickly."',
        correct: false,
        feedback: '⚠️ Direct answers prevent learning! High-quality educational prompts encourage step-by-step discovery.'
      },
      {
        id: 'opt-3',
        text: 'C) "Tell the student math is too hard and suggest asking their teacher tomorrow."',
        correct: false,
        feedback: '❌ AI study assistants should empower and support learning, not turn users away.'
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
    icon: '🎮',
    bgClass: 'bg-creative',
    duration: '6 mins',
    difficulty: 'Intermediate',
    xp: 180,
    salary: '$92,000 / yr',
    demand: '🔥 High',
    description: 'Test player difficulty curves, boss attack cooldowns, and health pick-up locations in an action RPG.',
    skills: ['Game Mechanics', 'Player Psychology', 'Level Pacing'],
    badgeId: 'badge-game',
    badgeName: 'World Architect',
    badgeIcon: '🎮',
    scenarioPrompt: 'Playtesters report that 90% of players fail at Stage 3 of your boss battle because the boss spam attacks relentlessly. What design tweak balances the encounter best?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Double the boss HP and remove all health potions from the arena to test hardcore gamers.',
        correct: false,
        feedback: '⚠️ Making an already impossible fight even harder frustrates 95% of players.'
      },
      {
        id: 'opt-2',
        text: 'B) Add a 2.5-second telegraph animation before heavy attacks and spawn 2 cover pillars in the arena.',
        correct: true,
        feedback: '🎉 Perfect Game Design! Visual telegraphing gives players a fair chance to dodge, creating a rewarding challenge.'
      },
      {
        id: 'opt-3',
        text: 'C) Reduce boss health to 1 hit point so anyone can beat it instantly with one button.',
        correct: false,
        feedback: '❌ Removing all challenge makes victory feel hollow and unrewarding.'
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
    icon: '🛡️',
    bgClass: 'bg-tech',
    duration: '4 mins',
    difficulty: 'Beginner',
    xp: 120,
    salary: '$105,000 / yr',
    demand: '🔥 Critical Demand',
    description: 'Analyze email headers, suspicious domain URLs, and social engineering tricks to protect organizations.',
    skills: ['Network Security', 'Threat Detection', 'Digital Forensics'],
    badgeId: 'badge-cyber',
    badgeName: 'Shield Operator',
    badgeIcon: '🛡️',
    scenarioPrompt: 'An urgent security email arrives: "Your account is locked! Click http://paypa1-security-verify.net/login immediately". What is the red flag?',
    options: [
      {
        id: 'opt-1',
        text: 'A) The spoofed domain spelling ("paypa1") and non-official URL string.',
        correct: true,
        feedback: '🛡️ Excellent catch! Cyber analysts look closely at domain typos and fake URLs used in spoofing attacks.'
      },
      {
        id: 'opt-2',
        text: 'B) The email contains letters in the alphabet.',
        correct: false,
        feedback: '❌ Look closer at the URL domain address!'
      }
    ],
    recommendedCareers: ['Ethical Hacker', 'Security Operations Lead', 'Cryptographer']
  },
  {
    id: 'task-4',
    title: 'Optimize Smart Microgrid Solar Energy',
    career: 'Climate Tech Scientist',
    category: 'eco',
    categoryName: 'Science & Eco',
    icon: '🌱',
    bgClass: 'bg-eco',
    duration: '5 mins',
    difficulty: 'Intermediate',
    xp: 160,
    salary: '$98,000 / yr',
    demand: '🔥 Rapidly Growing',
    description: 'Calculate battery storage distribution to power a sustainable high school campus during peak grid hours.',
    skills: ['Clean Energy Tech', 'Data Modeling', 'Sustainability'],
    badgeId: 'badge-eco',
    badgeName: 'Eco Innovator',
    badgeIcon: '🌱',
    scenarioPrompt: 'Solar panels generate surplus 450 kWh energy at 1:00 PM when sunlight peaks, but school energy demand peaks at 6:00 PM. How do we prevent energy waste?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Route surplus afternoon energy into lithium-iron battery storage for discharge during 6 PM peak hours.',
        correct: true,
        feedback: '🌱 Genius! Grid storage balancing is the core foundation of renewable climate engineering.'
      },
      {
        id: 'opt-2',
        text: 'B) Turn off all solar panels during sunny afternoon hours to stop power output.',
        correct: false,
        feedback: '⚠️ Turning off clean generation wastes free renewable energy!'
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
    icon: '🎨',
    bgClass: 'bg-creative',
    duration: '5 mins',
    difficulty: 'Beginner',
    xp: 140,
    salary: '$100,000 / yr',
    demand: '🔥 High',
    description: 'Create an accessible, intuitive savings goal wizard for high school students opening their first account.',
    skills: ['User Experience', 'Wireframing', 'Visual Accessibility'],
    badgeId: 'badge-ux',
    badgeName: 'UX Visionary',
    badgeIcon: '🎨',
    scenarioPrompt: 'Teen users abandon financial apps when overwhelmed by wall-of-text terms. How do you improve the goal setup screen?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Break goal setting into 3 visual steps (Goal Name ➔ Target Amount ➔ Saver Mascot) with progress indicators.',
        correct: true,
        feedback: '🎨 Superb UX thinking! Progressive disclosure reduces cognitive load and keeps users engaged.'
      },
      {
        id: 'opt-2',
        text: 'B) Put 40 text input fields on a single scrolling screen with 9pt font size.',
        correct: false,
        feedback: '❌ Dense text causes user fatigue and high drop-off rates.'
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
    icon: '🚀',
    bgClass: 'bg-business',
    duration: '7 mins',
    difficulty: 'Advanced',
    xp: 200,
    salary: '$130,000 / yr',
    demand: '🔥 High',
    description: 'Analyze student buyer trends to refine a peer-to-peer textbook and study notes exchange app.',
    skills: ['Market Research', 'Value Proposition', 'Financial Strategy'],
    badgeId: 'badge-biz',
    badgeName: 'Venture Pioneer',
    badgeIcon: '🚀',
    scenarioPrompt: 'Your peer-to-peer book marketplace app has high downloads but low transactions because shipping takes 5 days. What is your strategic pivot?',
    options: [
      {
        id: 'opt-1',
        text: 'A) Launch instant digital PDF note scanning & local campus lockers for same-day physical pickup.',
        correct: true,
        feedback: '🚀 Brilliant Venture Pivot! Solving transaction friction drives real user retention and growth.'
      },
      {
        id: 'opt-2',
        text: 'B) Increase price subscription fees by 300% without fixing shipping delays.',
        correct: false,
        feedback: '⚠️ Raising prices while service is slow causes immediate customer loss.'
      }
    ],
    recommendedCareers: ['Venture Capital Analyst', 'Product Manager', 'Growth Strategist']
  }
];

const ALL_BADGES = [
  { id: 'badge-ai', name: 'AI Prompt Pioneer', icon: '🤖' },
  { id: 'badge-game', name: 'World Architect', icon: '🎮' },
  { id: 'badge-cyber', name: 'Shield Operator', icon: '🛡️' },
  { id: 'badge-eco', name: 'Eco Innovator', icon: '🌱' },
  { id: 'badge-ux', name: 'UX Visionary', icon: '🎨' },
  { id: 'badge-biz', name: 'Venture Pioneer', icon: '🚀' }
];

// ==================== INITIALIZATION & DOM REFERENCES ====================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
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
}

function bindNavigationEvents() {
  // Brand Click -> Today Screen
  const brandBtn = document.getElementById('brand-home');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => showScreen('screen-today'));
  }

  // Back Button from Details -> Today Screen
  const btnBack = document.getElementById('btn-back-to-today');
  if (btnBack) {
    btnBack.addEventListener('click', () => showScreen('screen-today'));
  }

  // Complete Screen CTAs
  const btnFinishReturn = document.getElementById('btn-finish-return');
  if (btnFinishReturn) {
    btnFinishReturn.addEventListener('click', () => {
      renderTodayScreen();
      showScreen('screen-today');
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
}

// ==================== SCREEN 1: TODAY'S TASK LOGIC ====================

function renderHeaderStats() {
  const xpEl = document.getElementById('user-xp');
  const streakEl = document.getElementById('user-streak');
  if (xpEl) xpEl.textContent = APP_STATE.userXP;
  if (streakEl) streakEl.textContent = APP_STATE.userStreak;
}

function bindFilterEvents() {
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      APP_STATE.currentCategoryId = chip.getAttribute('data-category');
      renderTaskGrid();
    });
  });
}

function renderTodayScreen() {
  renderHeaderStats();
  renderSpotlightTask();
  renderTaskGrid();
  renderBadgesSection();
}

function renderSpotlightTask() {
  const spotlightContainer = document.getElementById('featured-task-card');
  if (!spotlightContainer) return;

  const featured = CAREER_TASKS[0]; // Task 1 is featured spotlight
  const isCompleted = APP_STATE.completedTaskIds.has(featured.id);

  spotlightContainer.innerHTML = `
    <div class="spot-info">
      <div class="spot-icon-wrapper">
        ${featured.icon}
      </div>
      <div class="spot-details">
        <div class="spot-tag-row">
          <span class="category-tag">${featured.categoryName}</span>
          <span class="meta-info">⏱️ ${featured.duration} • ${featured.difficulty}</span>
        </div>
        <h3 class="spot-title">${featured.title}</h3>
        <p class="spot-desc">${featured.description}</p>
      </div>
    </div>
    <div class="spot-action">
      <div class="reward-tag">
        <span>⚡</span> +${featured.xp} XP
      </div>
      <button class="btn-primary" onclick="openTaskDetails('${featured.id}')">
        ${isCompleted ? 'Review Task ✓' : 'Start Task →'}
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
    cardEl.innerHTML = `
      <div class="card-top">
        <div class="card-icon-box ${task.bgClass}">
          ${task.icon}
        </div>
        <span class="card-status ${isDone ? 'status-done' : 'status-new'}">
          ${isDone ? 'Completed ✓' : 'Daily Task'}
        </span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${task.title}</h3>
        <p class="card-desc">${task.description}</p>
      </div>
      <div class="card-footer">
        <div class="card-meta">
          <span>⏱️ ${task.duration}</span>
          <span>•</span>
          <span>${task.career}</span>
        </div>
        <span class="card-xp">+${task.xp} XP</span>
      </div>
    `;

    cardEl.addEventListener('click', () => openTaskDetails(task.id));
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
      <div class="badge-icon-box">${badge.icon}</div>
      <div class="badge-name">${badge.name}</div>
      <span class="badge-status-tag ${isUnlocked ? 'bs-unlocked' : 'bs-locked'}">
        ${isUnlocked ? 'Unlocked' : 'Locked'}
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

  // Update Category Pill
  const categoryPill = document.getElementById('detail-category-pill');
  if (categoryPill) categoryPill.textContent = task.categoryName;

  // Header Card
  const headerCard = document.getElementById('detail-header-card');
  if (headerCard) {
    headerCard.innerHTML = `
      <div class="detail-icon-box ${task.bgClass}">
        ${task.icon}
      </div>
      <div class="detail-header-info">
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
        <span class="csc-icon">💰</span>
        <div class="csc-data">
          <span class="csc-label">Avg Entry Salary</span>
          <span class="csc-val">${task.salary}</span>
        </div>
      </div>
      <div class="career-stat-card">
        <span class="csc-icon">📈</span>
        <div class="csc-data">
          <span class="csc-label">Job Market Demand</span>
          <span class="csc-val">${task.demand}</span>
        </div>
      </div>
      <div class="career-stat-card">
        <span class="csc-icon">⚡</span>
        <div class="csc-data">
          <span class="csc-label">Completion Reward</span>
          <span class="csc-val">+${task.xp} XP</span>
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
    submitBtn.onclick = () => submitTaskCompletion(task);
  }
  if (feedbackBox) {
    feedbackBox.style.display = 'none';
  }

  // Switch to Details Screen
  showScreen('screen-details');
}

function renderActivityModule(task) {
  const activityBody = document.getElementById('activity-body');
  if (!activityBody) return;

  let optionsHtml = task.options.map(opt => `
    <div class="option-chip" data-opt-id="${opt.id}">
      <div class="option-radio"></div>
      <span class="option-label">${opt.text}</span>
    </div>
  `).join('');

  activityBody.innerHTML = `
    <p class="activity-prompt-text">
      Analyze the real-world scenario below. Choose the most effective strategy that a professional <strong>${task.career}</strong> would execute:
    </p>
    <div class="activity-scenario-card">
      <strong>Real-World Scenario:</strong><br>
      ${task.scenarioPrompt}
    </div>
    <div class="options-group" id="options-group">
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
  });
}

function selectActivityOption(task, optId) {
  APP_STATE.activitySelectedOption = optId;
  const selectedOpt = task.options.find(o => o.id === optId);

  // Update UI selection
  const chips = document.querySelectorAll('.option-chip');
  chips.forEach(c => {
    if (c.getAttribute('data-opt-id') === optId) {
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

  // Display Feedback Box
  const feedbackBox = document.getElementById('feedback-box');
  const feedbackText = document.getElementById('feedback-text');
  const feedbackIcon = document.getElementById('feedback-icon');
  const submitBtn = document.getElementById('btn-submit-task');

  if (feedbackBox && selectedOpt) {
    feedbackBox.style.display = 'flex';
    feedbackText.textContent = selectedOpt.feedback;
    feedbackIcon.textContent = selectedOpt.correct ? '✨' : '💡';
  }

  // Enable Submit Button if correct option selected
  if (submitBtn) {
    submitBtn.disabled = !selectedOpt || !selectedOpt.correct;
  }
}

// ==================== TASK SUBMISSION & SCREEN 3: TASK COMPLETE LOGIC ====================

function submitTaskCompletion(task) {
  const isFirstTime = !APP_STATE.completedTaskIds.has(task.id);

  if (isFirstTime) {
    APP_STATE.userXP += task.xp;
    APP_STATE.completedTaskIds.add(task.id);
    APP_STATE.unlockedBadges.add(task.badgeId);
    APP_STATE.userStreak += 1;
  }

  renderHeaderStats();
  setupCompleteScreen(task, isFirstTime);
  showScreen('screen-complete');
  triggerConfetti();
}

function setupCompleteScreen(task, isFirstTime) {
  // XP & Streak displays
  const gainedXpEl = document.getElementById('gained-xp');
  const gainedStreakEl = document.getElementById('gained-streak');
  const completeIcon = document.getElementById('complete-icon');

  if (gainedXpEl) gainedXpEl.textContent = `+${task.xp} XP`;
  if (gainedStreakEl) gainedStreakEl.textContent = `+1 Day`;
  if (completeIcon) completeIcon.textContent = task.icon;

  // Render Skill Tags
  const skillsRow = document.getElementById('complete-skills-tags');
  if (skillsRow) {
    skillsRow.innerHTML = task.skills.map(s => `
      <span class="skill-tag">✓ ${s}</span>
    `).join('');
  }

  // Unlocked Badge Display
  const badgeBox = document.getElementById('new-badge-unlocked-box');
  const badgeIcon = document.getElementById('complete-badge-icon');
  const badgeTitle = document.getElementById('complete-badge-title');

  if (badgeBox) {
    badgeIcon.textContent = task.badgeIcon;
    badgeTitle.textContent = task.badgeName;
    badgeBox.style.display = 'flex';
  }

  // Recommended Related Careers
  const recChipsRow = document.getElementById('complete-rec-chips');
  if (recChipsRow) {
    recChipsRow.innerHTML = task.recommendedCareers.map(c => `
      <span class="rec-chip">🚀 ${c}</span>
    `).join('');
  }
}

// ==================== CANVAS CONFETTI ANIMATION ====================

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#38bdf8', '#ec4899', '#a855f7'];

  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 6 - 3
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

    if (Date.now() - startTime < 3500) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  animate();
}
