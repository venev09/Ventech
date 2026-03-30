/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Phones' | 'PlayStations' | 'Laptops';
export type Condition = 'Excellent' | 'Good' | 'Fair';

export interface Listing {
  id: string;
  title: string;
  category: Category;
  price: number;
  condition: Condition;
  location: string;
  date: string;
  description: string;
  images: string[];
  sellerContact: string;
  isSold: boolean;
  authorUid: string;
}
