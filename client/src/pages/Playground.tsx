import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { DrawScreen } from "../components/DrawScreen";

export const Playground = () => {
  const { id } = useParams();
  return (
    <Box className="w-full flex justify-center mt-10 ">
      <DrawScreen />
    </Box>
  );
};
