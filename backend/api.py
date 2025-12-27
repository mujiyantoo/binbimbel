from mangum import Mangum
from .server import app

# Netlify function handler
# The file name 'api.py' determines the function name '/.netlify/functions/api'
handler = Mangum(app, lifespan="auto")
