document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  // Demo switching
  const demoContainers = {
    calories: document.getElementById('demo-calories'),
    plans: document.getElementById('demo-plans'),
    scanner: document.getElementById('demo-scanner'),
  };

  function setActiveDemo(name) {
    Object.entries(demoContainers).forEach(([key, el]) => {
      if (!el) return;
      el.classList.toggle('hidden', key !== name);
    });
    document.querySelectorAll('[data-demo-control]').forEach((btn) => {
      const target = btn.getAttribute('data-demo-control');
      const isActive = target === name;
      btn.classList.toggle('bg-pink-500', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-white/70', !isActive);
      btn.classList.toggle('text-pink-700', !isActive);
    });
  }

  document.querySelectorAll('[data-action="set-demo"]').forEach((el) => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-demo');
      if (name) setActiveDemo(name);
    });
  });

  setActiveDemo('calories');

  // Food logging (simple chip add)
  const foodName = document.getElementById('foodName');
  const foodCalories = document.getElementById('foodCalories');
  const addFoodButton = document.getElementById('addFoodButton');
  const foodList = document.getElementById('foodList');

  if (addFoodButton && foodName && foodCalories && foodList) {
    addFoodButton.addEventListener('click', () => {
      const name = foodName.value.trim();
      const cals = foodCalories.value.trim();
      if (!name || !cals) return;
      const chip = document.createElement('span');
      chip.className = 'px-3 py-1 border border-pink-300 text-pink-700 rounded-full text-sm';
      chip.textContent = `${name} (${cals} kcal)`;
      foodList.appendChild(chip);
      foodName.value = '';
      foodCalories.value = '';
    });
  }

  // Plan selection
  const planCards = document.querySelectorAll('[data-plan]');
  let selectedPlan = null;
  planCards.forEach((card) => {
    card.addEventListener('click', () => {
      const planName = card.getAttribute('data-plan');
      selectedPlan = selectedPlan === planName ? null : planName;
      planCards.forEach((c) => {
        const isActive = c.getAttribute('data-plan') === selectedPlan;
        c.classList.toggle('ring-2', isActive);
        c.classList.toggle('ring-pink-400', isActive);
      });
    });
  });

  // Scanner simulate
  const scanButton = document.getElementById('scanButton');
  const scanArea = document.getElementById('scanArea');
  const recentScans = document.getElementById('recentScans');
  let isScanning = false;

  function renderScanArea() {
    if (!scanArea) return;
    scanArea.innerHTML = isScanning
      ? `<div class="text-center"><div class="text-2xl animate-spin">⏳</div><p class="text-pink-600">Scanning...</p></div>`
      : `<div class="text-center"><div class="text-6xl text-pink-400 mb-2">📷</div><p class="text-pink-600">Point camera at ingredient</p></div>`;
  }

  if (scanButton && scanArea) {
    renderScanArea();
    scanButton.addEventListener('click', () => {
      if (isScanning) return;
      isScanning = true;
      scanButton.textContent = 'Scanning...';
      scanButton.disabled = true;
      scanButton.classList.add('opacity-50');
      renderScanArea();
      setTimeout(() => {
        isScanning = false;
        scanButton.textContent = 'Start Scan';
        scanButton.disabled = false;
        scanButton.classList.remove('opacity-50');
        renderScanArea();
        if (recentScans) {
          const samples = ['🥕 Carrot', '🍎 Apple', '🥒 Cucumber', '🥬 Kale'];
          const item = document.createElement('span');
          item.className = 'px-3 py-1 border border-pink-300 text-pink-700 rounded-full text-sm';
          item.textContent = samples[Math.floor(Math.random() * samples.length)];
          recentScans.prepend(item);
        }
      }, 2000);
    });
  }
});
