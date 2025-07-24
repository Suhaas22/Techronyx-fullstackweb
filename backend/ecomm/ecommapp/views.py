from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .models import Product, ProductDetail, CartItem
from .serializer import (
    ProductSerializer,
    CartItemSerializer,
    UserSerializer,
    UserSerializerWithToken,
    ProductDetailSerializer
)



@api_view(['GET'])
def test_api(request):
    return Response({'status': 'API works!'})

@api_view(['GET'])
def getroutes(request):
    return Response('hey folks')


# Product Endpoints

class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def getproduct(request, pk):
    print(f"Fetching product with id: {pk}")
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=404)


# JWT Login Serializer View

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# User Auth & Profile Endpoints

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    serializer = UserSerializer(request.user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['fname'],
            last_name=data['lname'],
            username=data['email'],  # using email as username
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



# CartItem ViewSet (CRUD for Cart)

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print(" Authorization Header:", self.request.META.get("HTTP_AUTHORIZATION"))
        print(" request.user:", self.request.user)
        print(" Is authenticated:", self.request.user.is_authenticated)

        user = self.request.user
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        # Check if item already exists for the user
        existing_item = CartItem.objects.filter(user=user, product=product).first()
        if existing_item:
            # Update the quantity instead of creating a new item
            existing_item.quantity += quantity
            existing_item.save()
        else:
            serializer.save(user=user)
