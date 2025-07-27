    class StorageManager {
      static saveState(stopwatches) {
        const json = JSON.stringify(stopwatches);
        localStorage.setItem("timeTrackerState", json);
        document.cookie = `timeTrackerState=${encodeURIComponent(json)}; path=/; max-age=${7 * 24 * 60 * 60}`;
      }

      static loadState() {
        let json = localStorage.getItem("timeTrackerState");
        if (!json) {
          const match = document.cookie.match(/(^| )timeTrackerState=([^;]+)/);
          json = match ? decodeURIComponent(match[2]) : null;
        }
        if (json) {
          try {
            return JSON.parse(json);
          } catch (e) {
            console.error("Failed to parse saved state:", e);
            return [];
          }
        }
        return [];
      }

      static saveHistory(history) {
        const json = JSON.stringify(history);
        localStorage.setItem("timeTrackerHistory", json);
      }

      static loadHistory() {
        const json = localStorage.getItem("timeTrackerHistory");
        if (json) {
          try {
            return JSON.parse(json);
          } catch {
            return [];
          }
        }
        return [];
      }

      static loadLayout() {
        return localStorage.getItem('timeTrackerLayout') === 'list';
      }

      static saveLayout(isListView) {
        localStorage.setItem('timeTrackerLayout', isListView ? 'list' : 'grid');
      }
    }