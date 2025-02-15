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
    print(result)
    try:
        result_json = json.loads(result)
        if result_json:
            print("Result JSON: ", result_json)
            # create_image(result_json, payload.get('image'))
            # return jsonify({"status": "success", "data": result_json, "image": "regenerated_image"})
    except json.JSONDecodeError:
        return jsonify({"status": "error", "message": "Invalid JSON format in result"})
    # if result:
    #     create_image(result,payload.get('image'))
    #     return jsonify({"status": "success", "data": "This is a dummy result", "image": regenerated_image})

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
    print(result)
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