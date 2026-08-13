import db from "../config/db.js";

const categoryMeta = {
  Indian: {
    description:
      "Authentic Indian cuisine featuring rich curries, aromatic biryanis, and traditional tandoori specialties.",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800",
  },
  Italian: {
    description:
      "Classic Italian dishes including handcrafted pasta, wood-fired pizzas, and creamy risottos.",
    image:
      "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?q=80&w=800",
  },
  Mexican: {
    description:
      "Bold Mexican flavors with tacos, burritos, quesadillas, and freshly prepared salsas.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38174c4a6471?q=80&w=800",
  },
  Chinese: {
    description:
      "Traditional Chinese favorites including noodles, fried rice, dumplings, and stir-fried delicacies.",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800",
  },
  Korean: {
    description:
      "Popular Korean dishes featuring BBQ, kimchi, bibimbap, and spicy street-food favorites.",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800",
  },
  Japanese: {
    description:
      "Fresh Japanese cuisine including sushi, ramen, tempura, and premium seafood specialties.",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800",
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