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
                    }},
                    {{
                    "day": "Day 2",
                    "daily_health_score": "...",
                    "meals": {{ ... }},
                    "snacks": [ ... ]
                    }},
                    {{
                    "day": "Day 3",
                    "daily_health_score": "...",
                    "meals": {{ ... }},
                    "snacks": [ ... ]
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

    def dermatalogist_task(self, agent, payload) -> Task:
        image_base64 = payload.get('image')
        return Task(
            description=dedent(f"""
            Your task as a **Facial Future Dermatologist** is to **analyze a base64-encoded image**, {image_base64} representing the user's current facial appearance and **predict potential future skin improvements** based on your expert analysis and recommended actions.

            **Image Analysis and Future Prediction Task:**
            Based on your deep knowledge of dermatology, nutrition, aging processes, and **predictive skin health trends**, analyze the provided base64-encoded image of the user's face. Your goal is to:

            1.  **Assess Current Skin Condition:** Evaluate the user's current skin condition in detail, including:
                * **Texture:** Describe the smoothness, roughness, or any unevenness of the skin texture.
                * **Complexion:** Assess the radiance, dullness, and evenness of skin tone.
                * **Hydration:** Identify signs of dryness, dehydration, or well-hydrated skin.
                * **Redness/Inflammation:** Note the presence and severity of any redness, inflammation, or blemishes.
                * **Aging Signs:** Evaluate wrinkles, fine lines, crow's feet, and overall signs of aging or youthfulness.
                * **Facial Features:**  Observe facial features for signs of bloating, definition, or any aspects related to diet and health visible on the face.

            2.  **Generate Personalized Recommendations:** Provide specific and actionable recommendations for improving the user's skin health. These should encompass:
                * **Skincare Routine Adjustments:** Suggest specific products or routines.
                * **Dietary Changes:** Recommend foods or dietary adjustments beneficial for skin health.
                * **Lifestyle Adjustments:**  Advise on lifestyle factors like sleep, stress management, or exercise.

            3.  **Predict Future Skin Condition (with Recommendations Followed):** **This is crucial:**  Based on your analysis and recommendations, predict how the user's skin condition might improve **if they consistently follow your recommendations for approximately one month.**  Your prediction should be specific and address the areas you assessed in step 1. For example, predict potential improvements in:
                * **Wrinkle Reduction:** Will wrinkles and fine lines likely lessen?
                * **Facial Shape:** Will the face become less bloated or more defined in shape?
                * **Skin Texture and Tone:** Will skin texture become smoother? Will skin tone become more even and radiant?
                * **Hydration and Redness:**  Predict improvements in hydration levels and reduction in redness or inflammation.
                * **Overall Skin Health:** Give a summary prediction of overall skin health improvement.

            **Expected Output Format (JSON):**
            Respond in JSON format. The JSON should be an object containing 'skin_health_report', 'recommendations', and **'prediction'**.

            *   **'skin_health_report'**: Detailed findings from the image analysis of the current skin condition (as described in step 1).
            *   **'recommendations'**: A list of actionable advice for the user to improve their skin health (as described in step 2).
            *   **'prediction'**:  **Your prediction of how the user's skin will likely change after one month of consistently following your recommendations.** This section should address improvements across various aspects of skin health, such as wrinkles, facial shape, texture, hydration, and overall condition.

            ```json
            {{
              "skin_health_report": {{
                "texture": "...",
                "complexion": "...",
                "hydration": "...",
                "redness": "...",
                "aging_signs": "...",
                "facial_features": "..."
              }},
              "recommendations": [
                "Recommendation 1",
                "Recommendation 2",
                "Recommendation 3"
              ],
              "prediction": "Based on consistent adherence to these recommendations for one month, the user's face is likely to show [specific predicted improvements, e.g., improved hydration and texture, reduced redness, slight reduction in fine lines, less facial bloating, more defined jawline], leading to an overall [quantifiable or qualitative prediction, e.g., 20% reduction in wrinkle depth, noticeably clearer complexion, healthier and more youthful appearance]."
            }}
            ```

            **Example (Complete JSON Output with Prediction):**

            ```json
            {{
              "skin_health_report": {{
                "texture": "Slightly rough with visible pores",
                "complexion": "Dull with some uneven skin tone in the forehead area",
                "hydration": "Mildly dehydrated, some dryness around the mouth",
                "redness": "Mild redness on the cheeks and nose",
                "aging_signs": "Noticeable fine lines around the eyes and mouth",
                "facial_features": "Slightly bloated appearance, particularly in the cheek area"
              }},
              "recommendations": [
                "Incorporate a hyaluronic acid serum twice daily for increased hydration.",
                "Exfoliate 2-3 times per week with a gentle AHA/BHA exfoliant to improve skin texture and complexion.",
                "Reduce sodium intake and increase potassium-rich foods to reduce facial bloating.",
                "Consume at least 8 glasses of water daily for better hydration and toxin removal."
              ],
              "prediction": "Based on consistent adherence to these recommendations for one month, the user's face is likely to show improved hydration and texture, leading to smoother skin and reduced pore visibility. Redness on the cheeks and nose should diminish. Fine lines may show a slight reduction in depth (around 10-15%). Facial bloating is expected to decrease, resulting in a slightly more defined facial shape and a healthier, more radiant complexion overall."
            }}

            Ensure your analysis is thorough, accurate, and provides both practical recommendations and a realistic, benefit-driven prediction of future skin condition improvements for the user.
            """),
            agent=agent,
            expected_output=dedent("""
            Output should be in JSON format:
            {{
              "skin_health_report": {{
                "texture": "...",
                "complexion": "...",
                "hydration": "...",
                "redness": "...",
                "aging_signs": "...",
                "facial_features": "..."
              }},
              "recommendations": [
                "Recommendation 1",
                "Recommendation 2",
                "Recommendation 3"
              ],
              "prediction": "Based on the current skin condition, the user's face is likely to show [specific predicted improvements] with the recommended changes."
            }}
            """)
        )