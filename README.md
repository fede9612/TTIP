# TTIP

Este repositorio abarca una aplicación para presentar como trabajo final para la UNQUI.

## Tema
#### Ecommerce.
Este servicio de Ecommerce te ofrece la posibilidad de tener tu propia página web para poder ofrecer tus productos. Cuenta con la integración de Mercadopago para que puedas recibir el dinero de tus ventas por este medio. Además de poder controlar el stock de tus locales, manejar los pedidos por cada local, recibir notificaciones vía mail de los nuevos pedidos, compartir tu página en redes sociales como Whatsapp, Facebook, Twitter y Telegram como también productos en especifico y la incorporación de un chat privado con el comprador.

## Tecnologías
### Listado de tecnologías utilizadas en este proyecto.
* React
* Mongodb

### Listado de frameworks utilizadas en este proyecto.
* Tailwind
* Mongoose


# Uso

## Backend
### database
##### Para iniciar el database necesitamos declarar las variables de entorno:
* MAIL y PASSMAIL que utilizan el servicio SMTP para el envío de correos electrónicos, ejemplo: MAIL=mail@gmail.com PASSMAIL=password node server.js.
* AWS_ACCES_KEY y AWS_ACCES_KEY_ID para los servicios S3 de AWS, en esta aplicación se utilizan para almacenar las imagenes.
* ACCESS_TOKEN_PROD_MARKETPLACE es el access token del marketplace de Mercadopago
* URLDATABASE es la URL del servidor backend database
