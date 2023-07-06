function startContext(w, o) {
      try {
        var h = document.getElementsByTagName('head')[0];
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = 1;
        s.crossOrigin = 'anonymous';
        s.src = '//d2c7xlmseob604.cloudfront.net/tracker.min.js';
        s.onload = function () {
          w.SmartlingContextTracker.init({ orgId: o });
        };
        h.insertBefore(s, h.firstChild);
      } catch (ex) {
      }
    }
startContext(window, 'oiWelnQtGz-UjmA4j40ROg');
import data from './blog.json' assert { type: 'json' };
var size = Object.keys(data.blogPosts).length;
for (var i = 0; i < size; i++) {
  document.getElementById('posts').innerHTML += "<article><h3>" + data.blogPosts[i].title + "</h3><p>" + data.blogPosts[i].content + "</p><p>" + data.blogPosts[i].author + " - " + data.blogPosts[i].date + "</p></article>";
}
