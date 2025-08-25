from fastapi import HTTPException, status
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from jinja2 import Environment, FileSystemLoader
from premailer import transform
from python_http_client.exceptions import UnauthorizedError

from config.envs import SENDGRID_API_KEY, SENDGRID_SENDER

def send_email(email: str, subject: str, template_file: str, variables: dict):
    env = Environment(loader=FileSystemLoader("assets/templates"))
    template = env.get_template(template_file)
    with open("assets/css/styles.css") as f:
        css_code = f.read()
    data = {
        **variables,
        "css": css_code
    }
    html = template.render(data)
    final_html = transform(html)
    try:
        sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)
        from_email = Email(SENDGRID_SENDER)
        to_email = To(email)
        subject = subject
        mail = Mail(from_email=from_email, to_emails=to_email, subject=subject, html_content=final_html)

        mail_json = mail.get()

        sg.client.mail.send.post(request_body=mail_json)
    except UnauthorizedError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=e.reason)