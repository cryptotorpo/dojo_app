// GradientBorder.tsx
import * as React from "react";
import Box from "@mui/material/Box";

interface GradientBorderProps {
  children: React.ReactNode;
  radius?: string;
}

const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  radius,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: radius ? radius : "20px",
        overflow: "hidden",
      }}
    >
      {children}
      <Box
        sx={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          bottom: "-1px",
          left: "-1px",
          background:
            "linear-gradient(180deg, #242427 0%, rgba(36, 36, 39, 0) 100%)",
          borderRadius: radius ? `${parseInt(radius) + 2}px` : "22px",
          zIndex: "-1",
        }}
      />
    </Box>
  );
};

export default GradientBorder;
