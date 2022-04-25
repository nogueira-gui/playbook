const timestampToHours = (timestamp) => {
    var a = new Date(timestamp);
    return `${a.getHours()}:${a.getMinutes()}`;

  }
  
  export default timestampToHours;

