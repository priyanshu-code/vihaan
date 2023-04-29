import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import sys

import cv2

# Load the saved model
model = load_model('C:\\Users\\rawat\\Desktop\\Vihaan-Beckend\\controllers\\my_Model1.h5')

# model.summary()

# Load and preprocess the test image

img_path = sys.argv[1]
img = cv2.imread(img_path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) # Convert to grayscale
img = cv2.resize(img, (150, 150)) # Resize the image to match the input size of the model
img = np.expand_dims(img, axis=0) # Add batch dimension
img = img/255.0 # Normalize pixel values to the range [0, 1]

print("Input shape: ", img.shape)

# Make a prediction
prediction = model.predict(img)

print("Output shape: ", prediction.shape)
print("Output: ", prediction)

# Get the predicted class
predicted_class = np.argmax(prediction)

# Print the predicted class
print("Predicted class: ", predicted_class)
