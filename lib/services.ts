export interface Package {
  name: { ar: string; en: string };
  price: { ar: string; en: string };
  period: { ar: string; en: string };
  description: { ar: string; en: string };
  includes: Array<{ ar: string; en: string }>;
  featured?: boolean;
}

export interface ServiceData {
  slug: string;
  icon: string;
  title: { ar: string; en: string };
  tagline: { ar: string; en: string };
  heroDesc: { ar: string; en: string };
  stats: Array<{ value: string; label: { ar: string; en: string } }>;
  valueProps: Array<{
    icon: string;
    title: { ar: string; en: string };
    desc: { ar: string; en: string };
  }>;
  whoFor: Array<{ ar: string; en: string }>;
  outcomes: Array<{ ar: string; en: string }>;
  process: Array<{
    step: number;
    title: { ar: string; en: string };
    desc: { ar: string; en: string };
  }>;
  packages: Package[];
  faq: Array<{
    q: { ar: string; en: string };
    a: { ar: string; en: string };
  }>;
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'executive-consultant',
    icon: 'building2',
    title: { en: 'Executive Consultant', ar: 'مستشار تنفيذي' },
    tagline: {
      en: 'Strategic clarity for leaders who build what matters.',
      ar: 'وضوح استراتيجي للقادة الذين يبنون ما يهم.',
    },
    heroDesc: {
      en: 'Twenty years navigating enterprise transformation at Microsoft, co-founding Xceed Ventures, and building Cura — Saudi Arabia\'s #1 telehealth platform. I turn complex challenges into executable strategy.',
      ar: 'عشرون عامًا من قيادة التحول المؤسسي في مايكروسوفت، وتأسيس xceed Ventures، وبناء كيور — منصة التطبيب عن بُعد الأولى في المملكة العربية السعودية. أحوّل التحديات المعقدة إلى استراتيجية قابلة للتنفيذ.',
    },
    stats: [
      { value: '55+', label: { en: 'Enterprise Projects', ar: 'مشروع مؤسسي' } },
      { value: '$7M', label: { en: 'Capital Raised', ar: 'رأس مال مُجمَّع' } },
      { value: '20+', label: { en: 'Years Experience', ar: 'عامًا من الخبرة' } },
      { value: '4M+', label: { en: 'Users Served', ar: 'مستخدم خدمتهم' } },
    ],
    valueProps: [
      {
        icon: 'target',
        title: { en: 'Strategy That Executes', ar: 'استراتيجية تُنفَّذ' },
        desc: { en: 'No generic frameworks. Strategy built on your market reality, team capacity, and competitive landscape — with a clear owner for every initiative.', ar: 'لا أطر عمل عامة. استراتيجية مبنية على واقع سوقك وقدرة فريقك والمشهد التنافسي — مع مسؤول واضح لكل مبادرة.' },
      },
      {
        icon: 'trending-up',
        title: { en: 'Digital Transformation', ar: 'التحول الرقمي' },
        desc: { en: 'End-to-end programs: technology assessment, roadmap design, change management, and vendor selection. Rooted in 55+ enterprise implementations.', ar: 'برامج شاملة: تقييم تقني، تصميم خارطة طريق، إدارة تغيير، واختيار موردين — مبنية على تجربة 55+ تطبيقًا مؤسسيًا.' },
      },
      {
        icon: 'dollar-sign',
        title: { en: 'Fundraising Ready', ar: 'جاهز للتمويل' },
        desc: { en: 'Investor-grade pitch decks, financial models, and fundraising strategy. I\'ve raised $7M — I know exactly what investors scrutinize.', ar: 'عروض استثمارية احترافية، نماذج مالية، واستراتيجيات تمويل. جمعت 7 ملايين دولار — أعرف تمامًا ما يدققه المستثمرون.' },
      },
      {
        icon: 'globe',
        title: { en: 'Vision 2030 Navigation', ar: 'التنقل في رؤية 2030' },
        desc: { en: 'Saudi regulatory landscape, public sector procurement, and Vision 2030 opportunity mapping — from a Misk 2030 Leader who\'s been inside the room.', ar: 'البيئة التنظيمية السعودية، مشتريات القطاع العام، ورسم خرائط فرص رؤية 2030 — من قائد مسك 2030 الذي كان داخل الغرفة.' },
      },
    ],
    whoFor: [
      { en: 'C-suite executives navigating digital transformation or market expansion', ar: 'مسؤولون تنفيذيون يواجهون تحولًا رقميًا أو توسعًا في السوق' },
      { en: 'Government entities executing Vision 2030 tech initiatives', ar: 'جهات حكومية تنفّذ مبادرات تقنية برؤية 2030' },
      { en: 'International companies entering Saudi Arabia or the GCC', ar: 'شركات دولية تدخل المملكة العربية السعودية أو منطقة الخليج' },
      { en: 'Investors and PE firms evaluating technology assets', ar: 'مستثمرون وصناديق استثمار تُقيِّم أصولًا تقنية' },
      { en: 'Scale-ups seeking strategic direction for Series A and beyond', ar: 'شركات ناشئة في مرحلة النمو تسعى إلى توجيه استراتيجي للسلسلة A وما بعدها' },
    ],
    outcomes: [
      { en: 'A clear, executable 90-day and 12-month strategic roadmap', ar: 'خارطة طريق استراتيجية قابلة للتنفيذ لـ 90 يومًا و12 شهرًا' },
      { en: 'Digital transformation blueprint with prioritized, costed initiatives', ar: 'مخطط تحول رقمي مع مبادرات مُرتَّبة بالأولوية ومحددة التكلفة' },
      { en: 'Investor-ready materials: pitch deck, financial model, and narrative', ar: 'مواد جاهزة للمستثمرين: عرض تقديمي، نموذج مالي، وقصة مقنعة' },
      { en: 'Validated market entry or growth plan', ar: 'خطة دخول أسواق أو نمو مُدقَّقة ومُختبَرة' },
      { en: 'Access to a curated network of investors, operators, and government decision-makers', ar: 'الوصول إلى شبكة منتقاة من المستثمرين والمشغّلين وصانعي القرار الحكوميين' },
    ],
    process: [
      { step: 1, title: { en: 'Discovery', ar: 'الاستكشاف' }, desc: { en: 'Deep-dive into your business, team, market position, and core challenges. Typically 2–3 sessions.', ar: 'غوص عميق في أعمالك وفريقك وموقعك في السوق وتحدياتك الجوهرية. عادةً 2-3 جلسات.' } },
      { step: 2, title: { en: 'Diagnosis', ar: 'التشخيص' }, desc: { en: 'Root-cause analysis delivered as a structured written assessment — blockers, gaps, and opportunities ranked by impact.', ar: 'تحليل جذري يُقدَّم كتقييم مكتوب ومُهيكل — عوائق وفجوات وفرص مُرتَّبة حسب التأثير.' } },
      { step: 3, title: { en: 'Strategy Design', ar: 'تصميم الاستراتيجية' }, desc: { en: 'Co-create the strategy and roadmap with your leadership team — so ownership is yours from day one.', ar: 'بناء مشترك للاستراتيجية وخارطة الطريق مع فريق قيادتك — حتى تكون الملكية لك من اليوم الأول.' } },
      { step: 4, title: { en: 'Execution Support', ar: 'دعم التنفيذ' }, desc: { en: 'Ongoing advisory through implementation — weekly check-ins, milestone reviews, and rapid course corrections.', ar: 'استشارة مستمرة خلال التنفيذ — متابعة أسبوعية ومراجعات مراحل وتعديلات مسار سريعة.' } },
    ],
    packages: [
      {
        name: { en: 'Strategy Sprint', ar: 'سبرينت استراتيجي' },
        price: { en: 'SAR 25,000', ar: '25,000 ريال' },
        period: { en: 'one-time', ar: 'مرة واحدة' },
        description: { en: 'Focused 4-week engagement to solve a specific strategic challenge — market entry, fundraising prep, or digital roadmap.', ar: 'ارتباط مكثف لمدة 4 أسابيع لحل تحدٍّ استراتيجي محدد — دخول سوق، تحضير تمويل، أو خارطة طريق رقمية.' },
        includes: [
          { en: 'Structured diagnostic assessment', ar: 'تقييم تشخيصي منظم' },
          { en: 'Strategy document & roadmap', ar: 'وثيقة استراتيجية وخارطة طريق' },
          { en: 'Board-ready presentation', ar: 'عرض جاهز لمجلس الإدارة' },
          { en: '4 advisory sessions', ar: '4 جلسات استشارية' },
        ],
      },
      {
        name: { en: 'Monthly Retainer', ar: 'الاستشارة الشهرية' },
        price: { en: 'SAR 18,000', ar: '18,000 ريال' },
        period: { en: 'per month', ar: 'شهريًا' },
        description: { en: 'Ongoing strategic partnership. Full access to my thinking, my network, and my 20 years of experience — month after month.', ar: 'شراكة استراتيجية مستمرة. وصول كامل لتفكيري وشبكتي وخبرة 20 عامًا — شهرًا بعد شهر.' },
        includes: [
          { en: '4 advisory sessions / month', ar: '4 جلسات استشارية شهريًا' },
          { en: 'Unlimited async messaging', ar: 'مراسلة غير محدودة' },
          { en: 'Document review & feedback', ar: 'مراجعة وثائق وتغذية راجعة' },
          { en: 'Network introductions', ar: 'تعريف بشبكة العلاقات' },
        ],
        featured: true,
      },
      {
        name: { en: 'Fractional CDO', ar: 'رئيس رقمي جزئي' },
        price: { en: 'Custom', ar: 'حسب الاتفاق' },
        period: { en: 'flexible', ar: 'مرن' },
        description: { en: 'Embedded part-time digital leadership for organizations that need a senior executive without the full-time commitment.', ar: 'قيادة رقمية مدمجة بدوام جزئي للمؤسسات التي تحتاج مسؤولًا تنفيذيًا أعلى دون الالتزام بدوام كامل.' },
        includes: [
          { en: 'Weekly embedded hours', ar: 'ساعات مدمجة أسبوعية' },
          { en: 'Team leadership & alignment', ar: 'قيادة وتوجيه الفريق' },
          { en: 'Board & executive reporting', ar: 'تقارير لمجلس الإدارة والإدارة التنفيذية' },
          { en: 'Custom scope', ar: 'نطاق مخصص' },
        ],
      },
    ],
    faq: [
      {
        q: { en: 'How quickly can we start?', ar: 'متى يمكننا البدء؟' },
        a: { en: 'Typically within 1–2 weeks of our initial call. I limit active engagements to protect quality.', ar: 'عادةً خلال 1-2 أسبوع من مكالمتنا الأولى. أحصر الارتباطات النشطة لحماية الجودة.' },
      },
      {
        q: { en: 'Do you work with international companies?', ar: 'هل تعمل مع شركات دولية؟' },
        a: { en: 'Yes — I work with companies entering Saudi Arabia and the GCC, and Saudi companies expanding globally.', ar: 'نعم — أعمل مع شركات تدخل المملكة ومنطقة الخليج، وشركات سعودية تتوسع عالميًا.' },
      },
      {
        q: { en: 'What industries do you focus on?', ar: 'ما القطاعات التي تركّز عليها؟' },
        a: { en: 'Digital health, technology, government, and financial services. Deep knowledge in each from 20+ years of work.', ar: 'الصحة الرقمية، التقنية، الحكومة، والخدمات المالية. معرفة عميقة في كل قطاع من خلال 20+ عامًا من العمل.' },
      },
    ],
  },
  {
    slug: 'board-advisor',
    icon: 'users2',
    title: { en: 'Board Advisor', ar: 'مستشار مجلس الإدارة' },
    tagline: {
      en: 'Board-level thinking that protects and scales your business.',
      ar: 'تفكير على مستوى مجلس الإدارة يحمي أعمالك ويوسّعها.',
    },
    heroDesc: {
      en: 'I\'ve sat at the board table as a founder, operator, and investor. I bring pattern recognition, governance depth, and a frank voice — the kind boards need to make high-stakes decisions with confidence.',
      ar: 'جلست على طاولة مجلس الإدارة كمؤسس ومشغّل ومستثمر. أحضر معي التعرف على الأنماط وعمق الحوكمة وصوتًا صريحًا — النوع الذي تحتاجه المجالس لاتخاذ قرارات عالية المخاطر بثقة.',
    },
    stats: [
      { value: '3', label: { en: 'Board Seats', ar: 'مقاعد في مجالس الإدارة' } },
      { value: '20+', label: { en: 'Years Experience', ar: 'عامًا من الخبرة' } },
      { value: '$7M', label: { en: 'Raised as Founder', ar: 'جُمع كمؤسس' } },
      { value: '1', label: { en: 'Successful Exit', ar: 'استحواذ ناجح' } },
    ],
    valueProps: [
      {
        icon: 'shield',
        title: { en: 'Governance That Protects', ar: 'حوكمة تحمي' },
        desc: { en: 'Build governance structures that protect founders, investors, and the business — before problems arise, not after.', ar: 'بناء هياكل حوكمة تحمي المؤسسين والمستثمرين والأعمال — قبل أن تنشأ المشكلات، لا بعدها.' },
      },
      {
        icon: 'eye',
        title: { en: 'Honest Outside Perspective', ar: 'منظور خارجي صادق' },
        desc: { en: 'A board member who will tell you what you need to hear, not what\'s comfortable. Pattern-matched against 20+ years and 55+ projects.', ar: 'عضو مجلس سيخبرك بما تحتاج سماعه، لا بما هو مريح. مُقابَل بـ 20+ عامًا و55+ مشروعًا.' },
      },
      {
        icon: 'trending-up',
        title: { en: 'Strategic Direction', ar: 'التوجيه الاستراتيجي' },
        desc: { en: 'Long-horizon thinking on market shifts, technology bets, and competitive positioning — to keep the company ahead of the curve.', ar: 'تفكير بعيد المدى في التحولات السوقية والرهانات التقنية والموضع التنافسي — للإبقاء على الشركة في الطليعة.' },
      },
      {
        icon: 'users',
        title: { en: 'Network & Introductions', ar: 'الشبكة والتعريفات' },
        desc: { en: 'Direct access to investors, strategic partners, government stakeholders, and talent across Saudi Arabia and the region.', ar: 'وصول مباشر إلى المستثمرين والشركاء الاستراتيجيين والجهات الحكومية والكفاءات في المملكة والمنطقة.' },
      },
    ],
    whoFor: [
      { en: 'Tech and healthcare companies at growth or pre-IPO stage', ar: 'شركات تقنية وصحية في مرحلة النمو أو ما قبل الطرح العام' },
      { en: 'Startups preparing for Series A, B, or strategic acquisition', ar: 'شركات ناشئة تستعد للسلسلة A أو B أو استحواذ استراتيجي' },
      { en: 'Family businesses undergoing digital transformation', ar: 'شركات عائلية تخضع لتحول رقمي' },
      { en: 'PE-backed companies needing independent board representation', ar: 'شركات مدعومة من صناديق الاستثمار تحتاج تمثيلًا مستقلًا في المجلس' },
      { en: 'Government-linked entities building governance maturity', ar: 'جهات حكومية تبني نضجًا في الحوكمة' },
    ],
    outcomes: [
      { en: 'Clear governance framework and board charter', ar: 'إطار حوكمة واضح وميثاق مجلس الإدارة' },
      { en: 'Structured board meeting cadence and reporting templates', ar: 'وتيرة منظمة لاجتماعات المجلس وقوالب التقارير' },
      { en: 'Strategic guidance at key inflection points', ar: 'توجيه استراتيجي عند نقاط التحول الرئيسية' },
      { en: 'Objective assessment of management team and execution', ar: 'تقييم موضوعي لفريق الإدارة والتنفيذ' },
      { en: 'Active network introductions aligned with company goals', ar: 'تعريفات نشطة بالشبكة متوافقة مع أهداف الشركة' },
    ],
    process: [
      { step: 1, title: { en: 'Onboarding', ar: 'الاستيعاب' }, desc: { en: 'Deep review of company materials, financials, strategy, and current governance. 2-week ramp-up.', ar: 'مراجعة معمّقة لوثائق الشركة والمالية والاستراتيجية والحوكمة الحالية. رفع مستوى خلال أسبوعين.' } },
      { step: 2, title: { en: 'Governance Setup', ar: 'إعداد الحوكمة' }, desc: { en: 'Assess and improve board structure, committee setup, reporting cadence, and decision-making processes.', ar: 'تقييم وتحسين هيكل المجلس وإعداد اللجان ووتيرة التقارير وعمليات اتخاذ القرار.' } },
      { step: 3, title: { en: 'Active Participation', ar: 'المشاركة النشطة' }, desc: { en: 'Monthly board meetings, ad-hoc calls on urgent matters, and direct access between meetings via async channels.', ar: 'اجتماعات مجلس شهرية، مكالمات طارئة للمسائل العاجلة، ووصول مباشر بين الاجتماعات عبر القنوات غير المتزامنة.' } },
      { step: 4, title: { en: 'Annual Review', ar: 'المراجعة السنوية' }, desc: { en: 'Annual board effectiveness assessment and strategic planning session to align on the year ahead.', ar: 'تقييم سنوي لفاعلية المجلس وجلسة تخطيط استراتيجي للتوافق على العام القادم.' } },
    ],
    packages: [
      {
        name: { en: 'Observer', ar: 'مراقب' },
        price: { en: 'SAR 8,000', ar: '8,000 ريال' },
        period: { en: 'per month', ar: 'شهريًا' },
        description: { en: 'Board observer seat with strategic input — ideal for early-stage companies building governance foundations.', ar: 'مقعد مراقب في المجلس مع مدخلات استراتيجية — مثالي للشركات في المرحلة المبكرة التي تبني أسس الحوكمة.' },
        includes: [
          { en: 'Monthly board meeting attendance', ar: 'حضور اجتماع المجلس الشهري' },
          { en: 'Strategic input & challenge', ar: 'مدخلات استراتيجية وتحدٍّ بناء' },
          { en: '1 advisory call / month', ar: 'مكالمة استشارية واحدة شهريًا' },
          { en: 'Document review', ar: 'مراجعة الوثائق' },
        ],
      },
      {
        name: { en: 'Board Member', ar: 'عضو مجلس' },
        price: { en: 'SAR 15,000', ar: '15,000 ريال' },
        period: { en: 'per month', ar: 'شهريًا' },
        description: { en: 'Full independent board membership with voting rights — governance, strategy, and accountability at the highest level.', ar: 'عضوية مجلس مستقلة كاملة مع حقوق التصويت — حوكمة واستراتيجية ومساءلة على أعلى مستوى.' },
        includes: [
          { en: 'Full board seat with voting rights', ar: 'مقعد كامل في المجلس مع حقوق التصويت' },
          { en: 'Committee participation', ar: 'المشاركة في اللجان' },
          { en: '2 advisory calls / month', ar: 'مكالمتان استشاريتان شهريًا' },
          { en: 'Network introductions', ar: 'تعريف بشبكة العلاقات' },
          { en: 'Governance framework setup', ar: 'إعداد إطار الحوكمة' },
        ],
        featured: true,
      },
      {
        name: { en: 'Strategic Partner', ar: 'شريك استراتيجي' },
        price: { en: 'Custom', ar: 'حسب الاتفاق' },
        period: { en: 'equity + retainer', ar: 'حصة + احتجاز' },
        description: { en: 'Deeply embedded advisory with equity alignment — for high-stakes transformations or pre-IPO journeys.', ar: 'استشارة عميقة مع توافق على حصة ملكية — للتحولات عالية المخاطر أو رحلات ما قبل الطرح العام.' },
        includes: [
          { en: 'Everything in Board Member', ar: 'كل ما في عضو المجلس' },
          { en: 'Equity participation', ar: 'مشاركة في الملكية' },
          { en: 'Unlimited access', ar: 'وصول غير محدود' },
          { en: 'Custom deliverables', ar: 'مخرجات مخصصة' },
        ],
      },
    ],
    faq: [
      {
        q: { en: 'How many boards do you currently serve on?', ar: 'كم مجلسًا تخدم حاليًا؟' },
        a: { en: 'I limit active board seats to maintain genuine impact. Contact me to discuss availability.', ar: 'أحصر مقاعد المجالس النشطة للحفاظ على تأثير حقيقي. تواصل معي لمناقشة التوافر.' },
      },
      {
        q: { en: 'Do you require equity for board advisory?', ar: 'هل تطلب حصة ملكية مقابل استشارة المجلس؟' },
        a: { en: 'For the Observer and Board Member tiers, equity is optional. For the Strategic Partner tier, equity alignment is part of the structure.', ar: 'بالنسبة لمستويَي المراقب وعضو المجلس، الحصة اختيارية. لمستوى الشريك الاستراتيجي، توافق الحصة جزء من الهيكل.' },
      },
      {
        q: { en: 'What sectors do you cover?', ar: 'ما القطاعات التي تغطيها؟' },
        a: { en: 'Technology, digital health, and financial services — with deep regulatory and market knowledge in Saudi Arabia and the GCC.', ar: 'التقنية والصحة الرقمية والخدمات المالية — مع معرفة تنظيمية وسوقية عميقة في المملكة العربية السعودية ومنطقة الخليج.' },
      },
    ],
  },
  {
    slug: 'startup-mentor',
    icon: 'target',
    title: { en: 'Startup Mentor', ar: 'مرشد للشركات الناشئة' },
    tagline: {
      en: 'From first idea to first term sheet — without the costly mistakes.',
      ar: 'من الفكرة الأولى إلى عرض الاستثمار الأول — بدون الأخطاء المُكلِفة.',
    },
    heroDesc: {
      en: 'I\'ve built two venture-backed companies, mentored 10+ startups through KAUST TAQADAM, Misk, and Monsha\'at, and raised $7M myself. I don\'t just advise — I\'ve lived the founder journey and can help you navigate it faster.',
      ar: 'أسست شركتين مدعومتين من رأس المال المخاطر، وأرشدت 10+ شركات ناشئة عبر كاوست تقدم ومسك ومنشآت، وجمعت 7 ملايين دولار بنفسي. لا أكتفي بالنصيحة — لقد عشت رحلة المؤسس وبإمكاني مساعدتك على التنقل فيها بشكل أسرع.',
    },
    stats: [
      { value: '10+', label: { en: 'Startups Mentored', ar: 'شركة ناشئة أرشدتها' } },
      { value: '$7M', label: { en: 'Raised as Founder', ar: 'جُمع كمؤسس' } },
      { value: '2', label: { en: 'Ventures Built', ar: 'مشروع أسستهما' } },
      { value: '1', label: { en: 'Successful Exit', ar: 'استحواذ ناجح' } },
    ],
    valueProps: [
      {
        icon: 'compass',
        title: { en: 'PMF Clarity', ar: 'وضوح في الملاءمة مع السوق' },
        desc: { en: 'Cut through assumption and find real product-market fit — through structured customer discovery, metrics, and iteration frameworks.', ar: 'اخترق الافتراضات وابحث عن الملاءمة الحقيقية مع السوق — من خلال اكتشاف العملاء المنظم والمقاييس وأطر التكرار.' },
      },
      {
        icon: 'dollar-sign',
        title: { en: 'Investor-Ready', ar: 'جاهز للمستثمرين' },
        desc: { en: 'I\'ve been on both sides of the table. I help you build a pitch, model, and story that investors can\'t say no to.', ar: 'جلست على كلا جانبَي الطاولة. أساعدك في بناء عرض ونموذج وقصة لا يستطيع المستثمرون رفضها.' },
      },
      {
        icon: 'map',
        title: { en: 'Saudi Ecosystem Navigation', ar: 'التنقل في النظام البيئي السعودي' },
        desc: { en: 'Regulatory shortcuts, B2G sales cycles, accelerator access, and Vision 2030 alignment — the stuff no pitch deck covers.', ar: 'اختصارات تنظيمية ودورات مبيعات B2G ووصول إلى مسرّعات ومواءمة رؤية 2030 — ما لا يغطيه أي عرض تقديمي.' },
      },
      {
        icon: 'users',
        title: { en: 'Network Access', ar: 'الوصول إلى الشبكة' },
        desc: { en: 'Warm intros to investors, design partners, and talent in the Saudi startup ecosystem — when you\'ve earned them.', ar: 'تعريفات دافئة بالمستثمرين وشركاء التصميم والكفاءات في النظام البيئي للشركات الناشئة السعودية — حين تكون مستحقًا لها.' },
      },
    ],
    whoFor: [
      { en: 'Founders at the idea or pre-seed stage building in Saudi Arabia', ar: 'مؤسسون في مرحلة الفكرة أو ما قبل البذرة يبنون في المملكة العربية السعودية' },
      { en: 'Early-stage teams struggling with PMF, positioning, or growth', ar: 'فرق في المرحلة المبكرة تعاني في الملاءمة مع السوق أو التموضع أو النمو' },
      { en: 'Founders preparing for accelerator programs (Misk, KAUST, Monsha\'at)', ar: 'مؤسسون يستعدون لبرامج المسرّعات (مسك وكاوست ومنشآت)' },
      { en: 'Founders getting ready for their first institutional fundraise', ar: 'مؤسسون يستعدون لجمع تمويلهم المؤسسي الأول' },
      { en: 'Second-time founders who want to move faster this time', ar: 'مؤسسون في مشروعهم الثاني يريدون التحرك بشكل أسرع' },
    ],
    outcomes: [
      { en: 'Validated PMF hypothesis with real customer evidence', ar: 'فرضية ملاءمة مع السوق مُدقَّقة بأدلة حقيقية من العملاء' },
      { en: 'Investor-ready pitch deck and financial model', ar: 'عرض تقديمي جاهز للمستثمرين ونموذج مالي' },
      { en: 'Clear 90-day growth or fundraising roadmap', ar: 'خارطة طريق واضحة للنمو أو جمع التمويل لمدة 90 يومًا' },
      { en: 'Accelerator application strategy and coaching', ar: 'استراتيجية تقديم للمسرّعات وتدريب' },
      { en: 'Warm investor introductions when the time is right', ar: 'تعريفات دافئة بالمستثمرين حين يحين الوقت المناسب' },
    ],
    process: [
      { step: 1, title: { en: 'Kickoff', ar: 'الانطلاق' }, desc: { en: '90-minute session to map your current state, biggest blockers, and what success looks like in 6 months.', ar: 'جلسة 90 دقيقة لرسم وضعك الحالي وأبرز عوائقك وما يبدو عليه النجاح في 6 أشهر.' } },
      { step: 2, title: { en: 'Focus Areas', ar: 'مجالات التركيز' }, desc: { en: 'Identify the 1–2 highest-leverage areas to work on — then build a sprint plan for the next 30 days.', ar: 'تحديد مجال أو مجالَين ذوَي أعلى رافعة للعمل عليهما — ثم بناء خطة سبرينت للأيام الثلاثين القادمة.' } },
      { step: 3, title: { en: 'Weekly Sessions', ar: 'الجلسات الأسبوعية' }, desc: { en: 'Regular working sessions: reviewing experiments, unblocking decisions, and sharpening investor narrative.', ar: 'جلسات عمل منتظمة: مراجعة التجارب وإزالة عقبات القرارات وصقل الرواية للمستثمرين.' } },
      { step: 4, title: { en: 'Network & Introductions', ar: 'الشبكة والتعريفات' }, desc: { en: 'When the time is right, I make the right introductions — not before. Quality over speed.', ar: 'حين يحين الوقت، أجري التعريفات الصحيحة — لا قبل ذلك. الجودة على السرعة.' } },
    ],
    packages: [
      {
        name: { en: 'Single Session', ar: 'جلسة واحدة' },
        price: { en: 'SAR 2,000', ar: '2,000 ريال' },
        period: { en: 'per 90 min', ar: 'لكل 90 دقيقة' },
        description: { en: 'A focused, high-value session on a specific challenge — pitch review, fundraising strategy, or growth blockers.', ar: 'جلسة مركّزة وعالية القيمة حول تحدٍّ محدد — مراجعة العرض أو استراتيجية التمويل أو عوائق النمو.' },
        includes: [
          { en: '90-minute focused session', ar: 'جلسة مركّزة 90 دقيقة' },
          { en: 'Written summary & action items', ar: 'ملخص مكتوب وعناصر عمل' },
          { en: 'Session recording', ar: 'تسجيل الجلسة' },
          { en: '1 week of follow-up Q&A', ar: 'أسبوع من الأسئلة والأجوبة للمتابعة' },
        ],
      },
      {
        name: { en: 'Monthly Mentorship', ar: 'إرشاد شهري' },
        price: { en: 'SAR 6,500', ar: '6,500 ريال' },
        period: { en: 'per month', ar: 'شهريًا' },
        description: { en: 'Structured monthly program with weekly sessions — the cadence serious founders need to build momentum.', ar: 'برنامج شهري منظم بجلسات أسبوعية — الوتيرة التي يحتاجها المؤسسون الجادون لبناء الزخم.' },
        includes: [
          { en: '4 sessions / month (60 min each)', ar: '4 جلسات شهريًا (60 دقيقة لكل منها)' },
          { en: 'Async messaging between sessions', ar: 'مراسلة بين الجلسات' },
          { en: 'Document & pitch review', ar: 'مراجعة الوثائق والعروض التقديمية' },
          { en: 'Priority network access', ar: 'وصول أولوي للشبكة' },
        ],
        featured: true,
      },
      {
        name: { en: '3-Month Sprint', ar: 'سبرينت 3 أشهر' },
        price: { en: 'SAR 15,000', ar: '15,000 ريال' },
        period: { en: 'one-time', ar: 'مرة واحدة' },
        description: { en: 'Intensive 3-month program — ideal for founders fundraising or preparing for an accelerator.', ar: 'برنامج مكثف لمدة 3 أشهر — مثالي للمؤسسين الساعين للتمويل أو التحضير لمسرّع.' },
        includes: [
          { en: 'Everything in Monthly Mentorship', ar: 'كل ما في الإرشاد الشهري' },
          { en: 'Investor-ready pitch deck build', ar: 'بناء عرض تقديمي جاهز للمستثمرين' },
          { en: 'Financial model review', ar: 'مراجعة النموذج المالي' },
          { en: 'Intro to 3 curated investors', ar: 'تعريف بـ 3 مستثمرين منتقَين' },
        ],
      },
    ],
    faq: [
      {
        q: { en: 'What stage do you work with?', ar: 'ما المرحلة التي تعمل معها؟' },
        a: { en: 'Primarily pre-seed through Series A. The sweet spot is when founders have early traction and are preparing to scale or fundraise.', ar: 'أساسًا من ما قبل البذرة حتى السلسلة A. النقطة المثلى حين يكون لدى المؤسسين جذب مبكر ويستعدون للتوسع أو جمع التمويل.' },
      },
      {
        q: { en: 'Do you take equity?', ar: 'هل تأخذ حصة ملكية؟' },
        a: { en: 'Not typically for mentorship engagements. Equity is discussed only for longer-term advisory or board roles.', ar: 'ليس عادةً في ارتباطات الإرشاد. تُناقَش الحصة فقط في أدوار الاستشارة أو المجلس الأطول أجلًا.' },
      },
      {
        q: { en: 'Do you mentor in Arabic?', ar: 'هل تُرشد باللغة العربية؟' },
        a: { en: 'Yes — sessions can be conducted fully in Arabic or English, whichever works best for you.', ar: 'نعم — يمكن إجراء الجلسات كاملةً بالعربية أو الإنجليزية، أيهما يناسبك أكثر.' },
      },
    ],
  },
  {
    slug: 'executive-coach',
    icon: 'lightbulb',
    title: { en: 'Executive Coach', ar: 'كوتش تنفيذي' },
    tagline: {
      en: 'The thinking partner C-suite leaders keep private.',
      ar: 'شريك التفكير الذي يحتفظ به القادة التنفيذيون.',
    },
    heroDesc: {
      en: 'I\'ve led at Microsoft, founded companies, sat on boards, and been in the rooms where hard decisions are made. As your coach, I help you think more clearly, lead more confidently, and execute more decisively — without burning out.',
      ar: 'قدت في مايكروسوفت وأسست شركات وجلست في مجالس الإدارة وكنت في الغرف التي تُتخذ فيها القرارات الصعبة. كمدرّبك، أساعدك على التفكير بوضوح أكبر والقيادة بثقة أعلى والتنفيذ بحزم أشد — دون أن تُنهك.',
    },
    stats: [
      { value: '20+', label: { en: 'Years in Leadership', ar: 'عامًا في القيادة' } },
      { value: 'C-Suite', label: { en: 'Clients Coached', ar: 'عملاء تم تدريبهم' } },
      { value: 'Bilingual', label: { en: 'AR & EN Sessions', ar: 'جلسات عربية وإنجليزية' } },
      { value: 'Misk 2030', label: { en: 'Leadership Program', ar: 'برنامج القيادة' } },
    ],
    valueProps: [
      {
        icon: 'brain',
        title: { en: 'Clarity Under Pressure', ar: 'الوضوح تحت الضغط' },
        desc: { en: 'When everyone wants a piece of you, clarity becomes your scarcest resource. We build thinking systems that protect your focus and sharpen your judgment.', ar: 'حين يريد الجميع جزءًا منك، يصبح الوضوح أندر مواردك. نبني أنظمة تفكير تحمي تركيزك وتشحذ حكمك.' },
      },
      {
        icon: 'mic',
        title: { en: 'Executive Presence', ar: 'الحضور التنفيذي' },
        desc: { en: 'Communication, gravitas, and influence — at the board table, in investor meetings, and in front of your team. Presence is a skill, not a trait.', ar: 'التواصل والثقل والتأثير — على طاولة المجلس وفي اجتماعات المستثمرين وأمام فريقك. الحضور مهارة لا صفة.' },
      },
      {
        icon: 'shield',
        title: { en: 'Confident Decision-Making', ar: 'اتخاذ قرارات بثقة' },
        desc: { en: 'Most leaders know what to do — they hesitate on execution. We diagnose your decision-making patterns and sharpen them.', ar: 'يعرف معظم القادة ما يجب فعله — يترددون في التنفيذ. نشخّص أنماط اتخاذ قراراتك ونشحذها.' },
      },
      {
        icon: 'heart',
        title: { en: 'Sustainable Performance', ar: 'الأداء المستدام' },
        desc: { en: 'High performance without burnout. We build routines, boundaries, and recovery systems so you can lead at full capacity for the long haul.', ar: 'أداء عالٍ بدون إرهاق. نبني روتينًا وحدودًا وأنظمة تعافٍ تتيح لك القيادة بطاقة كاملة على المدى البعيد.' },
      },
    ],
    whoFor: [
      { en: 'C-suite executives in a new or expanded role', ar: 'مسؤولون تنفيذيون في دور جديد أو موسّع' },
      { en: 'Senior leaders navigating organizational transformation', ar: 'قادة أعلى يواجهون تحولًا مؤسسيًا' },
      { en: 'Founders scaling from operator to CEO mindset', ar: 'مؤسسون ينتقلون من عقلية المشغّل إلى عقلية المدير التنفيذي' },
      { en: 'Leaders preparing for board presentations or investor pitches', ar: 'قادة يستعدون لعروض مجلس الإدارة أو عروض المستثمرين' },
      { en: 'High-potential leaders sponsored by their organization', ar: 'قادة ذوو إمكانات عالية تموّلهم مؤسساتهم' },
    ],
    outcomes: [
      { en: 'Sharper decision-making frameworks and mental clarity', ar: 'أطر أحدّ لاتخاذ القرارات ووضوح ذهني' },
      { en: 'Stronger executive presence and communication', ar: 'حضور تنفيذي أقوى وتواصل أفضل' },
      { en: 'Improved ability to lead teams through uncertainty', ar: 'قدرة محسّنة على قيادة الفرق في أوقات الغموض' },
      { en: 'A confidential space to process hard decisions', ar: 'فضاء سري لمعالجة القرارات الصعبة' },
      { en: 'Sustainable high-performance habits and routines', ar: 'عادات وروتين أداء عالٍ ومستدام' },
    ],
    process: [
      { step: 1, title: { en: 'Chemistry Call', ar: 'مكالمة التوافق' }, desc: { en: '30-minute no-commitment call to assess fit. Coaching only works when there\'s genuine trust.', ar: 'مكالمة 30 دقيقة بدون التزام لتقييم التوافق. الكوتشينج يعمل فقط حين تتوفر ثقة حقيقية.' } },
      { step: 2, title: { en: 'Intake & Baseline', ar: 'الاستقبال والخط الأساسي' }, desc: { en: 'Structured intake to understand your leadership style, current pressures, and what you want to build.', ar: 'استقبال منظم لفهم أسلوبك القيادي وضغوطك الحالية وما تريد بناءه.' } },
      { step: 3, title: { en: 'Regular Sessions', ar: 'الجلسات المنتظمة' }, desc: { en: 'Bi-weekly or monthly coaching sessions — held with full confidentiality and structured around what\'s most alive for you.', ar: 'جلسات كوتشينج نصف شهرية أو شهرية — تُعقد بسرية تامة ومُهيكلة حول ما هو أكثر حيوية بالنسبة لك.' } },
      { step: 4, title: { en: 'Progress Reviews', ar: 'مراجعات التقدم' }, desc: { en: 'Quarterly reviews to track growth, recalibrate goals, and confirm the coaching is delivering what you need.', ar: 'مراجعات فصلية لتتبع النمو وإعادة معايرة الأهداف والتأكد من أن الكوتشينج يحقق ما تحتاجه.' } },
    ],
    packages: [
      {
        name: { en: 'Single Session', ar: 'جلسة واحدة' },
        price: { en: 'SAR 2,500', ar: '2,500 ريال' },
        period: { en: 'per 60 min', ar: 'لكل 60 دقيقة' },
        description: { en: 'One focused coaching session for a specific leadership challenge or decision you\'re navigating.', ar: 'جلسة كوتشينج مركّزة واحدة لتحدٍّ قيادي محدد أو قرار تواجهه.' },
        includes: [
          { en: '60-minute deep-dive session', ar: 'جلسة معمّقة 60 دقيقة' },
          { en: 'Session notes & reflections', ar: 'ملاحظات وتأملات الجلسة' },
          { en: '48h follow-up support', ar: 'دعم متابعة لمدة 48 ساعة' },
        ],
      },
      {
        name: { en: 'Monthly Coaching', ar: 'الكوتشينج الشهري' },
        price: { en: 'SAR 8,000', ar: '8,000 ريال' },
        period: { en: 'per month', ar: 'شهريًا' },
        description: { en: 'Two sessions per month with continuity — the right cadence for leaders building new habits and facing ongoing challenges.', ar: 'جلستان شهريًا مع استمرارية — الوتيرة المناسبة للقادة الذين يبنون عادات جديدة ويواجهون تحديات مستمرة.' },
        includes: [
          { en: '2 sessions / month (60 min each)', ar: 'جلستان شهريًا (60 دقيقة لكل منهما)' },
          { en: 'Async check-ins between sessions', ar: 'متابعة بين الجلسات' },
          { en: 'Session notes & action items', ar: 'ملاحظات وعناصر عمل' },
          { en: 'Confidential & private', ar: 'سري وخاص' },
        ],
        featured: true,
      },
      {
        name: { en: '3-Month Program', ar: 'برنامج 3 أشهر' },
        price: { en: 'SAR 20,000', ar: '20,000 ريال' },
        period: { en: 'one-time', ar: 'مرة واحدة' },
        description: { en: 'Deep, transformational coaching over 3 months — for leaders at an inflection point who are serious about growth.', ar: 'كوتشينج عميق وتحويلي على مدى 3 أشهر — للقادة عند نقطة تحول جادين في نموهم.' },
        includes: [
          { en: '6 sessions (60 min each)', ar: '6 جلسات (60 دقيقة لكل منها)' },
          { en: 'Leadership assessment', ar: 'تقييم قيادي' },
          { en: 'Unlimited async support', ar: 'دعم غير محدود بين الجلسات' },
          { en: 'Progress report at close', ar: 'تقرير تقدم عند الانتهاء' },
        ],
      },
    ],
    faq: [
      {
        q: { en: 'Is coaching confidential?', ar: 'هل الكوتشينج سري؟' },
        a: { en: 'Completely. Everything discussed in sessions stays between us — no summaries shared with employers or sponsors without your explicit consent.', ar: 'تمامًا. كل ما يُناقَش في الجلسات يبقى بيننا — لا ملخصات تُشارَك مع أصحاب العمل أو الجهات المموّلة بدون موافقتك الصريحة.' },
      },
      {
        q: { en: 'Do you coach in Arabic?', ar: 'هل تُدرّب باللغة العربية؟' },
        a: { en: 'Yes — sessions can be held fully in Arabic or English. Many clients prefer Arabic for the depth it allows.', ar: 'نعم — يمكن عقد الجلسات كاملةً بالعربية أو الإنجليزية. يُفضّل كثير من العملاء العربية للعمق الذي تتيحه.' },
      },
      {
        q: { en: 'Can my organization sponsor the coaching?', ar: 'هل تستطيع مؤسستي تموّل الكوتشينج؟' },
        a: { en: 'Yes — I can provide invoicing in formats suitable for corporate sponsorship. The coaching itself remains fully confidential.', ar: 'نعم — يمكنني تقديم فواتير بصيغ مناسبة للرعاية المؤسسية. يبقى الكوتشينج ذاته سريًا تمامًا.' },
      },
    ],
  },
  {
    slug: 'keynote-speaker',
    icon: 'mic2',
    title: { en: 'Keynote Speaker', ar: 'متحدث رئيسي' },
    tagline: {
      en: 'Ideas that move audiences — and shape the conversation long after.',
      ar: 'أفكار تُحرّك الجماهير وتُشكّل الحوار طويلًا بعد انتهائه.',
    },
    heroDesc: {
      en: 'I\'ve keynoted at Forbes, Misk, KAUST, Biban, and international forums across London and the GCC. I bring practitioner authority — not academic theory — on AI, digital health, entrepreneurship, and Vision 2030.',
      ar: 'قدّمت محاضرات رئيسية في فوربس ومسك وكاوست وبيبان ومنتديات دولية في لندن والخليج. أحمل سلطة الممارس — لا النظرية الأكاديمية — في الذكاء الاصطناعي والصحة الرقمية وريادة الأعمال ورؤية 2030.',
    },
    stats: [
      { value: '20+', label: { en: 'Speaking Engagements', ar: 'محاضرة ومشاركة' } },
      { value: 'Forbes', label: { en: 'Media Features', ar: 'ظهور إعلامي' } },
      { value: 'Global', label: { en: 'Reach (KSA, UK, GCC)', ar: 'وصول (السعودية، المملكة المتحدة، الخليج)' } },
      { value: 'Bilingual', label: { en: 'Arabic & English', ar: 'عربي وإنجليزي' } },
    ],
    valueProps: [
      {
        icon: 'zap',
        title: { en: 'Practitioner Authority', ar: 'سلطة الممارس' },
        desc: { en: 'I don\'t quote research. I share what I\'ve built, failed at, and learned — as a founder, CTO advisor, and digital health pioneer. Audiences feel the difference.', ar: 'لا أستشهد بالأبحاث. أشارك ما بنيته وما فشلت فيه وما تعلمته — كمؤسس ومستشار تقني ورائد صحة رقمية. يشعر الحضور بالفارق.' },
      },
      {
        icon: 'globe',
        title: { en: 'Saudi & GCC Context', ar: 'السياق السعودي والخليجي' },
        desc: { en: 'Talks grounded in Vision 2030, the Saudi startup ecosystem, and the GCC digital agenda — not imported slides adapted from a Western conference.', ar: 'محاضرات متجذّرة في رؤية 2030 والنظام البيئي للشركات الناشئة السعودية وجدول الأعمال الرقمي الخليجي — لا شرائح مستوردة ومُكيَّفة من مؤتمر غربي.' },
      },
      {
        icon: 'message-circle',
        title: { en: 'Bilingual Delivery', ar: 'عرض ثنائي اللغة' },
        desc: { en: 'Fully fluent in both Arabic and English. I can switch within a single talk or deliver entirely in either language — whichever fits your audience.', ar: 'طلاقة كاملة بالعربية والإنجليزية. يمكنني التبديل ضمن محاضرة واحدة أو التقديم كاملًا بأي منهما — أيهما يناسب جمهورك.' },
      },
      {
        icon: 'star',
        title: { en: 'Custom Tailored', ar: 'مخصّص تمامًا' },
        desc: { en: 'Every keynote is researched and customized for your event\'s theme, industry, and audience — never a generic talk pulled from a deck library.', ar: 'كل محاضرة رئيسية مُبحَثة ومُخصَّصة لموضوع حدثك وصناعته وجمهوره — لا محاضرة عامة تُسحَب من مكتبة شرائح.' },
      },
    ],
    whoFor: [
      { en: 'Conference organizers looking for a practitioner keynote on AI or digital health', ar: 'منظمو مؤتمرات يبحثون عن محاضرة رئيسية ممارسة في الذكاء الاصطناعي أو الصحة الرقمية' },
      { en: 'Corporate events needing an innovation or transformation perspective', ar: 'فعاليات مؤسسية تحتاج منظورًا في الابتكار أو التحول' },
      { en: 'Government forums aligned with Vision 2030 themes', ar: 'منتديات حكومية متوافقة مع موضوعات رؤية 2030' },
      { en: 'University events and accelerator programs', ar: 'فعاليات جامعية وبرامج مسرّعات' },
      { en: 'Media and podcast formats seeking a regional tech voice', ar: 'قنوات إعلامية وبودكاست تبحث عن صوت تقني إقليمي' },
    ],
    outcomes: [
      { en: 'A memorable, insight-dense keynote your audience won\'t forget', ar: 'محاضرة رئيسية لا تُنسى ومليئة بالرؤى لن ينساها جمهورك' },
      { en: 'Customized talk aligned with your event\'s theme and goals', ar: 'محاضرة مخصصة متوافقة مع موضوع فعالتك وأهدافها' },
      { en: 'Bilingual delivery option (Arabic and/or English)', ar: 'خيار تقديم ثنائي اللغة (عربي و/أو إنجليزي)' },
      { en: 'Panel moderation available alongside the keynote', ar: 'إدارة جلسات متاحة إلى جانب المحاضرة الرئيسية' },
      { en: 'Post-event engagement: social content, Q&A, and networking', ar: 'تفاعل ما بعد الحدث: محتوى اجتماعي وأسئلة وأجوبة وشبكات علاقات' },
    ],
    process: [
      { step: 1, title: { en: 'Brief', ar: 'الإحاطة' }, desc: { en: 'Tell me your event theme, audience, and what you want them to walk away with. The more specific, the better.', ar: 'أخبرني بموضوع فعالتك وجمهورك وما تريدهم أن يأخذوه معهم. كلما كانت أكثر تحديدًا، كان أفضل.' } },
      { step: 2, title: { en: 'Proposal', ar: 'العرض' }, desc: { en: 'I send a customized talk proposal with angle, key takeaways, and format options within 48 hours.', ar: 'أرسل اقتراح محاضرة مخصصًا بزاوية ونقاط رئيسية وخيارات شكل خلال 48 ساعة.' } },
      { step: 3, title: { en: 'Preparation', ar: 'التحضير' }, desc: { en: 'Research, script, and slide build — with a run-through call 1 week before the event.', ar: 'بحث وسيناريو وبناء شرائح — مع مكالمة تجريبية قبل أسبوع من الفعالية.' } },
      { step: 4, title: { en: 'Delivery & Follow-Up', ar: 'التقديم والمتابعة' }, desc: { en: 'On-stage delivery, audience Q&A, and post-event social content if needed.', ar: 'تقديم على المنصة وأسئلة وأجوبة الحضور ومحتوى اجتماعي ما بعد الفعالية عند الحاجة.' } },
    ],
    packages: [
      {
        name: { en: 'Conference Keynote', ar: 'محاضرة رئيسية' },
        price: { en: 'SAR 25,000', ar: '25,000 ريال' },
        period: { en: 'per event', ar: 'لكل فعالية' },
        description: { en: 'A fully researched and customized keynote (30–60 min) with slides, Q&A, and post-event social content.', ar: 'محاضرة رئيسية مُبحَثة ومخصصة كاملًا (30-60 دقيقة) مع شرائح وأسئلة وأجوبة ومحتوى اجتماعي ما بعد الفعالية.' },
        includes: [
          { en: 'Custom keynote (30–60 min)', ar: 'محاضرة رئيسية مخصصة (30-60 دقيقة)' },
          { en: 'Branded slide deck', ar: 'مجموعة شرائح بهوية بصرية' },
          { en: 'Q&A session', ar: 'جلسة أسئلة وأجوبة' },
          { en: 'Speaker bio & photo kit', ar: 'سيرة ذاتية للمتحدث وحزمة صور' },
        ],
      },
      {
        name: { en: 'Keynote + Panel', ar: 'محاضرة + جلسة نقاش' },
        price: { en: 'SAR 35,000', ar: '35,000 ريال' },
        period: { en: 'per event', ar: 'لكل فعالية' },
        description: { en: 'Keynote plus moderation or participation in a panel — full-day speaking presence at your event.', ar: 'محاضرة رئيسية بالإضافة إلى إدارة أو مشاركة في جلسة نقاش — حضور تحدث طوال يوم في فعالتك.' },
        includes: [
          { en: 'Everything in Conference Keynote', ar: 'كل ما في المحاضرة الرئيسية' },
          { en: 'Panel moderation or participation', ar: 'إدارة أو مشاركة في جلسة نقاش' },
          { en: 'Networking availability', ar: 'التوافر للتواصل' },
          { en: 'Post-event LinkedIn article', ar: 'مقال LinkedIn ما بعد الفعالية' },
        ],
        featured: true,
      },
      {
        name: { en: 'Workshop', ar: 'ورشة عمل' },
        price: { en: 'SAR 20,000', ar: '20,000 ريال' },
        period: { en: 'half-day', ar: 'نصف يوم' },
        description: { en: 'Interactive half-day workshop for corporate or accelerator audiences on AI, digital health, or entrepreneurship.', ar: 'ورشة عمل تفاعلية لنصف يوم لجماهير مؤسسية أو مسرّعات في الذكاء الاصطناعي أو الصحة الرقمية أو ريادة الأعمال.' },
        includes: [
          { en: 'Interactive half-day format', ar: 'صيغة تفاعلية لنصف يوم' },
          { en: 'Custom exercises & frameworks', ar: 'تمارين وأطر مخصصة' },
          { en: 'Participant takeaway materials', ar: 'مواد للمشاركين يأخذونها معهم' },
          { en: 'Up to 30 participants', ar: 'حتى 30 مشاركًا' },
        ],
      },
    ],
    faq: [
      {
        q: { en: 'What topics do you speak on?', ar: 'ما المواضيع التي تتحدث عنها؟' },
        a: { en: 'AI & the future of digital health, Vision 2030 and the Saudi tech ecosystem, building and scaling startups, digital transformation for enterprises, and entrepreneurship & leadership.', ar: 'الذكاء الاصطناعي ومستقبل الصحة الرقمية، ورؤية 2030 والنظام البيئي التقني السعودي، وبناء الشركات الناشئة وتوسيعها، والتحول الرقمي للمؤسسات، وريادة الأعمال والقيادة.' },
      },
      {
        q: { en: 'Do you speak internationally?', ar: 'هل تتحدث دوليًا؟' },
        a: { en: 'Yes — I\'ve spoken in London, across the GCC, and virtually to global audiences. Travel is factored into the fee for international events.', ar: 'نعم — تحدثت في لندن وعبر الخليج وافتراضيًا لجماهير عالمية. تُحتسب تكاليف السفر ضمن الرسوم للفعاليات الدولية.' },
      },
      {
        q: { en: 'How far in advance should I book?', ar: 'كم مبكرًا يجب الحجز؟' },
        a: { en: 'At least 4 weeks for a standard keynote; 6–8 weeks for workshops. Last-minute requests are possible but not guaranteed.', ar: 'على الأقل 4 أسابيع لمحاضرة رئيسية قياسية؛ و6-8 أسابيع لورش العمل. الطلبات اللحظية ممكنة لكن غير مضمونة.' },
      },
    ],
  },
];

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
