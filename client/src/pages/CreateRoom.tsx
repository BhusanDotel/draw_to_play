import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import { generateRandomAlphanumeric } from "../utils/generateRandomStrings";

import { useCreateRoomMutation } from "../Queries/roomApi";

export const CreateRoom: React.FC = () => {
  const [name, setName] = useState<string>("");

  const randomNumber = useMemo(() => {
    return generateRandomAlphanumeric();
  }, []);

  const [createRoom, { data: Response, isLoading, error }] =
    useCreateRoomMutation();

  const roomID = useMemo(() => {
    if (!Response) return null;
    return `${window.location.href}room/${Response?._id}/playground`;
  }, [Response]);

  useEffect(() => {
    if (!error) return;
    toast.error("Error creating room");
  }, [error]);

  return (
    <Box className="flex justify-center mt-10">
      <Box className="border flex gap-10 flex-col justify-between p-10">
        <Box className="flex items-center gap-1">
          <TextField
            size="small"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Box className="bg-gray-200 text-gray-500 h-full flex items-center p-2 rounded-sm">
            {randomNumber}
          </Box>
        </Box>
        <Box className="flex justify-center items-center">
          <Button
            disabled={!name || isLoading}
            variant="contained"
            onClick={async () => {
              await createRoom({
                name,
                playerUId: randomNumber,
              });
            }}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </Box>

        <Box className="flex justify-center items-center">
          {roomID && <p>{roomID}</p>}
        </Box>
      </Box>
    </Box>
  );
};
