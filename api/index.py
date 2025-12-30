import os
import sys

# Add the current directory to sys.path to ensure module resolution works
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from server import app

# Vercel entry point
# This file must be in the 'api' directory.
# Vercel will automatically detect it and create a serverless function.
