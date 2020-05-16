const URL = "https://api.github.com/users/leandroviajando/repos";
const GITHUB_PAGE_URL = "https://github.com/leandroviajando/";
const UL_ID = "repos-list";
const COUNT_ID = "repos-count";

const list = document.getElementById(UL_ID);
list.innerHTML = null;

const count = document.getElementById(COUNT_ID);

getRepos();

function getRepos() {
  fetch(URL)
    .then(response => response.json())
    .then(repos => {
      updateList(repos);
      updateCount(repos);
    });
}

function updateList(repos) {
  repos.forEach(repo => {
    const link = document.createElement("a");
    link.setAttribute("href", repo.html_url);
    link.innerText = repo.name;

    const listItem = document.createElement("li");
    listItem.appendChild(link);

    list.appendChild(listItem);
  });
}

function updateCount(repos) {
  count.innerText = repos.length;
  count.setAttribute("href", GITHUB_PAGE_URL);
}
