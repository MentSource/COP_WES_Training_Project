// Example: Simple filter logic for demo
document.getElementById("clearFilters").addEventListener("click", () => {
  document.getElementById("courseSearch").value = "";
  alert("Filters cleared!");
});

document.querySelector(".back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Clear Filters
document.getElementById("clearFilters").addEventListener("click", () => {
  document.getElementById("courseSearch").value = "";
  alert("Filters cleared!");
});

// Back to top
document.querySelector(".back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Collapsible filters
document.querySelectorAll(".collapsible").forEach(btn => {
  btn.addEventListener("click", () => {
    let content = btn.nextElementSibling;
    content.style.display = (content.style.display === "block") ? "none" : "block";
  });
});

// Toggle course details
document.querySelectorAll(".toggle-details").forEach(button => {
  button.addEventListener("click", (e) => {
    const details = e.target.closest(".course-item").querySelector(".course-details");
    details.style.display = (details.style.display === "block") ? "none" : "block";
    e.target.textContent = details.style.display === "block" ? "▲" : "▼";
  });
});

// Toggle course details with icon rotation
// document.querySelectorAll(".toggle-details").forEach(button => {
//   button.addEventListener("click", (e) => {
//     const courseItem = e.target.closest(".course-item");
//     const details = courseItem.querySelector(".course-details");
//     const icon = button.querySelector("img"); // select the image inside the button

    // Toggle visibility of the details
    // const isVisible = details.style.display === "block";
    // details.style.display = isVisible ? "none" : "block";

    // Toggle rotation of the icon instead of replacing it
//     if (icon) {
//       icon.classList.toggle("rotated", !isVisible);
//     }
//   });
// });

// Dropdown toggle for career sectors
document.querySelectorAll('.dropdown-header').forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.parentElement;
    parent.classList.toggle('open');
  });
});

// Expand/Collapse course details
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".expand-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const row = toggle.closest("tr");
      let nextRow = row.nextElementSibling;
      let isVisible = false;

      // Check if details are visible
      if (nextRow && nextRow.classList.contains("course-details-row")) {
        isVisible = nextRow.style.display === "table-row";
      }

      // Loop until next course-row
      while (nextRow && !nextRow.classList.contains("course-row")) {
        if (nextRow.classList.contains("course-details-row")) {
          nextRow.style.display = isVisible ? "none" : "table-row";
        }
        nextRow = nextRow.nextElementSibling;
      }

      // Update arrow
      toggle.textContent = isVisible ? "▼" : "▲";
    });
  });
});


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


// document.addEventListener("DOMContentLoaded", () => {
//   const toggles = document.querySelectorAll(".expand-toggle");

//   toggles.forEach(toggle => {
//     toggle.addEventListener("click", () => {
//       const row = toggle.closest("tr");
//       const nextRow = row.nextElementSibling;

//       if (nextRow && nextRow.classList.contains("course-details-row")) {
//         const isVisible = nextRow.style.display === "table-row";
//         nextRow.style.display = isVisible ? "none" : "table-row";
//         toggle.textContent = isVisible ? "▼" : "▲"; // change icon
//       }
//     });
//   });
// });

// document.querySelectorAll(".expand-toggle").forEach(toggle => {
//   toggle.addEventListener("click", function () {
//     const detailsRow = this.closest("tr").nextElementSibling;
//     if (detailsRow && detailsRow.classList.contains("course-details-row")) {
//       detailsRow.style.display = 
//         detailsRow.style.display === "table-row" ? "none" : "table-row";
//     }
//   });
// });
