import data from 'https://halliday75.github.io/testSite/blog.json' assert { type: 'json' };
console.log(data);
posts = JSON.parse(data);
document.write("<p>" + posts.blogPosts[0].title + "</p>");
