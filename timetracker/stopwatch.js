    class StopwatchManager {
      constructor() {
        this.stopwatches = [];
        this.animationFrameId = null;
      }

      createStopwatch(label) {
        const sw = {
          id: Date.now(),
          label,
          time: 0,
          running: false,
          laps: [],
          startTime: null
        };
        this.stopwatches.push(sw);
        StorageManager.saveState(this.stopwatches);
        return sw;
      }

      startStopwatch(sw) {
        if (!sw.running) {
          // Pause any other running stopwatch
          this.stopwatches.forEach(otherSw => {
            if (otherSw.running) {
              otherSw.running = false;
              otherSw.time = Date.now() - otherSw.startTime;
              otherSw.startTime = null;
            }
          });

          // Now start the new one
          sw.running = true;
          sw.startTime = Date.now() - sw.time;
          StorageManager.saveState(this.stopwatches);
        }
      }

      pauseStopwatch(sw) {
        sw.running = false;
        sw.time = Date.now() - sw.startTime;
        sw.startTime = null;
        StorageManager.saveState(this.stopwatches);
      }

      resetStopwatch(sw) {
        sw.running = false;
        sw.time = 0;
        sw.laps = [];
        sw.startTime = null;
        StorageManager.saveState(this.stopwatches);
      }

      addLap(sw) {
        const elapsed = sw.running ? Date.now() - sw.startTime : sw.time;
        sw.laps.push(formatTime(elapsed));
        StorageManager.saveState(this.stopwatches);
      }

      copyTime(sw) {
        const elapsed = sw.running ? Date.now() - sw.startTime : sw.time;
        const text = roundedCopyFormat(elapsed);
        navigator.clipboard.writeText(text).then(() => {
          const msg = document.querySelector(`#copied-${sw.id}`);
          if (msg) {
            msg.classList.add("show");
            setTimeout(() => msg.classList.remove("show"), 1000);
          }
        });
      }

      deleteStopwatch(id, historyManager) {
        const sw = this.stopwatches.find(s => s.id === id);
        if (sw) {
          // If the stopwatch is running, "pause" it first to capture the final time.
          if (sw.running) {
            sw.time = Date.now() - sw.startTime;
            sw.running = false;
          }
          // If the stopwatch has accumulated any time, add it to history.
          if (sw.time > 0) {
            historyManager.addToHistory(sw);
          }
        }
        this.stopwatches = this.stopwatches.filter(sw => sw.id !== id);
        StorageManager.saveState(this.stopwatches);
      }

      findStopwatch(id) {
        return this.stopwatches.find(sw => sw.id === id);
      }

      swapStopwatches(draggedId, dropTargetId) {
        const draggedIndex = this.stopwatches.findIndex(sw => sw.id === draggedId);
        const dropTargetIndex = this.stopwatches.findIndex(sw => sw.id === dropTargetId);

        if (draggedIndex > -1 && dropTargetIndex > -1) {
          [this.stopwatches[draggedIndex], this.stopwatches[dropTargetIndex]] = 
            [this.stopwatches[dropTargetIndex], this.stopwatches[draggedIndex]];
          StorageManager.saveState(this.stopwatches);
        }
      }

      updateRunningTimes() {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        this.animationFrameId = requestAnimationFrame(() => {
          let needsUpdate = false;
          let totalActiveTime = 0;
          let activeCount = 0;
          
          for (const sw of this.stopwatches) {
            if (sw.running) {
              needsUpdate = true;
              activeCount++;
              const el = document.getElementById(`time-${sw.id}`);
              const elapsed = Date.now() - sw.startTime;
              totalActiveTime += elapsed;
              if (el) {
                el.textContent = formatTime(elapsed);
              }
            } else if (sw.time > 0) { // Paused timers
              activeCount++;
              totalActiveTime += sw.time;
            }
          }
          
          const totalTimeDisplay = document.getElementById('totalTimeDisplay');
          const totalTimeValue = document.getElementById('totalTimeValue');
          
          if (activeCount > 0) {
            totalTimeDisplay.classList.add('show');
            totalTimeValue.textContent = formatTotalTime(totalActiveTime);
          } else {
            totalTimeDisplay.classList.remove('show');
          }
          
          if (needsUpdate) {
            this.animationFrameId = requestAnimationFrame(() => this.updateRunningTimes());
          } else {
            this.animationFrameId = null;
          }
        });
      }
    }