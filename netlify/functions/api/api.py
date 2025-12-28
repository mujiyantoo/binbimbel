from mangum import Mangum
from server import app
import logging

logger = logging.getLogger("mangum")

# Netlify function handler
handler = Mangum(app, lifespan="auto")
