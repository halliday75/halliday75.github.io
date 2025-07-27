    class DragDropManager {
      constructor(uiManager, stopwatchManager) {
        this.uiManager = uiManager;
        this.stopwatchManager = stopwatchManager;
        this.draggedId = null;
        
        this.setupEventListeners();
      }

      setupEventListeners() {
        this.uiManager.container.addEventListener('dragstart', (e) => this.handleDragStart(e));
        this.uiManager.container.addEventListener('dragend', (e) => this.handleDragEnd(e));
        this.uiManager.container.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uiManager.container.addEventListener('drop', (e) => this.handleDrop(e));
      }

      handleDragStart(e) {
        if (e.target.classList.contains('stopwatch')) {
          e.dataTransfer.effectAllowed = 'move';
          this.draggedId = parseInt(e.target.dataset.id, 10);
          setTimeout(() => {
            if (e.target.classList.contains('stopwatch')) {
              e.target.classList.add('dragging');
            }
          }, 0);
        }
      }

      handleDragEnd(e) {
        const draggedEl = document.querySelector('.stopwatch.dragging');
        if (draggedEl) {
          draggedEl.classList.remove('dragging');
        }
        this.draggedId = null;
      }

      handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }

      handleDrop(e) {
        e.preventDefault();
        if (this.draggedId === null) return;

        const dropTargetEl = e.target.closest('.stopwatch');
        if (!dropTargetEl) return;

        const dropTargetId = parseInt(dropTargetEl.dataset.id, 10);
        if (this.draggedId === dropTargetId) return;

        this.stopwatchManager.swapStopwatches(this.draggedId, dropTargetId);
        this.uiManager.render();
      }
    }