import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { DrawScreen } from "../components/DrawScreen";
import { useGetTutorialDetailQuery } from "../Queries/roomApi";

export const Playground = () => {
  const { id } = useParams();

  //RTK Query
  const { data: roomDetail, isLoading: loadingRoomData } =
    useGetTutorialDetailQuery(id);

  return (
    <Box className="w-full flex justify-center mt-10 ">
      <DrawScreen />
    </Box>
  );
};
