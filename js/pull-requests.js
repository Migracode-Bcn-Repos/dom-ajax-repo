const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const URL = "https://api.github.com/repos/codeyourfuture/dom-ajax-repo/pulls";
const PRS_LIST_ID = "pull-requests-list";
const FILTER_BY_USER_ID = "filter-prs-by-user";

const prsListElement = document.getElementById(PRS_LIST_ID);
prsListElement.style.listStyle = "disc inside none";
prsListElement.innerHTML = null;

const filterByUserInputElement = document.getElementById(FILTER_BY_USER_ID);

fetch(PROXY_URL + URL)
  .then(response => response.json())
  .then(prs => {
    updateList(prs);
    filterByUserInputElement.addEventListener("keyup", event =>
      updateList(prs, event.target.value)
    );
  });

function updateList(prs, searchTerm) {
  prsListElement.innerHTML = null;
  prs
    .filter(pr => (searchTerm ? pr.user.login.includes(searchTerm) : true))
    .forEach(pr => {
      const listItemLinkElement = document.createElement("a");
      listItemLinkElement.appendChild(document.createTextNode(pr.title));
      listItemLinkElement.setAttribute("href", pr.html_url);

      const listItemElement = document.createElement("li");
      listItemElement.appendChild(listItemLinkElement);

      prsListElement.appendChild(listItemElement);
    });
}
