
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
  
      const row = toggle.closest("tr");
      if (!row) return;

      let firstDetails = row.nextElementSibling;
      while (firstDetails && !firstDetails.classList.contains("course-row")) {
        if (firstDetails.classList.contains("course-details-row")) break;
        firstDetails = firstDetails.nextElementSibling;
      }
      if (!firstDetails || !firstDetails.classList.contains("course-details-row")) return; 

      const isVisible = getComputedStyle(firstDetails).display !== "none";
      const newDisplay = isVisible ? "none" : "table-row";

      let cur = row.nextElementSibling;
      while (cur && !cur.classList.contains("course-row")) {
        if (cur.classList.contains("course-details-row")) {
          cur.style.display = newDisplay;
        }
        cur = cur.nextElementSibling;
      }

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
const nav = document.querySelector('.nav-links'); 

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

    const cols = Math.floor(width / 30);   
    const rows = 10;                        
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
const courseForm = document.getElementById("courseForm");

if (courseForm) {
  courseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      course_format: document.getElementById("format").value,
      course_category: document.getElementById("category").value.trim(),
      course_title: document.getElementById("title").value.trim(),
      course_theme: document.getElementById("theme").value.trim(),
      organization: document.getElementById("organization").value.trim(),
      course_status: document.getElementById("status").value,
      links: document.getElementById("links").value.trim(),
    };

    let responseMsg = document.getElementById("responseMessage");
    if (!responseMsg) {
      responseMsg = document.createElement("p");
      responseMsg.id = "responseMessage";
      responseMsg.style.marginTop = "20px";
      responseMsg.style.fontWeight = "bold";
      courseForm.appendChild(responseMsg);
    }

    try {
      const response = await fetch("http://localhost:5000/api/courses", {

      // const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        responseMsg.style.color = "green";
        responseMsg.textContent = result.message || "✅ Course submitted successfully!";
        courseForm.reset();
      } else {
        responseMsg.style.color = "red";
        responseMsg.textContent = result.message || "⚠️ Submission failed.";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "❌ Network error. Please try again.";
    }
  });
}

  // === LOAD AND DISPLAY COURSES IN TABLE ===
async function loadCourses() {
  const tableBody = document.getElementById("coursesTable");
  if (!tableBody) return; 

  try {
    const response = await fetch("http://localhost:5000/api/courses");
    const courses = await response.json();

    // Clear existing rows
    tableBody.innerHTML = "";

    if (courses.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 7;
      cell.textContent = "No courses available yet.";
      cell.style.textAlign = "center";
      row.appendChild(cell);
      tableBody.appendChild(row);
      return;
    }

    // Add rows
    courses.forEach((course) => {
      const row = document.createElement("tr");
      row.classList.add("course-row");

      row.innerHTML = `
        <td>${course.course_format || ""}</td>
        <td>${course.course_category || ""}</td>
        <td>${course.course_title || ""}</td>
        <td>${course.course_theme || ""}</td>
        <td>${course.organization || ""}</td>
        <td>${course.status || ""}</td>
        <td>${course.links ? `<a href="${course.links}" target="_blank">View</a>` : ""}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading courses:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;color:red;">
          ❌ Failed to load courses. Check server connection.
        </td>
      </tr>`;
  }
}

document.addEventListener("DOMContentLoaded", loadCourses);

  
  // catch (error) {
  //   console.error("Error loading courses:", error);
  //   const tableBody = document.getElementById("coursesBody");
  //   if (tableBody) {
  //     tableBody.innerHTML = `
  //       <tr>
  //         <td colspan="7" style="text-align:center;color:red;">
  //           ❌ Failed to load courses. Check server connection.
  //         </td>
  //       </tr>`;
  //   }
  // }
//}

// Run the loader when page loads
// document.addEventListener("DOMContentLoaded", loadCourses);
