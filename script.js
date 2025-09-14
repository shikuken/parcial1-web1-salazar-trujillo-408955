class FacebookSPA {
  constructor() {
    this.currentSection = "muro"
    this.init()
  }

  init() {
    this.bindEvents()
    this.showSection(this.currentSection)
  }

  bindEvents() {
    const navTabs = document.querySelectorAll(".nav-tab")
    navTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const section = e.target.getAttribute("data-section")
        this.showSection(section)
      })
    })

    const shareBtn = document.querySelector(".post-creator .share-btn")
    const postInput = document.querySelector(".post-input")

    if (shareBtn && postInput) {
      shareBtn.addEventListener("click", () => {
        this.createPost(postInput.value)
      })
    }

    const feedOptions = document.querySelectorAll(".feed-option")
    feedOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        this.setActiveFeedOption(e.target)
      })
    })

    this.bindPostInteractions()

    const searchInput = document.querySelector(".search-input")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value)
      })
    }
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
      targetSection.classList.add("active")
      targetTab.classList.add("active")
      this.currentSection = sectionName
    }

    this.loadSectionContent(sectionName)
  }

  loadSectionContent(sectionName) {
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
    console.log("Loading Muro content...")
  }

  loadInfoContent() {
    console.log("Loading Info content...")
  }

  loadPhotosContent() {
    console.log("Loading Photos content...")
  }

  loadBoxesContent() {
    console.log("Loading Boxes content...")
  }

  createPost(content) {
    if (!content.trim()) {
      alert("Por favor escribe algo antes de compartir")
      return
    }

    const postsContainer = document.querySelector(".posts-container")
    const newPost = this.createPostElement(content)

    postsContainer.insertBefore(newPost, postsContainer.firstChild)

    document.querySelector(".post-input").value = ""

    newPost.style.opacity = "0"
    newPost.style.transform = "translateY(-20px)"

    setTimeout(() => {
      newPost.style.transition = "all 0.3s ease"
      newPost.style.opacity = "1"
      newPost.style.transform = "translateY(0)"
    }, 100)
  }

  createPostElement(content) {
    const post = document.createElement("article")
    post.className = "post"

    const now = new Date()
    const timeString = now.toLocaleString("es-ES", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    })

    post.innerHTML = `
            <div class="post-header">
                <div class="post-avatar"></div>
                <div class="post-info">
                    <h4>Nombre</h4>
                    <time>${timeString}</time>
                </div>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="post-interactions">
                <button class="like-btn">👍 Me gusta</button>
                <button class="share-btn">💬 Compartir</button>
            </div>
        `

    this.bindPostInteractionsForElement(post)

    return post
  }

  setActiveFeedOption(activeOption) {
    const feedOptions = document.querySelectorAll(".feed-option")
    feedOptions.forEach((option) => {
      option.classList.remove("active")
    })
    activeOption.classList.add("active")
  }

  bindPostInteractions() {
    const posts = document.querySelectorAll(".post")
    posts.forEach((post) => {
      this.bindPostInteractionsForElement(post)
    })
  }

  bindPostInteractionsForElement(post) {
    const likeBtn = post.querySelector(".like-btn")
    const shareBtn = post.querySelector(".share-btn")

    if (likeBtn) {
      likeBtn.addEventListener("click", (e) => {
        this.toggleLike(e.target)
      })
    }

    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        this.sharePost(post)
      })
    }
  }

  toggleLike(likeBtn) {
    const isLiked = likeBtn.classList.contains("liked")

    if (isLiked) {
      likeBtn.classList.remove("liked")
      likeBtn.textContent = "👍 Me gusta"
      likeBtn.style.color = "#1877f2"
    } else {
      likeBtn.classList.add("liked")
      likeBtn.textContent = "👍 Te gusta"
      likeBtn.style.color = "#42a5f5"
      likeBtn.style.fontWeight = "bold"
    }
  }

  sharePost(post) {
    alert("¡Post compartido!")
    console.log("Sharing post:", post)
  }

  handleSearch(query) {
    if (query.length > 2) {
      console.log("Searching for:", query)
    }
  }

  showLoading(element) {
    element.innerHTML = '<div class="loading">Cargando...</div>'
  }

  hideLoading(element) {
    const loading = element.querySelector(".loading")
    if (loading) {
      loading.remove()
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new FacebookSPA()

  console.log("Facebook SPA initialized successfully!")

  setTimeout(() => {
    console.log("App fully loaded and ready!")
  }, 1000)
})

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.scrollBehavior = "smooth"

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
      }
    }
  })
})
