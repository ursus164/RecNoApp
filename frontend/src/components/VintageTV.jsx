import React from "react";
import {
  startScreenRecorder,
  stopScreenRecorder,
} from "../utils/screenRecorder.js";
import Modal from "../components/Modal.jsx";
import CircleButton from "./CircleButton.jsx";
import { useState } from "react";
import "../App.css";

const divs = [];

for (let i = 0; i < 6; i++) {
  divs.push(
    <div
      key={i}
      className="bg-wood bg-cover bg-center shadow-inner-lg w-[100px] h-[502px] "
    ></div>
  );
}

const VintageTV = () => {
  const [isRecording, setIsRecording] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  const handleStartRecording = async () => {
    await startScreenRecorder();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    const jobId = await stopScreenRecorder();
    setCurrentJobId(jobId);
    setIsRecording(false);
  };

  const handleOpenModal = () => {
    if (currentJobId) {
      setIsModalOpen(true);
    } else {
      alert("Please record a video first");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="absolute top-[100px] left-[850px] w-[220px] h-[2px] bg-gray-500 transform rotate-45"></div>
      <div className="absolute top-[100px] left-[915px] w-[180px] h-[2px] bg-gray-500 transform rotate-[-45deg]"></div>
      <div className="flex border-4 border-black rounded shadow-lg relative">
        <div className="flex border-2 border-black border-r-4">{divs}</div>

        <div className="shadow-inner">
          {isRecording ? (
            <div className="bg-gray-700 w-[500px] h-[400px] absolute inset-0 transform translate-x-[50px] translate-y-[50px] rounded-lg border-4 border-black flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-bold text-lg">
                  Recording
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-nosignal w-[500px] h-[400px] absolute inset-0 transform translate-x-[50px] translate-y-[50px] rounded-lg border-4 border-black"></div>
          )}
        </div>

        <div className="bg-coalBlack shadow w-[200px] h-[505px] flex flex-col items-center justify-center">
          {isRecording ? (
            <CircleButton onClick={handleStopRecording}>Stop</CircleButton>
          ) : (
            <CircleButton onClick={handleStartRecording}>Start</CircleButton>
          )}

          <CircleButton onClick={handleOpenModal}>Send Video</CircleButton>
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            jobId={currentJobId}
          />
        </div>
      </div>
    </div>
  );
};

export default VintageTV;
