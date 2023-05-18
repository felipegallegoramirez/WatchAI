import smtplib
from email.message import EmailMessage
from os import getenv



def recoverpassword(code,email):
    try:
        # Configuracion para el envio del correo
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        smtp_username = getenv("email")
        smtp_password = getenv("email_password")


        # configuracion especifica del correo, en este caso con el link de recuperacion
        msg = EmailMessage()
        msg['From'] = smtp_username
        msg['To'] = email
        msg['Subject'] = "Recuperacion WatchAI"
        msg.set_content(f"Para ingresar recuperar la contraseña ingrese a {getenv('frontend')}{code}")

        # Envio del correo
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
    except NameError as e:
        print(e)