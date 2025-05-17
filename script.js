document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const fileInput = document.getElementById('file-input');
  const projectDescription = document.getElementById('project-description');
  const analyzeBtn = document.getElementById('analyze-btn');
  const feedbackSection = document.getElementById('feedback-section');
  const feedbackOutput = document.getElementById('feedback-output');
  const projectGrid = document.getElementById('project-grid');

  // Load theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Store projects in memory (could be extended to localStorage or backend)
  const projects = [];

  function displayProjects() {
    projectGrid.innerHTML = '';
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';

      if (project.imageSrc) {
        const img = document.createElement('img');
        img.src = project.imageSrc;
        img.alt = 'Project Image';
        img.className = 'project-image';
        card.appendChild(img);
      }

      if (project.description) {
        const desc = document.createElement('div');
        desc.className = 'project-description';
        desc.textContent = project.description;
        card.appendChild(desc);
      }

      projectGrid.appendChild(card);
    });
  }

  function simulateAIFeedback(input) {
    // Placeholder AI feedback logic
    if (!input) {
      return "Please upload an image or enter a project description for analysis.";
    }
    return "AI Feedback: To improve your project, consider enhancing the color contrast and simplifying the layout for better visual appeal.";
  }

  analyzeBtn.addEventListener('click', () => {
    let inputText = projectDescription.value.trim();
    let file = fileInput.files[0];
    if (!file && !inputText) {
      alert('Please upload an image or enter a project description.');
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageSrc = e.target.result;
        projects.push({ imageSrc, description: inputText });
        displayProjects();
        const feedback = simulateAIFeedback(inputText || 'image');
        feedbackOutput.textContent = feedback;
        feedbackSection.hidden = false;
        // Clear inputs
        fileInput.value = '';
        projectDescription.value = '';
      };
      reader.readAsDataURL(file);
    } else {
      projects.push({ imageSrc: null, description: inputText });
      displayProjects();
      const feedback = simulateAIFeedback(inputText);
      feedbackOutput.textContent = feedback;
      feedbackSection.hidden = false;
      // Clear inputs
      projectDescription.value = '';
    }
  });

  // Initial display (empty)
  displayProjects();
});
