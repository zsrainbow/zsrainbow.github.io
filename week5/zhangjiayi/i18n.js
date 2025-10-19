// 多语言支持
const translations = {
    zh: {
        // 导航
        "nav.home": "首页",
        "nav.about": "关于我",
        "nav.projects": "项目",
        "nav.contact": "联系",
        
        // Logo
        "logo.text": "我的作品集",
        
        // 首页英雄区域
        "hero.title": "欢迎来到我的作品集",
        "hero.subtitle": "展示我的创意作品和技术项目",
        "hero.button": "查看作品",
        
        // 关于我
        "about.title": "关于我",
        "about.subtitle": "个人简介",
        "about.description": "我是一名充满激情的全栈开发者，拥有5年以上的Web开发经验。擅长使用现代技术栈构建高性能、用户友好的应用程序。",
        "about.skills": "技术技能",
        "about.experience": "专业经历",
        "about.achievements": "成就与证书",
        "about.job1.title": "高级全栈开发者 - TechCorp",
        "about.job1.description": "负责领导开发团队，构建企业级Web应用程序，优化系统性能。",
        "about.job2.title": "前端开发者 - WebSolutions",
        "about.job2.description": "开发响应式网站和单页面应用，与设计团队紧密合作。",
        "about.job3.title": "初级开发者 - StartupXYZ",
        "about.job3.description": "参与多个项目的开发，学习现代开发最佳实践。",
        "about.cert1": "AWS认证解决方案架构师",
        "about.cert2": "React专业开发者认证",
        "about.cert3": "Google Cloud认证",
        
        // 时间线日期
        "timeline.date1": "2022 - 至今",
        "timeline.date2": "2020 - 2022",
        "timeline.date3": "2018 - 2020",
        
        // 项目区域
        "projects.title": "我的项目",
        "projects.project1.title": "电商平台",
        "projects.project1.description": "基于React和Node.js构建的全栈电商平台，支持用户注册、商品浏览、购物车、支付等功能。",
        "projects.project2.title": "任务管理应用",
        "projects.project2.description": "现代化的任务管理工具，支持团队协作、实时通知、文件上传和进度跟踪。",
        "projects.project3.title": "数据分析仪表板",
        "projects.project3.description": "实时数据可视化平台，集成多种数据源，提供交互式图表和自定义报表功能。",
        "projects.project4.title": "移动应用",
        "projects.project4.description": "跨平台移动应用，使用React Native开发，支持iOS和Android，具有优秀的用户体验。",
        
        // 联系
        "contact.title": "联系我",
        "contact.getInTouch": "保持联系",
        "contact.email": "邮箱",
        "contact.phone": "电话",
        "contact.location": "位置",
        "contact.address": "中国，北京市",
        "contact.followMe": "关注我",
        "contact.sendMessage": "发送消息",
        "contact.name": "姓名",
        "contact.subject": "主题",
        "contact.message": "消息内容",
        "contact.send": "发送消息",
        "contact.mapPlaceholder": "地图位置显示",
        
        // 页脚
        "footer.copyright": "&copy; 2025 我的作品集. 保留所有权利."
    },
    en: {
        // 导航
        "nav.home": "Home",
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        
        // Logo
        "logo.text": "My Portfolio",
        
        // 首页英雄区域
        "hero.title": "Welcome to My Portfolio",
        "hero.subtitle": "Showcasing my creative works and technical projects",
        "hero.button": "View Projects",
        
        // 关于我
        "about.title": "About Me",
        "about.subtitle": "Personal Introduction",
        "about.description": "I am a passionate full-stack developer with over 5 years of web development experience. Skilled in building high-performance, user-friendly applications using modern technology stacks.",
        "about.skills": "Technical Skills",
        "about.experience": "Professional Experience",
        "about.achievements": "Achievements & Certifications",
        "about.job1.title": "Senior Full-Stack Developer - TechCorp",
        "about.job1.description": "Led development teams, built enterprise-level web applications, and optimized system performance.",
        "about.job2.title": "Frontend Developer - WebSolutions",
        "about.job2.description": "Developed responsive websites and single-page applications, collaborating closely with design teams.",
        "about.job3.title": "Junior Developer - StartupXYZ",
        "about.job3.description": "Participated in multiple project developments and learned modern development best practices.",
        "about.cert1": "AWS Certified Solutions Architect",
        "about.cert2": "React Professional Developer Certification",
        "about.cert3": "Google Cloud Certification",
        
        // 时间线日期
        "timeline.date1": "2022 - Now",
        "timeline.date2": "2020 - 2022",
        "timeline.date3": "2018 - 2020",
        
        // 项目区域
        "projects.title": "My Projects",
        "projects.project1.title": "E-commerce Platform",
        "projects.project1.description": "Full-stack e-commerce platform built with React and Node.js, featuring user registration, product browsing, shopping cart, and payment functionality.",
        "projects.project2.title": "Task Management App",
        "projects.project2.description": "Modern task management tool supporting team collaboration, real-time notifications, file uploads, and progress tracking.",
        "projects.project3.title": "Data Analytics Dashboard",
        "projects.project3.description": "Real-time data visualization platform integrating multiple data sources with interactive charts and custom reporting features.",
        "projects.project4.title": "Mobile Application",
        "projects.project4.description": "Cross-platform mobile app developed with React Native, supporting both iOS and Android with excellent user experience.",
        
        // 联系
        "contact.title": "Contact Me",
        "contact.getInTouch": "Get In Touch",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.location": "Location",
        "contact.address": "Beijing, China",
        "contact.followMe": "Follow Me",
        "contact.sendMessage": "Send Message",
        "contact.name": "Name",
        "contact.subject": "Subject",
        "contact.message": "Message",
        "contact.send": "Send Message",
        "contact.mapPlaceholder": "Map Location Display",
        
        // 页脚
        "footer.copyright": "&copy; 2025 My Portfolio. All rights reserved."
    }
};

