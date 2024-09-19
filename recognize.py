import face_recognition
import cv2
import numpy as np
import os
from datetime import datetime
import time


known_face_encodings = []
known_face_names = []

if not os.path.exists('known_faces') or not os.listdir('known_faces'):
    print("Error: 'known_faces' directory is empty or does not exist.")
    exit()


for filename in os.listdir('known_faces'):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        try:
            image = face_recognition.load_image_file(f'known_faces/{filename}')
            encoding = face_recognition.face_encodings(image)
            if len(encoding) > 0:  
                known_face_encodings.append(encoding[0])
                known_face_names.append(filename.split(".")[0])  
            else:
                print(f"No face found in {filename}, skipping.")
        except IndexError:
            print(f"Warning: No faces found in {filename}, skipping.")


video_capture = cv2.VideoCapture(0)
if not video_capture.isOpened():
    print("Error: Could not open video source.")
    exit()


if not os.path.exists('attendance'):
    os.makedirs('attendance')


def mark_attendance(name):
    with open('attendance/attendance_log.txt', 'a') as f:
        now = datetime.now()
        dt_string = now.strftime('%Y-%m-%d %H:%M:%S')
        f.write(f'{name}, {dt_string}\n')
        print(f"Attendance marked for {name} at {dt_string}")


def load_marked_attendance():
    today = datetime.now().strftime('%Y-%m-%d')
    marked = set()
    attendance_log_path = 'attendance/attendance_log.txt'
    if os.path.exists(attendance_log_path):
        with open(attendance_log_path, 'r') as f:
            for line in f:
                try:
                    name, dt_string = line.strip().split(', ')
                    date = dt_string.split(' ')[0]
                    if date == today:
                        marked.add(name)
                except ValueError:
                    
                    continue
    return marked


marked_attendance = load_marked_attendance()


def draw_detailed_text(image, name, attendance_marked, position):
    
    text_1 = f"FACE DETECTED:"
    text_2 = f"NAME: {name.upper()}"
    text_3 = f"ATTENDANCE MARKED: {'TRUE' if attendance_marked else 'FALSE'}"

    
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.8
    thickness = 2
    color = (0, 255, 0)  

    
    cv2.putText(image, text_1, (position[0], position[1]), font, font_scale, color, thickness)
    cv2.putText(image, text_2, (position[0], position[1] + 30), font, font_scale, color, thickness)
    cv2.putText(image, text_3, (position[0], position[1] + 60), font, font_scale, color, thickness)



while True:
    
    ret, frame = video_capture.read()

    if not ret:
        print("Failed to capture image from camera")
        break

    
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    
    rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])

    
    face_locations = face_recognition.face_locations(rgb_small_frame)

    if face_locations:  
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        
        for face_encoding, face_location in zip(face_encodings, face_locations):
            
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)

            
            if face_distances.size > 0 and any(matches):
                best_match_index = np.argmin(face_distances)

                
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]

                    
                    if name in marked_attendance:
                        
                        top, right, bottom, left = face_location
                        top *= 4
                        right *= 4
                        bottom *= 4
                        left *= 4
                        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 255), 2)  

                        
                        draw_detailed_text(frame, name, attendance_marked=True, position=(left, bottom + 30))

                        
                        start_time = time.time()
                        while time.time() - start_time < 5:
                            ret, frame = video_capture.read()
                            if not ret:
                                break
                            
                            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 255), 2)
                            draw_detailed_text(frame, name, attendance_marked=True, position=(left, bottom + 30))
                            cv2.imshow('Video', frame)

                            if cv2.waitKey(1) & 0xFF == ord('q'):
                                break

                        
                        video_capture.release()
                        cv2.destroyAllWindows()
                        exit()
                    else:
                        
                        mark_attendance(name)
                        marked_attendance.add(name)

                        
                        top, right, bottom, left = face_location
                        top *= 4
                        right *= 4
                        bottom *= 4
                        left *= 4
                        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)  

                        
                        draw_detailed_text(frame, name, attendance_marked=False, position=(left, bottom + 30))

                        
                        start_time = time.time()
                        while time.time() - start_time < 5:
                            ret, frame = video_capture.read()
                            if not ret:
                                break
                            
                            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                            draw_detailed_text(frame, name, attendance_marked=False, position=(left, bottom + 30))
                            cv2.imshow('Video', frame)

                            if cv2.waitKey(1) & 0xFF == ord('q'):
                                break

                        
                        video_capture.release()
                        cv2.destroyAllWindows()
                        exit()
                else:
                    print("No matching face found, continuing to search...")

    
    cv2.imshow('Video', frame)

    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


video_capture.release()
cv2.destroyAllWindows()