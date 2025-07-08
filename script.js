// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取导航元素
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端导航菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 平滑滚动到目标部分
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 导航栏滚动控制
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100; // 滚动阈值，超过这个值才触发隐藏/显示
    let scrollTimer = null;

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // 如果滚动位置小于阈值，始终显示导航栏
        if (currentScroll < scrollThreshold) {
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
            lastScrollTop = currentScroll;
            return;
        }
        
        // 向下滚动时隐藏导航栏
        if (currentScroll > lastScrollTop) {
            navbar.classList.add('hidden');
            navbar.classList.remove('visible');
        }
        // 向上滚动时显示导航栏
        else {
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
        }
        
        lastScrollTop = currentScroll;
        
        // 停止滚动3秒后显示导航栏
        scrollTimer = setTimeout(() => {
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
        }, 3000);
    });

    // 产品卡片动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有产品卡片
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 观察博客卡片
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 产品展示轮播效果
    const productShowcase = document.querySelector('.product-showcase');
    const productItems = [
        { icon: '🔪', name: '超声波厨房刀' },
        { icon: '🍞', name: '超声波面包刀' },
        { icon: '🏭', name: '超声波塑料切割刀' }
    ];

    let currentProductIndex = 0;

    function updateProductDisplay() {
        const productVisual = document.querySelector('.product-visual');
        if (productVisual) {
            productVisual.style.opacity = '0';
            
            setTimeout(() => {
                const currentProduct = productItems[currentProductIndex];
                productVisual.innerHTML = `
                    <div style="font-size: 80px; margin-bottom: 20px;">${currentProduct.icon}</div>
                    <div style="font-size: 18px; font-weight: 600; color: rgba(255, 255, 255, 0.9);">${currentProduct.name}</div>
                `;
                productVisual.style.opacity = '1';
            }, 300);
        }
    }

    // 自动轮播产品
    setInterval(() => {
        currentProductIndex = (currentProductIndex + 1) % productItems.length;
        updateProductDisplay();
    }, 4000);

    // 初始化产品显示
    updateProductDisplay();

    // 产品展示动画初始化
    initProductShowcaseAnimations();

    // 按钮点击动画
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加波纹动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 滚动到顶部功能
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #333;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // 显示/隐藏滚动到顶部按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // 滚动到顶部
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 产品卡片悬停效果增强
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 加载动画
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    document.body.appendChild(loader);

    // 添加加载动画样式
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingStyle);

    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });

    // 表单验证（如果有联系表单）
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示提交成功消息
            const successMessage = document.createElement('div');
            successMessage.textContent = '感谢您的留言！我们会尽快回复您。';
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #27ae60;
                color: white;
                padding: 15px 30px;
                border-radius: 5px;
                z-index: 10000;
                animation: slideDown 0.5s ease;
            `;
            
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    });

    // 添加滑动动画样式
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideDown {
            0% {
                transform: translateX(-50%) translateY(-100px);
                opacity: 0;
            }
            100% {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(slideStyle);

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // 关闭移动端菜单
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 性能优化：防抖滚动事件
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 使用防抖优化滚动事件
    const debouncedScrollHandler = debounce(function() {
        // 滚动处理逻辑
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        // 视差滚动效果
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);
});

// 工具函数：获取元素距离顶部的距离
function getElementTop(element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

// 工具函数：检查元素是否在视口中
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 产品展示动画功能 - 特斯拉风格
function initProductShowcaseAnimations() {
    const productSections = document.querySelectorAll('.product-showcase-section');
    
    // 观察器选项
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // 创建交叉观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加动画类
                entry.target.classList.add('animate-in');
                
                // 为文字内容添加动画
                const textContent = entry.target.querySelector('.product-text-content');
                const mediaContainer = entry.target.querySelector('.product-media-container');
                
                if (textContent) {
                    textContent.style.opacity = '1';
                    textContent.style.transform = 'translateY(0)';
                }
                
                if (mediaContainer) {
                    mediaContainer.style.opacity = '1';
                    mediaContainer.style.transform = 'scale(1)';
                }
            }
        });
    }, observerOptions);
    
    // 初始化动画状态
    productSections.forEach(section => {
        const textContent = section.querySelector('.product-text-content');
        const mediaContainer = section.querySelector('.product-media-container');
        
        if (textContent) {
            textContent.style.opacity = '0';
            textContent.style.transform = 'translateY(50px)';
            textContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (mediaContainer) {
            mediaContainer.style.opacity = '0';
            mediaContainer.style.transform = 'scale(0.95)';
            mediaContainer.style.transition = 'opacity 1s ease, transform 1s ease';
        }
        
        // 观察每个产品section
        observer.observe(section);
    });
    
    // 视差滚动效果
    const handleParallaxScroll = debounce(() => {
        const scrolled = window.scrollY;
        
        productSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const mediaContainer = section.querySelector('.product-media-container');
                if (mediaContainer) {
                    // 计算视差偏移
                    const speed = 0.1;
                    const yPos = -(rect.top * speed);
                    mediaContainer.style.transform = `translateY(${yPos}px) scale(1)`;
                }
            }
        });
    }, 10);
    
    // 绑定滚动事件
    window.addEventListener('scroll', handleParallaxScroll);
    
    // 产品按钮增强交互
    const productButtons = document.querySelectorAll('.product-showcase-buttons .btn');
    productButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 特性列表动画
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    // 当特性列表进入视口时显示
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const features = entry.target.querySelectorAll('.feature-item');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    // 观察所有特性列表
    document.querySelectorAll('.product-features-list').forEach(list => {
        featureObserver.observe(list);
    });
    
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .product-showcase-section.animate-in {
            animation: sectionFadeIn 1s ease forwards;
        }
        
        @keyframes sectionFadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .product-showcase-buttons .btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-showcase-buttons .btn:hover {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
} 