// 当前语言
let currentLang = 'zh';

// 初始化语言
function initLanguage() {
    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }
    updateLanguageButtons();
    translatePage();
}

// 切换语言
function switchLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        updateLanguageButtons();
        translatePage();
        
        // 添加页面切换动画
        document.body.classList.add('page-transition');
        setTimeout(() => {
            document.body.classList.remove('page-transition');
            document.body.classList.add('fade-in');
        }, 50);
    }
}

// 更新语言按钮状态
function updateLanguageButtons() {
    const zhBtn = document.getElementById('lang-zh');
    const enBtn = document.getElementById('lang-en');
    
    if (zhBtn && enBtn) {
        zhBtn.classList.toggle('active', currentLang === 'zh');
        enBtn.classList.toggle('active', currentLang === 'en');
    }
}

// 翻译页面
function translatePage() {
    // 翻译所有带有 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            // 处理HTML内容（如版权符号）
            if (element.tagName === 'P' && element.innerHTML.includes('&copy;')) {
                element.innerHTML = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // 翻译所有带有 data-i18n-placeholder 属性的元素
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.setAttribute('placeholder', translations[currentLang][key]);
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    
    // 更新页面标题和描述
    if (currentLang === 'en') {
        document.title = "My Portfolio";
        document.querySelector('meta[name="description"]').setAttribute('content', 'Personal Portfolio Website');
    } else {
        document.title = "我的作品集";
        document.querySelector('meta[name="description"]').setAttribute('content', '个人作品集网站');
    }
}

// 初始化语言支持
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    
    // 添加语言切换事件监听
    const zhBtn = document.getElementById('lang-zh');
    const enBtn = document.getElementById('lang-en');
    
    if (zhBtn) {
        zhBtn.addEventListener('click', function() {
            switchLanguage('zh');
        });
    }
    
    if (enBtn) {
        enBtn.addEventListener('click', function() {
            switchLanguage('en');
        });
    }
});