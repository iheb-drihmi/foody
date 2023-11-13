import images from './images';

const foods = [
  {
    title: 'Couscous',
    price: 'TND 28.50',
    description: 'Traditional Tunisian couscous dish with tender lamb and flavorful spices.',
  },
  {
    title: 'Brik',
    price: 'TND 12.00',
    description: 'Crispy pastry stuffed with a whole egg, tuna, capers, and parsley.',
  },
  {
    title: 'Harissa Grilled Shrimp',
    price: 'TND 35.75',
    description: 'Grilled shrimp marinated in spicy Tunisian harissa sauce, served with couscous.',
  },
  {
    title: 'Merguez Sausage Sandwich',
    price: 'TND 14.90',
    description: 'Spicy Merguez sausages served in a baguette with harissa and roasted peppers.',
  },
  {
    title: 'Baklava',
    price: 'TND 8.75',
    description: 'Sweet pastry made of layers of filo dough, filled with honey and nuts.',
  },
];

const cocktails = [
  {
    title: 'Mint Tea',
    price: 'TND 5.00',
    description:
      'Traditional Tunisian mint tea brewed with green tea leaves and fresh mint leaves.',
  },
  {
    title: 'Boukha Sunrise',
    price: 'TND 18.50',
    description:
      'Refreshing cocktail made with Tunisian Boukha (fig brandy), orange juice, and grenadine.',
  },
  {
    title: 'Sidi Bou Said Lemonade',
    price: 'TND 12.75',
    description: 'Tunisian-style lemonade infused with rose water and garnished with mint leaves.',
  },
  {
    title: 'Carthage Cooler',
    price: 'TND 16.90',
    description:
      'A citrusy cocktail featuring Tunisian citrus fruits, vodka, and a hint of cinnamon.',
  },
  {
    title: 'Medina Mule',
    price: 'TND 14.25',
    description: 'Tunisian twist on the classic Moscow Mule with Tunisian ginger beer and lime.',
  },
];

const awards = [
  {
    imgUrl: images.award02,
    title: 'Bib Gourmond',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
  {
    imgUrl: images.award01,
    title: 'Rising Star',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
  {
    imgUrl: images.award05,
    title: 'AA Hospitality',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
  {
    imgUrl: images.award03,
    title: 'Outstanding Chef',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
];

export default { foods, cocktails, awards };
