export const mockCategories = [
  {
    id: 'pastries',
    name: 'Pastries & Torts',
    display_order: 1,
    description: 'Freshly baked daily tortas, croissants, and delicate pastries.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cakes',
    name: 'Custom Cakes',
    display_order: 2,
    description: 'Signature layer cakes crafted for any special celebration.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'drinks',
    name: 'Artisanal Drinks',
    display_order: 3,
    description: 'Espresso, craft lattes, and specialty herbal teas.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800'
  }
];

export const mockMenuItems = [
  {
    id: 'torta-slice',
    category_id: 'pastries',
    name: 'Signature Torta Slice',
    description: "Layers of delicate almond sponge, dulce de leche, and whipped meringue. Known fondly as 'what's inside' perfection.",
    price: 8.50,
    image_url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_special: true
  },
  {
    id: 'berry-tart',
    category_id: 'pastries',
    name: 'Wild Berry Tart',
    description: 'Butter crust filled with vanilla pastry cream and topped with fresh organic berries.',
    price: 6.75,
    image_url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800',
    is_special: false
  },
  {
    id: 'chocolate-fudge-cake',
    category_id: 'cakes',
    name: 'Velvet Chocolate Fudge',
    description: '70% dark chocolate ganache between rich cocoa layers.',
    price: 45.00,
    image_url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=800',
    is_special: false
  },
  {
    id: 'lavender-latte',
    category_id: 'drinks',
    name: 'Honey Lavender Latte',
    description: 'House-made lavender syrup with local honey and double shot espresso.',
    price: 5.50,
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    is_special: true
  }
];