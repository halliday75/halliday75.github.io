import data from 'blog.json' assert { type: 'json' };
console.log(data);
var size = Object.keys(data.blogPosts).length;
for (var i = 0; i < size; i++) {
  document.getElementById('posts').innerHTML += "<h3>" + data.blogPosts[i].title + "</h3><p>" + data.blogPosts[i].content + "</p><p>" + data.blogPosts[i].author + " - " + data.blogPosts[i].date + "</p>";
}
