import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PaginationComponent({ page, handlePageChange, count }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "var(--blue) !important",
            color: "#fff !important",
            borderColor: "var(--blue) !important",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "0px solid var(--grey) !important",
          },
          "& .MuiPaginationItem-text": {
            color: "var(--white)",
            border: "1px solid var(--grey) !important",
          },
        }}
      />
    </div>
  );
}
