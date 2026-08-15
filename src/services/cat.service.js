import db from "../config/db.js";

const categoryMeta = {
  Indian: {
    description:
      "Authentic Indian cuisine featuring rich curries, aromatic biryanis, and traditional tandoori specialties.",
    image:
      "/indian.png",
  },
  Italian: {
    description:
      "Classic Italian dishes including handcrafted pasta, wood-fired pizzas, and creamy risottos.",
    image:
      "/italian.png",
  },
  Mexican: {
    description:
      "Bold Mexican flavors with tacos, burritos, quesadillas, and freshly prepared salsas.",
    image:
      "/mexican.png",
  },
  Chinese: {
    description:
      "Traditional Chinese favorites including noodles, fried rice, dumplings, and stir-fried delicacies.",
    image:
      "/chinese.png",
  },
  Korean: {
    description:
      "Popular Korean dishes featuring BBQ, kimchi, bibimbap, and spicy street-food favorites.",
    image:
      "/korean.png",
  },
  Japanese: {
    description:
      "Fresh Japanese cuisine including sushi, ramen, tempura, and premium seafood specialties.",
    image:
      "/japanese.png",
  },
};

const getDishesCategories = async () => {
  const [rows] = await db.execute(`
    SELECT
      category,
      COUNT(*) AS itemCount
    FROM dishes
    GROUP BY category
    ORDER BY category;
  `);

  return rows.map((row, index) => ({
    id: index + 1,
    name: row.category,
    itemCount: `${row.itemCount} Items`,
    description:
      categoryMeta[row.category]?.description ||
      "Explore our delicious selection of dishes.",
    image:
      categoryMeta[row.category]?.image ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800",
  }));
};

export default {
  getDishesCategories,
};