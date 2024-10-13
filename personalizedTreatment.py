import os
from flask import Flask, request, jsonify
from groq import Groq
from dotenv import load_dotenv
from flask_cors import CORS


# Load environment variables from .env file if present
load_dotenv()

# Set your Groq API Key


# Initialize the Groq client
client = Groq(api_key="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")

# Flask app for backend
app = Flask(__name__)
CORS(app)

# Error handling wrapper for Groq API requests
def call_groq_api(messages, model="llama3-8b-8192"):
    try:
        chat_completion = client.chat.completions.create(
            messages=messages,
            model=model,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

# Endpoint to personalize treatment plans
@app.route('/personalize_treatment_plan', methods=['POST'])
def personalize_treatment_plan():
    data = request.json
    patient_data = data.get('patient_data')
    medical_literature = data.get('medical_literature')

    if not patient_data or not medical_literature:
        return jsonify({"error": "Patient data and medical literature are required"}), 400

    # Construct the prompt for treatment personalization
    message = {
        "role": "user",
        "content": (
            f"Given the following patient data: {patient_data}, and relevant medical literature: {medical_literature}, "
            f"generate a personalized treatment plan tailored to this patient."
        )
    }

    # Call the Groq API to generate the treatment plan
    treatment_plan = call_groq_api([message])

    # Return the personalized treatment plan as a response
    return jsonify({"treatment_plan": treatment_plan})

# Running the Flask app
if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5001, debug=True)  # Allow external access
  # Allow external access
