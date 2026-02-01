// 全局状态
const state = {
    currentView: 'home',
    selectedPet: null,
    selectedBehavior: null,
    selectedGuide: null, // 新增：选中的指南
    translator: { // 新增：翻译器状态
        step: 'type', // type -> part -> action -> result
        petType: null,
        bodyPart: null,
        actionId: null
    },
    language: 'en',
    profiles: []
};

// DOM 元素
const app = document.getElementById('app');

// 初始化
function init() {
    loadProfiles();
    renderHome();
}

// 辅助函数：获取当前语言的文本
function t(obj, ...args) {
    if (!obj) return '';
    const val = obj[state.language];
    if (typeof val === 'function') {
        return val(...args);
    }
    return val;
}

// 切换语言
function toggleLanguage() {
    state.language = state.language === 'zh' ? 'en' : 'zh';
    // 重新渲染当前视图
    if (state.currentView === 'profiles') {
        renderProfiles();
    } else if (state.currentView === 'profile-form') {
        renderProfileForm();
    } else if (state.currentView === 'guide-list') {
        renderGuideList();
    } else if (state.currentView === 'guide-detail') {
        renderGuideDetail();
    } else if (state.currentView === 'translator') {
        renderTranslator();
    } else {
        navigateTo(state.currentView, {
            pet: state.selectedPet,
            behavior: state.selectedBehavior,
            guide: state.selectedGuide
        });
    }
}

// 导航函数
function navigateTo(view, params = {}) {
    state.currentView = view;
    if (params.pet) state.selectedPet = params.pet;
    if (params.behavior) state.selectedBehavior = params.behavior;
    if (params.guide) state.selectedGuide = params.guide;
    
    // 滚动到顶部
    window.scrollTo(0, 0);
    
    // 渲染对应视图
    switch (view) {
        case 'home':
            renderHome();
            break;
        case 'list':
            renderList();
            break;
        case 'detail':
            renderDetail();
            break;
        case 'profiles':
            renderProfiles();
            break;
        case 'profile-form':
            renderProfileForm();
            break;
        case 'guide-list':
            renderGuideList();
            break;
        case 'guide-detail':
            renderGuideDetail();
            break;
        case 'translator':
            if (params.reset) {
                state.translator = { step: 'type', petType: null, bodyPart: null, actionId: null };
            }
            renderTranslator();
            break;
    }
}

// --- 宠物档案逻辑 ---

// 从 LocalStorage 加载档案
function loadProfiles() {
    const saved = localStorage.getItem('petlingo_profiles');
    if (saved) {
        try {
            state.profiles = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse profiles", e);
            state.profiles = [];
        }
    }
}

// 保存档案到 LocalStorage
function saveProfiles() {
    localStorage.setItem('petlingo_profiles', JSON.stringify(state.profiles));
}

// 添加新宠物
function addProfile(profile) {
    state.profiles.push({
        id: Date.now().toString(),
        ...profile
    });
    saveProfiles();
    navigateTo('profiles');
}

// 删除宠物
window.deleteProfile = (id, event) => {
    event.stopPropagation(); // 防止触发卡片点击
    if (confirm(state.language === 'zh' ? '确定要删除这个档案吗？' : 'Delete this profile?')) {
        state.profiles = state.profiles.filter(p => p.id !== id);
        saveProfiles();
        renderProfiles();
    }
};

// 提交表单
window.submitProfileForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const profile = {
        name: formData.get('name'),
        type: formData.get('type'),
        breed: formData.get('breed'),
        age: formData.get('age')
    };
    addProfile(profile);
};

