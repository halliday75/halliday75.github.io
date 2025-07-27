    class ModalManager {
      constructor() {
        this.modalOverlay = document.getElementById('modalOverlay');
        this.createModal = document.getElementById('createModal');
        this.deleteModal = document.getElementById('deleteModal');
        this.deleteHistoryModal = document.getElementById('deleteHistoryModal');
        this.labelInput = document.getElementById('labelInput');
        
        this.deleteId = null;
        this.deleteHistoryIndex = null;
        
        this.setupEventListeners();
      }

      setupEventListeners() {
        // Create modal events
        document.getElementById('confirmAdd').addEventListener('click', () => this.handleConfirmAdd());
        document.getElementById('cancelAdd').addEventListener('click', () => this.closeModal());
        
        // Delete modal events
        document.getElementById('confirmDelete').addEventListener('click', () => this.handleConfirmDelete());
        document.getElementById('cancelDelete').addEventListener('click', () => this.handleCancelDelete());
        
        // Delete history modal events
        document.getElementById('confirmHistoryDelete').addEventListener('click', () => this.handleConfirmHistoryDelete());
        document.getElementById('cancelHistoryDelete').addEventListener('click', () => this.handleCancelHistoryDelete());
        
        // Input events
        this.labelInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') document.getElementById('confirmAdd').click();
          if (e.key === 'Escape') document.getElementById('cancelAdd').click();
        });
      }

      showCreateModal() {
        this.labelInput.value = '';
        this.modalOverlay.style.display = 'flex';
        this.createModal.style.display = 'block';
        this.deleteModal.style.display = 'none';
        this.deleteHistoryModal.style.display = 'none';
        this.labelInput.focus();
      }

      showDeleteModal(id) {
        this.deleteId = id;
        this.modalOverlay.style.display = 'flex';
        this.createModal.style.display = 'none';
        this.deleteModal.style.display = 'block';
        this.deleteHistoryModal.style.display = 'none';
      }

      showHistoryDeleteModal(index) {
        this.deleteHistoryIndex = index;
        this.modalOverlay.style.display = 'flex';
        this.createModal.style.display = 'none';
        this.deleteModal.style.display = 'none';
        this.deleteHistoryModal.style.display = 'block';
      }

      closeModal() {
        this.modalOverlay.style.display = 'none';
        this.createModal.style.display = 'block';
        this.deleteModal.style.display = 'none';
        this.deleteHistoryModal.style.display = 'none';
        this.labelInput.value = '';
      }

      isModalOpen() {
        return this.modalOverlay.style.display !== 'none';
      }

      handleConfirmAdd() {
        const label = this.labelInput.value.trim() || `Stopwatch ${window.app.stopwatchManager.stopwatches.length + 1}`;
        window.app.stopwatchManager.createStopwatch(label);
        window.app.uiManager.render();
        this.closeModal();
      }

      handleConfirmDelete() {
        if (this.deleteId !== null) {
          window.app.stopwatchManager.deleteStopwatch(this.deleteId, window.app.historyManager);
          this.deleteId = null;
          window.app.uiManager.clearSelection();
          window.app.uiManager.render();
          this.closeModal();
        }
      }

      handleCancelDelete() {
        this.deleteId = null;
        this.closeModal();
      }

      handleConfirmHistoryDelete() {
        if (this.deleteHistoryIndex !== null) {
          window.app.historyManager.deleteHistoryEntry(this.deleteHistoryIndex);
          this.deleteHistoryIndex = null;
          window.app.historyManager.renderHistory();
          this.closeModal();
        }
      }

      handleCancelHistoryDelete() {
        this.deleteHistoryIndex = null;
        this.closeModal();
      }
    }