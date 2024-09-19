import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Attendance.css';  // Link to the CSS file

const Attendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();

    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'q') {
        captureImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);

      // Send the captured image to the backend for face recognition
      submitImage(canvas);
    }
  };

  const submitImage = async (canvas) => {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    const formData = new FormData();
    formData.append('file', blob);

    try {
      const response = await axios.post('http://localhost:5000/recognize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.recognized_faces);  // Set the result from the backend
    } catch (error) {
      console.error('Error recognizing face:', error);
    }
  };

  return (
    <div className="attendance-container">
      <h2 className="title">Face Recognition Attendance</h2>
      <div className="video-container">
        <video ref={videoRef} autoPlay className="video-feed" />
        <canvas ref={canvasRef} className="hidden-canvas" width="400" height="300"></canvas>
      </div>

      {capturedImage && (
        <div className="captured-image-container">
          <h3 className="subtitle">Captured Image</h3>
          <img src={capturedImage} alt="Captured" className="captured-image" />
        </div>
      )}

      {result && (
        <div className="results-container">
          <h3 className="subtitle">Results:</h3>
          <ul className="result-list">
            {result.map((r, index) => (
              <li key={index} className={`result-item ${r.status === "Attendance marked" ? "recognized" : "not-recognized"}`}>
                {r.name}: {r.status}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="instructions">Press 'Q' to capture the image.</p>
    </div>
  );
};

export default Attendance;
