const URL = "https://api.github.com/repos/codeyourfuture/dom-ajax-repo/pulls";
const LIST_ID = "pull-requests-list";
const SEARCH_BOX_ID = "search-box";

const list = document.getElementById(LIST_ID);
list.style.listStyle = "disc inside none";
list.innerHTML = null;

const searchBox = document.getElementById(SEARCH_BOX_ID);

fetch(URL)
  .then(response => response.json())
  .then(prs => {
    updateList(prs);
    searchBox.addEventListener("keyup", event =>
      updateList(prs, event.target.value)
    );
  });

function updateList(prs, searchText) {
  list.innerHTML = null;
  prs
    .filter(pr => (searchText ? pr.user.login.includes(searchText) : true))
    .forEach(pr => {
      const link = document.createElement("a");
      link.setAttribute("href", pr.html_url);
      link.innerText = pr.title;

      const listItem = document.createElement("li");
      listItem.append(link);

      list.appendChild(listItem);
    });
}
