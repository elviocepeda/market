export const getLocation = async () => {
  const data = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve([coords.longitude, coords.latitude]),
      (error) => {
        console.log("No se pudo obtener la localización del usuario.", error);
        reject();
      }
    );
  });
  return data;
};
