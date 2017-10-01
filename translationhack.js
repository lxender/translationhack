(
	() => {
		if (typeof translationButtonHere === "undefined") {
			translationButtonHere = true;

			songTitle = TRACKING_DATA["Title"];

			dropContent = $("<div>")
				.append($("<div>")
					.attr({
						class: "tooltip tooltip--no_padding"
					})
				);

			arrowSvg = $(".inline_icon.inline_icon--short.inline_icon--up_1")[0].outerHTML;

			button = $("<button>")
				.attr({
					class: "translation-button square_button square_button--transparent u-half_horizontal_margins",
					style: "outline: none;"
				})
				.html("Translations " + arrowSvg)
				.insertBefore($(".lyrics_controls")[0].lastElementChild);

			$.get(`https://genius.com/api/search?q="Genius Übersetzungen ${songTitle}"`).done((result) => {
				translationUrl = result.response.hits[0].result.url;

				$($(dropContent)[0].children[0])
					.append(() => {
							if (TRACKING_DATA["Title"].indexOf("[Deutsche Übersetzung]") != -1) {
								$(".translation-button").remove();

								alert("This is already a translation!");

								return "";
							}
							else {
								return $("<a>")
									.attr({
										class: "tooltip-list_item",
										href: translationUrl
									})
									.text("German")

							}
						}

					);

			}).fail(() => {
				$($(dropContent)[0].children[0])
					.append($("<a>")
						.attr({
							class: "tooltip-list_item",
							href: "https://genius.com/new"

						})
						.text("Not found. Add one!")
					);
			}).always(() => {
				dropInstance = new Drop({
					target: $('.translation-button')[0],
					content: dropContent[0],
					position: "bottom left",
					hoverOpenDelay: 250,
					constrainToScrollParent: true,
					constrainToWindow: true,
					openOn: "click",
					remove: true,
					tetherOptions: {
						constraints: [{
								to: "scrollParent",
								pin: "top, bottom",
								attachment: "together none"
							},
							{
								to: "window",
								attachment: "together"
							},
						]
					}
				})
			});

		}
	}
)()
