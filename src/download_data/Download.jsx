import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import React from "react";

const Download = async ({ employeeName }) => {
  const canvas = await html2canvas(document.getElementById("view-card"));

  const dataURL = canvas.toDataURL("image/png");
  downloadjs(dataURL, `${employeeName}.png`, "image/png");
};

export default Download;
