from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Django backend is live"})

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('ecommapp.urls')),
]

# Serve media files in both DEBUG and production
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]
