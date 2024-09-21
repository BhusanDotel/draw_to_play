import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import io from "socket.io-client";
const host: string = "http://localhost:3000";
const socket = io(host);

export const DrawScreen = () => {
  const { id } = useParams();
  const mouseDataRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(10);
  const canvasCTXRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasCTXRef.current = ctx;
      }
    }
  }, []);

  // Set mouse position
  const SetPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const nativeEvent = e.nativeEvent;
    mouseDataRef.current = {
      x: nativeEvent.clientX,
      y: nativeEvent.clientY,
    };
  };

  let saveTimeout: number;
  // Draw on canvas
  const Draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;

    const nativeEvent = e.nativeEvent;
    const ctx = canvasCTXRef.current;
    if (!ctx) return;

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(mouseDataRef.current.x, mouseDataRef.current.y);
    mouseDataRef.current = { x: nativeEvent.clientX, y: nativeEvent.clientY };
    ctx.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();

    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    saveTimeout = window.setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const savedData = canvas.toDataURL("image/png");
        hitApi(savedData);
      }
    }, 500);
  };

  const hitApi = async (savedData: string | null) => {
    await axios.post(`${host}/api/canvas/sync`, {
      savedData,
    });
  };

  useEffect(() => {
    socket.on("syncData", (savedData: { blob: string }) => {
      const savedImage = savedData?.blob;
      if (!savedImage) {
        clearCanvas();
        return;
      }
      loadDrawing(savedImage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const loadDrawing = (savedImage: string) => {
    const canvas = canvasRef.current;
    const ctx = canvasCTXRef.current;
    if (canvas && ctx && savedImage) {
      const img = new Image();
      img.src = savedImage;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const handleClearCanvas = () => {
    clearCanvas();
    hitApi(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvasCTXRef.current;
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <Box>
      <Box className={`w-[500px] h-[500px] overflow-hidden border-[2px]`}>
        <canvas
          ref={canvasRef}
          onMouseMove={(e) => Draw(e)}
          onMouseDown={(e) => SetPos(e)}
        ></canvas>
      </Box>

      {/* Control panel */}
      <Box className="w-full">
        <input
          type="range"
          value={size}
          max={40}
          onChange={(e) => {
            setSize(Number(e.target.value));
          }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={handleClearCanvas}>Clear</button>
      </Box>
      <Box>{id}</Box>
    </Box>
  );
};
