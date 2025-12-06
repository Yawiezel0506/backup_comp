app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credetils=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"]
)