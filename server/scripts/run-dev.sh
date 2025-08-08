export ENVIRONMENT=development

cd "$(dirname "$0")/.."
pipenv run python api/main.py