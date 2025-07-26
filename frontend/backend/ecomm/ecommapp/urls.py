
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductListView,
    MyTokenObtainPairView, getUserProfile, getUsers, registerUser,
    CartItemViewSet,
    getproduct,
)


from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'cartitems', CartItemViewSet, basename='cartitem')

urlpatterns = [
    path('', include(router.urls)),  
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', getproduct, name='product-detail'),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('users/profile/', getUserProfile, name='user-profile'),
    path('users/', getUsers, name='users'),
    path('users/register/', registerUser, name='user-register'),
    path('users/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
