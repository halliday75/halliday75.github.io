import data from 'https://halliday75.github.io/testSite/blog.json' assert { type: 'json' };
console.log(data);
document.getElementById('main').innerHTML = "<p>" + data.blogPosts[0].title + "</p>";
