from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import cv2
import numpy as np
import os
from datetime import datetime

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


# Load known faces
known_face_encodings = []
known_face_names = []
marked_attendance = set()

if not os.path.exists('known_faces') or not os.listdir('known_faces'):
    print("Error: 'known_faces' directory is empty or does not exist.")
    exit()

for filename in os.listdir('known_faces'):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        image = face_recognition.load_image_file(f'known_faces/{filename}')
        encoding = face_recognition.face_encodings(image)
        if len(encoding) > 0:
            known_face_encodings.append(encoding[0])
            known_face_names.append(filename.split(".")[0])


print(known_face_encodings, "known_face_encodings")
print(known_face_names, "known_face_names")

# Create 'attendance' directory if it doesn't exist
if not os.path.exists('attendance'):
    os.makedirs('attendance')

# Function to log attendance
def mark_attendance(name):
    with open('attendance/attendance_log.txt', 'a') as f:
        now = datetime.now()
        dt_string = now.strftime('%Y-%m-%d %H:%M:%S')
        f.write(f'{name}, {dt_string}\n')

# Flask route to handle image processing
@app.route('/recognize', methods=['POST'])
def recognize():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    img = np.frombuffer(file.read(), np.uint8)
    frame = cv2.imdecode(img, cv2.IMREAD_COLOR)

    # Resize for faster face recognition processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])

    # Find all face locations and encodings in the current frame
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

    response_data = {"recognized_faces": []}

    if not face_locations or not face_encodings:
        response_data["recognized_faces"].append({"name": "Unknown", "status": "No Face Detected. Please try again by standing still."})
    # Process each face encoding found
    for face_encoding, face_location in zip(face_encodings, face_locations):
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        
        if face_distances.size > 0 and any(matches):
            best_match_index = np.argmin(face_distances)
            name = known_face_names[best_match_index]

            # Check if already marked today
            if name not in marked_attendance:
                mark_attendance(name)
                marked_attendance.add(name)
                response_data["recognized_faces"].append({"name": name, "status": "Attendance marked"})
            else:
                response_data["recognized_faces"].append({"name": name, "status": "Already marked"})
        else:
            print('HERE!')
            response_data["recognized_faces"].append({"name": "Unknown", "status": "No match"})

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='4000')

