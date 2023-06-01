import data from 'blog.json' assert { type: 'json' };
let blogPosts = data;
console.log(data);
for (var i = 0; i < 10; i++) {
  document.write("<p>" + blogPosts[i].title + "</p>");
}
