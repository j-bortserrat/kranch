/* ============================================================
   KRANCH — Fried Station · Datos de la carta (ES / EN)
   ------------------------------------------------------------
   Carta REAL transcrita de la carta física del local.
   price : número en euros (null = sin precio individual)
   note  : 'from' (desde) | null
   al    : array de códigos de alérgeno (ver leyenda en i18n)
   img   : imagen en /assets (opcional)
   Categorías simples -> items[].  Bebidas/Sauce -> groups[].
   ============================================================ */
window.MENU = [
  {
    id: "fries",
    name: { es: "KRANCH Fries", en: "KRANCH Fries" },
    note: {
      es: "Patatas belgas frescas, cortadas a diario y de doble fritura. Pregunta por las patatas de especialidad del mes.",
      en: "Fresh Belgian fries, cut daily and double-fried. Ask us about this month's specialty fries."
    },
    items: [
      { price: 4.90, al: [], img: "boxes.jpg",
        es: { name: "KRANCH Fries", desc: "Nuestras patatas de especialidad. Perfectas para descubrir la Sauce Station." },
        en: { name: "KRANCH Fries", desc: "Our signature fries. The perfect way to discover the Sauce Station." } },
      { price: 7.90, al: [3,7,10],
        es: { name: "Gouda & Basil", desc: "Gouda madurado rallado al momento y mayonesa de albahaca. Mucho queso, mucho KRANCH." },
        en: { name: "Gouda & Basil", desc: "Aged gouda grated to order and basil mayo. Lots of cheese, very KRANCH." } },
      { price: 8.90, al: [3,7,10],
        es: { name: "Truffle & Parmesan", desc: "Mayonesa trufada, parmesano rallado al momento y cebollino fresco. La más elegante de la casa." },
        en: { name: "Truffle & Parmesan", desc: "Truffle mayo, parmesan grated to order and fresh chives. The most elegant of the house." } },
      { price: 11.90, al: [12],
        es: { name: "Chili Sin Carne", desc: "Chili vegetal casero, guacamole, pico de gallo, cebolla encurtida y jalapeños. No meat, big heat." },
        en: { name: "Chili Sin Carne", desc: "Homemade veggie chili, guacamole, pico de gallo, pickled onion and jalapeños. No meat, big heat." } },
      { price: 11.90, al: [3,7,10,12], img: "boxes.jpg",
        es: { name: "Cochinita", desc: "Cochinita pibil, crema agria, mayo chipotle, pico de gallo y cebolla encurtida. Cocción lenta, sabor enorme." },
        en: { name: "Cochinita", desc: "Cochinita pibil, sour cream, chipotle mayo, pico de gallo and pickled onion. Slow-cooked, huge flavour." } },
      { price: 12.90, al: [1,3,7,10,11],
        es: { name: "Chicken & Cheese", desc: "Pollo a baja temperatura desmenuzado, mermelada de bacon, mix de quesos fundidos y cebolla crispy. Crujiente y cremosa." },
        en: { name: "Chicken & Cheese", desc: "Pulled slow-cooked chicken, bacon jam, a mix of melted cheeses and crispy onion. Crunchy and creamy." } },
      { price: 13.90, al: [3,7,10],
        es: { name: "The Burger Fries", desc: "Angus beef, cheddar fundido, bacon crispy, pepinillos y salsa KRANCH. Toda nuestra burger, servida sobre fries." },
        en: { name: "The Burger Fries", desc: "Angus beef, melted cheddar, crispy bacon, pickles and KRANCH sauce. Our whole burger, served over fries." } },
      { price: 13.90, al: [1,3,7,10,12], img: "slowbeef.jpg",
        es: { name: "Slow Beef", desc: "Ternera cocinada 24 horas, demi-glace de vino tinto, mayonesa de albahaca, cebolla roja y cebollino. Fuego lento y mucho sabor." },
        en: { name: "Slow Beef", desc: "24-hour slow-cooked beef, red-wine demi-glace, basil mayo, red onion and chives. Low and slow, full of flavour." } }
    ]
  },
  {
    id: "empezar",
    name: { es: "Para empezar", en: "To start" },
    items: [
      { price: 9.80, al: [7],
        es: { name: "Torreznos & Guacamole", desc: "Torreznos crujientes con guacamole casero y crema agria. Crujen, y mucho." },
        en: { name: "Torreznos & Guacamole", desc: "Crispy pork torreznos with homemade guacamole and sour cream. Seriously crunchy." } },
      { price: 7.90, al: [6,10,11],
        es: { name: "Chipotle BBQ Wings", desc: "Alitas a baja temperatura glaseadas con nuestra salsa Chipotle BBQ. Dulces, ahumadas y con el punto justo de picante." },
        en: { name: "Chipotle BBQ Wings", desc: "Slow-cooked wings glazed in our Chipotle BBQ sauce. Sweet, smoky and just the right kick." } },
      { price: 8.90, al: [3,7,10,12],
        es: { name: "Bokaditos de Cochinita", desc: "Mini arepas de queso con cochinita pibil, salsa tártara y cebolla encurtida. Uno nunca es suficiente." },
        en: { name: "Cochinita Bites", desc: "Mini cheese arepas with cochinita pibil, tartare sauce and pickled onion. One is never enough." } },
      { price: 9.90, al: [1,3,4,7,10],
        es: { name: "Ensalada César", desc: "Lechuga romana, pollo a baja temperatura, parmesano, croutons y salsa César casera. La clásica, hecha como toca." },
        en: { name: "Caesar Salad", desc: "Romaine lettuce, slow-cooked chicken, parmesan, croutons and homemade Caesar dressing. The classic, done right." } }
    ]
  },
  {
    id: "burgers",
    name: { es: "Burgers", en: "Burgers" },
    note: {
      es: "Todas nuestras burgers se sirven con KRANCH Fries.",
      en: "All our burgers are served with KRANCH Fries."
    },
    items: [
      { price: 14.90, al: [1,3,7,10], img: "hero-burger.jpg",
        es: { name: "The Original", desc: "180 g de Angus beef, cheddar ahumado, bacon crispy, lechuga romana, cebolla morada, pepinillos y salsa KRANCH. La burger que teníamos que hacer." },
        en: { name: "The Original", desc: "180 g Angus beef, smoked cheddar, crispy bacon, romaine, red onion, pickles and KRANCH sauce. The burger we had to make." } },
      { price: 13.90, al: [1,10],
        es: { name: "Vegan KRANCH", desc: "Burger vegetal, guacamole, salsa mexicana, cebolla morada y lechuga romana. Todo el sabor, sin carne." },
        en: { name: "Vegan KRANCH", desc: "Plant-based patty, guacamole, Mexican salsa, red onion and romaine. All the flavour, no meat." } },
      { price: 12.90, al: [1,3,7,10,11],
        es: { name: "Chicken Brioche", desc: "Pollo a baja temperatura, mermelada de bacon, salsa tártara y gouda madurado, en brioche tostado. Nuestro brioche más jugoso." },
        en: { name: "Chicken Brioche", desc: "Slow-cooked chicken, bacon jam, tartare sauce and aged gouda in a toasted brioche. Our juiciest brioche yet." } }
    ]
  },
  {
    id: "infantil",
    name: { es: "Menú infantil", en: "Kids' menu" },
    note: {
      es: "Hasta los 12 años. Incluye bebida (agua o zumo) y bola de helado a elegir: vainilla, avellana o caramelo.",
      en: "Up to age 12. Includes a drink (water or juice) and a scoop of ice cream: vanilla, hazelnut or caramel."
    },
    items: [
      { price: 10.90, al: [1,3,7,10],
        es: { name: "Cheeseburger", desc: "100 g de Angus beef con queso cheddar y KRANCH Fries." },
        en: { name: "Cheeseburger", desc: "100 g Angus beef with cheddar and KRANCH Fries." } },
      { price: 10.90, al: [3,7,10,11],
        es: { name: "Franky Fries", desc: "Salchicha Frankfurt a la plancha con Belgian Fries. El favorito de los pequeños foodies." },
        en: { name: "Franky Fries", desc: "Grilled Frankfurt sausage with Belgian Fries. The little foodies' favourite." } }
    ]
  },
  {
    id: "postres",
    name: { es: "Postres", en: "Desserts" },
    items: [
      { price: 5.90, al: [1,3,7],
        es: { name: "Tarta de queso", desc: "Acompáñala con dulce de leche o mermelada de frambuesas. Cremosa, intensa y difícil de compartir." },
        en: { name: "Cheesecake", desc: "Served with dulce de leche or raspberry jam. Creamy, intense and hard to share." } },
      { price: 6.90, al: [1,3,7,8],
        es: { name: "Brownie caliente", desc: "Con tu helado preferido: vainilla bourbon, avellana o dulce de leche. Chocolate, helado y cero remordimientos." },
        en: { name: "Warm brownie", desc: "With your favourite ice cream: bourbon vanilla, hazelnut or dulce de leche. Chocolate, ice cream and zero regrets." } }
    ]
  },
  {
    id: "salsas",
    name: { es: "The Sauce Station", en: "The Sauce Station" },
    note: {
      es: "Las fries son el lienzo, las salsas son tu firma. Cada salsa: 0,90 €.",
      en: "The fries are the canvas, the sauces are your signature. Each sauce: €0.90."
    },
    chips: {
      es: ["Mayo de albahaca", "Truffle", "Chipotle", "Tártara", "Mayo clásica", "Ketchup", "Mostaza", "BBQ"],
      en: ["Basil mayo", "Truffle", "Chipotle", "Tartare", "Classic mayo", "Ketchup", "Mustard", "BBQ"]
    },
    items: []
  },
  {
    id: "bebidas",
    name: { es: "Bebidas", en: "Drinks" },
    note: { es: "Something cold. Something bold.", en: "Something cold. Something bold." },
    groups: [
      { name: { es: "Frías", en: "Cold drinks" }, items: [
        { price: 2.60, es: { name: "Agua mineral" }, en: { name: "Still water" } },
        { price: 2.90, es: { name: "Agua con gas" }, en: { name: "Sparkling water" } },
        { price: 2.90, es: { name: "Refresco" }, en: { name: "Soft drink" } },
        { price: 2.90, es: { name: "Zumos" }, en: { name: "Juices" } }
      ]},
      { name: { es: "Cervezas de barril", en: "Draft beers" }, items: [
        { price: 2.60, es: { name: "Caña (Estrella Galicia)" }, en: { name: "Caña (Estrella Galicia)" } },
        { price: 3.50, es: { name: "Doble (Estrella Galicia)" }, en: { name: "Doble (Estrella Galicia)" } },
        { price: 4.50, es: { name: "Doble 1906" }, en: { name: "Doble 1906" } }
      ]},
      { name: { es: "Cervezas de botella", en: "Bottled beers" }, items: [
        { price: 3.20, es: { name: "Estrella Galicia" }, en: { name: "Estrella Galicia" } },
        { price: 3.20, es: { name: "Radler" }, en: { name: "Radler" } },
        { price: 3.20, es: { name: "0,0" }, en: { name: "0.0" } },
        { price: 3.20, es: { name: "Tostada 0,0" }, en: { name: "Toasted 0.0" } },
        { price: 4.50, es: { name: "Tyris" }, en: { name: "Tyris" } },
        { price: 4.90, es: { name: "Tyris sin gluten" }, en: { name: "Tyris gluten-free" } },
        { price: 4.90, es: { name: "Leffe" }, en: { name: "Leffe" } },
        { price: 5.90, es: { name: "Erdinger 50 cl" }, en: { name: "Erdinger 50 cl" } }
      ]},
      { name: { es: "Vinos (por copa)", en: "Wine (by the glass)" }, items: [
        { price: 3.50, es: { name: "Vino blanco" }, en: { name: "White wine" } },
        { price: 3.50, es: { name: "Vino tinto" }, en: { name: "Red wine" } },
        { price: 3.20, es: { name: "Tinto de verano" }, en: { name: "Tinto de verano" } },
        { price: 4.00, es: { name: "Vermut" }, en: { name: "Vermouth" } }
      ]},
      { name: { es: "KRANCH Cocktails", en: "KRANCH Cocktails" }, items: [
        { price: 8.00, es: { name: "KRANCH Margarita" }, en: { name: "KRANCH Margarita" } },
        { price: 9.00, es: { name: "Classic Mojito" }, en: { name: "Classic Mojito" } },
        { price: 9.00, es: { name: "Agua de Valencia" }, en: { name: "Agua de Valencia" } },
        { price: 8.00, es: { name: "Aperol" }, en: { name: "Aperol" } },
        { price: 8.00, es: { name: "Combinados" }, en: { name: "Spirits & mixers" } }
      ]},
      { name: { es: "Café e infusiones", en: "Coffee & tea" }, items: [
        { price: 1.60, es: { name: "Espresso" }, en: { name: "Espresso" } },
        { price: 1.80, es: { name: "Americano" }, en: { name: "Americano" } },
        { price: 2.00, es: { name: "Café con leche" }, en: { name: "Café con leche" } },
        { price: 2.00, es: { name: "Infusiones" }, en: { name: "Teas" } }
      ]},
      { name: { es: "Add some KRANCH", en: "Add some KRANCH" }, items: [
        { price: 1.50, es: { name: "Parmesano" }, en: { name: "Parmesan" } },
        { price: 1.50, es: { name: "Gouda madurado" }, en: { name: "Aged gouda" } },
        { price: 1.50, es: { name: "Bacon crispy" }, en: { name: "Crispy bacon" } },
        { price: 1.50, es: { name: "Guacamole" }, en: { name: "Guacamole" } }
      ]}
    ]
  }
];

/* Imágenes de la galería (en /assets). Sin texto sobre la imagen. */
window.GALLERY = [
  "hero-burger.jpg",
  "slowbeef.jpg",
  "exterior.jpg",
  "original.jpg",
  "truffle.jpg",
  "boxes.jpg",
  "hero-slowbeef.jpg"
];

/* Imágenes del hero (slideshow en portada). */
window.HERO_SLIDES = ["hero-slowbeef.jpg", "exterior.jpg"];
