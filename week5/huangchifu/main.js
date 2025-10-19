// 深色/浅色模式切换功能
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    
    // 检查本地存储中的主题设置或使用用户系统偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 设置初始主题
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        bodyElement.classList.add('dark-mode');
    }
    
    // 切换主题的函数
    function toggleTheme() {
        const isDarkMode = bodyElement.classList.toggle('dark-mode');
        
        // 保存主题设置到本地存储
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    
    // 添加点击事件监听器
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            // 只有在用户没有明确设置主题时才响应系统变化
            if (e.matches) {
                bodyElement.classList.add('dark-mode');
            } else {
                bodyElement.classList.remove('dark-mode');
            }
        }
    });
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 设置主题切换功能
    setupThemeToggle();
    
    // 平滑滚动功能
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // 减去导航栏高度
                behavior: 'smooth'
            });
        });
    });
    
    // 表单提交处理
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 表单验证
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        let errorMessage = '';
        
        // 验证姓名
        if (!nameInput.value.trim()) {
            isValid = false;
            errorMessage = '请输入您的姓名';
            nameInput.focus();
        }
        // 验证邮箱
        else if (!emailInput.value.trim()) {
            isValid = false;
            errorMessage = '请输入您的邮箱';
            emailInput.focus();
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            errorMessage = '请输入有效的邮箱地址';
            emailInput.focus();
        }
        // 验证留言内容
        else if (!messageInput.value.trim()) {
            isValid = false;
            errorMessage = '请输入您的留言';
            messageInput.focus();
        }
        
        if (!isValid) {
            // 创建或更新错误提示
            let errorElement = document.getElementById('form-error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.id = 'form-error';
                errorElement.style.cssText = `
                    color: #e74c3c;
                    font-size: 0.9rem;
                    margin-top: -1rem;
                    margin-bottom: 1rem;
                    padding: 0.5rem;
                    background-color: #fdedec;
                    border-radius: 4px;
                    border-left: 3px solid #e74c3c;
                `;
                contactForm.insertBefore(errorElement, contactForm.firstChild);
            }
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            
            // 添加错误状态样式
            const activeInput = document.activeElement;
            activeInput.style.borderColor = '#e74c3c';
            activeInput.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            
            // 移除错误状态的监听器
            activeInput.addEventListener('input', function removeErrorState() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
                errorElement.style.display = 'none';
                this.removeEventListener('input', removeErrorState);
            });
            
            return;
        }
        
        // 模拟表单提交
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';
        submitBtn.style.backgroundColor = '#95a5a6';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            // 创建成功提示
            let successElement = document.createElement('div');
            successElement.id = 'form-success';
            successElement.style.cssText = `
                color: #27ae60;
                font-size: 1rem;
                margin-bottom: 1rem;
                padding: 1rem;
                background-color: #eafaf1;
                border-radius: 8px;
                border-left: 4px solid #27ae60;
                text-align: center;
                animation: slideIn 0.3s ease-out;
            `;
            successElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; margin-right: 8px; vertical-align: middle;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                消息已成功发送！我们将尽快回复您。
            `;
            
            // 添加成功动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successElement);
            contactForm.style.alignItems = 'center';
            
            // 5秒后重置表单
            setTimeout(() => {
                document.head.removeChild(style);
                contactForm.innerHTML = `
                    <div class="form-group">
                        <label for="name">您的姓名</label>
                        <input type="text" id="name" name="name" placeholder="请输入您的姓名" required>
                    </div>
                    <div class="form-group">
                        <label for="email">电子邮箱</label>
                        <input type="email" id="email" name="email" placeholder="请输入您的邮箱" required>
                    </div>
                    <div class="form-group">
                        <label for="message">您的留言</label>
                        <textarea id="message" name="message" rows="5" placeholder="请输入您想告诉我的内容" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">发送留言</button>
                `;
                contactForm.style.alignItems = 'stretch';
            }, 5000);
        }, 1500);
    });
}

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 深色/浅色模式切换功能
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    
    // 检查本地存储中的主题设置或使用用户系统偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 设置初始主题
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        bodyElement.classList.add('dark-mode');
    }
    
    // 切换主题的函数
    function toggleTheme() {
        const isDarkMode = bodyElement.classList.toggle('dark-mode');
        
        // 保存主题设置到本地存储
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    
    // 添加点击事件监听器
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            // 只有在用户没有明确设置主题时才响应系统变化
            if (e.matches) {
                bodyElement.classList.add('dark-mode');
            } else {
                bodyElement.classList.remove('dark-mode');
            }
        }
    });
}

// 添加表单输入的焦点和失焦效果
const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        if (input.style.borderColor !== '#e74c3c') {
            input.style.borderColor = '#3498db';
            input.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
        }
    });
    
    input.addEventListener('blur', () => {
        if (input.style.borderColor !== '#e74c3c') {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }
    });
})

// 为联系模块添加图标
function addContactIcons() {
    // 为联系信息添加图标
    const infoItems = document.querySelectorAll('.info-item');
    const icons = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
    ];
    
    infoItems.forEach((item, index) => {
        const iconElement = item.querySelector('.info-icon');
        if (iconElement && index < icons.length) {
            iconElement.innerHTML = icons[index];
        }
    });
    
    // 为社交媒体添加图标
    const socialLinks = document.querySelectorAll('.social-link');
    const socialIcons = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8c0-1.4-.6-2.6-1.6-3.5L7 16h6v7l9-11c-.7-1.1-1.9-1.8-3.4-1.8h-5z"></path></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>'
    ];
    
    socialLinks.forEach((link, index) => {
        const iconElement = link.querySelector('.social-icon');
        if (iconElement && index < socialIcons.length) {
            iconElement.innerHTML = socialIcons[index];
        }
    });
    
    // 为地图添加图标
    const mapIcon = document.querySelector('.map-icon');
    if (mapIcon) {
        mapIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9.15 3.4 15.3 6 21 3.4 21 14.6 15.3 12 9.15 14.6 3 12 3 6"></polygon><line x1="9.15" y1="3.4" x2="9.15" y2="14.6"></line><line x1="15.3" y1="6" x2="15.3" y2="12"></line></svg>';
    }
}

// 页面加载完成后添加图标
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addContactIcons);
} else {
    addContactIcons();
}

// 为联系模块添加滚动动画
function animateContactElements() {
    const contactElements = document.querySelectorAll('.contact-form-section, .contact-details, .map-section');
    
    contactElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始设置联系模块元素样式
function setupContactAnimations() {
    const contactElements = document.querySelectorAll('.contact-form-section, .contact-details, .map-section');
    
    contactElements.forEach((element, index) => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out ${index * 0.2}s`;
    });
    
    // 初始检查动画
    animateContactElements();
    
    // 滚动时检查动画
    window.addEventListener('scroll', animateContactElements);
}

