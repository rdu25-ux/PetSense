// UI 文本翻译
const UI_TEXT = {
    appTitle: {
        zh: "PetLingo 🐾",
        en: "PetLingo 🐾"
    },
    welcome: {
        zh: "想知道你的毛孩子在说什么吗？",
        en: "Wondering what your furry friend is saying?"
    },
    back: {
        zh: "← 返回",
        en: "← Back"
    },
    behaviorTitle: {
        zh: (name) => `${name}的行为`,
        en: (name) => `${name}'s Behaviors`
    },
    sectionBehavior: {
        zh: "行为表现",
        en: "Appearance"
    },
    sectionMeaning: {
        zh: "含义解读",
        en: "Meaning"
    },
    sectionAdvice: {
        zh: "💡 给主人的建议",
        en: "💡 Advice for Owners"
    },
    // 宠物档案相关
    myPets: { zh: "我的宠物档案", en: "My Pet Profiles" },
    addPet: { zh: "添加新宠物", en: "Add New Pet" },
    noPets: { zh: "还没有添加宠物哦，快来创建档案吧！", en: "No pets added yet. Create a profile now!" },
    petName: { zh: "宠物名字", en: "Pet Name" },
    petType: { zh: "宠物类型", en: "Pet Type" },
    petBreed: { zh: "品种 (选填)", en: "Breed (Optional)" },
    petAge: { zh: "年龄 (选填)", en: "Age (Optional)" },
    ageUnit: { zh: "岁", en: "y/o" },
    save: { zh: "保存档案", en: "Save Profile" },
    delete: { zh: "删除", en: "Delete" },
    selectType: { zh: "选择类型", en: "Select Type" },
    enterName: { zh: "输入名字", en: "Enter Name" },
    cat: { zh: "猫咪", en: "Cat" },
    dog: { zh: "狗狗", en: "Dog" },
    profileDesc: { zh: "管理你的毛孩子信息", en: "Manage your furry friends" },
    
    // 新板块：新手养宠指南
    guideTitle: { zh: "新手养宠指南", en: "New Pet Owner Guide" },
    guideDesc: { zh: "给新手家长的必备知识", en: "Essential knowledge for new parents" },
    
    // 新板块：情绪翻译器
    translatorTitle: { zh: "情绪翻译器", en: "Emotion Translator" },
    translatorDesc: { zh: "一键解读宠物心情", en: "Instantly interpret pet moods" },
    translatorIntro: { zh: "选择特征，解读毛孩子的心声", en: "Select features to interpret your pet's feelings" },
    startTranslate: { zh: "开始翻译", en: "Start Translating" },
    selectPetType: { zh: "它是猫咪还是狗狗？", en: "Is it a cat or a dog?" },
    selectBodyPart: { zh: "观察哪个部位？", en: "Which body part to observe?" },
    selectAction: { zh: "具体表现是什么？", en: "What is the specific behavior?" },
    translationResult: { zh: "翻译结果", en: "Translation Result" },
    translateAgain: { zh: "再翻译一次", en: "Translate Again" },
    likelyEmotion: { zh: "可能的情绪", en: "Likely Emotion" },
    humanTranslation: { zh: "人类语翻译", en: "Human Translation" },

    // 合并后的行为库入口
    behaviorLibTitle: { zh: "行为解读库", en: "Behavior Library" },
    behaviorLibDesc: { zh: "读懂猫猫狗狗的身体语言", en: "Understand body language of cats & dogs" },

    // 录音功能
    recordEntryTitle: { zh: "录音分析", en: "Record & Analyze" },
    recordEntryDesc: { zh: "录下声音，AI 帮你听懂", en: "Record sound, let AI translate" },
    tapToRecord: { zh: "点击开始录音", en: "Tap to Record" },
    listening: { zh: "正在聆听...", en: "Listening..." },
    tapToStop: { zh: "点击停止", en: "Tap to Stop" },
    analyzing: { zh: "正在分析声波...", en: "Analyzing sound waves..." },
    recordingError: { zh: "无法访问麦克风，请检查权限", en: "Cannot access microphone, check permissions" },
    analyzingTitle: { zh: "AI 分析中", en: "AI Analyzing" }
};

