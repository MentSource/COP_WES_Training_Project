// Mobile sidebar
const mobileMenu=document.getElementById('mobile-menu');
const sidebar=document.getElementById('sidebar');
mobileMenu.addEventListener('click',()=>sidebar.classList.toggle('show'));

// Sidebar dropdown filters
document.querySelectorAll('.drop-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const list=btn.nextElementSibling;
    list.style.display=list.style.display==='block'?'none':'block';
  });
});

// Dummy data to simulate course list
const courses=[
  {
    title:'Nursing & Midwifery - Cancer Nursing - Beaumont Hospital',
    college:'RCSI University of Medicine and Health Sciences',
    nfq:'9',duration:'1 Year',qqi:'—',points:'—',
    overview:'Enhance your knowledge of professional, clinical, leadership and managerial issues related to the care of the oncology patient and develop key research skills.',
    badges:['Social','Investigative']
  },
  {
    title:'Nursing & Midwifery - Primary Community & Continuing Care',
    college:'RCSI University of Medicine and Health Sciences',
    nfq:'9',duration:'1 Year',qqi:'—',points:'—',
    overview:'Advanced practice for community-based nursing roles.',
    badges:['Social']
  },
  {
    title:'Positive Health Sciences - Leading Workplace Health & Well-being',
    college:'RCSI University of Medicine and Health Sciences',
    nfq:'9',duration:'1 Year',qqi:'—',points:'—',
    overview:'Learn strategies to lead health and wellbeing initiatives in the workplace.',
    badges:['Investigative']
  }
];

const table=document.getElementById('course-table');
const count=document.getElementById('count');
const search=document.getElementById('course-search');
const sort=document.getElementById('sort');

function render(filter=''){
  let list=courses.filter(c=>c.title.toLowerCase().includes(filter.toLowerCase()));
  if(sort.value==='college') list=list.sort((a,b)=>a.college.localeCompare(b.college));
  else list=list.sort((a,b)=>a.title.localeCompare(b.title));

  table.innerHTML='';
  list.forEach(c=>{
    const row=document.createElement('div');
    row.className='course-row';
    row.innerHTML=`
      <div class="row-header">
        <div>
          <div class="course-title">${c.title}</div>
          <div class="row-meta">
            <span>${c.college}</span>
            <span>NFQ ${c.nfq}</span>
            <span>${c.duration}</span>
          </div>
        </div>
        // <div>▼</div>
      </div>
      <div class="row-details">
        <p>${c.overview}</p>
        <p>${c.badges.map(b=>`<span class="badge">${b}</span>`).join(' ')}</p>
        <button class="btn">Full Course Details</button>
      </div>
    `;
    const header=row.querySelector('.row-header');
    header.addEventListener('click',()=>{
      const d=row.querySelector('.row-details');
      const arrow=header.querySelector('div:last-child');
      const open=d.style.display==='block';
      d.style.display=open?'none':'block';
      arrow.textContent=open?'':'';
    });
    table.appendChild(row);
  });
  count.textContent=list.length;
}

search.addEventListener('input',e=>render(e.target.value));
sort.addEventListener('change',()=>render(search.value));
document.getElementById('clear-filters').addEventListener('click',()=>{
  search.value=''; render();
});

render();

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
    dot.style.animationDelay = (Math.random() * 4) + 's';
    dna.appendChild(dot);
  }

  createDNA();
  window.addEventListener('resize', createDNA);
}
