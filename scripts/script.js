document.getElementById('mood-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const mood = document.getElementById('mood-select').value;
  const trigger = document.getElementById('trigger').value.trim();
  const note = document.getElementById('note').value.trim();
  const time = new Date().toLocaleString();

  if (!mood) {
    alert("Please select a mood.");
    return;
  }

  const entry = { mood, trigger, note, time };
  let log = JSON.parse(localStorage.getItem('vipul-reflection-log') || '[]');
  log.push(entry);
  localStorage.setItem('vipul-reflection-log', JSON.stringify(log));

  // Optionally update SVG here
  updateTimeline(log);

  document.getElementById('mood-form').reset();
});

function updateTimeline(log) {
  const svg = document.getElementById('mood-svg');
  svg.innerHTML = ''; // Clear existing visuals

  const moods = {
    calm: '#6bc5a4',
    anxious: '#e67e7e',
    creative: '#f4c95d',
    focused: '#5a8dee',
    overwhelmed: '#b57edc'
  };

  log.slice(-10).forEach((entry, index) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", 40 + index * 60);
    circle.setAttribute("cy", 100);
    circle.setAttribute("r", 20);
    circle.setAttribute("fill", moods[entry.mood] || "#ccc");
    circle.setAttribute("stroke", "#333");
    circle.setAttribute("stroke-width", "1");

    const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "title");
    tooltip.textContent = `${entry.mood} – ${entry.trigger || 'No trigger'} – ${entry.time}`;
    circle.appendChild(tooltip);

    svg.appendChild(circle);
  });
}

// Initialize if data exists
window.onload = () => {
  const data = localStorage.getItem('vipul-reflection-log');
  if (data) updateTimeline(JSON.parse(data));
};
