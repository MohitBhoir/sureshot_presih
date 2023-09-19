import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./css/ml.css";
import { drawRect } from "./utilites";

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocossd = require('@tensorflow-models/coco-ssd');

let count = 0;
let name = "";

function Ml() {
  const [flag, setFlag] = useState(0);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null); // Store the WebSocket reference

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    // console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
      facenet();
    }, 2000);
  };

  useEffect(() => {
    // Create the WebSocket connection when the component mounts
    socketRef.current = new WebSocket('ws://127.0.0.1:8000/facenet');
    // var socket = new WebSocket('ws://sureshotfacenet.up.railway.app/facenet')

    socketRef.current.onopen = () => {
      console.log("Connection done");
    };

    socketRef.current.onmessage = function (event) {
      var pred_log = JSON.parse(event.data);
      console.log(pred_log.id);
      // setFace(pred_log.id)
      name = pred_log.id;
    };

    // Cleanup the WebSocket when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this effect runs only once

  const facenet = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      console.log("available");
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const data = canvas.toDataURL("image/jpeg");

      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(data);
      }
    } else {
      console.log("unavailable");
    }
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections

      const obj = await net.detect(video);
      // console.log(obj);

      // if ((obj.find(el => el.class == 'cell phone'))) {
      //   setFlag(1)
      //   count++;
      // }
      if (obj.length > 1 || obj.length === 0) {
        setFlag(1);
        count++;
      } else {
        setFlag(0);
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  // const[person,setperson] = useState("")
  useEffect(() => {
    // Speech()
    runCoco();
    // setperson(name)
  }, []);

  return (
    <div className="Ml h-screen flex flex-col justify-end">
      <header className="Ml-header">
        <div className="flex justify-start items-end">
          <div className="w-1/2 pb-4 pl-4">
            <h1>{flag === 1 ? "Don't Copy." : null}</h1>
            <h1>Copied {count} many times</h1>
            <h1>{name}</h1>
          </div>

          <div className="w-1/2">
            <Webcam
              ref={webcamRef}
              muted={true}
              style={{
                width: "100%",
                height: "auto",
              }}
            />

            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Ml;
