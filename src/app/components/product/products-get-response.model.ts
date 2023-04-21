import { Product } from './product.model';

export interface ProductsGetResponse {
    _embedded: {
      products: Product[];
      _links: {self: {href: string}};
    };
  }