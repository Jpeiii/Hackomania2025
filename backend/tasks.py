from crewai import Task
from textwrap import dedent

class Tasks:
    def nutritionist_task(self,agent) -> Task:
        return Task(
            description=dedent("""
            Generate a custom meal plan tailored to the user’s health goals, medical conditions, and dietary preferences, ensuring optimal nutrition and adherence."""),
            agent=agent,
            expected_output=dedent("""
            a list of meals for breakfast, lunch, dinner, and snacks, along with their recipes, nutritional information, and portion sizes, based on the user’s dietary requirements and preferences
            """)
        )