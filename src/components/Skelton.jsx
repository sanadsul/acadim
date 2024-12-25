import React from "react";

const Skeleton = ({
  rows = 1,
  cols = 1,
  width = "100%",
  height = "1rem",
  borderRadius = "0.25rem",
}) => {
  return (
    <div className="flex flex-col gap-2">
      {Array(rows)
        .fill(null)
        .map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {Array(cols)
              .fill(null)
              .map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{ width, height, borderRadius }}
                  className="animate-pulse bg-gray-300 rounded-md"
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export default Skeleton;
