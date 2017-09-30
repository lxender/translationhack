(
	() => {
		if (typeof translationButtonHere === "undefined") {
			translationButtonHere = true;

			songTitle = TRACKING_DATA["Title"];

			$.get(`https://genius.com/api/search?q="Genius Übersetzungen ${songSlug}"`, function(result) {
				translationUrl = result.response.hits[0].result.url;
			});

			arrowSvg = $(".inline_icon.inline_icon--short.inline_icon--up_1")[0].outerHTML;

			button = $("<button>")
				.attr({
					class: "square_button square_button--transparent u-half_horizontal_margins drop-target drop-element-attached-top drop-target-attached-bottom drop-abutted drop-abutted-left drop-element-attached-left drop-target-attached-left",
					onclick: "showTranslationOptions()"
				})
				.html("Translations " + arrowSvg)
				.insertBefore($(".lyrics_controls")[0].lastElementChild);

			showTranslationOptions = function() {
				dropdownOnPage = !!$(".js-translation-dropdown")[0];

				if (!dropdownOnPage) {
					style = getComputedStyle(button[0]);

					["padding", "margin", "border"].forEach(function(item) {
						window[item] = {
							left: parseInt(style[item + "Left"]),
							right: parseInt(style[item + "Right"]),
							top: parseInt(style[item + "Top"]),
							bottom: parseInt(style[item + "Bottom"])
						}
					})

					rect = button[0].getBoundingClientRect();

					rect = {
						left: rect.left - margin.left,
						right: rect.right - margin.right - padding.left - padding.right,
						top: rect.top - margin.top,
						bottom: rect.bottom - margin.bottom - padding.top - padding.bottom - border.bottom
					};

					rect.height = rect.bottom - rect.top;
					rect.width = rect.right - rect.left;

					$("body")
						.append($("<div>")
							.attr({
								class: "js-translation-dropdown drop drop-element drop-element-attached-top drop-target-attached-bottom drop-open-transitionend drop-abutted drop-abutted-left drop-element-attached-left drop-target-attached-left drop-enabled drop-open drop-after-open",
								style: `top: 0px; left: 0px; position: absolute; display: block; transform: translateX(${rect.left}px) translateY(${rect.top + rect.height}px)`
							})
							.append($("<div>")
								.attr({
									class: "drop-content"
								})
								.append($("<div>")
									.append($("<div>")
										.attr({
											class: "tooltip tooltip--no_padding"
										})
										.append(
											$("<a>")
											.attr({
												class: "tooltip-list_item",
												href: translationUrl
											})
											.text("German")
										)

									)

								)

							))

					dropdownElement = $(".js-translation-dropdown");

					window.addEventListener("click", (e) => {
						if (e.target.classList.contains("js-translation-dropdown") === false && !!dropdownElement && e.target.classList.contains("square_button") === false) {
							if (dropdownElement.css("display") === "block") {
								dropdownElement.css({
									display: "none"
								});

								dropdownHidden = true;
							}
						}
					});

				}
				else {
					if (dropdownHidden) {
						dropdownElement.css({
							display: "block"
						});

						dropdownHidden = false;

					}
					else {
						dropdownElement.css({
							display: "none"
						});

						dropdownHidden = true;

					}
				}
			}

		}
	}
)()
