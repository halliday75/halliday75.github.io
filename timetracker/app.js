    class TimeTrackerApp {
      constructor() {
        this.stopwatchManager = new StopwatchManager();
        this.historyManager = new HistoryManager();
        this.uiManager = new UIManager(this.stopwatchManager);
        this.modalManager = new ModalManager();
        this.keyboardManager = new KeyboardManager(this.uiManager, this.stopwatchManager, this.modalManager);
        this.dragDropManager = new DragDropManager(this.uiManager, this.stopwatchManager);
        
        this.initialize();
      }

      initialize() {
        // Mobile viewport height fix
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);

        // Load data
        this.stopwatchManager.stopwatches = StorageManager.loadState();
        this.historyManager.history = StorageManager.loadHistory();
        this.uiManager.setListView(StorageManager.loadLayout());

        // Setup event listeners
        this.setupEventListeners();

        // Initial render
        this.uiManager.render();
      }

      setupEventListeners() {
        // Main add button
        document.getElementById('mainAdd').addEventListener('click', () => {
          this.modalManager.showCreateModal();
        });

        // Layout toggle
        document.getElementById('toggleLayoutBtn').addEventListener('click', () => {
          this.uiManager.setListView(!this.uiManager.isListView);
          this.uiManager.render();
        });

        // View toggle
        document.getElementById('toggleViewBtn').addEventListener('click', () => {
          this.uiManager.toggleView();
          if (this.uiManager.showingHistory) {
            this.historyManager.renderHistory();
          }
        });

        // Export buttons
        document.getElementById('exportCsvBtn').addEventListener('click', () => {
          this.historyManager.exportHistoryToCsv();
        });

        document.getElementById('copyAllBtn').addEventListener('click', () => {
          this.historyManager.copyHistoryToClipboard();
        });

        // Stopwatch interactions
        this.uiManager.container.addEventListener('click', (e) => this.handleStopwatchClick(e));

        // History interactions
        document.querySelector("#historyTable tbody").addEventListener('click', (e) => this.handleHistoryClick(e));
      }

      handleStopwatchClick(e) {
        const card = e.target.closest('.stopwatch');
        if (!card) return;

        // Ignore clicks on the label's edit input
        if (e.target.classList.contains('label-edit-input')) {
          return;
        }

        const id = parseInt(card.dataset.id, 10);
        const sw = this.stopwatchManager.findStopwatch(id);
        if (!sw) return;

        // Set the selection on any click inside the card
        this.uiManager.setSelectedStopwatch(id);

        const target = e.target;
        let needsRender = false;

        if (target.classList.contains('start')) {
          if (sw.running) {
            this.stopwatchManager.pauseStopwatch(sw);
          } else {
            this.stopwatchManager.startStopwatch(sw);
          }
          this.uiManager.render();
        } else if (target.classList.contains('reset')) {
          this.stopwatchManager.resetStopwatch(sw);
          this.uiManager.render();
        } else if (target.classList.contains('lap')) {
          this.stopwatchManager.addLap(sw);
          this.uiManager.render();
        } else if (target.classList.contains('time')) {
          this.stopwatchManager.copyTime(sw);
          needsRender = true;
        } else if (target.classList.contains('close-btn')) {
          this.modalManager.showDeleteModal(id);
          needsRender = true;
        } else if (target.classList.contains('label')) {
          this.uiManager.editLabel(e, () => this.uiManager.render());
        } else {
          needsRender = true;
        }

        if (needsRender) {
          this.uiManager.render();
        }
      }

      handleHistoryClick(e) {
        if (e.target.classList.contains('history-restore-btn')) {
          const index = parseInt(e.target.dataset.index, 10);
          this.historyManager.restoreFromHistory(index, this.stopwatchManager);
          this.uiManager.render();
          this.historyManager.renderHistory();
          this.uiManager.toggleView();
        } else if (e.target.classList.contains('history-delete-btn')) {
          const index = parseInt(e.target.dataset.index, 10);
          this.modalManager.showHistoryDeleteModal(index);
        } else if (e.target.classList.contains('history-copy-btn')) {
          const copyBtn = e.target;
          const timeMs = parseInt(copyBtn.dataset.timeMs, 10);
          const textToCopy = roundedCopyFormat(timeMs);
          navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.textContent;
            const originalTooltip = copyBtn.getAttribute('data-tooltip');
            copyBtn.textContent = 'Copied!';
            copyBtn.setAttribute('data-tooltip', 'Copied!');
            copyBtn.disabled = true;

            setTimeout(() => {
              copyBtn.textContent = originalText;
              copyBtn.setAttribute('data-tooltip', originalTooltip);
              copyBtn.disabled = false;
            }, 1200);
          });
        }
      }
    }

    // Initialize the application
    window.app = new TimeTrackerApp();