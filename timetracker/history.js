    class HistoryManager {
      constructor() {
        this.history = [];
      }

      addToHistory(sw) {
        this.history.push({
          label: sw.label,
          time: sw.time,
          finishedAt: new Date().toISOString()
        });
        StorageManager.saveHistory(this.history);
      }

      restoreFromHistory(index, stopwatchManager) {
        if (index < 0 || index >= this.history.length) return;

        // Remove from history and get the entry
        const [entry] = this.history.splice(index, 1);

        // Create a new stopwatch from the history entry
        const sw = {
          id: Date.now(),
          label: entry.label,
          time: entry.time,
          running: false,
          laps: [], // Laps are not stored in history, so start fresh
          startTime: null
        };

        stopwatchManager.stopwatches.push(sw);
        StorageManager.saveState(stopwatchManager.stopwatches);
        StorageManager.saveHistory(this.history);
        
        return sw;
      }

      deleteHistoryEntry(index) {
        this.history.splice(index, 1);
        StorageManager.saveHistory(this.history);
      }

      renderHistory() {
        const tbody = document.querySelector("#historyTable tbody");
        tbody.innerHTML = this.history.map((entry, index) => {
          const date = new Date(entry.finishedAt);
          return `
            <tr>
              <td data-label="Label">${entry.label}</td>
              <td data-label="Total Time">${formatTimeFull(entry.time)}</td>
              <td data-label="Date Finished">${date.toLocaleString()}</td>
              <td data-label="Actions" class="history-actions">
                <button class="history-restore-btn" data-index="${index}" data-tooltip="Restore to active timers">Restore</button>
                <button class="history-copy-btn" data-time-ms="${entry.time}" data-tooltip="Copy rounded time">Copy Time</button>
                <button class="history-delete-btn" data-index="${index}" data-tooltip="Delete this entry">Delete</button>
              </td>
            </tr>
          `;
        }).join('');
      }

      exportHistoryToCsv() {
        if (this.history.length === 0) return alert("No history to export.");

        const header = ["Label", "Total Time", "Date Finished"];
        const rows = this.history.map(entry => [
          `"${entry.label.replace(/"/g, '""')}"`,
          `"${formatTimeFull(entry.time)}"`,
          `"${new Date(entry.finishedAt).toLocaleString()}"`
        ]);
        const csvContent = [header.join(","), ...rows.map(r => r.join(","))].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "stopwatch_history.csv";
        a.click();
        URL.revokeObjectURL(url);
      }

      copyHistoryToClipboard() {
        if (this.history.length === 0) return alert("No history to copy.");

        const lines = this.history.map(entry =>
          `${entry.label}\t${formatTimeFull(entry.time)}\t${new Date(entry.finishedAt).toLocaleString()}`
        );
        const text = "Label\tTotal Time\tDate Finished\n" + lines.join("\n");

        navigator.clipboard.writeText(text).then(() => {
          alert("History copied to clipboard");
        });
      }
    }