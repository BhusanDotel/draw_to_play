import axios from "axios";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import { generateRandomAlphanumeric } from "../utils/generateRandomStrings";
import { hostURL, myBaseURL } from "../utils/apiRoutes";

export const CreateRoom: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");

  const randomNumber = useMemo(() => {
    return generateRandomAlphanumeric();
  }, []);

  const createRoom = async () => {
    await axios
      .post(`${hostURL}/api/room`, {
        name,
        playerUId: randomNumber,
      })
      .then((res) => {
        setRoomID(`${myBaseURL}/room/${res?.data?._id}/playground`);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message ?? "Something went wrong");
      });
  };

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
          <Button disabled={!name} variant="contained" onClick={createRoom}>
            Create
          </Button>
        </Box>

        <Box className="flex justify-center items-center">
          {roomID && <p>{roomID}</p>}
        </Box>
      </Box>
    </Box>
  );
};
