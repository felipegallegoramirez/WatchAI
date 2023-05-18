from fastapi import Request
from fastapi.responses import JSONResponse
from utils.auth import validate_token
from fastapi.routing import APIRoute

class VerifyTokenRoute(APIRoute):
    
    # Método para obtener la ruta original
    def get_route_handler(self):
        try:
            original_route = super().get_route_handler()
            
            # Middleware para verificar el token
            async def verify_token_middleware(request: Request):

                token = request.headers["Authorization"].split(" ")[1]
                validation_response = validate_token(token, output=False)
                # Si existe token continua con la ruta original
                if validation_response is None:
                    return await original_route(request)
                
                else:
                    return validation_response

            return verify_token_middleware
        except:
            return JSONResponse(content={"message": "Error"}, status_code=400)