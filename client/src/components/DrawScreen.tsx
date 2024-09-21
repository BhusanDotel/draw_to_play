import axios from "axios";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import { hostURL } from "../utils/apiRoutes";

const socket = io(hostURL);

const canvasSize = {
  width: 500,
  height: 500,
};

export const DrawScreen = () => {
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
        // Set canvas dimensions to 500px by 500px
        canvas.width = canvasSize?.width;
        canvas.height = canvasSize?.height;
        canvasCTXRef.current = ctx;
      }
    }
  }, []);

  // Adjusted SetPos function to account for canvas position
  const SetPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouseDataRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  let saveTimeout: number;

  // Adjusted Draw function to account for canvas position
  const Draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;

    const canvas = canvasRef.current;
    const ctx = canvasCTXRef.current;
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(mouseDataRef.current.x, mouseDataRef.current.y);
    mouseDataRef.current = { x: mouseX, y: mouseY };
    ctx.lineTo(mouseX, mouseY);
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
        const blob = canvas.toDataURL("image/png");
        hitApi(blob);
      }
    }, 500);
  };

  const hitApi = async (blob: string | null) => {
    await axios.post(`${hostURL}/api/canvas/sync`, {
      blob,
    });
  };

  useEffect(() => {
    socket.on("syncData", (savedData: { blob: string }) => {
      const savedImage = savedData?.blob;
      if (!savedImage) {
        clearCanvas();
        return;
      }

      console.log("savedData", savedData);
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
      <Box
        className={`w-[${canvasSize?.width}px] h-[${canvasSize?.height}px] overflow-hidden border-[2px] bg-green-100`}
      >
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
    </Box>
  );
};
