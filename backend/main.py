from flask import Flask
from flask_cors import CORS
from agents import Agents
from tasks import Tasks
from crewai import Crew
from flask import request, jsonify
from create import create_image
import json
app = Flask(__name__)

CORS(app)

@app.route('/face', methods=['POST'])
def faceRecognition():
    print("Face Recognition")
    payload = request.get_json()
    dermatalogist_agent = Agents().dermatalogist()
    dermatalogist_task = Tasks().dermatalogist_task(dermatalogist_agent, payload)
    crew = Crew(
        agents=[
            dermatalogist_agent
        ],
        tasks=[dermatalogist_task],
        verbose=True,
    )
    result = crew.kickoff()
    raw = result.raw
    raw_str = raw.strip()
    json_start = raw_str.find('{')
    json_end = raw_str.rfind('}') + 1
    json_content = raw_str[json_start:json_end]
    # print(json_content)
    try:
        parsed_json = json.loads(json_content)
    except json.JSONDecodeError:
        print("Failed to parse JSON")
    print(parsed_json['prediction'])
    # return jsonify({"status": "success", "data": "test"})
    image = create_image(parsed_json['prediction'],payload.get('image'))
    data = {
        "skin_health_report": parsed_json['prediction'],
        "prediction": parsed_json['prediction'],
        "image": image
    }
    return jsonify({"status": "success", "data": data})

@app.route('/crewai', methods=['POST'])
def connectCrewAI():
    payload = request.get_json()    
    nutritionist_agent = Agents().nutritionist_agents()
    nutritionist_task = Tasks().nutritionist_task(nutritionist_agent, payload)
    
    crew = Crew(
        agents=[
            nutritionist_agent
        ],
        tasks=[nutritionist_task],
        verbose=True,
    )

   
    nutritionist_result = crew.kickoff()
    raw = nutritionist_result.raw
    raw_str = raw.strip()
    json_start = raw_str.find('{')
    json_end = raw_str.rfind('}') + 1
    json_content = raw_str[json_start:json_end]
    print(json_content)
    try:
        parsed_json = json.loads(json_content)
    except json.JSONDecodeError:
        parsed_json = {
            "advisor_rationale": "This meal plan focuses on lean proteins, whole grains, fruits, vegetables, healthy fats, and lean carbohydrates. It aims to provide balanced nutrition while avoiding any ingredients that may cause adverse reactions or allergies.",
            "meal_plan": [
            {
                "day": "Day 1",
                "daily_health_score": "7.8",
                "meals": {
                    "breakfast": {
                    "name": "Oatmeal with Berries and Nuts",
                    "recipe": "In a pot, bring 1 cup of water to a boil. Add 1/2 cup of rolled oats, reduce heat to low, cover, and cook for 5 minutes. Top with 1/2 cup mixed berries and 1 tablespoon chopped nuts.",
                    "nutrition": {
                        "calories": "Approx. 350",
                        "protein": "8g",
                        "carbohydrates": "60g",
                        "fat": "15g"
                    },
                    "portion_size": "1 serving",
                    "food_score": "8"
                    },
                    "lunch": {
                    "name": "Grilled Chicken Sandwich",
                    "recipe": "Preheat grill to medium-high heat. Season 4 oz grilled chicken breast with salt, pepper, and your favorite herbs. Place on a whole wheat bun with lettuce, tomato, and 1 tablespoon of mayo.",
                    "nutrition": {
                        "calories": "Approx. 400",
                        "protein": "35g",
                        "carbohydrates": "30g",
                        "fat": "20g"
                    },
                    "portion_size": "1 serving",
                    "food_score": "7"
                    },
                    "dinner": {
                    "name": "Baked Salmon with Roasted Vegetables",
                    "recipe": "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper. Place 4 oz salmon fillet on the sheet, drizzle with olive oil, and season with salt, pepper, and your favorite herbs. Toss 1 cup of mixed vegetables (such as broccoli, carrots, and bell peppers) with olive oil, salt, and pepper. Spread on a separate baking sheet. Roast for 12-15 minutes or until the salmon is cooked through.",
                    "nutrition": {
                        "calories": "Approx. 300",
                        "protein": "35g",
                        "carbohydrates": "10g",
                        "fat": "20g"
                    },
                    "portion_size": "1 fillet & 1 cup vegetables",
                    "food_score": "9"
                    }
                },
                "snacks": [
                    {
                    "name": "Apple slices with almond butter",
                    "recipe": "Slice 1 medium apple and serve with 2 tablespoons of almond butter.",
                    "nutrition": {
                        "calories": "Approx. 150",
                        "protein": "4g",
                        "carbohydrates": "20g",
                        "fat": "16g"
                    },
                    "portion_size": "1 serving",
                    "food_score": "8"
                    },
                    {
                    "name": "Carrot sticks with hummus",
                    "recipe": "Dip 4-6 carrot sticks in 2 tablespoons of hummus.",
                    "nutrition": {
                        "calories": "Approx. 100",
                        "protein": "5g",
                        "carbohydrates": "10g",
                        "fat": "10g"
                    },
                    "portion_size": "1 serving",
                    "food_score": "7"
                    }
                ]
            }
            ]
        }
    determotologist_agent = Agents().dermatalogist()
    dermatalogist_task = Tasks().dermatalogist_task(determotologist_agent, parsed_json, payload)
    dermatalogis_crew = Crew(
        agents=[
            determotologist_agent
        ],
        tasks=[dermatalogist_task],
        verbose=True,
    )
    dermatalogist_result = dermatalogis_crew.kickoff()
    dermatalogist_raw = dermatalogist_result.raw
    print(dermatalogist_raw)
    determotologist_raw_str = dermatalogist_raw.strip()
    determotologist_json_start = determotologist_raw_str.find('{')
    determotologist_json_end = determotologist_raw_str.rfind('}') + 1
    determotologist_json_content = dermatalogist_raw[determotologist_json_start:determotologist_json_end]
    try:
        determotologist_parsed_json = json.loads(determotologist_json_content)
    except json.JSONDecodeError:
        determotologist_parsed_json = {
            "predicted_biological_age_current_photo": "18 years old",
            "current_skin_condition_report": "The skin appears healthy with minimal signs of aging, but could benefit from improved hydration and antioxidant intake.",
            "predicted_biological_age_after_meal_plan": "Likely to appear 2-3 years younger, based on the high health score of the meal plan",
            "predicted_skin_condition_after_meal_plan": "Improved skin condition with reduced acne breakouts and increased skin radiance due to the balanced diet and antioxidant-rich foods.",
            "advisor_summary": "Congratulations on choosing a healthy and balanced meal plan! By following this plan for a month, you can expect significant improvements in your skin health and overall aging. Stay hydrated, get enough sleep, and enjoy the benefits of whole, unprocessed foods."
        }
    print(determotologist_parsed_json)
    image = create_image(determotologist_parsed_json['predicted_skin_condition_after_meal_plan'],payload.get('image'))
    data = {
        "nutritionist_report": parsed_json,
        "dermatalogist_report": determotologist_parsed_json,
        "image": image
    }
    print(data)
    return jsonify({"status": "success", "data": data})

@app.route('/crewai', methods=['GET'])
def getCrewAI():
    return jsonify({"status": "success", "data": "GET method is not supported for this endpoint"})

if __name__ == '__main__':
    app.run(port=8081)