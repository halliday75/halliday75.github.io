    class UIManager {
      constructor(stopwatchManager) {
        this.stopwatchManager = stopwatchManager;
        this.selectedStopwatchId = null;
        this.isListView = false;
        this.showingHistory = false;
        
        this.container = document.getElementById('container');
        this.toggleLayoutBtn = document.getElementById('toggleLayoutBtn');
        this.toggleViewBtn = document.getElementById('toggleViewBtn');
        this.historyContainer = document.getElementById('historyContainer');
      }

      setListView(isListView) {
        this.isListView = isListView;
        this.container.classList.toggle('list-view', isListView);
        if (isListView) {
          this.toggleLayoutBtn.textContent = 'Grid';
          this.toggleLayoutBtn.setAttribute('data-tooltip', 'Switch to Grid View');
        } else {
          this.toggleLayoutBtn.textContent = 'List';
          this.toggleLayoutBtn.setAttribute('data-tooltip', 'Switch to List View');
        }
        StorageManager.saveLayout(isListView);
      }

      toggleView() {
        this.showingHistory = !this.showingHistory;
        if (this.showingHistory) {
          this.container.style.display = 'none';
          this.historyContainer.style.display = 'block';
          this.toggleViewBtn.textContent = 'Timers';
        } else {
          this.historyContainer.style.display = 'none';
          this.container.style.display = '';
          this.toggleViewBtn.textContent = 'History';
        }
      }

      editLabel(e, onComplete) {
        const labelEl = e.target;
        const swId = parseInt(labelEl.dataset.id, 10);
        const sw = this.stopwatchManager.findStopwatch(swId);
        if (!sw) return;

        const currentLabel = sw.label;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentLabel;
        input.className = 'label-edit-input';
        
        labelEl.replaceWith(input);
        input.focus();
        input.select();

        const save = () => {
          const newLabel = input.value.trim();
          if (newLabel && newLabel !== currentLabel) {
            sw.label = newLabel;
            StorageManager.saveState(this.stopwatchManager.stopwatches);
          }
          onComplete();
        };

        input.addEventListener('blur', save);
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            save();
          } else if (e.key === 'Escape') {
            onComplete();
          }
        });
      }

      render() {
        this.container.innerHTML = "";
        for (const sw of this.stopwatchManager.stopwatches) {
          const card = document.createElement("div");
          card.className = "stopwatch";
          if (sw.running) card.classList.add('running');
          else if (sw.time > 0) card.classList.add('paused');
          if (sw.id === this.selectedStopwatchId) card.classList.add('selected');

          card.setAttribute("draggable", "true");
          card.dataset.id = sw.id;

          card.innerHTML = `
            <button class="close-btn" data-tooltip="Delete Stopwatch" aria-label="Delete stopwatch">&times;</button>
            <div class="label" data-id="${sw.id}">${sw.label}</div>
            <div class="time" id="time-${sw.id}" data-tooltip="Copy rounded time to clipboard">${formatTime(sw.running ? Date.now() - sw.startTime : sw.time)}</div>
            <div class="buttons">
              <button class="start">${sw.running ? "Pause" : "Start"}</button>
              <button class="reset">Reset</button>
              <button class="lap" ${sw.running ? "" : "disabled"}>Lap</button>
            </div>
            <div class="copied-msg" id="copied-${sw.id}">Copied!</div>
            <div class="laps">${sw.laps.map(lap => `<div>${lap}</div>`).join('')}</div>
          `;

          this.container.appendChild(card);
          if (sw.id === this.selectedStopwatchId) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
        this.stopwatchManager.updateRunningTimes();
      }

      setSelectedStopwatch(id) {
        this.selectedStopwatchId = id;
      }

      getSelectedStopwatch() {
        return this.selectedStopwatchId;
      }

      clearSelection() {
        this.selectedStopwatchId = null;
      }
    }