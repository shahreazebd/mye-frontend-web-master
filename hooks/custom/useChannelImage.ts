const channelImage = (type: string) => {
  let image = "";
  switch (type) {
    case "amazon":
      image = "/images/logo/amazon.svg";
      break;
    case "ebay":
      image = "/images/logo/ebay.svg";
      break;

    case "shopify":
      image = "/images/logo/shopify.svg";
      break;
    case "woocommerce":
      image = "/images/logo/wooCommerce.svg";
      break;

    case "bigcommerce":
      image = "/images/logo/bigCommerce.svg";
      break;
    case "otto":
      image = "/images/logo/otto.svg";
      break;

    default:
      image = "/images/logo/otto.svg";
      break;
  }

  return image;
};

export { channelImage };
