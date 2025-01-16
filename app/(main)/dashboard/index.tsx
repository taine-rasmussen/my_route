import React from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import UserWidget from "./userWidget/UserWidget";

const Dashboard = () => {
  return (
    <SafeAreaWrapper>
      <UserWidget />
    </SafeAreaWrapper>
  );
};

export default Dashboard;
