import { subDays, subHours, subMinutes } from 'date-fns';
import type { Product } from '../../types/product';

const now = new Date();

export const products: Product[] = [
  {
    id: 'c91759d7e2a323bfff337cd3',
    createdAt: subDays(subHours(subMinutes(now, 5), 5), 35).getTime(),
    name: 'Polaroid White Camera Vintage',
    price: 604.06,
    image: '/assets/products/product-1.png',
    currency: '$',
    sku: 'BBAK01-A',
    category: 'shoes',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 5), 5), 35).getTime()
  },
  {
    id: '414b95678df5e18f3c31a1e3',
    createdAt: subDays(subHours(subMinutes(now, 40), 22), 146).getTime(),
    name: 'Polaroid Black Camera Vintage',
    price: 1344.28,
    image: '/assets/products/product-2.png',
    currency: '$',
    sku: 'APWU13-N',
    category: 'shoes',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 40), 22), 146).getTime()
  },
  {
    id: '33d21bcc7898f2897e5d6d28',
    createdAt: subDays(subHours(subMinutes(now, 7), 22), 19).getTime(),
    name: 'Polaroid Black Camera Vintage',
    price: 923.24,
    image: '/assets/products/product-3.png',
    currency: '$',
    sku: 'EIWZ36-M',
    category: 'jeans',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 7), 22), 19).getTime()
  },
  {
    id: 'dba9c455d49099812f1bf209',
    createdAt: subDays(subHours(subMinutes(now, 8), 23), 264).getTime(),
    name: 'Unbranded Sneakers',
    price: 114.4,
    image: '/assets/products/product-4.png',
    currency: '$',
    sku: 'EBDM72-T',
    category: 'shoes',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 8), 23), 264).getTime()
  },
  {
    id: '92239999a6e030b587bb3ce0',
    createdAt: subDays(subHours(subMinutes(now, 17), 13), 8).getTime(),
    name: 'Nike Airmax',
    price: 105.17,
    image: '/assets/products/product-5.png',
    currency: '$',
    sku: 'RAKR75-P',
    category: 'shirts',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 17), 13), 8).getTime()
  },
  {
    id: 'a353deb67029477d19168f8b',
    createdAt: subDays(subHours(subMinutes(now, 29), 19), 24).getTime(),
    name: 'Unbranded Wireless Headphones',
    price: 751.19,
    image: '/assets/products/product-6.png',
    currency: '$',
    sku: 'QKKH19-W',
    category: 'jeans',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 29), 19), 24).getTime()
  },
  {
    id: '4de0ce49c19a3d28d1cb4a81',
    createdAt: subDays(subHours(subMinutes(now, 47), 15), 172).getTime(),
    name: 'Timely Cyan Strap',
    price: 1027.45,
    image: '/assets/products/product-7.png',
    currency: '$',
    sku: 'TSQV38-X',
    category: 'jeans',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 47), 15), 172).getTime()
  },
  {
    id: 'ce03c9ce5637dda2bf0b4992',
    createdAt: subDays(subHours(subMinutes(now, 32), 11), 151).getTime(),
    name: 'Timely Brown Leather Strap',
    price: 640.79,
    image: '/assets/products/product-8.png',
    currency: '$',
    sku: 'UUVH71-G',
    category: 'dresses',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 32), 11), 151).getTime()
  },
  {
    id: '57ece881f34c1c9d6355902e',
    createdAt: subDays(subHours(subMinutes(now, 26), 24), 131).getTime(),
    name: 'Watch with Black Leather Strap',
    price: 656.37,
    image: '/assets/products/product-9.png',
    currency: '$',
    sku: 'GJCR37-T',
    category: 'watches',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 26), 24), 131).getTime()
  },
  {
    id: '419bc7a2edbbd55264790ff8',
    createdAt: subDays(subHours(subMinutes(now, 57), 11), 205).getTime(),
    name: 'Watch Brown Leather Strap',
    price: 1319.45,
    image: '/assets/products/product-10.png',
    currency: '$',
    sku: 'UHIF12-Q',
    category: 'dresses',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 57), 11), 205).getTime()
  },
  {
    id: '24db4b01c26b13fe8e984df0',
    createdAt: subDays(subHours(subMinutes(now, 38), 23), 123).getTime(),
    name: 'Polaroid White Camera Vintage',
    price: 907.15,
    image: '/assets/products/product-1.png',
    currency: '$',
    sku: 'DKRZ09-M',
    category: 'watches',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 38), 23), 123).getTime()
  },
  {
    id: 'e82722fb4d9750a5144c3c02',
    createdAt: subDays(subHours(subMinutes(now, 49), 12), 72).getTime(),
    name: 'Unbranded Sneakers',
    price: 1328.33,
    image: '/assets/products/product-4.png',
    currency: '$',
    sku: 'WSUT77-H',
    category: 'shoes',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 49), 12), 72).getTime()
  },
  {
    id: 'e23c5cfa44030b85ae768989',
    createdAt: subDays(subHours(subMinutes(now, 45), 5), 103).getTime(),
    name: 'Unbranded Wireless Headphones',
    price: 1029.46,
    image: '/assets/products/product-6.png',
    currency: '$',
    sku: 'TWTG39-I',
    category: 'jeans',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 45), 5), 103).getTime()
  },
  {
    id: 'c661cb6283febb62bdc4a95d',
    createdAt: subDays(subHours(subMinutes(now, 55), 16), 286).getTime(),
    name: 'Nike Airmax',
    price: 1370.1,
    image: '/assets/products/product-5.png',
    currency: '$',
    sku: 'MJSC66-N',
    category: 'watches',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 55), 16), 286).getTime()
  },
  {
    id: '4847c416895d30167f8db9ed',
    createdAt: subDays(subHours(subMinutes(now, 31), 16), 233).getTime(),
    name: 'Polaroid Black Camera Vintage',
    price: 663.59,
    image: '/assets/products/product-2.png',
    currency: '$',
    sku: 'JVLO87-T',
    category: 'shirts',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 31), 16), 233).getTime()
  },
  {
    id: 'e73b19bc67f99d604683c675',
    createdAt: subDays(subHours(subMinutes(now, 23), 13), 263).getTime(),
    name: 'Timely Brown Leather Strap',
    price: 14.67,
    image: '/assets/products/product-8.png',
    currency: '$',
    sku: 'TENG41-T',
    category: 'jeans',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 23), 13), 263).getTime()
  },
  {
    id: '0a9dc7bf882723bbbd474480',
    createdAt: subDays(subHours(subMinutes(now, 34), 5), 151).getTime(),
    name: 'Polaroid Black Camera Vintage',
    price: 262.55,
    image: '/assets/products/product-3.png',
    currency: '$',
    sku: 'FCSF15-T',
    category: 'jeans',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 34), 5), 151).getTime()
  },
  {
    id: '6a0789292f1f148cf0cf715e',
    createdAt: subDays(subHours(subMinutes(now, 60), 13), 30).getTime(),
    name: 'Watch Brown Leather Strap',
    price: 1449.23,
    image: '/assets/products/product-10.png',
    currency: '$',
    sku: 'KKLB09-D',
    category: 'shirts',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 60), 13), 30).getTime()
  },
  {
    id: 'e804c005f615a56f57003428',
    createdAt: subDays(subHours(subMinutes(now, 33), 13), 254).getTime(),
    name: 'Watch with Black Leather Strap',
    price: 132.85,
    image: '/assets/products/product-9.png',
    currency: '$',
    sku: 'OIQA42-G',
    category: 'watches',
    status: 'published',
    updatedAt: subDays(subHours(subMinutes(now, 33), 13), 254).getTime()
  },
  {
    id: '5dedab367685c9041452fdfb',
    createdAt: subDays(subHours(subMinutes(now, 28), 19), 39).getTime(),
    name: 'Timely Cyan Strap',
    price: 973.34,
    image: '/assets/products/product-7.png',
    currency: '$',
    sku: 'ZYPI54-Z',
    category: 'watches',
    status: 'draft',
    updatedAt: subDays(subHours(subMinutes(now, 28), 19), 39).getTime()
  }
];

