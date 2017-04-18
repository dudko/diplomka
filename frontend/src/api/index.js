// import { processPoints } from '../actions'

const calculatePhase = (cb, elasticity) => {
  const http = new XMLHttpRequest();
  http.open("POST", "http://localhost:8080/api/calcNew", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.onerror = (e) => console.log(e);

  
  http.onload = function () {
    // const { x, y, z, Y } = JSON.parse(this.response);    
    const points = JSON.parse(this.response);
    cb(points);
      
    // var trace1 = {
    //   x, y, z,
    //   mode: 'markers',
    //   marker: {
    //     size: 12,
    //     color: Y,
    //     colorscale: 'Jet',
    //     opacity: 1
    //   },
    //   type: 'scatter3d'
    // };

    // var data = [trace1];
    // var layout = {
    //   margin: {
    //     l: 0,
    //     r: 0,
    //     b: 0,
    //     t: 20
    //   }
    // };
    // Plotly.newPlot('Ys', data, layout);
  }
  http.send(JSON.stringify({ matrix: elasticity }));
}

export {
  calculatePhase
}