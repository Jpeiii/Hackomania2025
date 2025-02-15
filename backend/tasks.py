from crewai import Task
from textwrap import dedent

class Tasks:
    def nutritionist_task(self, agent, payload) -> Task:
        gender = payload.get('gender')
        age = payload.get('age')
        health_goals = payload.get('healthGoals')
        budget = payload.get('budget')
        allergy = payload.get('allergy')

        return Task(
            description=dedent(f"""
                You are an expert nutritionist AI, providing not just meal plans, but health-focused advice. Your task is to create a detailed and personalized 3-day meal plan for a user, considering their specific dietary needs and preferences. Furthermore, you will evaluate the nutritional quality of each meal with a 'Food Score' and provide an overall 'Daily Health Score' for each day's plan. Finally, you will act as a nutritional advisor, explaining the rationale behind your meal plan choices.

                **User Profile:**

                * **Gender:** {gender}
                * **Age:** {age}
                * **Health Goals:** {health_goals}
                * **Budget:** {budget} (Consider budget-friendly options when suggesting ingredients and meals)
                * **Allergies/Dietary Restrictions:** {allergy} (Absolutely exclude any ingredients causing allergies. If no allergies are specified, assume no allergies.)

                **Task Objectives:**

                1.  **Develop a 3-Day Meal Plan:** Create a complete meal plan spanning three days. Each day should include:
                    * **Breakfast:** A nutritious and energizing breakfast option.
                    * **Lunch:** A balanced and satisfying lunch option.
                    * **Dinner:** A wholesome and fulfilling dinner option.
                    * **Snacks (2 per day):** Two healthy snack options to be consumed between meals.

                2.  **Provide Recipes:** For each meal and snack in the 3-day plan, provide a simple and clear recipe. Recipes should be easy to follow and ideally use readily available ingredients, keeping the user's budget in mind.

                3.  **Include Nutritional Information:** For each meal and snack, provide estimated nutritional information, including:
                    * **Calories:** Total calories per serving.
                    * **Protein (grams):** Grams of protein per serving.
                    * **Carbohydrates (grams):** Grams of carbohydrates per serving.
                    * **Fat (grams):** Grams of fat per serving.

                4.  **Specify Portion Sizes:** Clearly indicate the recommended portion size for each meal and snack (e.g., "1 cup", "1 slice", "1 medium apple", "150g").

                5.  **Ensure Nutritional Balance and Variety:** The meal plan should be nutritionally balanced across the 3 days, providing a variety of nutrients and food groups. Aim for a healthy distribution of macronutrients (protein, carbohydrates, and fats) suitable for the user's health goals. Meals should also be varied and appealing to maintain user engagement and prevent dietary fatigue.

                6.  **Consider User Preferences and Restrictions:** Strictly adhere to the user's specified allergies/dietary restrictions. Incorporate budget-friendly options where possible, especially if a budget constraint is indicated. While taste is secondary to health and dietary needs in this structured plan, aim for generally palatable and common food choices.

                7.  **Assign Food Score to Each Meal:** For each breakfast, lunch, dinner, and snack, assign a 'food_score' out of 10. This score should reflect how nutritious and beneficial the meal is, considering factors like:
                    * **Nutrient Density:** Rich in vitamins, minerals, and fiber.
                    * **Macronutrient Balance:** Appropriate protein, carbohydrate, and fat ratios for the user's goals.
                    * **Whole Foods Focus:** Emphasis on minimally processed, whole ingredients.
                    * **Suitability for Health Goals:** How well the meal aligns with the user's specified health goals (e.g., weight loss, muscle gain, general wellness).
                    * **Lower Score for:** High processed foods, excessive unhealthy fats, added sugars, low nutrient density.

                8.  **Calculate Daily Health Score:** For each day, calculate a 'daily_health_score' by averaging the 'food_scores' of all meals and snacks for that day. This provides an overall quality rating for each day's nutrition.

                9.  **Nutritional Advisor Rationale:** Include an 'advisor_rationale' section at the beginning of your response. In this section, act as a nutritional advisor and explain your overall approach to creating this meal plan. Justify your food choices by referencing the user's:
                    * **Health Goals:** Explain how the meal plan supports the user's stated health goals.
                    * **Dietary Restrictions/Allergies:** Confirm that the plan is free from the specified allergens and adheres to dietary restrictions.
                    * **Budget Considerations:** Explain how the meal plan considers the user's budget, if applicable.
                    * **General Nutritional Strategy:** Briefly outline your general strategy for creating a balanced and healthy meal plan (e.g., focusing on lean proteins, whole grains, fruits, vegetables, healthy fats, etc.).

                **Expected Output Format (JSON):**

                Respond in JSON format. The JSON should be an object containing 'advisor_rationale' and a 'meal_plan' array. The 'meal_plan' array represents the 3-day meal plan. Each element in the 'meal_plan' array represents a day and should be an object containing 'daily_health_score', 'meals', and 'snacks' for that day. Each meal/snack should now also include 'food_score'.

                ```json
                {{
                "advisor_rationale": "...",
                "meal_plan": [
                    {{
                    "day": "Day 1",
                    "daily_health_score": "7.8",
                    "meals": {{
                        "breakfast": {{
                        "name": "Oatmeal with Berries and Nuts",
                        "recipe": "...",
                        "nutrition": {{
                            "calories": "...",
                            "protein": "...",
                            "carbohydrates": "...",
                            "fat": "..."
                        }},
                        "portion_size": "1 cup",
                        "food_score": "8"
                        }},
                        "lunch": {{
                        "name": "Grilled Chicken Sandwich",
                        "recipe": "...",
                        "nutrition": {{
                            "calories": "...",
                            "protein": "...",
                            "carbohydrates": "...",
                            "fat": "..."
                        }},
                        "portion_size": "1 sandwich",
                        "food_score": "7"
                        }},
                        "dinner": {{
                        "name": "Baked Salmon with Roasted Vegetables",
                        "recipe": "...",
                        "nutrition": {{
                            "calories": "...",
                            "protein": "...",
                            "carbohydrates": "...",
                            "fat": "..."
                        }},
                        "portion_size": "1 fillet & 1 cup vegetables",
                        "food_score": "9"
                        }}
                    }},
                    "snacks": [
                        {{
                        "name": "Apple slices with peanut butter",
                        "recipe": "...",
                        "nutrition": {{
                            "calories": "...",
                            "protein": "...",
                            "carbohydrates": "...",
                            "fat": "..."
                        }},
                        "portion_size": "1 medium apple & 2 tbsp peanut butter",
                        "food_score": "8"
                        }},
                        {{
                        "name": "Greek yogurt with honey",
                        "recipe": "...",
                        "nutrition": {{
                            "calories": "...",
                            "protein": "...",
                            "carbohydrates": "...",
                            "fat": "..."
                        }},
                        "portion_size": "1 cup",
                        "food_score": "7"
                        }}
                    ]
                    }}
                ]
                }}
                ```

                **Example (for one breakfast - just to guide the style):**

                ```json
                {{
                "name": "Scrambled Eggs with Spinach and Whole Wheat Toast",
                "recipe": "Whisk 2 eggs with a splash of milk. Sauté a handful of spinach in a pan. Scramble eggs until cooked. Serve with 1 slice of whole wheat toast.",
                "nutrition": {{
                    "calories": "Approx. 300",
                    "protein": "20g",
                    "carbohydrates": "25g",
                    "fat": "15g"
                }},
                "portion_size": "1 serving",
                "food_score": "7"
                }}
                ```

                Remember to provide 'food_score' and 'daily_health_score' as numerical values or short string representations (e.g., "7", "7.8").

                Ensure the meal plan is practical, nutritious, well-scored, and adheres to all user specifications. Aim for a comprehensive and easy-to-use JSON output as described, including the advisor rationale and scores.
                """),
            agent=agent,
            expected_output=dedent("""
                A JSON object containing 'advisor_rationale' (string) and 'meal_plan' (JSON array). The 'meal_plan' is a 3-day meal plan, with each day containing 'daily_health_score', 'meals', and 'snacks'. Each meal/snack object should include "name", "recipe", "nutrition" (calories, protein, carbohydrates, fat), "portion_size", and "food_score".
                """)
        )

    def dermatalogist_task(self, agent, meal_plan, payload) -> Task:
        image_base64 = payload.get('image') # User photo as base64

        return Task(
            description=dedent(f"""
            Your task as a Facial Future Determatologist is to perform a two-part analysis and prediction:

            **Part 1: Current Age and Skin Condition Analysis from Photo**

            * **Input:** You are provided with a base64-encoded image, {image_base64} of the user's face.
            * **Action:** Use your expert vision and dermatological knowledge to analyze this image.
            * **Output 1: Predicted Biological Age:** Based on the facial features in the image, predict the user's current biological age. Return this as a numerical value (e.g., "35 years old").
            * **Output 2: Current Skin Condition Report:** Generate a brief report describing the user's current skin condition as observed in the image. Focus on key indicators like texture, tone, hydration, and visible signs of aging.

            **Part 2: Future Age and Skin Condition Prediction based on Nutritionist-Provided Meal Plan**

            * **Input:** You are also provided with a detailed meal plan in JSON format: 
              ```json
              {meal_plan}
              ```
              This JSON includes:
                * **advisor_rationale:** The nutritionist's explanation for the meal plan's design.
                * **meal_plan:** A 3-day meal plan with meals and snacks.
                * **daily_health_score:**  A score for each day representing the overall nutritional quality of that day's plan.

            * **Analysis of Meal Plan:** Carefully analyze the provided meal plan JSON. Pay close attention to:
                * **advisor_rationale:** Understand the nutritionist's reasoning and the intended health benefits of the plan.
                * **daily_health_scores:**  Consider the overall health quality indicated by these scores. Look for patterns – is it consistently high, moderate, or low? Are there specific days that are scored higher or lower?
                * **Types of Meals and Foods:** Briefly review the types of foods included in the meal plan. Are they generally whole, unprocessed foods? Are there specific ingredients emphasized or excluded?

            * **Assumption:** Assume the user consistently adheres to **this specific meal plan** for the next month.

            * **Prediction Task:** Based on your analysis of the provided meal plan JSON (especially the advisor's rationale and daily health scores) and your understanding of nutrition's impact on skin aging and condition, predict how the user's:
                * **Biological Age** might change after one month of following this specific meal plan (will it appear to become younger, older, or stay the same, and by approximately how much?). Justify your prediction based on the meal plan's nutritional quality.
                * **Skin Condition** will evolve after one month. Describe the anticipated changes in skin health, texture, tone, hydration, and signs of aging.  Relate these predicted changes to specific aspects of the meal plan (e.g., "Increased intake of antioxidants from berries in the breakfast is likely to improve skin radiance," or "Lower intake of processed sugars might reduce acne breakouts.").

            **Output Format:**

            Respond with a JSON object containing the following fields:

            ```json
            {{
              "predicted_biological_age_current_photo": {payload.get('age')}, // e.g., "35 years old"
              "current_skin_condition_report": "...", // Textual report on current skin condition
              "predicted_biological_age_after_meal_plan": "...", // e.g., "Likely to appear 2-3 years younger"
              "predicted_skin_condition_after_meal_plan": "...", // Textual report on predicted future skin condition, referencing aspects of the meal plan
              "advisor_summary": "..." // A brief summary advising the user on the predicted impact of the meal plan on their skin and aging, based on the nutritionist's plan.
            }}
            ```

            **Tool to Use for Image Analysis:** `vision_tool` (Ensure your agent has access to this tool and it can handle base64 images for age and skin condition analysis).

            Provide a comprehensive prediction, leveraging both the visual analysis of the photo and the nutritional insights derived from the provided nutritionist-generated meal plan JSON. Focus on providing actionable and understandable predictions for the user, explicitly linking your predictions to the meal plan's characteristics.
            """),
            agent=agent,
            expected_output=dedent("""
            A JSON object containing:
            - "predicted_biological_age_current_photo": (string, e.g., "35 years old")
            - "current_skin_condition_report": (string, detailed report)
            - "predicted_biological_age_after_meal_plan": (string, e.g., "Likely to appear 2-3 years younger, based on the high health score of the meal plan")
            - "predicted_skin_condition_after_meal_plan": (string, detailed report, referencing specific aspects of the meal plan)
            - "advisor_summary": (string, brief advisory summary)
            """)
        )