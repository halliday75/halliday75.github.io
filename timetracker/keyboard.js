    class KeyboardManager {
      constructor(uiManager, stopwatchManager, modalManager) {
        this.uiManager = uiManager;
        this.stopwatchManager = stopwatchManager;
        this.modalManager = modalManager;
        this.selectedModalButtonIndex = 0;
        
        this.setupEventListeners();
      }

      setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        document.addEventListener('click', (e) => this.handleDocumentClick(e));
      }

      handleKeydown(e) {
        // If a modal is open, handle modal shortcuts
        if (this.modalManager.isModalOpen()) {
          this.handleModalKeydown(e);
          return;
        }

        // Ignore global shortcuts if typing in an input or in history view
        if (e.target.tagName === 'INPUT' || this.uiManager.showingHistory) {
          return;
        }
        
        // Ignore if no stopwatches
        if (this.stopwatchManager.stopwatches.length === 0) {
          return;
        }

        const key = e.key;
        const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

        if (arrowKeys.includes(key)) {
          e.preventDefault();
          this.handleArrowNavigation(key);
        }

        if (this.uiManager.getSelectedStopwatch() !== null) {
          const sw = this.stopwatchManager.findStopwatch(this.uiManager.getSelectedStopwatch());
          if (!sw) return;

          if (key === 'Enter') {
            e.preventDefault();
            if (sw.running) {
              this.stopwatchManager.pauseStopwatch(sw);
            } else {
              this.stopwatchManager.startStopwatch(sw);
            }
            this.uiManager.render();
          }

          if (key === 'Delete' || key === 'Backspace') {
            e.preventDefault();
            this.modalManager.showDeleteModal(this.uiManager.getSelectedStopwatch());
          }
        }
      }

      handleModalKeydown(e) {
        // Don't interfere with typing in the label input
        if (e.target.tagName === 'INPUT') {
          return;
        }
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          this.selectedModalButtonIndex = 1 - this.selectedModalButtonIndex;
          this.updateModalButtonSelection();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const activeModal = document.querySelector('.modal[style*="display: block"]');
          if (activeModal) {
            const selectedBtn = activeModal.querySelector('.selected-btn');
            if (selectedBtn) selectedBtn.click();
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          const activeModal = document.querySelector('.modal[style*="display: block"]');
          if (activeModal) {
            const cancelButton = activeModal.querySelector('.cancel');
            if (cancelButton) cancelButton.click();
          }
        }
      }

      handleArrowNavigation(key) {
        const firstStopwatchEl = this.uiManager.container.querySelector('.stopwatch');
        if (!firstStopwatchEl) return;

        const containerGap = parseFloat(window.getComputedStyle(this.uiManager.container).gap) || 16;
        const numCols = Math.max(1, Math.floor((this.uiManager.container.clientWidth + containerGap) / (firstStopwatchEl.offsetWidth + containerGap)));
        const numItems = this.stopwatchManager.stopwatches.length;

        let currentIndex = this.stopwatchManager.stopwatches.findIndex(sw => sw.id === this.uiManager.getSelectedStopwatch());

        if (currentIndex === -1) {
          this.uiManager.setSelectedStopwatch(this.stopwatchManager.stopwatches[0].id);
          this.uiManager.render();
          return;
        }

        let nextIndex = currentIndex;
        const numRows = Math.ceil(numItems / numCols);
        const currentRow = Math.floor(currentIndex / numCols);
        const currentCol = currentIndex % numCols;

        if (key === 'ArrowRight') {
          if (currentCol < numCols - 1 && currentIndex + 1 < numItems) {
            nextIndex = currentIndex + 1;
          }
        } else if (key === 'ArrowLeft') {
          if (currentCol > 0) {
            nextIndex = currentIndex - 1;
          }
        } else if (key === 'ArrowDown') {
          if (currentRow < numRows - 1) {
            nextIndex = currentIndex + numCols;
            if (nextIndex >= numItems) {
              nextIndex = numItems - 1;
            }
          }
        } else if (key === 'ArrowUp') {
          if (currentRow > 0) {
            nextIndex = currentIndex - numCols;
          }
        }
        
        if (nextIndex !== currentIndex) {
          this.uiManager.setSelectedStopwatch(this.stopwatchManager.stopwatches[nextIndex].id);
          this.uiManager.render();
        }
      }

      handleDocumentClick(e) {
        // If a stopwatch is selected and the click is not on a stopwatch card
        if (this.uiManager.getSelectedStopwatch() !== null && !e.target.closest('.stopwatch')) {
          this.uiManager.clearSelection();
          this.uiManager.render();
        }
      }

      updateModalButtonSelection() {
        const activeModal = document.querySelector('.modal[style*="display: block"]');
        if (!activeModal) return;

        const buttons = activeModal.querySelectorAll('button');
        buttons.forEach((btn, index) => {
          const targetIndex = buttons.length > 2 ? index - (buttons.length - 2) : index;
          btn.classList.toggle('selected-btn', targetIndex === this.selectedModalButtonIndex);
        });
      }

      resetModalButtonSelection() {
        this.selectedModalButtonIndex = 0;
      }
    }