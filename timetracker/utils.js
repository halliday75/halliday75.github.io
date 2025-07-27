    function setViewportHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Format time mm:ss:cs
    function formatTime(ms) {
      const min = String(Math.floor(ms / 60000)).padStart(2, '0');
      const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
      const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
      return `${min}:${sec}:${cs}`;
    }

    // Format time as HH:MM:SS
    function formatTotalTime(ms) {
      if (ms < 0) ms = 0;
      const totalSeconds = Math.floor(ms / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }

    // Format time rounded up to nearest 5 min for copying
    function roundedCopyFormat(ms) {
      let totalMinutes = Math.ceil(ms / 60000);
      if (totalMinutes % 5 !== 0) {
        totalMinutes = Math.ceil(totalMinutes / 5) * 5;
      }
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}:${String(minutes).padStart(2, '0')}`;
    }

    // Format full time for history
    function formatTimeFull(ms) {
      const hours = Math.floor(ms / 3600000);
      const minutes = Math.floor((ms % 3600000) / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const parts = [];
      if (hours) parts.push(hours + 'h');
      if (minutes || hours) parts.push(minutes + 'm');
      parts.push(seconds + 's');
      return parts.join(' ');
    }