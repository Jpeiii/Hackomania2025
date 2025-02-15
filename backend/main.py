from flask import Flask
from flask_cors import CORS
from agents import Agents
from tasks import Tasks
from crewai import Crew

app = Flask(__name__)

CORS(app)

@app.route('/')
def hello():
    print("it is connected")
    nutritionist_agent = Agents().nutritionist_agents()
    nutritionist_task = Tasks().nutritionist_task(nutritionist_agent)
    crew = Crew(
    agents=[
            nutritionist_agent
        ],
    tasks=[nutritionist_task],
    verbose=True,
    )

    result = crew.kickoff()
    print(result)
    return result

if __name__ == '__main__':
    app.run(port=8081)