// 宠物数据翻译
const PET_DATA = {
    cats: {
        id: "cats",
        title: {
            zh: "猫咪",
            en: "Cats"
        },
        color: "#FF9A8B",
        icon: "🐱",
        description: {
            zh: "高冷又粘人的神秘生物，通过细微的肢体语言表达情感。",
            en: "Mysterious creatures, both aloof and clingy, expressing emotions through subtle body language."
        },
        behaviors: [
            {
                id: "c1",
                title: { zh: "缓慢眨眼", en: "Slow Blink" },
                icon: "😉",
                summary: {
                    zh: "这是猫咪给你的一记'飞吻'。",
                    en: "This is a 'kitty kiss' for you."
                },
                detail: {
                    zh: "当猫咪看着你并缓慢地闭上再睁开眼睛时，这表示它对你感到非常安全和信任。这在猫咪的世界里相当于说'我爱你'。你也可以试着对它慢慢眨眼回应哦！",
                    en: "When a cat looks at you and slowly closes and opens its eyes, it means it feels very safe and trusts you. In the cat world, this is equivalent to saying 'I love you'. You can try slow blinking back!"
                },
                advice: {
                    zh: "试着对着它也慢慢地眨眼，告诉它你也爱它。这是建立亲密关系最好的方式。",
                    en: "Try blinking slowly back at it to say you love it too. This is the best way to build a bond."
                },
                emotion: { zh: "爱意 / 信任", en: "Love / Trust" }
            },
            {
                id: "c2",
                title: { zh: "呼噜声 (Purring)", en: "Purring" },
                icon: "🔊",
                summary: {
                    zh: "不仅仅是开心的表现。",
                    en: "Not just a sign of happiness."
                },
                detail: {
                    zh: "大多数时候，呼噜声表示猫咪很放松、很满足。但在极少数情况下，猫咪生病或受伤时也会发出呼噜声来安抚自己（具有治愈频率）。",
                    en: "Most of the time, purring means the cat is relaxed and content. However, in rare cases, cats purr when sick or injured to soothe themselves (it has healing frequencies)."
                },
                advice: {
                    zh: "如果猫咪在休息时打呼噜，尽管享受这治愈时刻。但如果它精神萎靡且持续打呼噜，请留意它的健康状况。",
                    en: "If your cat purrs while resting, enjoy the healing moment. But if it seems lethargic and purrs continuously, check its health."
                },
                emotion: { zh: "满足 / 自我安抚", en: "Content / Self-soothing" }
            },
            {
                id: "c3",
                title: { zh: "踩奶 (Kneading)", en: "Kneading" },
                icon: "🐾",
                summary: {
                    zh: "两只前爪交替按压。",
                    en: "Alternating paw pressing."
                },
                detail: {
                    zh: "这是猫咪小时候喝奶时留下的习惯。成年猫咪踩奶通常表示它感觉非常舒适、像回到了妈妈怀抱一样安心。如果它在你身上踩奶，那是把你当成了妈妈！",
                    en: "This is a habit from kittenhood nursing. Adult cats kneading usually means they feel very comfortable and safe, like being with their mother. If they knead on you, they see you as mom!"
                },
                advice: {
                    zh: "请忍受一下可能的抓痛，或者给它垫个毯子。千万不要因为痛而推开它，这会伤它的心。",
                    en: "Please tolerate the potential scratching, or use a blanket. Never push it away because of pain, it will break its heart."
                },
                emotion: { zh: "舒适 / 依恋", en: "Comfort / Attachment" }
            },
            {
                id: "c4",
                title: { zh: "飞机耳", en: "Airplane Ears" },
                icon: "✈️",
                summary: {
                    zh: "耳朵向后压低。",
                    en: "Ears flattened backward."
                },
                detail: {
                    zh: "当猫咪的耳朵向后压平，像飞机机翼一样时，说明它感到害怕、焦虑或者准备发起攻击。这时候最好给它一点空间，不要强行抚摸。",
                    en: "When a cat's ears are flattened back like airplane wings, it indicates fear, anxiety, or preparation for an attack. Give it some space and avoid forced petting."
                },
                advice: {
                    zh: "立刻停止你正在做的事情，慢慢后退，给它留出安全空间。不要试图去安抚它，这可能会导致被抓伤。",
                    en: "Stop what you are doing immediately, back away slowly, and give it space. Do not try to soothe it, as this may lead to scratches."
                },
                emotion: { zh: "恐惧 / 愤怒", en: "Fear / Anger" }
            },
            {
                id: "c5",
                title: { zh: "竖直尾巴", en: "Upright Tail" },
                icon: "🐈",
                summary: {
                    zh: "尾巴高高竖起，末端微弯。",
                    en: "Tail held high with a slight curve at the tip."
                },
                detail: {
                    zh: "这是非常友好的打招呼方式！表示猫咪心情很好，很自信，并且乐意与你互动。",
                    en: "This is a very friendly greeting! It means the cat is in a good mood, confident, and happy to interact with you."
                },
                advice: {
                    zh: "这是互动的最佳时机！摸摸它的头或者下巴，陪它玩一会儿吧。",
                    en: "This is the best time to interact! Pet its head or chin, and play with it for a while."
                },
                emotion: { zh: "友好 / 自信", en: "Friendly / Confident" }
            }
        ]
    },
    dogs: {
        id: "dogs",
        title: {
            zh: "狗狗",
            en: "Dogs"
        },
        color: "#4FACFE",
        icon: "🐶",
        description: {
            zh: "人类最忠诚的朋友，情绪表达直接且热烈。",
            en: "Man's most loyal friend, with direct and enthusiastic emotional expression."
        },
        behaviors: [
            {
                id: "d1",
                title: { zh: "摇尾巴", en: "Tail Wagging" },
                icon: "🐕",
                summary: {
                    zh: "摇动的方向和高度有不同含义。",
                    en: "Direction and height of the wag matter."
                },
                detail: {
                    zh: "一般来说摇尾巴表示兴奋和友好。但要注意：如果是低垂着快速摇动，可能是紧张；如果是高高竖起僵硬地摇动，可能是警戒。只有全身放松的大幅度摇摆才是真正的欢迎！",
                    en: "Generally, tail wagging means excitement and friendliness. But note: low, fast wags can mean nervousness; high, stiff wags can mean alertness. Only a relaxed, full-body wag is a true welcome!"
                },
                advice: {
                    zh: "观察它的全身状态，不要只看尾巴。如果全身放松，尽情拥抱它；如果身体僵硬，请保持距离。",
                    en: "Observe its whole body, not just the tail. If relaxed, hug it; if stiff, keep your distance."
                },
                emotion: { zh: "兴奋 / 友好", en: "Excited / Friendly" }
            },
            {
                id: "d2",
                title: { zh: "露肚皮", en: "Exposing Belly" },
                icon: "🙃",
                summary: {
                    zh: "翻身躺下，露出腹部。",
                    en: "Rolling over to expose the abdomen."
                },
                detail: {
                    zh: "这是狗狗极致信任的表现，也是一种顺从姿态。它在说：'我不会伤害你，我也相信你不会伤害我。' 当然，通常也是在求摸摸！",
                    en: "This is the ultimate sign of trust and submission. It says, 'I won't hurt you, and I trust you won't hurt me.' Also, usually asking for belly rubs!"
                },
                advice: {
                    zh: "不要辜负这份信任，轻轻抚摸它的肚子。这会让它感到非常幸福。",
                    en: "Don't betray this trust, gently rub its belly. It will make it feel very happy."
                },
                emotion: { zh: "信任 / 顺从", en: "Trust / Submission" }
            },
            {
                id: "d3",
                title: { zh: "玩耍弓 (Play Bow)", en: "Play Bow" },
                icon: "🙇",
                summary: {
                    zh: "前腿趴下，屁股翘高。",
                    en: "Front legs down, rear end up."
                },
                detail: {
                    zh: "这是狗狗邀请玩耍的标准动作！无论它接下来是叫一声还是跑开，都是在说：'快来追我呀，我们一起玩吧！'",
                    en: "This is the standard invitation to play! Whether it barks or runs away next, it's saying, 'Chase me, let's play!'"
                },
                advice: {
                    zh: "哪怕只有五分钟，也陪它扔个球或跑一跑。回应它的邀请能极大增强你们的感情。",
                    en: "Even for just five minutes, throw a ball or run with it. Responding to its invite greatly strengthens your bond."
                },
                emotion: { zh: "快乐 / 邀请", en: "Happy / Playful" }
            },
            {
                id: "d4",
                title: { zh: "鲸鱼眼 (Whale Eye)", en: "Whale Eye" },
                icon: "👀",
                summary: {
                    zh: "露出大量眼白，眼神闪烁。",
                    en: "Showing lots of white in the eye."
                },
                detail: {
                    zh: "当狗狗头部不动但眼睛看向侧面，露出眼白时，通常表示它感到压力、焦虑或受到威胁。这时候请不要逼迫它。",
                    en: "When a dog keeps its head still but looks sideways showing the whites of its eyes, it usually indicates stress, anxiety, or feeling threatened. Do not force it."
                },
                advice: {
                    zh: "它在说'我不喜欢这样'。请立即停止导致它压力的行为（如拥抱、盯着看或拿走玩具），给它空间。",
                    en: "It's saying 'I don't like this'. Stop the stressor immediately (hugging, staring, taking toys) and give it space."
                },
                emotion: { zh: "焦虑 / 不适", en: "Anxiety / Discomfort" }
            },
            {
                id: "d5",
                title: { zh: "歪头杀", en: "Head Tilt" },
                icon: "❓",
                summary: {
                    zh: "头部向一侧倾斜。",
                    en: "Tilting head to one side."
                },
                detail: {
                    zh: "狗狗歪头通常是为了更好地听清你的声音，或者是为了调整视角看清你的表情。它在努力理解你在说什么，非常专注。",
                    en: "Dogs tilt their heads to hear you better or adjust their angle to see your expression. They are trying hard to understand you and are very focused."
                },
                advice: {
                    zh: "多跟它说说话！用积极、夸张的语气，它会很开心的。这是很好的语言训练机会。",
                    en: "Talk to it more! Use a positive, exaggerated tone, it will be happy. Great chance for language training."
                },
                emotion: { zh: "好奇 / 专注", en: "Curiosity / Focus" }
            }
        ]
    }
};

