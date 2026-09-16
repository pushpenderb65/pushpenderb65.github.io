/**
 * Pushpender Portfolio - Modern Interactive Controller
 * Handles project filtering, modal dialogs, typewriter effect, clipboard utilities,
 * and responsive navigation interactions.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. Hero Typewriter Animation ---
  const typewriterEl = document.getElementById('modern-typewriter');
  if (typewriterEl) {
    const roles = [
      'Aspiring Data Scientist',
      'Data Analyst',
      'Power BI Specialist',
      'Machine Learning Practitioner',
      'MCA Candidate @ MVN Univ'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function runTypewriter() {
      const currentRole = roles[roleIdx];
      const displayedText = isDeleting
        ? currentRole.substring(0, charIdx - 1)
        : currentRole.substring(0, charIdx + 1);

      typewriterEl.textContent = displayedText;

      if (!isDeleting) {
        charIdx++;
        if (charIdx === currentRole.length) {
          isDeleting = true;
          typingSpeed = 1600; // Pause at end of word
        } else {
          typingSpeed = 80;
        }
      } else {
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          typingSpeed = 400; // Pause before new word
        } else {
          typingSpeed = 40;
        }
      }

      setTimeout(runTypewriter, typingSpeed);
    }

    runTypewriter();
  }

  // --- 2. Interactive Project Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item-col');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 3. Project Details Modal Dynamic Content ---
  const projectData = {
    1: {
      title: 'Retail Sales Data Analysis using SQL',
      category: 'SQL & Database Analytics',
      image: 'images/proj_1.png',
      summary: 'In-depth SQL case study analyzing transactional retail datasets to uncover sales performance, revenue patterns, and customer purchase behaviors.',
      problem: 'Retail managers lacked clear visibility into customer lifetime value, churn probability, and peak seasonal demand periods across varied regional stores.',
      solution: 'Constructed advanced SQL analytical queries utilizing CTEs, Window functions (DENSE_RANK, LEAD/LAG, PARTITION BY), and aggregations to identify high-value cohorts and revenue leakage.',
      insights: [
        'Discovered the top 20% of customer accounts drive over 64% of total gross margins.',
        'Identified peak transaction volume hours, enabling optimized staff scheduling.',
        'Mapped product affinity matrices to recommend strategic cross-selling bundles.'
      ],
      techStack: ['PostgreSQL', 'Advanced SQL', 'Window Functions', 'CTEs', 'Data Wrangling'],
      githubUrl: 'https://github.com/pushpenderb65/CASE_STUDY_PROJ/blob/main/Proj.sql'
    },
    2: {
      title: 'Comprehensive Retail Sales EDA with Python',
      category: 'Python & Exploratory Data Analysis',
      image: 'images/proj_2.png',
      summary: 'End-to-end exploratory data analysis and data cleaning pipeline for extensive retail sales datasets using Python, Pandas, and visualization libraries.',
      problem: 'Raw transactions had missing records, inconsistent datetime formats, and outlier transactions skewing revenue forecasts.',
      solution: 'Engineered a modular cleaning pipeline with imputation, outlier detection (IQR method), feature extraction, and exploratory multivariate visualizations.',
      insights: [
        'Isolated negative revenue spikes attributed to return processing delays.',
        'Built seasonal trend heatmaps showing consistent 35% Q4 demand surges.',
        'Categorized product categories by profitability margin rather than pure gross volume.'
      ],
      techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
      githubUrl: 'https://github.com/pushpenderb65/Retail_Sales_DA/blob/main/Retail_Sales.ipynb'
    },
    3: {
      title: 'E-Commerce Executive Power BI Dashboard',
      category: 'Business Intelligence & Power BI',
      image: 'images/proj_3.png',
      summary: 'Interactive Power BI business intelligence dashboard giving leadership instant transparency into sales margins, order fulfillment, and regional performance.',
      problem: 'Executive leaders were receiving fragmented weekly spreadsheets without drill-down or slice-and-dice diagnostic capabilities.',
      solution: 'Modeled a normalized star schema in Power BI with optimized DAX measures (YTD sales, profit margins, MoM growth) and visual KPI hierarchy cards.',
      insights: [
        'Automated executive reporting cadence, saving ~6 hours of manual spreadsheet compilation weekly.',
        'Visualized customer geography clusters to prioritize low-shipping-cost fulfillment hubs.'
      ],
      techStack: ['Power BI', 'DAX Measures', 'Star Schema', 'Data Modeling', 'Power Query'],
      githubUrl: 'https://github.com/pushpenderb65/E-Commerce-Dashboard/blob/main/Screenshot%202026-07-16%20112915.png'
    },
    4: {
      title: 'Healthcare Diabetes Risk Prediction Model',
      category: 'Machine Learning & Predictive Modeling',
      image: 'images/proj_4.png',
      summary: 'Supervised predictive classification system evaluating clinical risk factors to detect pre-diabetic and diabetic indicators in patient cohorts.',
      problem: 'Early clinical intervention requires reliable probabilistic scoring of risk indicators to assist healthcare practitioners in triage.',
      solution: 'Preprocessed clinical indicators, handled zero-value physiological anomalies, applied StandardScaler normalization, and trained classification models evaluated with ROC-AUC & F1-score.',
      insights: [
        'Achieved optimal precision/recall trade-off minimizing false negative diagnostic misses.',
        'Identified Glucose levels and BMI as the two highest feature-importance weight contributors.'
      ],
      techStack: ['Python', 'Scikit-Learn', 'Classification', 'Feature Engineering', 'ROC-AUC Evaluation'],
      githubUrl: 'https://github.com/pushpenderb65/Diabetes_Pred'
    },
    5: {
      title: 'Content-Based Movie Recommendation Engine',
      category: 'Machine Learning & NLP',
      image: 'images/proj_5.png',
      summary: 'Intelligent recommendation system calculating semantic and metadata similarity across extensive film libraries to suggest personalized recommendations.',
      problem: 'Users experience decision fatigue when browsing large streaming libraries without personalized similarity ranking.',
      solution: 'Extracted keywords, cast, genres, and textual synopses, vectorized text with CountVectorizer, and computed Cosine Similarity matrices across title vectors.',
      insights: [
        'Implemented sub-second similarity queries over 5,000+ title vectors using vector sparse matrix math.',
        'Ensured diverse recommendations by balancing genre tags with director/actor weightings.'
      ],
      techStack: ['Python', 'NLP', 'Cosine Similarity', 'Scikit-Learn', 'Vectorization'],
      githubUrl: 'https://github.com/pushpenderb65/Movies-Recommendation-System'
    },
    6: {
      title: 'Executive Sales & Revenue Performance Dashboard',
      category: 'Business Intelligence & Power BI',
      image: 'images/proj_6.png',
      summary: 'Comprehensive multi-page Power BI dashboard detailing enterprise sales trajectories, customer segment profitability, and order returns.',
      problem: 'Operations and marketing teams were working with misaligned metrics for returns and delivery turnaround times.',
      solution: 'Designed an intuitive multi-page report with drill-through parameters, dynamic date filtering, and KPI status cards highlighting target deviations.',
      insights: [
        'Pinpointed product categories generating high gross sales but disproportionate 18% return rates.',
        'Enabled granular analysis across shipping modes to reduce shipping expenditure.'
      ],
      techStack: ['Power BI', 'DAX Measures', 'Business Analytics', 'Data Visuals', 'KPI Cards'],
      githubUrl: 'https://github.com/pushpenderb65/Sales-Dash-Power-BI/blob/main/Screenshot%202026-09-13%20213653.png'
    }
  };

  const previewButtons = document.querySelectorAll('.btn-project-preview');
  const modal = document.getElementById('projectDetailModal');

  previewButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const projId = this.getAttribute('data-id');
      const data = projectData[projId];

      if (!data) return;

      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectCategory').textContent = data.category;
      document.getElementById('modalProjectImg').src = data.image;
      document.getElementById('modalProjectImg').alt = data.title;
      document.getElementById('modalProjectSummary').textContent = data.summary;
      document.getElementById('modalProjectProblem').textContent = data.problem;
      document.getElementById('modalProjectSolution').textContent = data.solution;
      document.getElementById('modalProjectGithub').href = data.githubUrl;

      // Render insights list
      const insightsList = document.getElementById('modalProjectInsights');
      insightsList.innerHTML = '';
      data.insights.forEach(function (insight) {
        const li = document.createElement('li');
        li.textContent = insight;
        insightsList.appendChild(li);
      });

      // Render tech stack tags
      const stackWrap = document.getElementById('modalProjectStack');
      stackWrap.innerHTML = '';
      data.techStack.forEach(function (tech) {
        const span = document.createElement('span');
        span.className = 'tag-badge';
        span.textContent = tech;
        stackWrap.appendChild(span);
      });

      // Open Modal via jQuery / Bootstrap
      if (typeof $ !== 'undefined' && $('#projectDetailModal').modal) {
        $('#projectDetailModal').modal('show');
      } else {
        modal.style.display = 'block';
      }
    });
  });

  // --- 4. Clipboard Utility (Copy Email & Phone) ---
  const copyToast = document.getElementById('copy-toast');

  function showToast(message) {
    if (!copyToast) return;
    copyToast.textContent = message;
    copyToast.classList.add('show');
    setTimeout(function () {
      copyToast.classList.remove('show');
    }, 2800);
  }

  const copyButtons = document.querySelectorAll('[data-copy-target]');
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const textToCopy = this.getAttribute('data-copy-target');
      const label = this.getAttribute('data-label') || 'Copied';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          showToast(`✓ ${label} copied to clipboard!`);
        }).catch(function () {
          fallbackCopy(textToCopy, label);
        });
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`✓ ${label} copied to clipboard!`);
  }

  // --- 5. Interactive Contact Form Submission Handler ---
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showToast('⚠ Please fill in all required fields.');
        return;
      }

      // Build mailto link
      const mailtoUrl = `mailto:pushpenderb65@gmail.com?subject=${encodeURIComponent(
        subject || `Portfolio Inquiry from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      showToast('✓ Opening your email client to send message...');
      window.location.href = mailtoUrl;

      // Reset form
      setTimeout(function () {
        contactForm.reset();
      }, 1000);
    });
  }

  // --- 6. Navbar Scroll Effect & Back to Top ---
  const navbar = document.getElementById('modernNavbar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 7. Smooth Scroll for Nav Links & Auto-close Mobile Menu ---
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 70;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile hamburger navbar if open
          const navbarCollapse = document.getElementById('navbarResponsive');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (typeof $ !== 'undefined' && $('#navbarResponsive').collapse) {
              $('#navbarResponsive').collapse('hide');
            } else {
              navbarCollapse.classList.remove('show');
            }
          }
        }
      }
    });
  });
});
