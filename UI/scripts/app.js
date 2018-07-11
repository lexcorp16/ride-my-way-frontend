(function app() {
  const nav = document.getElementById('nav');
  const listItems = nav.getElementsByTagName('li');
  const windowLocationLen = window.location.href.split('/').length;
  const current = window.location.href.split('/')[windowLocationLen - 1];

  for (let listItem of listItems) {
    const anchorTagHref = listItem.children[0].href.split('/')[windowLocationLen - 1] || '';

    if (anchorTagHref.indexOf(current) !== -1) {
      listItem.children[0].className += " link-active";
    }
  }
}());
