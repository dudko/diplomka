const sendToElate = (elasticity, cb) => {
  const http = new XMLHttpRequest();
  http.open("POST", `${process.env.SERVER_URL}/api/elateAnalyse`, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.onerror = e => console.log(e);

  http.onload = function() {
    const tables = JSON.parse(this.response);
    cb(tables);
  };
  http.send(JSON.stringify(elasticity));
};

export { sendToElate };
