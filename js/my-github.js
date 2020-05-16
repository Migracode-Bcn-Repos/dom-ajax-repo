const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const URL = "https://api.github.com/users/leandroviajando/repos";
const REPOS_LIST_ID = "repos-list";
const REPOS_COUNT_ID = "repos-count";
const FILTER_BY_USER_FORM_ID = "filter-repos-by-user";
const FILTER_BY_USER_INPUT_ID = "filter-repos-by-user-input";

const reposListElement = document.getElementById(REPOS_LIST_ID);
reposListElement.innerHTML = null;

const reposCountElement = document.getElementById(REPOS_COUNT_ID);

updatePage();

const reposFilterFormElement = document.getElementById(FILTER_BY_USER_FORM_ID);
const reposFilterInputElement = document.getElementById(
  FILTER_BY_USER_INPUT_ID
);
reposFilterFormElement.addEventListener("submit", event => {
  event.preventDefault();
  updatePage(reposFilterInputElement.value);
  reposFilterInputElement.value = "";
});

function updatePage(userId) {
  reposListElement.innerHTML = null;
  fetch(
    PROXY_URL + (userId ? `https://api.github.com/users/${userId}/repos` : URL)
  )
    .then(response => response.json())
    .then(repos => {
      updateList(repos);
      updateCount(repos);
    });
}

function updateList(repos) {
  repos.forEach(repo => {
    const listItemLinkElement = document.createElement("a");
    listItemLinkElement.appendChild(document.createTextNode(repo.name));
    listItemLinkElement.setAttribute("href", repo.html_url);

    const listItemElement = document.createElement("li");
    listItemElement.appendChild(listItemLinkElement);

    reposListElement.appendChild(listItemElement);
  });
}

function updateCount(repos) {
  reposCountElement.innerText = repos.length;
  repos.length &&
    reposCountElement.setAttribute("href", repos[0].owner.html_url);
}
