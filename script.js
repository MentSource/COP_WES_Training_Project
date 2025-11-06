
document.addEventListener("DOMContentLoaded", () => {
  // ---- Clear Filters (single listener, safe checks) ----
  const clearBtn = document.getElementById("clearFilters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const cs = document.getElementById("courseSearch");
      if (cs) cs.value = "";
      alert("Filters cleared!");
    });
  }

  // ---- Back to top ----
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Collapsible filters ----
  document.querySelectorAll(".collapsible").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      if (!content) return;
      content.style.display = (getComputedStyle(content).display === "none") ? "block" : "none";
    });
  });


// Toggle dropdown visibility
document.querySelectorAll('.dropdown-header').forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.closest('.dropdown');
    parent.classList.toggle('open');
  });
});

// Handle category checkbox filtering
document.querySelectorAll('.category-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const category = e.target.dataset.category;
    const courses = document.querySelectorAll('.course-item');
    const anyChecked = Array.from(document.querySelectorAll('.category-checkbox'))
                            .some(cb => cb.checked);

    if (anyChecked) {
      // Hide all courses first
      courses.forEach(course => {
        course.classList.add('hidden');
      });

      // Show only selected categories
      document.querySelectorAll('.category-checkbox:checked').forEach(checkedBox => {
        const selectedCategory = checkedBox.dataset.category;
        document.querySelectorAll(`.course-item[data-category="${selectedCategory}"]`)
                .forEach(course => course.classList.remove('hidden'));
      });
    } else {
      courses.forEach(course => course.classList.remove('hidden'));
    }
  });
});





  // ---- Expand/Collapse course details (single, authoritative handler) ----
  // Assumes rows: <tr class="course-row">...</tr> followed by one or more <tr class="course-details-row">...</tr>
  document.querySelectorAll(".expand-toggle").forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      // Let clicks on the image bubble up — we handle everything here.
      const row = toggle.closest("tr");
      if (!row) return;

      // Find first course-details-row after this row (stop at next .course-row)
      let firstDetails = row.nextElementSibling;
      while (firstDetails && !firstDetails.classList.contains("course-row")) {
        if (firstDetails.classList.contains("course-details-row")) break;
        firstDetails = firstDetails.nextElementSibling;
      }
      if (!firstDetails || !firstDetails.classList.contains("course-details-row")) return; // nothing to toggle

      // Determine current visibility from computed style (safer than style.display)
      const isVisible = getComputedStyle(firstDetails).display !== "none";
      const newDisplay = isVisible ? "none" : "table-row";

      // Toggle all consecutive course-details-row until the next .course-row
      let cur = row.nextElementSibling;
      while (cur && !cur.classList.contains("course-row")) {
        if (cur.classList.contains("course-details-row")) {
          cur.style.display = newDisplay;
        }
        cur = cur.nextElementSibling;
      }

      // Rotate the icon inside the toggle without replacing content
      const img = toggle.querySelector("img.expand-icon");
      if (img) {
        img.classList.toggle("rotated", !isVisible);
      }
    });
  });
});


// === SEARCH FUNCTION ===
document.getElementById('global-search').addEventListener('input', function() {
  const keyword = this.value.toLowerCase().trim();
  const rows = document.querySelectorAll('.course-row');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    if (text.includes(keyword)) {
      row.style.display = ''; // show
    } else {
      row.style.display = 'none'; // hide
    }
  });
});


document.getElementById('courseSearch').addEventListener('input', function() {
  const keyword = this.value.toLowerCase().trim();
  const rows = document.querySelectorAll('.course-row');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    if (text.includes(keyword)) {
      row.style.display = ''; // show
    } else {
      row.style.display = 'none'; // hide
    }
  });
});

// === HAMBURGER MENU FUNCTION ===
const hamburger = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav-links'); // Change selector to your actual nav container class or ID

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});


// ---- Animated DNA background ----
const dna = document.getElementById('dna');
if (dna) {
  const colors = ['#1e88e5','#ea6024','#ccc24f','#89b82a','#bda098',
                  '#188cc5','#8b909c','#f7b561','#e86421','#dac258','#3676a0'];

  function createDNA() {
    dna.innerHTML = '';
    const width  = dna.offsetWidth;
    const height = dna.offsetHeight;

    const cols = Math.floor(width / 30);   // horizontal density
    const rows = 9;                        // vertical “rungs”
    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // === Strand 1 ===
        const offset1 = Math.sin((c / cols) * Math.PI * 2) * 40;
        const y1 = r * spacingY + offset1 + spacingY / 2;
        if (Math.random() > 0.6) continue;
        addDot(c * spacingX, y1);

        // === Strand 2 (phase-shifted to cross the first) ===
        const offset2 = Math.sin((c / cols) * Math.PI * 2 + Math.PI) * 40;
        const y2 = r * spacingY + offset2 + spacingY / 2;
        if (Math.random() > 0.6) continue;
        addDot(c * spacingX, y2);
      }
    }
  }

  function addDot(left, top) {
    const dot = document.createElement('div');
    const size = 6 + Math.random() * 12;
    dot.className = 'dot';
    dot.style.width  = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left   = left + 'px';
    dot.style.top    = top + 'px';
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    // dot.style.animationDelay = (Math.random() * 4) + 's'; Commenting animation off
    dna.appendChild(dot);
  }

  createDNA();
  window.addEventListener('resize', createDNA);
}

// === CATEGORY FILTER ===
const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
const recordsSelect = document.getElementById('records-per-page');
const pageLinksContainer = document.getElementById('page-links');
const backToTopBtn = document.querySelector('.back-to-top');

let courseRows = Array.from(document.querySelectorAll('.course-row'));
let currentPage = 1;
let recordsPerPage = parseInt(recordsSelect.value);

// Function to display current page 
function displayPage(page) {
  const visibleRows = courseRows.filter(row => !row.classList.contains('hidden'));
  const start = (page - 1) * recordsPerPage;
  const end = start + recordsPerPage;

  visibleRows.forEach((row, index) => {
    row.style.display = (index >= start && index < end) ? '' : 'none';
  });

  courseRows.forEach(row => {
    if (row.classList.contains('hidden')) row.style.display = 'none';
  });

  currentPage = page;
  updatePaginationButtons(visibleRows.length);
}

function updatePaginationButtons(totalVisible) {
  const totalPages = Math.ceil(totalVisible / recordsPerPage);
  pageLinksContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');

    btn.addEventListener('click', () => displayPage(i));
    pageLinksContainer.appendChild(btn);
  }
}

// Handle category filtering
categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.getAttribute('data-category'));

    courseRows.forEach(row => {
      const category = row.getAttribute('data-category');
      if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });

    displayPage(1);
  });
});

recordsSelect.addEventListener('change', () => {
  recordsPerPage = parseInt(recordsSelect.value);
  displayPage(1);
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

displayPage(1);

// === SUBMIT COURSE FORM HANDLER ===
    document.getElementById('courseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! Your course has been submitted.');
      this.reset();
    });