export const product: Product = {
  id: '24db4b01c26b13fe8e984df0',
  brand: 'Cassio',
  composition: ['Leather', 'Metal'],
  createdAt: subDays(subHours(subMinutes(now, 60), 13), 30).getTime(),
  currency: '$',
  defaultName: '622 / Gold Leather',
  description: 'The Core Collection. Our premium line of watches with a minimalist and timeless look. Designed in the UK and perfect for everyday use. This is our black on black leather. The stainless steel case has a brushed matt black finish with a subtle reflective dial. The hands and numbers are in a shiny gun metal finish.',
  displayName: 'Watch With Leather Strap',
  features: ['Stainless steel casing', '40mm diameter watch face '],
  image: '/assets/products/product-1.png',
  name: 'Watch With Leather Strap',
  price: 160,
  size: 'fit',
  sku: 'KKLB09-X',
  status: 'published',
  tags: ['Watch', 'Style'],
  updatedAt: subDays(subHours(subMinutes(now, 32), 5), 3).getTime(),
  variants: [
    {
      id: '2707973a9dc8fc3d32e3c3e6',
      createdAt: subDays(subHours(subMinutes(now, 38), 23), 123).getTime(),
      currency: '$',
      description: 'The Core Collection. Our premium line of watches with a minimalist and timeless look. Designed in the UK and perfect for everyday use. This is our black on black leather. The stainless steel case has a brushed matt black finish with a subtle reflective dial. The hands and numbers are in a shiny gun metal finish',
      image: '/assets/products/product-10.png',
      name: 'Brown Leather',
      price: 69,
      quantity: 100,
      sku: 'B-283KD'
    }
  ]
};
