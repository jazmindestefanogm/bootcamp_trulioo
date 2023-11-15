const fs = require('fs');
const mockoon = require('@mockoon/serverless');

exports.handler = async (event, context) => {
  try {
    // Lee el archivo JSON con la configuración de Mockoon
    const mockEnv = JSON.parse(fs.readFileSync('./trulioo-api-bootcamp.json', 'utf8'));

    // Crea una instancia de MockoonServerless
    const mockoonServerless = new mockoon.MockoonServerless(mockEnv);

    // Maneja la solicitud utilizando el entorno Mockoon
    const response = await mockoonServerless.handle(event);

    // Devuelve la respuesta generada por Mockoon
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: JSON.stringify(response.body)
    };
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    return { statusCode: 500, body: 'Error interno del servidor' };
  }
};
