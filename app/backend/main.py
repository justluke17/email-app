from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import jwt # PyJWT for generating our own tokens
from datetime import datetime, timedelta, timezone

# Configuration
GOOGLE_CLIENT_ID = "159188480307-o3k26im4vnoqqrt18r7pp11c70hr2ksa.apps.googleusercontent.com"
JWT_SECRET_KEY = "a_very_secret_key"  # In a real app, use a strong, randomly generated key from env variables
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# In-memory user store (replace with a database in a real application)
users_db = {}

class TokenData(BaseModel):
    email: str | None = None

class User(BaseModel):
    email: str
    full_name: str | None = None
    picture: str | None = None

class GoogleToken(BaseModel):
    token: str

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/auth/google")
async def auth_google(google_token: GoogleToken):
    try:
        idinfo = id_token.verify_oauth2_token(google_token.token, google_requests.Request(), GOOGLE_CLIENT_ID)

        email = idinfo["email"]
        full_name = idinfo.get("name")
        picture = idinfo.get("picture")

        # Create or update user in our "database"
        users_db[email] = {"email": email, "full_name": full_name, "picture": picture}

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": email}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer", "user": users_db[email]}

    except ValueError as e:
        # Invalid token
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


@app.get("/")
async def root():
    return {"message": "Backend is running"}

# Example protected route (optional, for testing)
# from fastapi.security import OAuth2PasswordBearer
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # This 'token' endpoint doesn't exist yet

# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
#         email: str = payload.get("sub")
#         if email is None:
#             raise credentials_exception
#         token_data = TokenData(email=email)
#     except jwt.PyJWTError:
#         raise credentials_exception
#     user = users_db.get(token_data.email)
#     if user is None:
#         raise credentials_exception
#     return user

# @app.get("/users/me/", response_model=User)
# async def read_users_me(current_user: User = Depends(get_current_user)):
#     return current_user
