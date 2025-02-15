from flask import Flask
from flask_cors import CORS
from agents import Agents
from tasks import Tasks
from crewai import Crew
from flask import request, jsonify

app = Flask(__name__)

CORS(app)

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
    if result:
    # For now, return a dummy result to ensure the return is able to parse
        testing = {"status": "success", "data": "This is a dummy result"}
        return jsonify(testing)

@app.route('/crewai', methods=['GET'])
def getCrewAI():
    return jsonify({"status": "success", "data": "GET method is not supported for this endpoint"})

if __name__ == '__main__':
    app.run(port=8081)