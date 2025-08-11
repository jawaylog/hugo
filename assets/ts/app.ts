import noteDate from "./date.ts";
import farallonActions from "./action.ts";
import Douban from "./db.ts";
import { farallonComment } from "./comment.ts";
import imgZoom from "./zoom.ts";

declare global {
    interface Window {
        actionDomain: string;
        timeFormat: string;
        dbAPIBase: string;
        viewText: string;
        noComment: string;
        zoom: boolean;
    }
}

new noteDate({
    selector: ".humane--time",
    timeFormat: window.timeFormat,
});

class noteBase {
    constructor() {
        this.initThemeSwitch();
        this.initBack2Top();
        this.initMenu();
    }

    initMenu() {
        // 点击 menu--icon 切换菜单
        if (document.querySelector(".menu--icon")) {
            document.querySelector(".menu--icon")!.addEventListener("click", () => {
                document.querySelector(".site--nav")!.classList.toggle("is-active");
                document.querySelector("body")!.classList.toggle("menu--actived");
            });
        }

        // 点击 close--icon 关闭菜单
        if (document.querySelector(".close--icon")) {
            document.querySelector(".close--icon")!.addEventListener("click", () => {
                document.querySelector(".site--nav")!.classList.remove("is-active");
                document.querySelector("body")!.classList.remove("menu--actived");
            });
        }

        // 点击 mask 关闭菜单
        if (document.querySelector(".mask")) {
            document.querySelector(".mask")!.addEventListener("touchstart", () => {
                document.querySelector(".site--nav")!.classList.remove("is-active");
                document.querySelector("body")!.classList.remove("menu--actived");
            });
        }
    }

    initThemeSwitch() {
        const themeToggleBtn = document.querySelector(".theme-toggle-button");
        const sunIcon = document.querySelector(".sun > svg");
        const moonIcon = document.querySelector(".moon > svg");
        if (!themeToggleBtn || !sunIcon || !moonIcon) return;

        // 默认主题为亮色模式
        let currentTheme = localStorage.getItem("theme") || "light";

        // 设置初始主题和图标
        if (currentTheme === "dark") {
            document.body.classList.add("dark");
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
        } else {
            document.body.classList.remove("dark");
            sunIcon.style.display = "block";
            moonIcon.style.display = "none";
        }

        // 添加点击事件
        themeToggleBtn.addEventListener("click", () => {
            if (currentTheme === "light") {
                // 切换到暗色模式
                currentTheme = "dark";
                document.body.classList.add("dark");
                sunIcon.style.display = "none";
                moonIcon.style.display = "block";
            } else {
                // 切换到亮色模式
                currentTheme = "light";
                document.body.classList.remove("dark");
                sunIcon.style.display = "block";
                moonIcon.style.display = "none";
            }

            // 更新localStorage
            localStorage.setItem("theme", currentTheme);
        });
    }

    initBack2Top() {
        if (document.querySelector(".backToTop")) {
            const backToTop = document.querySelector(".backToTop") as HTMLElement;
            window.addEventListener("scroll", () => {
                const t = window.scrollY || document.documentElement.scrollTop;
                t > 200 ? backToTop.classList.add("is-active") : backToTop.classList.remove("is-active");
            });

            backToTop.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }
}

new noteBase();

new farallonActions({
    singleSelector: ".article",
    articleSelector: ".block--item",
    text: window.viewText,
    actionDomain: window.actionDomain,
});

new Douban({
    baseAPI: window.dbAPIBase,
    container: ".db--container",
});

new farallonComment({
    actionDomain: window.actionDomain,
});

if (window.zoom) {
    new imgZoom();
}

if (document.querySelector(".search--icon")) {
    document.querySelector(".search--icon")!.addEventListener("click", () => {
        document.querySelector("body")!.classList.toggle("search--actived");
    });
}



// 滚动进入视口动画
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.block--addon').forEach(el => {
    observer.observe(el);
  });
}

// 图片加载动画
function initImageLoading() {
  document.querySelectorAll('.friends-thumbnail img').forEach(img => {
    const container = img.closest('.friends-thumbnail');
    container.classList.add('loading');
    
    if (img.complete) {
      img.classList.add('loaded');
      container.classList.remove('loading');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        container.classList.remove('loading');
      });
      
      img.addEventListener('error', () => {
        container.classList.remove('loading');
      });
    }
  });
}

// 初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initImageLoading();
  
  // 点击水波纹效果
  document.querySelectorAll('.block--addon').forEach(el => {
    el.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});