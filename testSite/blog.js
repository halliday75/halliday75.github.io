import data from 'blog.json' assert { type: 'json' };
let blogPosts = data;
console.log(data);
document.write(JSON.stringify(blogPosts));
