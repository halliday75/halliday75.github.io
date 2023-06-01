import data from 'https://halliday75.github.io/testSite/blog.json' assert { type: 'json' };
console.log(data);
function writePosts(){
  document.write("<p>" + data.blogPosts[0].title + "</p>");
}