// 新手养宠指南数据
const GUIDE_DATA = [
    {
        id: "g1",
        title: { zh: "初次到家", en: "First Day Home" },
        icon: "🏠",
        content: {
            zh: "保持环境安静，限制活动范围，提供藏身之处。不要强行抱它，让它自己探索。",
            en: "Keep it quiet, limit activity area, provide hiding spots. Don't force interaction, let it explore."
        },
        tips: {
            zh: "准备带有妈妈味道的毯子可以帮助它安抚情绪。",
            en: "A blanket with its mother's scent can help soothe it."
        }
    },
    {
        id: "g2",
        title: { zh: "疫苗接种", en: "Vaccination" },
        icon: "💉",
        content: {
            zh: "猫三联/犬四联是核心疫苗。通常在8周龄开始接种，每隔3-4周接种一次，共3针。之后每年加强一次。",
            en: "Core vaccines (FVRCP/DHPP) usually start at 8 weeks, every 3-4 weeks for 3 doses. Then annual boosters."
        },
        tips: {
            zh: "接种疫苗后一周内不要洗澡，避免应激。",
            en: "Do not bathe for a week after vaccination to avoid stress."
        }
    },
    {
        id: "g3",
        title: { zh: "饮食注意", en: "Dietary Needs" },
        icon: "🍖",
        content: {
            zh: "幼宠需要高蛋白的幼猫/幼犬粮。禁忌食物：巧克力、洋葱、葡萄、木糖醇、煮熟的骨头。",
            en: "Puppies/kittens need high-protein food. Toxic foods: Chocolate, onions, grapes, xylitol, cooked bones."
        },
        tips: {
            zh: "换粮需要遵循7天换粮法，循序渐进。",
            en: "Switch food gradually over 7 days."
        }
    },
    {
        id: "g4",
        title: { zh: "驱虫指南", en: "Deworming" },
        icon: "🐛",
        content: {
            zh: "体内驱虫通常每月一次（幼宠）或每季度一次。体外驱虫（跳蚤/蜱虫）建议每月一次。",
            en: "Internal deworming monthly (young) or quarterly. External (fleas/ticks) monthly."
        },
        tips: {
            zh: "即使不出门，我们鞋底也可能带回寄生虫卵，所以室内宠物也要驱虫。",
            en: "Indoor pets need deworming too, as we can track in eggs on shoes."
        }
    }
];

