from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CartItem, Product, ProductDetail


# user serializers


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):
        firstname = obj.first_name
        lastname = obj.last_name
        name = f"{firstname} {lastname}".strip()
        return name or obj.email[:5]

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['token']

    def get_token(self, user):
        token = RefreshToken.for_user(user)
        return str(token.access_token)



# product detail serializers

class ProductDetailSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='product.title', read_only=True)

    class Meta:
        model = ProductDetail
        fields = [
            'id',
            'product',
            'title',
            'image1', 'image2', 'image3', 'image4',
            'gallery1', 'gallery2', 'gallery3', 'gallery4',
            'rating', 'reviews', 'new_price', 'old_price',
            'discount', 'offer', 'stock_status', 'description'
        ]



# product serializer

class ProductSerializer(serializers.ModelSerializer):
    details = ProductDetailSerializer(read_only=True) 

    class Meta:
        model = Product
        fields = '__all__'


# cart item serializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True, source='product'
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']
        
def create(self, validated_data):
    user = self.context["request"].user
    print("request.user:", user)
    product = validated_data["product"]
    quantity = validated_data["quantity"]

    cart_item, created = CartItem.objects.get_or_create(
        user=user, product=product,
        defaults={"quantity": quantity}
    )

    if not created:
        # If already exists, update quantity
        cart_item.quantity += quantity
        cart_item.save()

    return cart_item

