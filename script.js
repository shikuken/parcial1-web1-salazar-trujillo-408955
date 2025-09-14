class FacebookSPA {
  constructor() {
    this.currentSection = "muro"
    this.posts = []
    this.user = {
      name: "María González",
      avatar: "/professional-woman-smiling-profile-photo.jpg",
    }
    this.init()
  }

  init() {
    this.bindEvents()
    this.showSection(this.currentSection)
    this.loadInitialData()
  }

  loadInitialData() {
    console.log("[v0] Loading initial Facebook data...")

    this.posts = [
      {
        id: 1,
        author: "María González",
        avatar: "/professional-woman-smiling-profile-photo.jpg",
        content:
          "¡Increíble día trabajando en el nuevo proyecto de branding! La creatividad no tiene límites cuando trabajas con un equipo tan talentoso. 🎨✨",
        image: "/modern-office-workspace-with-design-materials.jpg",
        timestamp: "Hace 2 horas",
        likes: 24,
        comments: 8,
        shares: 3,
        reactions: ["👍", "❤️", "😊"],
      },
    ]
  }

  bindEvents() {
    const navTabs = document.querySelectorAll(".nav-tab")
    navTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const section = e.target.closest(".nav-tab").getAttribute("data-section")
        this.showSection(section)
      })
    })

    const shareBtn = document.querySelector(".post-creator .share-btn")
    const postInput = document.querySelector(".post-input")

    if (shareBtn && postInput) {
      shareBtn.addEventListener("click", () => {
        this.createPost(postInput.value)
      })

      postInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          this.createPost(postInput.value)
        }
      })
    }

    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.setActiveFilter(e.target)
      })
    })

    this.bindPostInteractions()

    const searchInput = document.querySelector(".search-input")
    if (searchInput) {
      let searchTimeout
      searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
          this.handleSearch(e.target.value)
        }, 300)
      })
    }


    this.bindPhotoInteractions()

 
    this.bindContactInteractions()
  }

  showSection(sectionName) {
    const sections = document.querySelectorAll(".section")
    sections.forEach((section) => {
      section.classList.remove("active")
    })

    const tabs = document.querySelectorAll(".nav-tab")
    tabs.forEach((tab) => {
      tab.classList.remove("active")
    })

    const targetSection = document.getElementById(`${sectionName}-section`)
    const targetTab = document.querySelector(`[data-section="${sectionName}"]`)

    if (targetSection && targetTab) {
      targetSection.classList.add("active", "fade-in")
      targetTab.classList.add("active")
      this.currentSection = sectionName

      setTimeout(() => {
        targetSection.classList.remove("fade-in")
      }, 300)
    }

    this.loadSectionContent(sectionName)
  }

  loadSectionContent(sectionName) {
    console.log(`[v0] Loading ${sectionName} content...`)

    switch (sectionName) {
      case "muro":
        this.loadMuroContent()
        break
      case "info":
        this.loadInfoContent()
        break
      case "photos":
        this.loadPhotosContent()
        break
      case "boxes":
        this.loadBoxesContent()
        break
    }
  }

  loadMuroContent() {
    console.log("[v0] Loading wall posts...")
    this.updatePostStats()
  }

  loadInfoContent() {
    console.log("[v0] Loading user information...")
  }

  loadPhotosContent() {
    console.log("[v0] Loading photo gallery...")
  }

  loadBoxesContent() {
    console.log("[v0] Loading additional content...")
  }

  createPost(content) {
    if (!content.trim()) {
      this.showNotification("Por favor escribe algo antes de publicar", "warning")
      return
    }

    const postsContainer = document.querySelector(".posts-container")
    const newPost = this.createPostElement(content)

    postsContainer.insertBefore(newPost, postsContainer.firstChild)

    document.querySelector(".post-input").value = ""

    this.posts.unshift({
      id: Date.now(),
      author: this.user.name,
      avatar: this.user.avatar,
      content: content,
      timestamp: "Ahora",
      likes: 0,
      comments: 0,
      shares: 0,
      reactions: [],
    })

    newPost.style.opacity = "0"
    newPost.style.transform = "translateY(-20px)"

    setTimeout(() => {
      newPost.style.transition = "all 0.3s ease"
      newPost.style.opacity = "1"
      newPost.style.transform = "translateY(0)"
    }, 100)

    this.showNotification("¡Publicación compartida!", "success")
  }

  createPostElement(content) {
    const post = document.createElement("article")
    post.className = "post"

    const now = new Date()
    const timeString = "Ahora"

    post.innerHTML = `
      <div class="post-header">
        <img src="${this.user.avatar}" alt="${this.user.name}" class="post-avatar">
        <div class="post-info">
          <h4>${this.user.name}</h4>
          <div class="post-meta">
            <time>${timeString}</time>
            <span class="privacy-icon">🌍</span>
          </div>
        </div>
        <button class="post-menu">⋯</button>
      </div>
      <div class="post-content">
        <p>${this.formatPostContent(content)}</p>
      </div>
      <div class="post-stats">
        <div class="reactions">
          <span class="reaction-icons"></span>
          <span class="reaction-count">0 personas</span>
        </div>
        <div class="engagement-stats">
          <span>0 comentarios</span>
          <span>0 veces compartido</span>
        </div>
      </div>
      <div class="post-interactions">
        <button class="interaction-btn like-btn">
          <span class="interaction-icon">👍</span>
          <span>Me gusta</span>
        </button>
        <button class="interaction-btn comment-btn">
          <span class="interaction-icon">💬</span>
          <span>Comentar</span>
        </button>
        <button class="interaction-btn share-btn">
          <span class="interaction-icon">📤</span>
          <span>Compartir</span>
        </button>
      </div>
    `

    this.bindPostInteractionsForElement(post)

    return post
  }

  formatPostContent(content) {
    return content
      .replace(/@(\w+)/g, '<span class="mention">@$1</span>')
      .replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')
      .replace(/\n/g, "<br>")
  }

  setActiveFilter(activeFilter) {
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
      btn.classList.remove("active")
    })
    activeFilter.classList.add("active")

    console.log("[v0] Filter changed to:", activeFilter.textContent)
  }

  bindPostInteractions() {
    const posts = document.querySelectorAll(".post")
    posts.forEach((post) => {
      this.bindPostInteractionsForElement(post)
    })
  }

  bindPostInteractionsForElement(post) {
    const likeBtn = post.querySelector(".like-btn")
    const commentBtn = post.querySelector(".comment-btn")
    const shareBtn = post.querySelector(".share-btn")
    const postMenu = post.querySelector(".post-menu")

    if (likeBtn) {
      likeBtn.addEventListener("click", (e) => {
        this.toggleLike(e.target.closest(".like-btn"), post)
      })
    }

    if (commentBtn) {
      commentBtn.addEventListener("click", () => {
        this.showComments(post)
      })
    }

    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        this.sharePost(post)
      })
    }

    if (postMenu) {
      postMenu.addEventListener("click", () => {
        this.showPostMenu(post)
      })
    }
  }

  toggleLike(likeBtn, post) {
    const isLiked = likeBtn.classList.contains("liked")
    const icon = likeBtn.querySelector(".interaction-icon")
    const text = likeBtn.querySelector("span:last-child")
    const reactionCount = post.querySelector(".reaction-count")

    if (isLiked) {
      likeBtn.classList.remove("liked")
      icon.textContent = "👍"
      text.textContent = "Me gusta"
      likeBtn.style.color = ""

      const currentCount = Number.parseInt(reactionCount.textContent.match(/\d+/)[0])
      reactionCount.textContent = `${Math.max(0, currentCount - 1)} personas`
    } else {
      likeBtn.classList.add("liked")
      icon.textContent = "👍"
      text.textContent = "Te gusta"
      likeBtn.style.color = "var(--facebook-blue)"

      likeBtn.style.transform = "scale(1.1)"
      setTimeout(() => {
        likeBtn.style.transform = "scale(1)"
      }, 150)

      const currentCount = Number.parseInt(reactionCount.textContent.match(/\d+/)[0])
      reactionCount.textContent = `${currentCount + 1} personas`
    }
  }

  showComments(post) {
    console.log("[v0] Showing comments for post")
    this.showNotification("Función de comentarios próximamente", "info")
  }

  sharePost(post) {
    console.log("[v0] Sharing post")
    this.showNotification("¡Post compartido en tu muro!", "success")

    const shareCount = post.querySelector(".engagement-stats span:last-child")
    const currentShares = Number.parseInt(shareCount.textContent.match(/\d+/)[0])
    shareCount.textContent = `${currentShares + 1} veces compartido`
  }

  showPostMenu(post) {
    console.log("[v0] Showing post menu")
    this.showNotification("Menú de publicación", "info")
  }

  bindPhotoInteractions() {
    const photoItems = document.querySelectorAll(".photo-item")
    photoItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.openPhotoViewer(item)
      })
    })
  }

  openPhotoViewer(photoItem) {
    console.log("[v0] Opening photo viewer")
    this.showNotification("Visor de fotos próximamente", "info")
  }

  bindContactInteractions() {
    const contactItems = document.querySelectorAll(".contact-item")
    contactItems.forEach((item) => {
      item.addEventListener("click", () => {
        const contactName = item.querySelector(".contact-name").textContent
        this.openChat(contactName)
      })
    })
  }

  openChat(contactName) {
    console.log(`[v0] Opening chat with ${contactName}`)
    this.showNotification(`Abriendo chat con ${contactName}`, "info")
  }

  handleSearch(query) {
    if (query.length > 2) {
      console.log(`[v0] Searching for: ${query}`)
      this.showNotification(`Buscando: ${query}`, "info")
    }
  }

  updatePostStats() {
    const posts = document.querySelectorAll(".post")
    posts.forEach((post, index) => {
      if (Math.random() > 0.7) {
        const reactionCount = post.querySelector(".reaction-count")
        if (reactionCount) {
          const currentCount = Number.parseInt(reactionCount.textContent.match(/\d+/)[0])
          reactionCount.textContent = `${currentCount + 1} personas`
        }
      }
    })
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    Object.assign(notification.style, {
      position: "fixed",
      top: "80px",
      right: "20px",
      background:
        type === "success"
          ? "var(--facebook-green)"
          : type === "warning"
            ? "var(--facebook-orange)"
            : "var(--facebook-blue)",
      color: "white",
      padding: "12px 16px",
      borderRadius: "var(--border-radius)",
      boxShadow: "var(--shadow-heavy)",
      zIndex: "10000",
      fontSize: "14px",
      fontWeight: "500",
      maxWidth: "300px",
      opacity: "0",
      transform: "translateX(100%)",
      transition: "all 0.3s ease",
    })

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "1"
      notification.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  formatTimeAgo(timestamp) {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInSeconds = Math.floor((now - time) / 1000)

    if (diffInSeconds < 60) return "Ahora"
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`
    return `Hace ${Math.floor(diffInSeconds / 86400)} días`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new FacebookSPA()

  console.log("[v0] Enhanced Facebook SPA initialized successfully!")

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          e.preventDefault()
          document.querySelector('[data-section="muro"]').click()
          break
        case "2":
          e.preventDefault()
          document.querySelector('[data-section="info"]').click()
          break
        case "3":
          e.preventDefault()
          document.querySelector('[data-section="photos"]').click()
          break
        case "4":
          e.preventDefault()
          document.querySelector('[data-section="boxes"]').click()
          break
        case "/":
          e.preventDefault()
          document.querySelector(".search-input").focus()
          break
      }
    }
  })

  setInterval(() => {
    if (app.currentSection === "muro") {
      app.updatePostStats()
    }
  }, 30000)
})
