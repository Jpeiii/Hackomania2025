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

    result = crew.kickoff()
    # if result:
    # # For now, return a dummy result to ensure the return is able to parse
    #     testing = {"status": "success", "data": "This is a dummy result"}
    #     return jsonify(testing)
    return jsonify({"status": "success", "message": "This is a dummy result"})

@app.route('/crewai', methods=['GET'])
def getCrewAI():
    return jsonify({"status": "success", "data": "GET method is not supported for this endpoint"})

if __name__ == '__main__':
    app.run(port=8081)