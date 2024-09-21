import React from "react";
import { useParams } from "react-router-dom";

export const JoinRoom: React.FC = () => {
  const { id } = useParams();

  return <div>ID:{id}</div>;
};
