import React from 'react';
import {Image} from 'react-html-email';

export function pedidoListo(){
        // var productosList = productos.map((producto) => {
        //     return <p>{producto}</p>
        // });
        return(
                <div> 
                    <div style={{width:"100%", backgroundColor:"#00BFA6", padding:"2%"}} align="center">
                        <span style={{color:"black", fontSize:"2rem"}}>
                            Su pedido está listo
                        </span>
                    </div>
                    <div style={{width:"100%", paddingTop:"6%", paddingBottom:"6%"}} align="center">
                        <Image style={{width:"35%", marginBottom:"4px"}} src="https://imgs-anydirec.s3-sa-east-1.amazonaws.com/happy_notification.png"></Image>
                        <span style={{fontSize:"1rem"}}>Por favor revise sus pedidos listos del carrito en nuestra página web <a href={process.env.REACT_APP_URL}>WebLocales</a></span>
                    </div>
                    <div style={{width:"100%", backgroundColor:"#00BFA6", padding:"4%"}} align="center">
                        <span style={{color:"black", fontSize:"1rem"}}>
                            Copyright© 2020 WebLocales
                        </span>
                    </div>
                </div>
        )
    }