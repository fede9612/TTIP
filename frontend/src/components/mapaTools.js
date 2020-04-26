class MapTools {


     calculateDistance(lat1, lon1) {

        // http://www.movable-type.co.uk/scripts/latlong.html
      
        const lat2 = -34.162473;
        const lon2 = -59.783724;
      
        const R = 6371e3; // earth radius in meters
        const φ1 = lat1 * (Math.PI / 180);
        const φ2 = lat2 * (Math.PI / 180);
        const Δφ = (lat2 - lat1) * (Math.PI / 180);
        const Δλ = (lon2 - lon1) * (Math.PI / 180);
      
        const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
                  ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = (R * c) * 0.001; //* 0.001 para obtener los km
        return this.trunc(distance, 1); // En km
      }

      trunc (x, posiciones = 0) {
        var s = x.toString()
        var l = s.length
        var decimalLength = s.indexOf('.') + 1
        var numStr = s.substr(0, decimalLength + posiciones)
        return Number(numStr)
      }
      
}
export default MapTools;
  