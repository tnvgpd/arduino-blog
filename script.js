// script.js - Renders data.js into the HTML dynamically

function renderProjects(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return; // if we aren't on a page with this block, exit

  const itemsToRender = limit ? myProjects.slice(0, limit) : myProjects;
  
  if (itemsToRender.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 2rem; color: var(--text-muted); font-style: italic; grid-column: 1 / -1; width: 100%;">Coming soon! I'm currently working on my very first project.</p>`;
    return;
  }
  
  let html = "";
  itemsToRender.forEach(p => {
    let tagsHtml = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    html += `
      <div class="project-card">
        <div class="card-content">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="tags">
            ${tagsHtml}
          </div>
          <a href="${p.link}" class="btn btn-outline" style="margin-top: 1.5rem; width: 100%; text-align: center;">View Project</a>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderBlogs(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const itemsToRender = limit ? myBlogs.slice(0, limit) : myBlogs;
  
  if (itemsToRender.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 2rem; color: var(--text-muted); font-style: italic; grid-column: 1 / -1; width: 100%;">Coming soon! Stay tuned for my first blog post.</p>`;
    return;
  }

  let html = "";
  itemsToRender.forEach(b => {
    html += `
      <div class="post">
        <h3 class="post-title">${b.title}</h3>
        <p class="post-date">${b.date}</p>
        <p class="post-summary">${b.summary}</p>
        <div class="post-expand">
          <a href="${b.link}" class="btn btn-outline" style="margin-top: 0.5rem;">Read Full Post &raquo;</a>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Automatically render when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderProjects("featured-projects", 2); // Show top 2 on home page
  renderBlogs("featured-blogs", 1);       // Show top 1 on home page
  
  renderProjects("all-projects");         // Show all on projects page
  renderBlogs("all-blogs");               // Show all on blogs page

  // Simple scroll reveal animation observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Optional: Stop observing once revealed
      }
    });
  }, { threshold: 0.1 });

  // Apply the reveal class dynamically after rendering is finished
  setTimeout(() => {
    document.querySelectorAll('.project-card, .post, .hero-content, .about-content').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }, 100);

  // Automatically Highlight Active Navbar Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active-link');
    }
  });

  // Smooth Page Transitions on Click
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (!this.href) return;
      const url = new URL(this.href);
      // Intercept local links, except hash links on the same page, or new tabs
      if (url.origin === window.location.origin && this.target !== '_blank') {
        if (url.pathname === window.location.pathname && url.hash) return; // allow normal scroll
        
        e.preventDefault();
        const targetUrl = this.href;
        document.body.classList.add('fade-out'); // Trigger the CSS animation
        
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 350); // Wait for the exact length of the CSS transition
      }
    });
  });

  // --- 3D TILT EFFECT ON CARDS ---
  document.querySelectorAll('.project-card, .post').forEach(card => {
    // Only apply physics on desktop/systems with a fine pointer (mouse)
    if(window.matchMedia("(pointer: fine)").matches) {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate physics rotation limits based on cursor trajectory
        const rotateX = -y / 15; 
        const rotateY = x / 15;
        
        card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = `none`; // Instantly track mouse movement
      });
      
      card.addEventListener('mouseleave', () => {
        // Snap back to zero with a smooth cubic-bezier bounce
        card.style.transform = `perspective(1000px) scale(1) rotateX(0) rotateY(0)`;
        card.style.transition = `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)`; 
      });
    }
  });

  // --- TYPEWRITER EFFECT ---
  const typeTextElement = document.querySelector('.type-main');
  if (typeTextElement) {
    const textToType = "High school junior from NJ exploring robotics, electrical engineering, AI, and Arduino.";
    let idx = 0;
    
    function typeWriter() {
      if (idx < textToType.length) {
        typeTextElement.innerHTML += textToType.charAt(idx);
        idx++;
        // Slight randomization so it feels like a real human typing!
        const randomSpeed = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
        setTimeout(typeWriter, randomSpeed); 
      }
    }
    
    // Start typing rapidly right as the page finishes fading in
    setTimeout(typeWriter, 600);
  }

  // --- 1. HERO DOT-GRID PARALLAX EFFECT ---
  const heroSection = document.querySelector('.hero');
  if (heroSection && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      // Calculate inverse mouse movement for the background grid
      const shiftX = (window.innerWidth / 2 - e.pageX) / 60;
      const shiftY = (window.innerHeight / 2 - e.pageY) / 60;
      heroSection.style.backgroundPosition = `calc(50% + ${shiftX}px) calc(50% + ${shiftY}px)`;
    });
  }

  // --- 2. GLOBAL GRADIENT SCROLL PROGRESS BAR ---
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Prevent divide by zero if page can't scroll
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0; 
    progressBar.style.width = scrolled + "%";
  });

  // --- 3. DYNAMIC TIME-BASED GREETING ---
  // Transforms "Hi! I'm Tanvi..." into "Good morning/afternoon/evening! I'm Tanvi..." based on local timezone
  const bioElement = document.querySelector('.bio');
  if (bioElement && bioElement.innerHTML.includes("Hi!")) {
    const currentHour = new Date().getHours();
    let dynamicGreeting = "Good evening";
    if (currentHour < 12) dynamicGreeting = "Good morning";
    else if (currentHour < 18) dynamicGreeting = "Good afternoon";
    
    bioElement.innerHTML = bioElement.innerHTML.replace("Hi!", `${dynamicGreeting}!`);
  }
});
