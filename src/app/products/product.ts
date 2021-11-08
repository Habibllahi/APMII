/* Defines the product entity */
export type Product = {
  id: number;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export type ProductResolved = {
  product: Product | undefined;
  error?: string | undefined;
}

export type ProductListResolved = {
  products: Product[] | undefined;
  error?: string | undefined;
}
