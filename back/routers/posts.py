# from fastapi import APIRouter
#
# router = APIRouter()
#
#
# @router.get("/", tags=["posts"])
# async def read_posts():
#     return [{"post": "Rick bla morty"}, {"post": "Morty and rick"}]
#
#
# @router.get("/me", tags=["posts"])
# async def read_user_posts():
#     return [{"username": "fakecurrentuser", "posts": "all posts"}]
#
#
# @router.post("/create", tags=["posts"])
# async def create_post(username: str):
#     return {"Implement Creating post"}
#
#
# @router.delete("/delete", tags=["posts"])
# async def delete_post(username: str):
#     return {"Implement Deleting post"}