// 渲染档案列表页
function renderProfiles() {
    app.innerHTML = `
        <div class="header">
            <div class="header-nav">
                <button class="back-btn" onclick="navigateTo('home')">${t(UI_TEXT.back)}</button>
                <h1>${t(UI_TEXT.myPets)}</h1>
                ${renderLangButton()}
            </div>
        </div>

        <div class="list-container fade-in">
            <div class="profile-header">
                 <p class="profile-desc">${t(UI_TEXT.profileDesc)}</p>
            </div>

            ${state.profiles.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">🐾</div>
                    <p>${t(UI_TEXT.noPets)}</p>
                </div>
            ` : `
                <div class="profile-list">
                    ${state.profiles.map(p => `
                        <div class="profile-card ${p.type}-card">
                            <div class="profile-icon">${p.type === 'cat' ? '🐱' : '🐶'}</div>
                            <div class="profile-info">
                                <h3>${p.name}</h3>
                                <p>${p.breed || (p.type === 'cat' ? t(UI_TEXT.cat) : t(UI_TEXT.dog))} ${p.age ? `• ${p.age} ${t(UI_TEXT.ageUnit)}` : ''}</p>
                            </div>
                            <button class="delete-btn" onclick="deleteProfile('${p.id}', event)">✕</button>
                        </div>
                    `).join('')}
                </div>
            `}

            <button class="fab-add" onclick="navigateTo('profile-form')">+</button>
        </div>
    `;
}

// 渲染添加档案表单
function renderProfileForm() {
    app.innerHTML = `
        <div class="header">
            <div class="header-nav">
                <button class="back-btn" onclick="navigateTo('profiles')">${t(UI_TEXT.back)}</button>
                <h1>${t(UI_TEXT.addPet)}</h1>
                ${renderLangButton()}
            </div>
        </div>

        <div class="list-container fade-in">
            <form class="profile-form" onsubmit="submitProfileForm(event)">
                <div class="form-group">
                    <label>${t(UI_TEXT.petName)}</label>
                    <input type="text" name="name" required placeholder="${t(UI_TEXT.enterName)}">
                </div>

                <div class="form-group">
                    <label>${t(UI_TEXT.petType)}</label>
                    <div class="type-selector">
                        <label class="type-option">
                            <input type="radio" name="type" value="cat" checked>
                            <span class="type-box">🐱 ${t(UI_TEXT.cat)}</span>
                        </label>
                        <label class="type-option">
                            <input type="radio" name="type" value="dog">
                            <span class="type-box">🐶 ${t(UI_TEXT.dog)}</span>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label>${t(UI_TEXT.petBreed)}</label>
                    <input type="text" name="breed">
                </div>

                <div class="form-group">
                    <label>${t(UI_TEXT.petAge)}</label>
                    <input type="number" name="age" min="0" step="0.1">
                </div>

                <button type="submit" class="submit-btn">${t(UI_TEXT.save)}</button>
            </form>
        </div>
    `;
}

// --- 通用渲染 ---

// 渲染语言切换按钮
function renderLangButton() {
    return `
        <button class="lang-btn" onclick="toggleLanguage()">
            ${state.language === 'zh' ? 'EN' : '中'}
        </button>
    `;
}

// 渲染首页
function renderHome() {
    app.innerHTML = `
        <div class="header" style="background: transparent; position: absolute; width: 100%; display: flex; justify-content: flex-end; box-shadow: none; backdrop-filter: none;">
             ${renderLangButton()}
        </div>

        <div class="home-container fade-in">
            <div class="welcome-text">
                <h2>${t(UI_TEXT.appTitle)}</h2>
                <p>✨ ${t(UI_TEXT.welcome)} ✨</p>
            </div>
            
            <div class="home-grid">
                <div class="category-card behavior-entry-card" onclick="selectPet()">
                    <div class="deco-cat">
                        <div class="cat-tail"></div>
                        <div class="cat-body">
                            <div class="cat-collar"><div class="cat-bell"></div></div>
                            <div class="cat-coin"><span>千万两</span></div>
                        </div>
                        <div class="cat-head">
                            <div class="cat-ear left"></div>
                            <div class="cat-ear right"></div>
                            <div class="cat-face">
                                <div class="cat-eye left"></div>
                                <div class="cat-eye right"></div>
                                <div class="cat-nose"></div>
                                <div class="cat-mouth"></div>
                                <div class="cat-whiskers"></div>
                            </div>
                        </div>
                        <div class="cat-paw left"></div>
                    </div>
                    <div class="category-icon">📚</div>
                    <div class="category-title">${t(UI_TEXT.behaviorLibTitle)}</div>
                    <p>${t(UI_TEXT.behaviorLibDesc)}</p>
                </div>

                <div class="category-card translator-entry-card" onclick="navigateTo('translator', { reset: true })">
                    <div class="deco-cat">
                        <div class="cat-tail"></div>
                        <div class="cat-body">
                            <div class="cat-collar"><div class="cat-bell"></div></div>
                            <div class="cat-coin"><span>开运</span></div>
                        </div>
                        <div class="cat-head">
                            <div class="cat-ear left"></div>
                            <div class="cat-ear right"></div>
                            <div class="cat-face">
                                <div class="cat-eye left"></div>
                                <div class="cat-eye right"></div>
                                <div class="cat-nose"></div>
                                <div class="cat-mouth"></div>
                                <div class="cat-whiskers"></div>
                            </div>
                        </div>
                        <div class="cat-paw left"></div>
                    </div>
                    <div class="category-icon">✨</div>
                    <div class="category-title">${t(UI_TEXT.translatorTitle)}</div>
                    <p>${t(UI_TEXT.translatorDesc)}</p>
                </div>

                <div class="category-card guide-entry-card" onclick="navigateTo('guide-list')">
                    <div class="deco-cat">
                        <div class="cat-tail"></div>
                        <div class="cat-body">
                            <div class="cat-collar"><div class="cat-bell"></div></div>
                            <div class="cat-coin"><span>大吉</span></div>
                        </div>
                        <div class="cat-head">
                            <div class="cat-ear left"></div>
                            <div class="cat-ear right"></div>
                            <div class="cat-face">
                                <div class="cat-eye left"></div>
                                <div class="cat-eye right"></div>
                                <div class="cat-nose"></div>
                                <div class="cat-mouth"></div>
                                <div class="cat-whiskers"></div>
                            </div>
                        </div>
                        <div class="cat-paw left"></div>
                    </div>
                    <div class="category-icon">📖</div>
                    <div class="category-title">${t(UI_TEXT.guideTitle)}</div>
                    <p>${t(UI_TEXT.guideDesc)}</p>
                </div>

                <div class="category-card profile-entry-card" onclick="navigateTo('profiles')">
                    <div class="deco-cat">
                        <div class="cat-tail"></div>
                        <div class="cat-body">
                            <div class="cat-collar"><div class="cat-bell"></div></div>
                            <div class="cat-coin"><span>平安</span></div>
                        </div>
                        <div class="cat-head">
                            <div class="cat-ear left"></div>
                            <div class="cat-ear right"></div>
                            <div class="cat-face">
                                <div class="cat-eye left"></div>
                                <div class="cat-eye right"></div>
                                <div class="cat-nose"></div>
                                <div class="cat-mouth"></div>
                                <div class="cat-whiskers"></div>
                            </div>
                        </div>
                        <div class="cat-paw left"></div>
                    </div>
                    <div class="category-icon">📋</div>
                    <div class="category-title">${t(UI_TEXT.myPets)}</div>
                    <p>${t(UI_TEXT.profileDesc)}</p>
                </div>
            </div>
        </div>
    `;
}

// 选择宠物
window.selectPet = (petType) => {
    // 如果没有指定类型，默认使用当前状态或默认为猫
    const type = petType || state.selectedPet || 'cats';
    navigateTo('list', { pet: type });
};

// 切换列表页的宠物类型
window.switchListPet = (petType) => {
    state.selectedPet = petType;
    renderList();
};

// 渲染列表页
function renderList() {
    // 确保有默认选中
    if (!state.selectedPet) state.selectedPet = 'cats';
    
    const petData = PET_DATA[state.selectedPet];
    
    app.innerHTML = `
        <div class="header">
            <div class="header-nav">
                <button class="back-btn" onclick="navigateTo('home')">${t(UI_TEXT.back)}</button>
                <h1>${t(UI_TEXT.behaviorLibTitle)}</h1>
                ${renderLangButton()}
            </div>
        </div>

        <div class="pet-type-tabs">
            <div class="pet-tab ${state.selectedPet === 'cats' ? 'active cat-tab' : ''}" onclick="switchListPet('cats')">
                ${PET_DATA.cats.icon} ${t(PET_DATA.cats.title)}
            </div>
            <div class="pet-tab ${state.selectedPet === 'dogs' ? 'active dog-tab' : ''}" onclick="switchListPet('dogs')">
                ${PET_DATA.dogs.icon} ${t(PET_DATA.dogs.title)}
            </div>
        </div>
        
        <div class="list-container fade-in">
            <div class="behavior-list">
                ${petData.behaviors.map(behavior => `
                    <div class="behavior-item" onclick="viewDetail('${behavior.id}')">
                        <div class="behavior-icon">${behavior.icon}</div>
                        <div class="behavior-info">
                            <h3>${t(behavior.title)}</h3>
                            <p>${t(behavior.summary)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 查看详情
window.viewDetail = (behaviorId) => {
    const petData = PET_DATA[state.selectedPet];
    const behavior = petData.behaviors.find(b => b.id === behaviorId);
    navigateTo('detail', { behavior });
};

// 渲染详情页
function renderDetail() {
    const behavior = state.selectedBehavior;
    const petData = PET_DATA[state.selectedPet];
    const bgColor = state.selectedPet === 'cats' ? petData.color : petData.color; // 使用主题色
    
    app.innerHTML = `
        <div class="detail-container fade-in">
            <div class="detail-header" style="background-color: ${bgColor}">
                <button class="back-btn" style="position: absolute; left: 20px; top: 20px; color: white; background: rgba(0,0,0,0.1);" onclick="navigateTo('list')">${t(UI_TEXT.back)}</button>
                <div style="position: absolute; right: 20px; top: 20px;">
                    ${renderLangButton()}
                </div>
                <div class="detail-icon">${behavior.icon}</div>
                <h2 style="font-size: 2rem; margin-bottom: 10px;">${t(behavior.title)}</h2>
                <div class="emotion-tag">${t(behavior.emotion)}</div>
            </div>
            
            <div class="detail-content">
                <div class="detail-section">
                    <h4>${t(UI_TEXT.sectionBehavior)}</h4>
                    <p>${t(behavior.summary)}</p>
                </div>
                
                <div class="detail-section">
                    <h4>${t(UI_TEXT.sectionMeaning)}</h4>
                    <p>${t(behavior.detail)}</p>
                </div>

                <div class="detail-section advice-section">
                    <h4>${t(UI_TEXT.sectionAdvice)}</h4>
                    <p>${t(behavior.advice)}</p>
                </div>
            </div>
        </div>
    `;
}

// --- 新手养宠指南渲染 ---

function renderGuideList() {
    app.innerHTML = `
        <div class="header">
            <div class="header-nav">
                <button class="back-btn" onclick="navigateTo('home')">${t(UI_TEXT.back)}</button>
                <h1>${t(UI_TEXT.guideTitle)}</h1>
                ${renderLangButton()}
            </div>
        </div>
        
        <div class="list-container fade-in">
            <div class="behavior-list">
                ${GUIDE_DATA.map(guide => `
                    <div class="behavior-item" onclick="viewGuide('${guide.id}')">
                        <div class="behavior-icon">${guide.icon}</div>
                        <div class="behavior-info">
                            <h3>${t(guide.title)}</h3>
                            <p>${t(guide.content).substring(0, 30)}...</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

window.viewGuide = (guideId) => {
    const guide = GUIDE_DATA.find(g => g.id === guideId);
    navigateTo('guide-detail', { guide });
};

function renderGuideDetail() {
    const guide = state.selectedGuide;
    
    app.innerHTML = `
        <div class="detail-container fade-in">
            <div class="detail-header" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
                <button class="back-btn" style="position: absolute; left: 20px; top: 20px; color: #333; background: rgba(255,255,255,0.5);" onclick="navigateTo('guide-list')">${t(UI_TEXT.back)}</button>
                <div style="position: absolute; right: 20px; top: 20px;">
                    ${renderLangButton()}
                </div>
                <div class="detail-icon">${guide.icon}</div>
                <h2 style="font-size: 2rem; margin-bottom: 10px; color: #333;">${t(guide.title)}</h2>
            </div>
            
            <div class="detail-content">
                <div class="detail-section">
                    <h4>${t(UI_TEXT.sectionMeaning)}</h4>
                    <p>${t(guide.content)}</p>
                </div>
                
                ${guide.tips ? `
                    <div class="detail-section advice-section">
                        <h4>${t(UI_TEXT.sectionAdvice)}</h4>
                        <p>${t(guide.tips)}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// --- 情绪翻译器渲染 ---

function renderTranslator() {
    const { step, petType, bodyPart, actionId } = state.translator;
    
    let content = '';
    let headerTitle = t(UI_TEXT.translatorTitle);
    
    if (step === 'type') {
        content = `
            <div class="translator-step fade-in">
                <h3>${t(UI_TEXT.selectPetType)}</h3>
                <div class="type-selector large">
                    <div class="type-option-card" onclick="setTranslatorPet('cats')">
                        <div class="icon">🐱</div>
                        <span>${t(UI_TEXT.cat)}</span>
                    </div>
                    <div class="type-option-card" onclick="setTranslatorPet('dogs')">
                        <div class="icon">🐶</div>
                        <span>${t(UI_TEXT.dog)}</span>
                    </div>
                </div>
            </div>
        `;
    } else if (step === 'part') {
        const parts = TRANSLATOR_DATA[petType].parts;
        content = `
            <div class="translator-step fade-in">
                <h3>${t(UI_TEXT.selectBodyPart)}</h3>
                <div class="translator-options">
                    ${parts.map(p => `
                        <div class="translator-option" onclick="setTranslatorPart('${p.id}')">
                            <div class="icon">${p.icon}</div>
                            <span>${t(p.label)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (step === 'recording') {
        // 录音界面
        content = `
            <div class="translator-step fade-in">
                <div class="recording-container">
                    <h3>${state.isRecording ? t(UI_TEXT.listening) : t(UI_TEXT.tapToRecord)}</h3>
                    
                    ${state.isRecording ? `
                        <div class="wave-visualizer">
                            ${Array(10).fill('<div class="wave-bar"></div>').join('')}
                        </div>
                    ` : ''}

                    <button class="record-btn ${state.isRecording ? 'recording' : ''}" onclick="toggleRecording()">
                        ${state.isRecording ? '⬛' : '🎙️'}
                    </button>
                    
                    <p style="color: var(--text-light);">${state.isRecording ? t(UI_TEXT.tapToStop) : t(UI_TEXT.recordEntryDesc)}</p>
                </div>
            </div>
        `;
    } else if (step === 'analyzing') {
        // 分析中界面
        content = `
            <div class="analyzing-overlay fade-in">
                <div class="loader"></div>
                <h3>${t(UI_TEXT.analyzingTitle)}</h3>
                <p>${t(UI_TEXT.analyzing)}</p>
            </div>
        `;
    } else if (step === 'action') {
        const actions = TRANSLATOR_DATA[petType].actions[bodyPart];
        content = `
            <div class="translator-step fade-in">
                <h3>${t(UI_TEXT.selectAction)}</h3>
                
                ${bodyPart === 'voice' ? `
                    <div class="record-entry-card" onclick="startRecordingFlow()">
                        <div style="font-size: 2rem; margin-bottom: 10px;">🎙️</div>
                        <h4 style="margin-bottom: 5px;">${t(UI_TEXT.recordEntryTitle)}</h4>
                        <p style="font-size: 0.9rem; opacity: 0.9;">${t(UI_TEXT.recordEntryDesc)}</p>
                    </div>
                    <div style="text-align: center; margin-bottom: 20px; color: var(--text-light);">- ${state.language === 'zh' ? '或者选择特征' : 'OR Select Feature'} -</div>
                ` : ''}

                <div class="translator-list">
                    ${actions.map(a => `
                        <div class="behavior-item" onclick="setTranslatorAction('${a.id}')">
                            <div class="behavior-info">
                                <h3>${t(a.label)}</h3>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (step === 'result') {
        const action = TRANSLATOR_DATA[petType].actions[bodyPart].find(a => a.id === actionId);
        content = `
            <div class="translator-result fade-in">
                <div class="result-card">
                    <div class="result-icon">✨</div>
                    <h3>${t(UI_TEXT.translationResult)}</h3>
                    
                    <div class="result-emotion">
                        <span class="label">${t(UI_TEXT.likelyEmotion)}:</span>
                        <span class="value">${t(action.emotion)}</span>
                    </div>
                    
                    <div class="result-meaning">
                        <h4>${t(UI_TEXT.humanTranslation)}</h4>
                        <p>"${t(action.meaning)}"</p>
                    </div>
                </div>
                
                <button class="submit-btn" onclick="resetTranslator()">${t(UI_TEXT.translateAgain)}</button>
            </div>
        `;
    }

    app.innerHTML = `
        <div class="header">
            <div class="header-nav">
                <button class="back-btn" onclick="${step === 'type' ? "navigateTo('home')" : "translatorBack()"}">${t(UI_TEXT.back)}</button>
                <h1>${headerTitle}</h1>
                ${renderLangButton()}
            </div>
        </div>
        
        <div class="list-container">
            ${content}
        </div>
    `;
}

// 翻译器辅助函数
window.setTranslatorPet = (type) => {
    state.translator.petType = type;
    state.translator.step = 'part';
    renderTranslator();
};

window.setTranslatorPart = (partId) => {
    state.translator.bodyPart = partId;
    state.translator.step = 'action';
    renderTranslator();
};

window.setTranslatorAction = (actionId) => {
    state.translator.actionId = actionId;
    state.translator.step = 'result';
    renderTranslator();
};

// 录音相关逻辑
window.startRecordingFlow = () => {
    // 检查麦克风权限（模拟）
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        state.translator.step = 'recording';
        state.isRecording = false;
        renderTranslator();
    } else {
        alert(t(UI_TEXT.recordingError));
        // 即使没有权限，在某些环境（如非HTTPS本地开发）也允许进入模拟界面
        state.translator.step = 'recording';
        state.isRecording = false;
        renderTranslator();
    }
};

window.toggleRecording = () => {
    if (state.isRecording) {
        // 停止录音 -> 进入分析
        state.isRecording = false;
        state.translator.step = 'analyzing';
        renderTranslator();
        
        // 模拟分析延迟
        setTimeout(() => {
            simulateAnalysisResult();
        }, 2000);
    } else {
        // 开始录音
        state.isRecording = true;
        renderTranslator();
    }
};

// 模拟分析结果
function simulateAnalysisResult() {
    const { petType } = state.translator;
    // 获取该宠物声音类型的所有可能结果
    const voiceActions = TRANSLATOR_DATA[petType].actions.voice;
    // 随机选择一个
    const randomAction = voiceActions[Math.floor(Math.random() * voiceActions.length)];
    
    state.translator.actionId = randomAction.id;
    state.translator.step = 'result';
    renderTranslator();
}

window.translatorBack = () => {
    const { step } = state.translator;
    if (step === 'part') state.translator.step = 'type';
    else if (step === 'action') state.translator.step = 'part';
    else if (step === 'recording') state.translator.step = 'action'; // 从录音返回
    else if (step === 'result') state.translator.step = 'action';
    renderTranslator();
};

window.resetTranslator = () => {
    state.translator = { step: 'type', petType: null, bodyPart: null, actionId: null };
    state.isRecording = false;
    renderTranslator();
};

// 暴露 toggleLanguage 给全局
window.toggleLanguage = toggleLanguage;

// 启动应用
init();
