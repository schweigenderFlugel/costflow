FROM python:3.13-alpine3.21 AS build

WORKDIR /source

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system --deploy

FROM python:3.13-alpine3.21 AS final

WORKDIR /source

# Copy installed packages from builder stage
COPY --from=build /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=build /usr/local/bin /usr/local/bin

COPY api ./

RUN addgroup -g 1234 footeam-group && \
  adduser -D -u 1234 -G footeam-group footeam-user

USER footeam-user:footeam-group

CMD ["python", "main.py"]