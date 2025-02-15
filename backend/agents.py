from crewai import Agent, LLM

class Agents():
    """Agents crew"""
    # deekseep_ollama = LLM(model="ollama/deepseek-r1:1.5b", base_url="http://localhost:11434")
    llama_ollama = LLM(model="ollama/llama3.2",
                       base_url="http://localhost:11434")

    def nutritionist_agents(self) -> Agent:
        return Agent(
            role="nutritionist",  # More evocative and descriptive role
            goal="""To deliver science-backed, adaptive, and sustainable meal plans tailored to:
            Individual health goals (weight loss, muscle gain, longevity)
            Medical conditions (diabetes, PCOS, cholesterol, hypertension)
            User preferences & lifestyle (dietary restrictions, meal timing, cuisine choices)
            The AI ensures nutrient balance, blood sugar stability, and metabolic efficiency while offering meal swaps, tracking adherence, and providing progress insights.""",  # More specific goal
            backstory="""Built on Advanced Nutrition Science: The AI is trained on thousands of clinical studies, dietary guidelines, and metabolic health data to optimize meal plans for long-term health and disease prevention.
            Machine Learning & Real-Time Adaptation: It continuously learns from user feedback, glucose fluctuations, activity levels, and sleep data to fine-tune meal plans and improve recommendations.
            Personalized for Every Lifestyle: Whether a busy professional, a fitness enthusiast, or someone managing a chronic condition, the AI adapts to user habits, food availability, and cultural preferences to ensure practical and realistic meal plans.
            Behavioral Coaching & Motivation: It not only suggests meals but also educates users on nutrition, helping them build better habits with gamified engagement and actionable insights.""",  # Detailed and persona-reinforcing backstory
            verbose=True,
            llm=self.llama_ollama,
        )

   