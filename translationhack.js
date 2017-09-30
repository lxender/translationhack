(function translationhackstuff() {
  const arrowString = `<svg src="down_arrow.svg" class="inline_icon inline_icon--short inline_icon--up_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.32 10.91"><path d="M10.66 10.91L0 1.5 1.32 0l9.34 8.24L20 0l1.32 1.5-10.66 9.41"></path></svg>`;
  const button = document.createElement("button");
  button.setAttribute("class", "square_button square_button--transparent u-half_horizontal_margins drop-target drop-element-attached-top drop-target-attached-bottom drop-abutted drop-abutted-left drop-element-attached-left drop-target-attached-left drop-enabled");
  button.innerHTML = "Translations " + arrowString;
  button.addEventListener("click", translationsButtonClick);

  window.addEventListener("click", windowMenuHide);

  const lyricsControls = document.querySelector(".lyrics_controls");
  lyricsControls.insertBefore(button, lyricsControls.childNodes[9]);

  function translationsButtonClick() {
    const dropdownPageEl = document.querySelector(".js-translation-dropdown");
    const dropdownOnPage = (dropdownPageEl === null) ? false : true;

    if(dropdownOnPage === false) {
      const rect = button.getBoundingClientRect();

      const dropdown = document.createElement("div");
      dropdown.setAttribute("class", "js-translation-dropdown drop drop-element drop-element-attached-top drop-target-attached-bottom drop-open-transitionend drop-abutted drop-abutted-left drop-element-attached-left drop-target-attached-left drop-enabled drop-open drop-after-open");
      dropdown.setAttribute("style", "top: 0px; left: 0px; position: absolute;");
      dropdown.style.display = "block";
      dropdown.style.transform = `translateX(${rect.left}px) translateY(${rect.top + rect.height}px)`;

      const dropcontent = document.createElement("div");
      dropcontent.setAttribute("class", "drop-content");
      dropdown.appendChild(dropcontent);

      const wrapperDiv = document.createElement("div");
      dropcontent.appendChild(wrapperDiv);

      const item = document.createElement("div");
      item.setAttribute("class", "tooltip tooltip--no_padding");
      item.innerHTML = `<div class="tooltip-list_item">Searching...</div>`;
      const translations = getTranslationURLs();
      translations.then((val) => {
        for (var i = 0; i < val.length; i++) {
          item.innerHTML = `<a class="tooltip-list_item" href=${val[i].URL}>${val[i].name}</a>`;
        }
      }, (reason) => {
        item.innerHTML = `<div class="tooltip-list_item">N/A</div>`;
      });
      wrapperDiv.appendChild(item);
      document.body.appendChild(dropdown);
    } else if(dropdownOnPage === true && dropdownPageEl.style.display !== "none") {
      //If is on page and visible, hide it
      dropdownPageEl.style.display = "none";
    } else if(dropdownOnPage === true && dropdownPageEl.style.display === "none") {
      //If is on page and hidden, unhide it
      dropdownPageEl.style.display = "block";
    }
  }

  function getTranslationURLs() {
    const primaryArtist = TRACKING_DATA["Primary Artist"];
    const songtitle = TRACKING_DATA["Title"];
    const featuredArtists = document.querySelector("expandable-list[collection='song.featured_artists']").innerText;
    const featuredArtistsAsURL = (featuredArtists !== "") ? "feat-" + featuredArtists.replace(/Featuring\W/, "").replace("&", "and").replace(/\n/g, "") + "-" : "";

    const germanURLString = `https://genius.com/Genius-ubersetzungen-${primaryArtist.replace("&", "and").replace(/ /g, "-")}-${songtitle.replace(/\(/g, "").replace(/\)/g, "").replace(/ /g, "-")}-${featuredArtistsAsURL.replace(/ /g, "-")}deutsche-ubersetzung-lyrics`;
    germanURLString.toLowerCase();

    var promise = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.status === 200 && this.readyState === 4) {
          resolve([{"name": "German", "URL": germanURLString}]);
        } else if(this.status === 404 && this.readyState === 4) {
          reject(false);
        }
      }
      xhttp.open("GET", germanURLString, true);
      xhttp.send();
    });
    return promise;
  }

  function windowMenuHide(e) {
    const dropdownElement = document.querySelector(".js-translation-dropdown");
    if(e.target.classList.contains("js-translation-dropdown") === false && dropdownElement !== null && e.target.classList.contains("square_button") === false) {
      if(dropdownElement.style.display === "block") {
        dropdownElement.style.display = "none";
      }
    }
  }
})()
