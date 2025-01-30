import React from "react";

interface Props {
  className?: string;
}

export const UserProfile: React.FC<Props> = ({ className }) => {
  return (
    <div className={className} style={{ color: "#fff" }}>
      user profile
    </div>
  );
};
