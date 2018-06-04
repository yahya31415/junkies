let menu = [
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'TRUE',
    name: 'French fries',
    price: '? 120.00',
    description: 'Crispy fries served along with BBQ dip.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'FALSE',
    name: 'French fries with cheese',
    price: '? 150.00',
    description:
      'Crispy fries topped with gooey cheese served along with BBQ dip.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'FALSE',
    name: 'French fries with cheese & chicken',
    price: '? 180.00',
    description:
      'Crispy fries topped with gooey cheese and chicken served along with BBQ dip.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'FALSE',
    name: 'French fries with cheese & beef',
    price: '? 240.00',
    description:
      'Crispy fries topped with gooey cheese and pull beef served along with BBQ dip.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'TRUE',
    name: 'Onion rings',
    price: '? 120.00',
    description: 'Crispy onion rings served along with BBQ dip.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'FALSE',
    name: 'Valentino wings',
    price: '? 220.00',
    description: 'Six sexy wings tossed in Italian spice sauce.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'TRUE',
    name: 'Banana sweet fry',
    price: '? 150.00',
    description:
      'Banana slices fried in traditional Kerala style batter served with honey drissles.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'FALSE',
    name: 'Chicken Sausage',
    price: '? 240.00',
    description:
      'Sausage dressed and cooked in butter served along with 2 slice of garlic bread.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'FALSE',
    name: 'Egg and Cheese Melt',
    price: '? 110.00',
    description: 'Served along with 2 garlic bread.'
  },
  {
    order: 1,
    category: 'Food',
    subcategory: 'Starters',
    isVeg: 'FALSE',
    name: 'Some Masala in my Eggs',
    price: '? 110.00',
    description: 'Served along with 2 garlic bread.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'TRUE',
    name: 'Mushroom Jack',
    price: '? 190.00',
    description:
      '110g mushroom patty served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'TRUE',
    name: 'My little cottage',
    price: '? 200.00',
    description:
      '110g grilled paneer patty served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'TRUE',
    name: 'Ticki tricks',
    price: '? 190.00',
    description:
      '110g aloo patty served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Moto cross rooster',
    price: '? 220.00',
    description:
      '110g chicken patty topped with coleslaw served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'BBQ Rooster',
    price: '? 240.00',
    description:
      '110g chicken patty topped with bbq and grilled, served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Fairy Clucker',
    price: '? 260.00',
    description:
      'Hot and spicy 110g of chicken patty served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Howdy Bull Rider',
    price: '? 240.00',
    description:
      '110g beef patty topped with coleslaw served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Greesy Bull Rider',
    price: '? 260.00',
    description:
      '110g beef patty topped with bbq and grilled, served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Torque Torus',
    price: '? 280.00',
    description:
      'Pulled beef cooked slowly with flavours and olive oil served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Spicy george',
    price: '? 260.00',
    description:
      'Hot and spicy 110g of beef patty served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Two stroke chicken',
    price: '? 290.00',
    description:
      'A classy chicken patty of 110g topped with fried egg and cheese served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Two stroke beef',
    price: '? 310.00',
    description:
      'A classy beef patty of 110g topped with fried egg and cheese served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Four stroke chicken',
    price: '? 390.00',
    description:
      'A double dose of chicken patty glued with fried egg and cheese served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 2,
    category: 'Food',
    subcategory: 'Burgers',
    isVeg: 'FALSE',
    name: 'Four stroke beef',
    price: '? 420.00',
    description:
      'A double dose of handmade beef patty glued with fried egg and cheese served along with 20g of french fries and BBQ dip.'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'TRUE',
    name: 'I surrender Veg',
    price: '? 180.00',
    description:
      'Penne pasta tossed in cheesy white sauce and house made spices served along with garlic bread'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'FALSE',
    name: 'I surrender non veg',
    price: '? 210.00',
    description:
      'Penne pasta tossed in cheesy white sauce, chicken chunks and house made spices served along with garlic bread'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'TRUE',
    name: 'Signal breaker Veg',
    price: '? 180.00',
    description:
      'The italian marinara tossed in penne pasta and seasoned with house made spices served along with garlic bread.'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'FALSE',
    name: 'Signal breaker non veg',
    price: '? 210.00',
    description:
      'The italian marinara tossed in penne pasta, chicken chunks and seasoned with house made spices served along with garlic bread.'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'TRUE',
    name: 'Hulk smash veg',
    price: '? 210.00',
    description:
      'Penne pasta tossed in saucy basil pesto served along with garlic bread.'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'FALSE',
    name: 'Hulk smash non veg',
    price: '? 240.00',
    description:
      'Penne pasta and chicken chunks tossed in saucy basil pesto served along with garlic bread.'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'TRUE',
    name: 'Pink panther veg',
    price: '? 190.00',
    description:
      'Blend of white sauce and marinara. The tangy sweet taste is served along with garlic bread.'
  },
  {
    order: 4,
    category: 'Food',
    subcategory: 'Pasta',
    isVeg: 'FALSE',
    name: 'Pink panther non veg',
    price: '? 230.00',
    description:
      'Blend of white sauce and marinara with chunks of chicken. The tangy sweet taste is served along with garlic bread.'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'TRUE',
    name: 'Nutella banana',
    price: '? 190.00',
    description: 'Customization (extra nutella 40 INR)'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'TRUE',
    name: 'Peanut butter banana',
    price: '? 160.00',
    description: ''
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'TRUE',
    name: 'Bell pepper',
    price: '? 160.00',
    description: 'Customization (extra cheese 30 INR)'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'TRUE',
    name: 'Mushroom',
    price: '? 160.00',
    description: 'Customization (extra cheese 30 INR)'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'TRUE',
    name: 'Paneer',
    price: '? 180.00',
    description: 'Customization (extra cheese 30 INR)'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'TRUE',
    name: 'Veg club',
    price: '? 190.00',
    description: ''
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'FALSE',
    name: 'Melted Egg',
    price: '? 160.00',
    description: 'Customization (extra cheese 30 INR, extra fried egg 20 INR)'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'FALSE',
    name: 'Melted chicken',
    price: '? 180.00',
    description: 'Customization (extra cheese 30 INR, extra fried egg 20 INR)'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'FALSE',
    name: 'Chicken Club Sandwich',
    price: '? 210.00',
    description: ''
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'FALSE',
    name: 'Grilled chicken',
    price: '? 180.00',
    description: 'Customization (extra cheese 30 INR, extra fried egg 20 INR)'
  },
  {
    order: 3,
    category: 'Food',
    subcategory: 'Sandwich',
    isVeg: 'FALSE',
    name: 'Pull beef club',
    price: '? 260.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'coke',
    price: '? 60.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'sprite',
    price: '? 60.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'mineral water',
    price: '? 30.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'vanilla thick shake',
    price: '? 180.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'strawberry thick shake',
    price: '? 180.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'chocolate thick shake',
    price: '? 180.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'Mango thick shake',
    price: '? 180.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'Boost thick shake',
    price: '? 150.00',
    description: ''
  },
  {
    order: 5,
    category: 'Food',
    subcategory: 'Beverages',
    isVeg: 'TRUE',
    name: 'Cold coffee',
    price: '? 150.00',
    description: ''
  }
];

var count = 1;

menu.forEach(item => {
  item.isVeg = item.isVeg === 'TRUE';
  item.price = Number(item.price.substr(2));
  firebase
    .firestore()
    .collection('FoodItems')
    .add(item)
    .then(result => console.log('added item ' + count++));
});
