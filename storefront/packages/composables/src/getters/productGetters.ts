import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  ProductGetters, AgnosticPrice
} from "@vue-storefront/core";
import type { Product, ProductFilter} from "@vue-storefront/iiepmarket-api";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: Product): string {
  return product.title;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: Product): string {
  return product.slug;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {
  if (Array.isArray(product.pricing)) {
    return {
      special: product?.pricing[0]?.price ?? 0,
      regular: product?.pricing[0]?.compareAtPrice?.amount ?? product?.pricing[0]?.minPrice ?? 0,
    };
  }
  return {
    special: product?.pricing?.price ?? 0,
    regular: product?.pricing?.compareAtPrice?.amount ?? product?.pricing?.minPrice ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  return (product?.images ?? []).map(imageUrl => (
    {
      small: imageUrl,
      normal: imageUrl,
      big: imageUrl,
    }
  ));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
  return product.images?.[0] ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: Product[] = [], filters: ProductFilter): Product[] {
  return products;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> {
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
  return product.description;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: Product): string {
  return product._id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  return 0;
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  getGallery,
  getCoverImage,
  getFiltered,
  getAttributes,
  getDescription,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating,
};
