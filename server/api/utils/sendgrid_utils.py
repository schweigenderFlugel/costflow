from fastapi import HTTPException, status
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from python_http_client.exceptions import UnauthorizedError

from config.envs import SENDGRID_API_KEY, SENDGRID_SENDER

def send_email(email: str, subject: str, content: str):
    try:
        sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)
        from_email = Email(SENDGRID_SENDER)
        to_email = To(email)
        subject = subject
        content_to_send = Content("text/plain", content)
        mail = Mail(from_email=from_email, to_emails=to_email, subject=subject, plain_text_content=content_to_send)

        mail_json = mail.get()

        sg.client.mail.send.post(request_body=mail_json)
    except UnauthorizedError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=e.reason)