// 页面加载完成后设置动画
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactAnimations);
} else {
    setupContactAnimations();
}
    
    // 动态添加作品示例（如果作品集区域存在）
    const workContainer = document.querySelector('.work-container');
    
    if (workContainer) {
        // 模拟作品数据
        const works = [
            {
                title: '项目一',
                description: '这是我的第一个项目，展示了基本的设计和开发技能。',
                imageUrl: 'images/portfolio-1.jpg'
            },
            {
                title: '项目二',
                description: '这是我的第二个项目，专注于用户体验和交互设计。',
                imageUrl: 'images/portfolio-2.jpg'
            },
            {
                title: '项目三',
                description: '这是我的第三个项目，展示了响应式设计和先进的开发技术。',
                imageUrl: 'images/portfolio-3.jpg'
            }
        ];
        
        // 渲染作品列表
        works.forEach(work => {
            const workItem = document.createElement('div');
            workItem.className = 'work-item';
            
            workItem.innerHTML = `
                <div class="work-item-content">
                    <h3>${work.title}</h3>
                    <p>${work.description}</p>
                    <button class="view-project">查看项目</button>
                </div>
            `;
            
            workContainer.appendChild(workItem);
        });
    }
    
    // 添加滚动时的导航栏效果
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.backgroundColor = '#333';
            header.style.padding = '1rem 0';
        }
    });
    
    // 添加元素进入视口时的动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
        
        // 技能条动画
        const skillBars = document.querySelectorAll('.progress-bar');
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const isVisible = barTop < window.innerHeight - 100;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                    bar.classList.add('animated');
                }, 100);
            }
        });
        
        // 时间线项目动画
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const isVisible = itemTop < window.innerHeight - 100;
            
            if (isVisible && !item.classList.contains('animated')) {
                setTimeout(() => {
                    item.classList.add('animated');
                }, index * 200); // 错开动画时间
            }
        });
        
        // 成就卡片动画
        const achievementCards = document.querySelectorAll('.achievement-card');
        
        achievementCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const isVisible = cardTop < window.innerHeight - 100;
            
            if (isVisible && !card.classList.contains('animated')) {
                setTimeout(() => {
                    card.classList.add('animated');
                }, index * 150); // 错开动画时间
            }
        });
    };
    
    // 初始检查
    animateOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);
    
    // 添加回到顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.textContent = '↑';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.padding = '10px 15px';
    backToTopButton.style.backgroundColor = '#333';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.display = 'none';
    backToTopButton.style.zIndex = '999';
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 控制回到顶部按钮的显示/隐藏
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});