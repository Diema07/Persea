from pathlib import Path
import os
import environ

# Configuración de entorno
env = environ.Env()
environ.Env.read_env()

# Directorio base del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# Configuración de seguridad
SECRET_KEY = os.environ.get('SECRET_KEY')  # Clave secreta para la seguridad de la aplicación
DEBUG = os.environ.get('DEBUG')  # Modo de depuración (True/False)
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS_DEV')  # Hosts permitidos en desarrollo

# Configuración de Google OAuth
GOOGLE_CLIENT_ID = env('GOOGLE_CLIENT_ID')  # ID de cliente de Google para autenticación

# Modelo de usuario personalizado
AUTH_USER_MODEL = 'auth.User'

# Aplicaciones instaladas
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Aplicaciones personalizadas
    'apps.usuarios',
    'apps.plantaciones',
    'apps.preparacion',
    'apps.mantenimiento',
    'apps.produccion',
    'apps.notificaciones',
    'apps.informes',

    # Aplicaciones de terceros
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',  # Autenticación con Google
    'corsheaders',
    'rest_framework.authtoken',
    'rest_framework'
]

# Backends de autenticación
AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',  # Autenticación con allauth
)

# Configuración de proveedores de autenticación social
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': ['email'],
        'AUTH_PARAMS': {'access_type': 'online'},
        'OAUTH_PKCE_ENABLED': True,
    }
}

# Redirección después del login
LOGIN_REDIRECT_URL = 'http://localhost:3000/inicio-plantacion'
LOGOUT_REDIRECT_URL = '/'

# Configuración de CORS
CORS_ALLOW_ALL_ORIGINS = True 
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Permitir solicitudes desde este origen
]

CORS_ALLOW_CREDENTIALS = True  # Permitir el envío de cookies

# Lista de orígenes confiables para redirecciones de autenticación
ACCOUNT_AUTHENTICATED_REDIRECTS = True


# Lista de orígenes confiables para redirecciones de autenticación
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
]

#cookies
CSRF_COOKIE_HTTPONLY = False  # Permite que JavaScript acceda a la cookie
CSRF_COOKIE_SAMESITE = 'Lax'  # Necesario para solicitudes entre dominios
CSRF_COOKIE_SECURE = False  # Establecer en True en producción con HTTPS


# Middleware
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ID del sitio
SITE_ID = 1

# Configuración de URLs
ROOT_URLCONF = "Persea.urls"

# Plantillas
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Configuración de WSGI
WSGI_APPLICATION = "Persea.wsgi.application"

# Configuración de la base de datos
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Validación de contraseñas
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internacionalización
LANGUAGE_CODE = "es"  # Idioma predeterminado
TIME_ZONE = 'America/Bogota'  # Zona horaria
USE_I18N = True  # Habilitar internacionalización
USE_TZ = True  # Usar zona horaria

# Archivos estáticos
STATIC_URL = "static/"

# Campo primario por defecto
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',  # Para autenticación por token
        # Si usas JWT:
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Requiere autenticación por defecto
    ],
}


# Configuración para producción
if not DEBUG:
    ALLOWED_HOSTS = env.list('ALLOWED_HOSTS_DEPLOY')  # Hosts permitidos en producción

    # Configuración de la base de datos en producción
    DATABASES = {
        "default": env.db("DATABASE_URL"),
    }
    DATABASES["default"]["ATOMIC_REQUESTS"] = True  # Habilitar transacciones atómicas
