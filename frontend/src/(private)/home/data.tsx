const syndata = {
  nutritionist_report: {
    advisor_rationale:
      "The meal plan has been carefully curated to provide a balanced and nutritious diet for the user. The advisor has considered the user's dietary needs and preferences to create a personalized meal plan.",
    meal_plan: [
      {
        day: "Day 1",
        daily_health_score: "7.8",
        meals: {
          breakfast: {
            name: "Oatmeal with Berries and Nuts",
            recipe:
              "Whisk together 1/2 cup rolled oats, 1/2 cup milk, and 1 tablespoon honey. Cook in a pot over medium heat, stirring constantly, until the oats are cooked and creamy. Top with fresh berries and chopped nuts.",
            nutrition: {
              calories: "250",
              protein: "5g",
              carbohydrates: "40g",
              fat: "10g",
            },
            portion_size: "1 serving",
            food_score: "8",
          },
          lunch: {
            name: "Grilled Chicken Sandwich",
            recipe:
              "Preheat a grill or grill pan to medium-high heat. Season a boneless, skinless chicken breast with salt and pepper. Grill for 5-6 minutes per side, or until cooked through. Serve on whole wheat bread with lettuce, tomato, and avocado.",
            nutrition: {
              calories: "350",
              protein: "30g",
              carbohydrates: "20g",
              fat: "15g",
            },
            portion_size: "1 sandwich",
            food_score: "7",
          },
          dinner: {
            name: "Baked Salmon with Roasted Vegetables",
            recipe:
              "Preheat the oven to 400°F (200°C). Season a salmon fillet with salt and pepper. Place on a baking sheet lined with parchment paper and bake for 12-15 minutes, or until cooked through. Toss together 1 cup of Brussels sprouts and 2 tablespoons of olive oil. Spread on a separate baking sheet and roast in the oven for 20-25 minutes, or until tender.",
            nutrition: {
              calories: "300",
              protein: "35g",
              carbohydrates: "10g",
              fat: "15g",
            },
            portion_size: "1 fillet & 1 cup vegetables",
            food_score: "9",
          },
          snacks: [
            {
              name: "Apple slices with peanut butter",
              recipe:
                "Wash an apple and slice it into thin pieces. Spread 2 tablespoons of peanut butter on each piece.",
              nutrition: {
                calories: "150",
                protein: "4g",
                carbohydrates: "20g",
                fat: "8g",
              },
              portion_size: "1 medium apple & 2 tbsp peanut butter",
              food_score: "8",
            },
            {
              name: "Greek yogurt with honey",
              recipe:
                "Wash a cup of Greek yogurt and stir in 1 tablespoon of honey.",
              nutrition: {
                calories: "150",
                protein: "10g",
                carbohydrates: "30g",
                fat: "0g",
              },
              portion_size: "1 cup",
              food_score: "7",
            },
          ],
        },
      },
    ],
  },
  dermatalogist_report: {
    predicted_biological_age_current_photo: "35 years old",
    current_skin_condition_report:
      "Age spots and minor hyperpigmentation, skin tone appears dull due to lack of hydration, wrinkles are noticeable but not excessive.",
    predicted_biological_age_after_meal_plan:
      "Likely to appear 2-3 years younger, based on the high health score of the meal plan",
    predicted_skin_condition_after_meal_plan:
      "Improved hydration and antioxidant intake will enhance skin radiance. Reduced processed sugar intake may lead to fewer acne breakouts.",
    advisor_summary:
      "Following this meal plan, combined with proper hydration and lifestyle adjustments, you can expect noticeable improvements in your biological age and skin condition over time.",
  },
  image:
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-XpFJo1EFem22tUC96ujQvzIz/user-lNfozu1vxukxXPNZWgAr3PEF/img-TNKPrjWB5G9mj7QiUEkEJWcr.png?st=2025-02-15T19%3A38%3A14Z&se=2025-02-15T21%3A38%3A14Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-02-15T08%3A41%3A49Z&ske=2025-02-16T08%3A41%3A49Z&sks=b&skv=2024-08-04&sig=aiW12sIXAgt9EJZoIVv0uhxqVXQzNN6TCDuCDd33YLU%3D",
};

export default syndata;
