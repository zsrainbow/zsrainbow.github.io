// DOM元素加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    // 添加加载动画
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a12;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.style.cssText = `
        text-align: center;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 3px solid rgba(79, 195, 247, 0.1);
        border-top-color: #4fc3f7;
        border-radius: 50%;
        margin: 0 auto 20px;
        animation: spin 1s linear infinite;
    `;
    
    const loadText = document.createElement('p');
    loadText.textContent = '加载中...';
    loadText.style.cssText = `
        color: #4fc3f7;
        font-size: 1.2rem;
    `;
    
    loaderContent.appendChild(spinner);
    loaderContent.appendChild(loadText);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    // 加载动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 800);
    });
    
    // 移动菜单切换功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // 动画汉堡菜单图标
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.toggle('rotate-up');
        bars[1].classList.toggle('disappear');
        bars[2].classList.toggle('rotate-down');
        
        // 添加背景遮罩
        if (navLinks.classList.contains('active')) {
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 18, 0.7);
                backdrop-filter: blur(5px);
                z-index: 999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.style.opacity = '1', 10);
            
            overlay.addEventListener('click', function() {
                navLinks.classList.remove('active');
                bars[0].classList.remove('rotate-up');
                bars[1].classList.remove('disappear');
                bars[2].classList.remove('rotate-down');
                overlay.style.opacity = '0';
                setTimeout(() => document.body.removeChild(overlay), 300);
            });
        }
    });
    
    // 点击导航链接后关闭菜单
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            // 重置汉堡菜单图标
            const bars = document.querySelectorAll('.bar');
            bars[0].classList.remove('rotate-up');
            bars[1].classList.remove('disappear');
            bars[2].classList.remove('rotate-down');
            
            // 移除背景遮罩
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => document.body.removeChild(overlay), 300);
            }
        });
    });
    
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };
            
            console.log('表单提交的数据:', formData);
            
            // 简单的表单验证
            if (formData.name && formData.email && formData.message) {
                // 添加提交动画效果
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="loading-dots">发送中<span>.</span><span>.</span><span>.</span></span>';
                
                // 模拟提交延迟
                setTimeout(() => {
                    // 创建成功提示
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: rgba(76, 175, 80, 0.9);
                        backdrop-filter: blur(5px);
                        color: white;
                        padding: 15px 25px;
                        border-radius: 8px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        z-index: 1000;
                        opacity: 0;
                        transform: translateY(-20px);
                        transition: opacity 0.3s ease, transform 0.3s ease;
                    `;
                    successMessage.textContent = '感谢您的留言！我们会尽快回复您。';
                    document.body.appendChild(successMessage);
                    
                    // 显示成功提示
                    setTimeout(() => {
                        successMessage.style.opacity = '1';
                        successMessage.style.transform = 'translateY(0)';
                    }, 10);
                    
                    // 3秒后隐藏成功提示
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            document.body.removeChild(successMessage);
                        }, 300);
                    }, 3000);
                    
                    // 恢复按钮状态
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // 重置表单
                    this.reset();
                }, 1500);
            } else {
                alert('请填写所有必填字段。');
            }
        });
    }
    
    // 添加加载点动画
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading-dots span {
            animation: loading 1.4s infinite ease-in-out both;
        }
        .loading-dots span:nth-child(1) {
            animation-delay: -0.32s;
        }
        .loading-dots span:nth-child(2) {
            animation-delay: -0.16s;
        }
        @keyframes loading {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // 添加滚动动画效果
    function addScrollAnimation() {
        const elements = document.querySelectorAll('.about-content, .project-card, .contact-content, .certification-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('appear');
            }
        });
    }
    
    // 为证书卡片添加特殊的滚动动画
    function handleCertAnimation() {
        const certCards = document.querySelectorAll('.certification-card');
        certCards.forEach((card, index) => {
            const elementPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    // 初始化证书卡片动画状态
    function initCertCards() {
        const certCards = document.querySelectorAll('.certification-card');
        certCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // 添加悬停效果
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 10px 30px rgba(79, 195, 247, 0.3)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                this.style.transition = 'all 0.3s ease';
            });
        });
    }
    
    // 初始加载时检查
    addScrollAnimation();
    initCertCards();
    handleCertAnimation();
    
    // 滚动时检查
    window.addEventListener('scroll', function() {
        addScrollAnimation();
        handleCertAnimation();
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加证书点击效果
    document.querySelectorAll('.certification-card').forEach(card => {
        card.addEventListener('click', function() {
            const certModal = document.createElement('div');
            certModal.className = 'cert-modal';
            certModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const certContent = this.cloneNode(true);
            certContent.style.maxWidth = '800px';
            certContent.style.width = '90%';
            certContent.style.transform = 'none';
            certContent.style.opacity = '1';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: transparent;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                z-index: 1001;
            `;
            
            certModal.appendChild(certContent);
            certModal.appendChild(closeBtn);
            document.body.appendChild(certModal);
            
            // 显示模态框
            setTimeout(() => {
                certModal.style.opacity = '1';
            }, 10);
            
            // 关闭模态框
            closeBtn.addEventListener('click', function() {
                certModal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(certModal);
                }, 300);
            });
            
            // 点击外部关闭
            certModal.addEventListener('click', function(e) {
                if (e.target === certModal) {
                    closeBtn.click();
                }
            });
        });
    });
    
    // 科技感项目数据
    const projects = [
        {
            name: "智能数据分析平台",
            description: "基于React和Node.js构建的实时数据分析平台，采用机器学习算法提供预测分析功能，支持大数据处理和可视化展示。",
            image: "images/data-analysis.svg",
            github: "https://github.com/username/data-analysis-platform",
            technologies: ["React", "Node.js", "Machine Learning", "D3.js"]
        },
        {
            name: "区块链应用系统",
            description: "去中心化应用开发，实现安全的智能合约和分布式数据存储，支持多种加密货币交易功能。",
            image: "images/blockchain.jpeg",
            github: "https://github.com/username/blockchain-app",
            technologies: ["Ethereum", "Solidity", "Web3.js", "IPFS"]
        },
        {
            name: "物联网控制中心",
            description: "实时监控和控制物联网设备的Web应用，支持数据采集、分析和智能决策功能。",
            image: "images/iot.png",
            github: "https://github.com/username/iot-control-center",
            technologies: ["React Native", "MQTT", "AWS IoT", "TensorFlow"]
        },
        {
            name: "AR增强现实展示",
            description: "基于WebXR技术的增强现实应用，实现3D模型展示和交互式体验，无需安装额外插件。",
            image: "images/ar-vr.webp",
            github: "https://github.com/username/ar-vr-experience",
            technologies: ["Three.js", "WebXR", "React", "WebGL"]
        }
    ];
    
    // 动态生成项目卡片
    function generateProjectCards() {
        const projectGrid = document.querySelector('.project-grid');
        if (projectGrid && projects.length > 0) {
            // 清空现有的示例卡片
            projectGrid.innerHTML = '';
            
            projects.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
                card.style.transitionDelay = `${index * 0.15}s`;
                
                // 创建技术栈标签HTML
                const techTags = project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('');
                
                card.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.name}">
                        <div class="tech-number">${index + 1}</div>
                    </div>
                    <div class="project-info">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="tech-stack">${techTags}</div>
                        <a href="${project.github}" target="_blank" class="btn project-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px; vertical-align: middle;">
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.23-.015-2.235-3.017.555-3.797-1.46-3.797-1.46-.546-1.38-1.335-1.755-1.335-1.755-1.089-.744.083-.729.083-.729 1.204.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.4s2.04.133 3 .4c2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.3 0 .315.21.69.825.57C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="currentColor"/>
                            </svg>
                            GitHub 查看详情
                        </a>
                    </div>
                `;
                
                projectGrid.appendChild(card);
                
                // 添加进入动画
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            });
        }
    }
    
    // 添加项目卡片样式
    const projectStyle = document.createElement('style');
    projectStyle.textContent = `
        .tech-number {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, rgba(79, 195, 247, 0.2), rgba(156, 39, 176, 0.2));
            backdrop-filter: blur(5px);
            border: 1px solid rgba(79, 195, 247, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4fc3f7;
            font-weight: bold;
            font-size: 1.2rem;
            z-index: 1;
        }
        
        .project-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
            opacity: 0.9;
            transition: opacity 0.3s ease;
        }
        
        .project-card:hover .project-image img {
            opacity: 1;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 15px 0;
        }
        
        .tech-tag {
            background: rgba(79, 195, 247, 0.1);
            color: #4fc3f7;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            border: 1px solid rgba(79, 195, 247, 0.2);
        }
        
        .project-btn {
            margin-top: 10px;
        }
    `;
    document.head.appendChild(projectStyle);
    
    // 生成项目卡片
    generateProjectCards();
    
    // 添加滚动到顶部按钮
    function addScrollToTopButton() {
        const scrollTopButton = document.createElement('button');
        scrollTopButton.id = 'scrollTop';
        scrollTopButton.className = 'scroll-top-btn';
        scrollTopButton.innerHTML = '↑';
        scrollTopButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(scrollTopButton);
        
        // 滚动事件监听
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopButton.style.opacity = '1';
            } else {
                scrollTopButton.style.opacity = '0';
            }
        });
        
        // 点击返回顶部
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 添加滚动到顶部按钮
    addScrollToTopButton();
    
    // 添加导航栏滚动效果
    function addNavbarScrollEffect() {
        const header = document.querySelector('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'white';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // 添加导航栏滚动效果
    addNavbarScrollEffect();
    
    // 添加技能标签悬停效果
    function addSkillHoverEffects() {
        const skills = document.querySelectorAll('.skill');
        skills.forEach(skill => {
            skill.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 6px 20px rgba(79, 195, 247, 0.4)';
            });
            
            skill.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // 添加数字计数器动画
    function addCounterAnimation() {
        const stats = [
            { label: '项目完成', value: 50 },
            { label: '客户满意度', value: 98 },
            { label: '技术栈掌握', value: 20 }
        ];
        
        // 创建统计部分
        const aboutSection = document.querySelector('#about .container');
        if (aboutSection) {
            const statsContainer = document.createElement('div');
            statsContainer.className = 'stats-container';
            statsContainer.style.cssText = `
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                gap: 2rem;
                margin-top: 3rem;
                padding: 2rem;
                background: rgba(16, 18, 30, 0.3);
                backdrop-filter: blur(10px);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            `;
            
            stats.forEach(stat => {
                const statItem = document.createElement('div');
                statItem.className = 'stat-item';
                statItem.style.cssText = `
                    text-align: center;
                    min-width: 200px;
                `;
                
                statItem.innerHTML = `
                    <div class="stat-number" data-target="${stat.value}">0</div>
                    <div class="stat-label">${stat.label}</div>
                `;
                
                statsContainer.appendChild(statItem);
            });
            
            aboutSection.appendChild(statsContainer);
            
            // 添加统计样式
            const statStyle = document.createElement('style');
            statStyle.textContent = `
                .stat-number {
                    font-size: 3.5rem;
                    font-weight: bold;
                    background: linear-gradient(135deg, #4fc3f7, #9c27b0);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin-bottom: 10px;
                }
                
                .stat-label {
                    font-size: 1.1rem;
                    color: #b0b0b0;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
            `;
            document.head.appendChild(statStyle);
            
            // 计数器动画函数
            function animateCounter() {
                const counters = document.querySelectorAll('.stat-number');
                const speed = 200;
                
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / speed;
                    
                    let currentCount = 0;
                    const updateCount = () => {
                        currentCount += increment;
                        if (currentCount < target) {
                            counter.innerText = Math.ceil(currentCount);
                            setTimeout(updateCount, 50);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCount();
                });
            }
            
            // 检测元素是否在视口中
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsContainer);
        }
    }
    
    // 执行新功能
    addSkillHoverEffects();
    addCounterAnimation();
    
    // 技能评估进度条动画
    function initSkillProgress() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillSection = entry.target;
                    const skillProgressBars = skillSection.querySelectorAll('.skill-progress');
                    
                    skillProgressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const percentage = bar.getAttribute('data-percentage');
                            bar.style.width = percentage + '%';
                        }, index * 100); // 依次动画，增加视觉效果
                    });
                    
                    observer.unobserve(skillSection); // 只执行一次
                }
            });
        }, {
            threshold: 0.2
        });

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // 简历下载模态框交互
    function initResumeModal() {
        const resumeButtons = document.querySelectorAll('[data-resume-modal]');
        const resumeModal = document.getElementById('resume-modal');
        const closeModal = document.getElementById('close-resume-modal');
        const modalBackdrop = document.querySelector('.resume-modal');
        
        if (!resumeModal || !closeModal) return;

        // 打开模态框
        resumeButtons.forEach(button => {
            button.addEventListener('click', () => {
                resumeModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            });
        });

        // 关闭模态框
        function closeModalFunc() {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeModal.addEventListener('click', closeModalFunc);
        modalBackdrop?.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                closeModalFunc();
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeModalFunc();
            }
        });

        // 下载按钮点击事件
        const downloadButtons = document.querySelectorAll('[data-download-resume]');
        downloadButtons.forEach(button => {
            button.addEventListener('click', () => {
                const resumeType = button.getAttribute('data-download-resume');
                // 在实际项目中，这里会根据选择的简历类型和格式动态生成下载链接
                // 这里模拟下载行为
                alert(`即将下载${getResumeTypeName(resumeType)}简历`);
                // 实际项目中可以使用类似下面的代码实现下载
                // const link = document.createElement('a');
                // link.href = `resumes/${resumeType}_resume.pdf`;
                // link.download = `${getResumeTypeName(resumeType)}简历.pdf`;
                // link.click();
            });
        });

        function getResumeTypeName(type) {
            const typeMap = {
                'full': '完整版',
                'compact': '简洁版',
                'technical': '技术方向'
            };
            return typeMap[type] || type;
        }
    }

    // 博客交互功能
    function initBlog() {
        // 博客文章点击效果增强
        const blogPosts = document.querySelectorAll('.blog-post');
        blogPosts.forEach(post => {
            post.addEventListener('click', (e) => {
                // 如果点击的不是链接，就跳转
                if (!e.target.closest('.blog-read-more')) {
                    // 在实际项目中这里会跳转到博客详情页
                    const blogTitle = post.querySelector('h3')?.textContent;
                    alert(`即将跳转到文章：${blogTitle}`);
                }
            });
        });

        // 平滑滚动到博客部分
        const blogLinks = document.querySelectorAll('a[href="#blog"]');
        blogLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const blogSection = document.getElementById('blog');
                if (blogSection) {
                    blogSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // 平滑滚动到技能评估部分
        const skillsLinks = document.querySelectorAll('a[href="#skills"]');
        skillsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const skillsSection = document.getElementById('skills');
                if (skillsSection) {
                    skillsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // 添加背景粒子效果
    function addParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particleCanvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particlesArray;
        
        // 设置画布尺寸
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // 粒子类
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.color = 'rgba(79, 195, 247, ' + (Math.random() * 0.6 + 0.1) + ')';
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.size > 0.2) this.size -= 0.001;
                
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // 初始化粒子
        function init() {
            particlesArray = [];
            const numberOfParticles = (canvas.width * canvas.height) / 10000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        // 连接粒子
        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const opacity = 1 - distance / 100;
                        ctx.strokeStyle = 'rgba(79, 195, 247, ' + opacity * 0.2 + ')';
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // 动画循环
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connectParticles();
            requestAnimationFrame(animate);
        }
        
        init();
        animate();
    }
    
    // 执行新功能
    initSkillProgress();
    initResumeModal();
    initBlog();
    
    // 添加背景粒子效果
    addParticleBackground();
    
    // 添加导航活动状态检测
    function addActiveNavDetection() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');
        
        function setActiveNavLink() {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}` || 
                    (currentSection === '' && link.getAttribute('href') === '#home')) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', setActiveNavLink);
        // 初始化时设置一次
        setActiveNavLink();
        
        // 为导航链接添加点击事件
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 移除所有链接的active类
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                // 为当前点击的链接添加active类
                this.classList.add('active');
                
                // 如果是移动设备，点击导航后关闭菜单
                const mobileMenu = document.getElementById('mobile-menu');
                const menuToggle = document.querySelector('.menu-toggle');
                if (mobileMenu && menuToggle && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
    
    // 添加项目过滤功能
    function addProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 更新过滤按钮的active状态
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-filter');
                
                // 隐藏所有项目卡片
                projectCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(20px)';
                    card.style.pointerEvents = 'none';
                    
                    // 延迟显示，创建动画效果
                    setTimeout(() => {
                        // 根据类别显示卡片
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                            // 再次延迟后应用显示动画
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1) translateY(0)';
                                card.style.pointerEvents = 'auto';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }
    
    // 初始化导航活动状态检测和项目过滤
    addActiveNavDetection();
    addProjectFiltering();
});