document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const h1 = document.createElement("h1");
  h1.textContent = "Dynamically Added Heading";

  const h2 = document.createElement("h2");
  h2.textContent = "Subheading Injected by JS";

  const p1 = document.createElement("p");
  p1.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque et nisl.";

  const p2 = document.createElement("p");
  p2.textContent = "Ut pharetra a justo sit amet consequat. Nulla facilisi. Sed ac lorem non ligula gravida tincidunt.";

  const ul = document.createElement("ul");
  ["Lorem item one", "Lorem item two", "Lorem item three"].forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });

  body.appendChild(h1);
  body.appendChild(h2);
  body.appendChild(p1);
  body.appendChild(p2);
  body.appendChild(ul);
});