// 情绪翻译器数据
const TRANSLATOR_DATA = {
    cats: {
        parts: [
            { id: 'tail', label: { zh: '尾巴', en: 'Tail' }, icon: '🐈' },
            { id: 'ears', label: { zh: '耳朵', en: 'Ears' }, icon: '👂' },
            { id: 'voice', label: { zh: '声音', en: 'Voice' }, icon: '🔊' }
        ],
        actions: {
            tail: [
                { 
                    id: 't1', 
                    label: { zh: '竖直向上', en: 'Straight Up' }, 
                    emotion: { zh: '自信 / 友好', en: 'Confident / Friendly' },
                    meaning: { zh: '我很高兴见到你！', en: 'I am happy to see you!' }
                },
                { 
                    id: 't2', 
                    label: { zh: '夹在两腿间', en: 'Tucked Between Legs' }, 
                    emotion: { zh: '恐惧 / 顺从', en: 'Fear / Submission' },
                    meaning: { zh: '别伤害我，我很害怕。', en: 'Don\'t hurt me, I\'m scared.' }
                },
                { 
                    id: 't3', 
                    label: { zh: '左右抽打', en: 'Lashing Side to Side' }, 
                    emotion: { zh: '愤怒 / 烦躁', en: 'Anger / Irritated' },
                    meaning: { zh: '我很生气，离我远点！', en: 'I\'m angry, back off!' }
                }
            ],
            ears: [
                { 
                    id: 'e1', 
                    label: { zh: '竖立向前', en: 'Upright & Forward' }, 
                    emotion: { zh: '好奇 / 警觉', en: 'Curious / Alert' },
                    meaning: { zh: '那是什​​么声音？', en: 'What is that sound?' }
                },
                { 
                    id: 'e2', 
                    label: { zh: '压低向后 (飞机耳)', en: 'Flattened Back' }, 
                    emotion: { zh: '恐惧 / 攻击性', en: 'Fear / Aggression' },
                    meaning: { zh: '我准备好战斗或逃跑了。', en: 'I am ready to fight or flight.' }
                }
            ],
            voice: [
                { 
                    id: 'v1', 
                    label: { zh: '短促的喵', en: 'Short Meow' }, 
                    emotion: { zh: '打招呼', en: 'Greeting' },
                    meaning: { zh: '嗨！', en: 'Hi!' }
                },
                { 
                    id: 'v2', 
                    label: { zh: '低沉的嘶嘶声', en: 'Hissing' }, 
                    emotion: { zh: '警告', en: 'Warning' },
                    meaning: { zh: '退后！', en: 'Back off!' }
                }
            ]
        }
    },
    dogs: {
        parts: [
            { id: 'tail', label: { zh: '尾巴', en: 'Tail' }, icon: '🐕' },
            { id: 'posture', label: { zh: '姿势', en: 'Posture' }, icon: '🧍' },
            { id: 'mouth', label: { zh: '嘴巴', en: 'Mouth' }, icon: '👄' }
        ],
        actions: {
            tail: [
                { 
                    id: 't1', 
                    label: { zh: '大幅度摇摆', en: 'Broad Wag' }, 
                    emotion: { zh: '快乐 / 友好', en: 'Happy / Friendly' },
                    meaning: { zh: '我很喜欢你！', en: 'I like you so much!' }
                },
                { 
                    id: 't2', 
                    label: { zh: '僵硬竖起', en: 'Stiff & Up' }, 
                    emotion: { zh: '警戒 / 强势', en: 'Alert / Dominant' },
                    meaning: { zh: '我是这里的老大。', en: 'I am the boss here.' }
                }
            ],
            posture: [
                { 
                    id: 'p1', 
                    label: { zh: '玩耍弓 (前趴后翘)', en: 'Play Bow' }, 
                    emotion: { zh: '邀请玩耍', en: 'Playful' },
                    meaning: { zh: '快来追我呀！', en: 'Chase me!' }
                },
                { 
                    id: 'p2', 
                    label: { zh: '翻肚皮', en: 'Belly Up' }, 
                    emotion: { zh: '信任 / 顺从', en: 'Trusting / Submissive' },
                    meaning: { zh: '我完全信任你。', en: 'I trust you completely.' }
                }
            ],
            mouth: [
                { 
                    id: 'm1', 
                    label: { zh: '微张放松', en: 'Relaxed Open' }, 
                    emotion: { zh: '放松 / 快乐', en: 'Relaxed / Happy' },
                    meaning: { zh: '我现在感觉很好。', en: 'I feel good right now.' }
                },
                { 
                    id: 'm2', 
                    label: { zh: '露出牙齿 (龇牙)', en: 'Baring Teeth' }, 
                    emotion: { zh: '威胁 / 攻击', en: 'Threat / Aggression' },
                    meaning: { zh: '别靠近我！', en: 'Don\'t come closer!' }
                }
            ]
        }
    }
};
