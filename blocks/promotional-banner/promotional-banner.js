import {
  a,
  div,
  h2,
  img,
  p,
  span,
  strong
} from "../../scripts/dom-helpers.js";

/* -----------------------------
   Helpers
------------------------------ */

function getImages(block) {
  const images = block.querySelectorAll("picture img, img");
  if (!images.length) return "";

  if (images.length > 1) {
    return window.innerWidth > 1024 ? images[0].src.trim() : images[1].src.trim();
  }

  return images[0].src.trim();
}

function getText(el) {
  return el?.innerText?.trim() || "";
}

function getButtons(block) {
  const buttons = block.querySelectorAll("a");

  return {
    first: {
      text: getText(buttons[0]),
      href: buttons[0]?.href || "",
      title: buttons[0]?.title || ""
    },
    second: {
      text: getText(buttons[1]),
      href: buttons[1]?.href || "",
      title: buttons[1]?.title || ""
    }
  };
}

function getContent(block) {
  return {
    image: getImages(block),
    heading: getText(block.querySelector("h2")),
    description: getText(block.querySelector("p")),
    buttons: getButtons(block)
  };
}

/* -----------------------------
   Main Decorate
------------------------------ */

export default function decorate(block) {

  const container = block.closest(".promotional-banner-container");
  if (!container) return;

  const variantMap = {
    "banner-variant1": bannerType1,
    "banner-variant2": bannerType1,
    "banner-variant3": bannerType3,
    "banner-variant4": bannerType4,

    "hitech-banner-variant1": hitechBanner,
    "hitech-banner-variant2": hitechBanner,
    "hitech-banner-variant3": hitechBanner,
    "hitech-banner-variant4": hitechBanner,

    "healthcare-banner-variant1": healthcareBanner,
    "healthcare-banner-variant2": healthcareBanner,
    "healthcare-banner-variant3": healthcareBanner,
    "healthcare-banner-variant4": healthcareBanner
  };

  const matchedVariant = Object.keys(variantMap)
    .find((variant) => container.classList.contains(variant));

  if (!matchedVariant) return;

  let content = variantMap[matchedVariant](block);
  block.textContent = "";
  block.append(content);
}

/* -----------------------------
   Banner Variant 1 & 2
------------------------------ */

function bannerType1(block) {

  let {
    image,
    heading,
    description,
    buttons
  } = getContent(block);

  return div({
      class: "promotionalbanner promotionalbanner-content block type1"
    },

    div({
        class: "banner-image"
      },
      img({
        loading: "eager",
        fetchpriority: "high",
        src: image,
        alt: ""
      })
    ),

    div({
        class: "banner-content"
      },
      div({
          class: "grid-content"
        },

        h2({}, heading),

        p({}, description),

        p({
            class: "redirections"
          },

          buttons.first.text &&
          a({
              href: buttons.first.href,
              title: buttons.first.title
            },
            buttons.first.text
          ),

          buttons.second.text &&
          a({
              href: buttons.second.href,
              title: buttons.second.title
            },
            buttons.second.text
          )
        )
      )
    )
  );
}

/* -----------------------------
   Banner Variant 3
------------------------------ */

function bannerType3(block) {

  let {
    image,
    heading,
    description,
    buttons
  } = getContent(block);

  return div({
      class: "promotionalbanner promotionalbanner-content block type3"
    },

    div({
        class: "banner-image desktop-img"
      },
      img({
        loading: "eager",
        fetchpriority: "high",
        src: image,
        alt: ""
      })
    ),

    div({
        class: "banner-content"
      },

      div({
          class: "grid-content"
        },

        div({}, h2({}, heading)),

        div({
            class: "banner-image mob-img"
          },
          img({
            loading: "eager",
            fetchpriority: "high",
            src: image,
            alt: ""
          })
        ),

        div({
            class: "bottom-content"
          },

          p({}, description),

          p({
              class: "redirections"
            },

            buttons.first.text &&
            a({
                href: buttons.first.href,
                title: buttons.first.title
              },
              buttons.first.text
            ),

            buttons.second.text &&
            a({
                href: buttons.second.href,
                title: buttons.second.title
              },
              buttons.second.text
            )
          )
        )
      )
    )
  );
}

/* -----------------------------
   Banner Variant 4
------------------------------ */

function bannerType4(block) {

  let {
    image,
    heading,
    description,
    buttons
  } = getContent(block);

  let container = block.closest(".promotional-banner-container");

  if (container) {
    container.style.background = `url(${image}) `;
  }

  return div({
      class: "promotionalbanner promotionalbanner-content block type4"
    },

    div({
        class: "banner-content"
      },

      div({
          class: "grid-content"
        },

        h2({}, heading),

        p({}, description),

        p({
            class: "redirections"
          },

          buttons.first.text &&
          a({
              href: buttons.first.href,
              title: buttons.first.title
            },
            buttons.first.text
          ),

          buttons.second.text &&
          a({
              href: buttons.second.href,
              title: buttons.second.title
            },
            buttons.second.text
          )
        )
      )
    )
  );
}

/* -----------------------------
   Hitech Banner
------------------------------ */

function hitechBanner(block) {

  let {
    image,
    heading,
    description,
    buttons
  } = getContent(block);

  let arrowIcon = block.querySelector(".icon img")?.src || "";

  return div({
      class: "promotionalbanner promotionalbanner-content block hitech"
    },

    div({
        class: "banner-image"
      },
      img({
        loading: "eager",
        fetchpriority: "high",
        src: image,
        alt: ""
      })
    ),

    div({
        class: "banner-content"
      },

      div({
          class: "grid-content"
        },

        h2({}, heading),

        p({}, description),

        p({
            class: "redirections"
          },

          a({
              href: buttons.first.href,
              title: buttons.first.title
            },

            buttons.first.text,

            arrowIcon ? span(img({
              src: arrowIcon,
              alt: ""
            })) : ""
          )
        )
      )
    )
  );
}


/* -----------------------------
   Banner Variant 3
------------------------------ */

function healthcareBanner(block) {

  let {
    image,
    heading,
    description,
    buttons
  } = getContent(block);
let [title, subtitle] = heading.split(":");
let container = block.closest(".promotional-banner-container").querySelector(".promotional-banner-wrapper");
let presentClass = block.closest(".promotional-banner-container").classList
  if (presentClass.contains("healthcare-banner-variant3") || presentClass.contains("healthcare-banner-variant4")) {
    container.style.background = `url(${image}) center top/ cover no-repeat`;
  }
  return div({
      class: "promotionalbanner promotionalbanner-content block type3"
    },

    div({
        class: "banner-image"
      },
      img({
        loading: "eager",
        fetchpriority: "high",
        src: image,
        alt: ""
      })
    ),

    div({
        class: "banner-content"
      },

      div({
          class: "grid-content"
        },

        div(
  {},
  h2(
    {},
    strong({}, title),
    subtitle ? `: ${subtitle}` : ""
  )
),

        div({
            class: "bottom-content"
          },

          p({}, description),

          p({
              class: "redirections"
            },

            buttons.first.text &&
            a({
                href: buttons.first.href,
                title: buttons.first.title
              },
              buttons.first.text
            ),

            buttons.second.text &&
            a({
                href: buttons.second.href,
                title: buttons.second.title
              },
              buttons.second.text
            )
          )
        )
      )
    )
  );
}