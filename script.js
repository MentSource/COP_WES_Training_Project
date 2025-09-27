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
