from flask import Flask,  jsonify, request
import os
from flask_cors import CORS
from keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model
from keras.applications.resnet50 import preprocess_input

app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

model = load_model("resnet50_image_classifier.h5")
classes = ['mild','moderate','no diabetic retinopathy','proliferative','severe']

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/upload", methods=["POST"])
def upload_file():
    if "image" not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No selected file"})

    if file and allowed_file(file.filename):
        filename = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(filename)
        print(f"Image received and saved: {filename}")
        img = image.load_img(filename, target_size=(180, 180)) 
        x = image.img_to_array(img)
        x = preprocess_input(x)
        x = np.expand_dims(x, axis=0)
        prediction = model.predict(x)
        predicted_class_index = np.argmax(prediction)
        print(classes[predicted_class_index])

        body = {}
        data = {}

        data["result"] = classes[predicted_class_index]
        body["data"] = data
        return jsonify({"result": body})

    return jsonify({"error": "Invalid file format"})


if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.debug = True
    app.run(port=5000, threaded=True)
