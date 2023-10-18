import React, { useEffect, useRef, useState } from "react"
import { default as RWebcam } from "react-webcam"
import { HandLandmarker, FilesetResolver, FaceDetector } from "@mediapipe/tasks-vision"

let handLandmarker = undefined;
let faceDetector = undefined;

const initVision = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      // delegate: "GPU"
    },
    runningMode: "IMAGE",
    numHands: 2
  });
  faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
      // delegate: "GPU"
    },
    runningMode: "IMAGE"
  });
};
initVision();



export default function Webcam({ className, img_callback, fd_callback, hl_callback }) {
  const webcamRef = useRef(null)
  const imgRef = useRef(null)
  const [img, setImg] = useState(undefined)

  useEffect(() => {
    const captureAndsendImage = () => {
      const img = webcamRef.current.getScreenshot({ height: 256, width: 256 });
      if (img)
        setImg(img)

    }
    const interval = setInterval(captureAndsendImage, 500)
    return () => {
      clearInterval(interval)
    }
  }, [webcamRef])

  useEffect(() => {
    if (img && imgRef.current.naturalWidth > 1 && imgRef.current.naturalHeight > 1) {
      if (img_callback) {
        img_callback(img)
      }
      if (fd_callback && faceDetector) {
        const fdResult = faceDetector.detect(imgRef.current);
        fd_callback(fdResult.detections.length)
      }
      if (hl_callback && handLandmarker) {
        const hlResult = handLandmarker.detect(imgRef.current);
        if (hlResult.landmarks.length > 0) {
          hl_callback({ x: hlResult.landmarks[0][8].x * 100, y: hlResult.landmarks[0][8].y * 100 })
        }
      }
    }
  }, [img])

  const videoConstraints = {
    width: 1,
    height: 1,
    facingMode: "user"
  };

  return (
    <div className={className}>
      <RWebcam className="w-10 h-10" ref={webcamRef} audio={false} videoConstraints={videoConstraints} screenshotFormat="image/png" mirrored={true} />
      <img ref={imgRef} src={img} />
    </div>
  )
}
