import {
  a,
  div,
  h2,
  img,
  p,
  span
} from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  let container = block.closest('.promotional-banner-container');
  if (!container) return;

  let classList = container.classList;

  let variantMap = {
    // Promotional banner variants
    'banner-varient1': bannerType1,
    'banner-varient2': bannerType1,
    'banner-varient3': bannerType3,
    'banner-varient4': bannerType4,

    // Hitech banner variants
    'hitech-banner-variant1': hitechBanner,
    'hitech-banner-variant2': hitechBanner,
    'hitech-banner-variant3': hitechBanner,
    'hitech-banner-variant4': hitechBanner,
  };

  let matchedVariant = Object.keys(variantMap).find((variant) =>
    classList.contains(variant)
  );

  if (matchedVariant) {
    block.append(variantMap[matchedVariant](block));
  }
}


function bannerType1(block) {
  let source = window.innerWidth > 1024 ? block?.querySelectorAll("picture img")[0]?.src.trim() : block.querySelectorAll("picture img")[1]?.src.trim();
  source = block.querySelectorAll("picture img").length > 1 ? source : block?.querySelectorAll("picture img")[0]?.src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
  let buttons = block.querySelectorAll("a");
  let fisrtAnchorText = buttons[0]?.innerText.trim() || "";
  let fisrtAnchorHref = buttons[0]?.href.trim() || "";
  let fisrtAnchorTitle = buttons[0]?.title.trim() || "";
  let secondAnchorText = buttons[1]?.innerText?.trim() || "";
  let secondAnchorHref = buttons[1]?.href.trim() || "";
  let secondAnchorTitle = buttons[1]?.title.trim() || "";

  const promotionalBanner =
    div({
        class: "promotionalbanner promotionalbanner-content block type1",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },
      // -------- Image Section --------
      div({
          class: "bannner-image"
        },
        div({},
          img({
            loading: "eager",
            fetchpriority: "high",
            alt: "",
            src: `${source}`,
          })
        )
      ),
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({
            class: "grid-content"
          },
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            heading
          ),
          p({},
            description
          ),
          p({
              class: "redirections"
            },
            a({
                href: `${fisrtAnchorHref}`,
                title: `${fisrtAnchorTitle}`
              },
              fisrtAnchorText
            ),
            " ",
            a({
                href: `${secondAnchorHref}`,
                title: `${secondAnchorTitle}`
              },
              secondAnchorText
            )
          )
        )
      ),
    );
  block.textContent = '';

  return promotionalBanner;
}

function bannerType3(block) {
  let source = window.innerWidth > 1024 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0].src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
    let buttons = block.querySelectorAll("a");
  let fisrtAnchorText = buttons[0]?.innerText.trim() || "";
  let fisrtAnchorHref = buttons[0]?.href.trim() || "";
  let fisrtAnchorTitle = buttons[0]?.title.trim() || "";
  let secondAnchorText = buttons[1]?.innerText?.trim() || "";
  let secondAnchorHref = buttons[1]?.href.trim() || "";
  let secondAnchorTitle = buttons[1]?.title.trim() || "";
  const promotionalBanner =
    div({
        class: "promotionalbanner promotionalbanner-content block type1",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },
      // -------- Image Section --------
      div({
          class: "bannner-image desktop-img"
        },
        div({},
          img({
            loading: "eager",
            fetchpriority: "high",
            alt: "",
            src: `${source}`,
          })
        )
      ),
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({
            class: "grid-content"
          },
          div({},
            h2({
                id: "upgrade-to-smarter-stronger-rewards"
              },
              heading
            ),
          ),
          // -------- Image Section --------
          div({
              class: "bannner-image mob-img"
            },
            div({},
              img({
                loading: "eager",
                fetchpriority: "high",
                alt: "",
                src: `${source}`,
              })
            )
          ),
          div({
              class: "bottom-content"
            },
            p({},
              description
            ),
            p({
                class: "redirections"
              },
              a({
                  href: `${fisrtAnchorHref}`,
                  title: `${fisrtAnchorTitle}`
                },
                fisrtAnchorText
              ),
              a({
                  href: `${secondAnchorHref}`,
                  title: `${secondAnchorTitle}`
                },
                secondAnchorText
              )
            )
          )
        ),
      ),
    );

  block.textContent = '';

  return promotionalBanner;
}

function bannerType4(block) {
  let source = window.innerWidth > 1024 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0].src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
  block.closest(".promotional-banner-container").style.background = `url(${source}) center / cover no-repeat`;

    let buttons = block.querySelectorAll("a");
  let fisrtAnchorText = buttons[0]?.innerText.trim() || "";
  let fisrtAnchorHref = buttons[0]?.href.trim() || "";
  let fisrtAnchorTitle = buttons[0]?.title.trim() || "";
  let secondAnchorText = buttons[1]?.innerText?.trim() || "";
  let secondAnchorHref = buttons[1]?.href.trim() || "";
  let secondAnchorTitle = buttons[1]?.title.trim() || "";

  const promotionalBanner =
    div({
        class: "promotionalbanner promotionalbanner-content block type1",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({
            class: "grid-content"
          },
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            heading
          ),
          p({},
            description
          ),
          p({
              class: "redirections"
            },
            a({
                href: `${fisrtAnchorHref}`,
                title: `${fisrtAnchorTitle}`
              },
              fisrtAnchorText
            ),
            " ",
            a({
                href: `${secondAnchorHref}`,
                title: `${secondAnchorTitle}`
              },
              secondAnchorText
            )
          )
        )
      ),
    );
  block.textContent = '';

  return promotionalBanner;
}

function hitechBanner(block) {
  let source = window.innerWidth > 1024 ? block?.querySelectorAll("picture img")[0]?.src.trim() : block.querySelectorAll("picture img")[1]?.src.trim();
  source = block.querySelectorAll("picture img").length > 1 ? source : block?.querySelectorAll("picture img")[0]?.src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
  let buttons = block.querySelectorAll("a");
  let fisrtAnchorText = buttons[0]?.innerText.trim() || "";
  let fisrtAnchorHref = buttons[0]?.href.trim() || "";
  let fisrtAnchorTitle = buttons[0]?.title.trim() || "";
  let redirectionArrow = block.querySelector(".icon img")?.src?.trim() || "";

  const promotionalBanner =
    div({
        class: "promotionalbanner promotionalbanner-content block type1",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },
      // -------- Image Section --------
      div({
          class: "bannner-image"
        },
        div({},
          img({
            loading: "eager",
            fetchpriority: "high",
            alt: "",
            src: `${source}`,
          })
        )
      ),
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({
            class: "grid-content"
          },
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            heading
          ),
          p({},
            description
          ),
          p({
              class: "redirections"
            },
            a({
                href: `${fisrtAnchorHref}`,
                title: `${fisrtAnchorTitle}`
              },
              fisrtAnchorText,
              redirectionArrow ? span(img({ src: redirectionArrow, alt: "" })) : ""
            ),
          )
        )
      ),
    );
  block.textContent = '';

  return promotionalBanner;
}