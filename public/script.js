document.addEventListener("DOMContentLoaded", () => {
  // Address copy functionality
  const copyAddressBtn = document.getElementById("copyAddressBtn");
  const address = copyAddressBtn.querySelector(".address").textContent;

  copyAddressBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(address).then(() => {
      // Show copied notification
      const notification = document.createElement("div");
      notification.className = "copy-notification";
      notification.textContent = "Address copied!";
      document.body.appendChild(notification);

      // Remove notification after animation
      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.getAttribute("href") === "#") return;

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Animated entry for elements as they scroll into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".feature-card, .roadmap-item, .about-image, .community-video"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("animate-in");
      }
    });
  };

  // Initial check for elements in view
  animateOnScroll();

  // Add event listeners for scroll animations
  window.addEventListener("scroll", animateOnScroll);

  // Add neon cursor effect
  const createNeonCursor = () => {
    const cursor = document.createElement("div");
    cursor.className = "neon-cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  };

  // Initialize neon cursor effect
  createNeonCursor();

  // Add style for copy notification and neon cursor
  const style = document.createElement("style");
  style.textContent = `
        .copy-notification {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: var(--darker);
            padding: 10px 20px;
            border-radius: 50px;
            box-shadow: var(--neon-glow);
            z-index: 1000;
            opacity: 1;
            transition: opacity 0.3s ease;
            font-family: 'Orbitron', sans-serif;
            font-weight: 600;
        }
        
        .neon-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: transparent;
            border: 2px solid var(--primary);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            box-shadow: var(--neon-glow);
            transition: width 0.3s, height 0.3s, opacity 0.3s;
        }
        
        .animate-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        @keyframes fadeIn {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Links and buttons trigger cursor animation */
        a:hover ~ .neon-cursor,
        button:hover ~ .neon-cursor {
            width: 40px;
            height: 40px;
            opacity: 0.7;
        }
    `;
  document.head.appendChild(style);
});
