from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and preprocess the dataset
file = r"D:\VASANTH\Third Year\Internship\Intrain tech\chatbot frontend\Blood_samples_dataset_balanced.csv"
data = pd.read_csv(file)

# Data Preprocessing
data_cleaned = data.drop_duplicates().dropna()
data_encoded = pd.get_dummies(data_cleaned, columns=['Disease'])
scaler = MinMaxScaler()
data_normalized = scaler.fit_transform(data_encoded)

# Step 3: Define VAE Architecture
latent_dim = 2  # Dimensionality of latent space

# Encoder
inputs = keras.Input(shape=(data_normalized.shape[1],))
h = layers.Dense(64, activation='relu')(inputs)
h = layers.Dense(32, activation='relu')(h)
z_mean = layers.Dense(latent_dim)(h)
z_log_var = layers.Dense(latent_dim)(h)

# Sampling Layer
def sampling(args):
    z_mean, z_log_var = args
    epsilon = tf.keras.backend.random_normal(shape=tf.keras.backend.shape(z_mean))
    return z_mean + tf.keras.backend.exp(0.5 * z_log_var) * epsilon

z = layers.Lambda(sampling)([z_mean, z_log_var])

# Decoder
decoder_h = layers.Dense(32, activation='relu')
decoder_mean = layers.Dense(data_normalized.shape[1], activation='sigmoid')
h_decoded = decoder_h(z)
outputs = decoder_mean(h_decoded)

# VAE Model
vae = keras.Model(inputs, outputs)

# Define the VAE Loss Function
def vae_loss(inputs, outputs):
    reconstruction_loss = keras.losses.binary_crossentropy(inputs, outputs) * tf.cast(tf.shape(inputs)[1], tf.float32)
    kl_loss = -0.5 * keras.backend.sum(1 + z_log_var - keras.backend.square(z_mean) - keras.backend.exp(z_log_var), axis=-1)
    return keras.backend.mean(reconstruction_loss + kl_loss)

# Compile Model
vae.compile(optimizer='adam', loss=vae_loss)

# Train the Model
try:
    vae.fit(data_normalized, epochs=50, batch_size=32)
except ValueError as e:
    print("Error during model fitting:", e)

# Generate Synthetic Data
def generate_synthetic_data(num_samples):
    decoder_input = keras.Input(shape=(latent_dim,))
    h_decoded = decoder_h(decoder_input)
    outputs_decoded = decoder_mean(h_decoded)
    decoder = keras.Model(decoder_input, outputs_decoded)

    z_samples = np.random.normal(size=(num_samples, latent_dim))
    generated_samples = decoder.predict(z_samples)
    return generated_samples

# Generate disease-specific synthetic data
def generate_disease_specific_data(diseases_to_generate, num_samples):
    synthetic_data = generate_synthetic_data(num_samples)
    
    # Convert back to original scale
    synthetic_data_original_scale = scaler.inverse_transform(synthetic_data)

    # Prepare synthetic labels
    disease_labels = data_cleaned['Disease'].unique()  # Unique disease labels
    synthetic_disease_labels = np.random.choice(disease_labels, num_samples)  # Randomly choose labels

    # Create a DataFrame with generated data
    synthetic_df = pd.DataFrame(synthetic_data_original_scale, columns=data_encoded.columns)

    # Add one-hot encoded Disease columns based on selected diseases
    for label in disease_labels:
        synthetic_df[label] = np.where(synthetic_disease_labels == label, 1, 0)

    # Filter the data based on the input diseases array
    for label in disease_labels:
        if label not in diseases_to_generate:
            synthetic_df = synthetic_df[synthetic_df[label] == 0]

    return synthetic_df

# API endpoint to generate synthetic data
@app.route('/generate_data', methods=['POST'])
def generate_data():
    diseases_to_generate = request.json.get('diseases', [])
    num_samples = request.json.get('num_samples', 100)  # Default to 100 samples

    synthetic_df = generate_disease_specific_data(diseases_to_generate, num_samples)
    return jsonify(synthetic_df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)  # Allow external access

