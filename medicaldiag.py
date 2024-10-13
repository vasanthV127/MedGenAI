import os
import torch
from flask import Flask, request, jsonify
from torchvision import models, transforms
from PIL import Image
from groq import Groq
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.utils import secure_filename

# Load environment variables from .env file if present
load_dotenv()

# Initialize the Groq client with your API key
client = Groq(api_key="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")

# Initialize a pre-trained model for medical imaging (e.g., ResNet)
image_model = models.resnet50(pretrained=True)
image_model.eval()

# Image preprocessing
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Flask app for backend
app = Flask(__name__)
CORS(app)

# Set upload folder for images
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

# Endpoint to upload images
@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    return jsonify({'filepath': file_path}), 200

# Endpoint for multimodal diagnosis
# Endpoint for multimodal diagnosis
@app.route('/multimodal_diagnosis', methods=['POST'])
def multimodal_diagnosis():
    data = request.json
    patient_info = data.get('patient_info')
    symptoms = data.get('symptoms')
    image_path = data.get('image_path')

    if not patient_info or not symptoms or not image_path:
        return jsonify({"error": "Patient information, symptoms, and image path are required"}), 400

    # Load and preprocess the medical image
    try:
        img = Image.open(image_path).convert('RGB')  # Ensure image is in RGB format
        img_tensor = preprocess(img).unsqueeze(0)  # Add batch dimension
    except Exception as e:
        return jsonify({"error": f"Image processing failed: {str(e)}"}), 400

    # Forward pass through the image model
    with torch.no_grad():
        image_features = image_model(img_tensor)

    # Truncate the image features and patient info for brevity
    truncated_features = image_features.flatten().tolist()[:10]  # Limit to first 10 features
    concise_patient_info = patient_info.split(",")[0]  # Only keep the name for brevity
    concise_symptoms = symptoms[:50]  # Limit symptoms to first 50 characters

    # Construct the prompt for diagnosis using Groq (text data)
    message = {
        "role": "user",
        "content": (
            f"Patient: {concise_patient_info}, Symptoms: {concise_symptoms}, "
            f"Image Features: {truncated_features}, "
            "Generate a diagnosis and treatment recommendations."
        )
    }

    # Call the Groq API
    diagnosis = call_groq_api([message])

    # Return the diagnosis as a response
    return jsonify({"diagnosis": diagnosis})


# Running the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
