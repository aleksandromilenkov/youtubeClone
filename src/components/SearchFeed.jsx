import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
import { useParams } from "react-router-dom";
const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const data = fetchFromApi(`search?part=snippet&q=${searchTerm}`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [searchTerm]);
  const displayName = (term) => {
    return term
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <Box
      p={2}
      sx={{
        overflowY: "auto",
        height: "90vh",
        flex: "2",
      }}
    >
      <Typography variant="h4" fontWeight="bold" marginBottom="2" color="white">
        Search Results for: {displayName(searchTerm)}{" "}
        <span style={{ color: "#fc1503" }}>Videos</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
