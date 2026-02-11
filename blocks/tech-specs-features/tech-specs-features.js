const hardCodeDomains = "https://publish-p153659-e1796191.adobeaemcloud.com/";
const domin = window.location.origin.includes("localhost")
  ? hardCodeDomains
  : window.location.origin;
const url = "/graphql/execute.json/global/hi-tech-component";
async function fetcData() {
  try {
    const response = await fetch(domin + url);
    const data = await response.json();
    const item = data?.data?.hiTechModelList?.items?.[0];
    if (!item) return;
    const cardDetails = item.cardNoLabel.map((no, index) => ({
      cardNoLabel: no,
      cardTitleLabel: item.cardTitleLabel[index]?.html || "",
      cardDescriptionLabel: item.cardDescriptionLabel[index]?.html || "",
    }));
    console.log("Card Details Object:", cardDetails);
  } catch (error) {
    console.error("Error fetching hi-tech data:", error);
  }
}
fetcData();
export default function decorate(block) {
  /*  Variant logic */
  const container = block.closest(".tech-specs-features-container");
  const classes = block.classList;
  const TYPE_MAP = {
    "tech-specs-features-type-1": { variant: "tech-specs-features-varient1" },
    "tech-specs-features-type-2": { variant: "tech-specs-features-varient2" },
    "tech-specs-features-type-3": { variant: "tech-specs-features-varient3" },
  };
  const matchKey = Object.keys(TYPE_MAP).find((key) => classes.contains(key));
  const { variant } = TYPE_MAP[matchKey] || TYPE_MAP["type-1"];
  container?.classList.add(variant);
  console.log(block, "tech");
}
